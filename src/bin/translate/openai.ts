import { BasicOpenAIConfig } from '../../type'
import fetch from '../fetch'
import { collectRes, handleTranslateFail, throwErrorByErrorCode } from './utils'

const config: BasicOpenAIConfig = {
  key: '',
  proxy: undefined,
  from: '',
  to: [],
  delay: 0,
}

const TRANSLATOR_NAME = 'OpenAI'

const ERROR_CODE_TIP_MAP = {}

const EXIT_ERROR_CODES = ['invalid_api_key']

/**
 * 设置翻译配置
 * @param configProp
 */
export function setOpenAIConfig(configProp: BasicOpenAIConfig) {
  Object.entries(configProp).forEach(([key, value]) => {
    config[key] = value
  })
}

/**
 * 翻译多个文本到单个语言的具体实现
 */
export async function translateByOpenAI(props: {
  texts: string[] // 需要翻译的文本内容
  from: string // 被翻译内容的默认语言
  to: string // 需要翻译到其他语言
  tokens: number // token的长度
}) {
  const { texts, from, to, tokens } = props
  const { key, proxy } = config

  const success: Record<string, string> = {}
  const error: Record<string, string> = {}
  const textErrorMsg: Record<string, string[]> = {}

  let errorCode
  const text = texts.join('\n')

  try {
    const res: any = await fetch('https://api.openai.com/v1/completions', {
      method: 'POST',
      data: JSON.stringify({
        model: 'text-davinci-003',
        prompt: `Translate those texts from ${from} to ${to}, keep the original newline format\n${text}`,
        temperature: 0,
        max_tokens: 4000 - tokens,
        top_p: 1,
        frequency_penalty: 0.5,
        presence_penalty: 0,
      }),
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${key}`,
      },
      proxy,
    })

    errorCode = res?.error?.code

    if (errorCode || res?.error?.message) {
      throwErrorByErrorCode(
        errorCode,
        ERROR_CODE_TIP_MAP,
        TRANSLATOR_NAME,
        'https://platform.openai.com/docs/guides/error-codes',
        res?.error?.message,
      )
    }

    const transText = res.choices[0].text.replace('\n\n', '')
    const transTexts = transText.split('\n')

    const srcDistMap = transTexts.reduce?.((res, item, index) => {
      res[texts[index]] = item
      return res
    }, {})

    collectRes({
      from,
      to,
      texts,
      srcDistMap,
      success,
      error,
      textErrorMsg,
      translatorName: TRANSLATOR_NAME,
    })
  } catch (e) {
    handleTranslateFail(e, errorCode, EXIT_ERROR_CODES, texts, error)
  }

  return {
    success,
    error,
    textErrorMsg,
  }
}
