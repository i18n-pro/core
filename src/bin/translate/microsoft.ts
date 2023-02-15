import { BasicMicrosoftConfig } from '../../type'
import fetch from '../fetch'
import { collectRes, handleTranslateFail, throwErrorByErrorCode } from './utils'

const config: BasicMicrosoftConfig = {
  key: '',
  location: '',
  from: '',
  to: [],
}

const TRANSLATOR_NAME = i18n('微软')

const ERROR_CODE_TIP_MAP = {
  401000: i18n('key 或者 location 配置不正确'),
}

const EXIT_ERROR_CODES = [401000]

/**
 * 设置翻译配置
 * @param configProp
 */
export function setMicrosoftConfig(configProp: typeof config) {
  Object.entries(configProp).forEach(([key, value]) => {
    config[key] = value
  })
}

/**
 * 翻译多个文本到单个语言的具体实现
 */
export async function translateByMicrosoft(props: {
  texts: string[] // 需要翻译的文本内容
  from: string // 被翻译内容的默认语言
  to: string // 需要翻译到其他语言
}) {
  const { texts, from, to } = props
  const { key, location } = config

  const success: Record<string, string> = {}
  const error: Record<string, string> = {}
  const textErrorMsg: Record<string, string[]> = {}

  const data = JSON.stringify(texts.map((text) => ({ text })))

  let errorCode

  try {
    const res: any = await fetch(
      `https://api.cognitive.microsofttranslator.com/translate?api-version=3.0&from=${from}&to=${to}`,
      {
        method: 'POST',
        data,
        headers: {
          'Content-type': 'application/json',
          'Ocp-Apim-Subscription-Key': key,
          'Ocp-Apim-Subscription-Region': location,
        },
      },
    )

    errorCode = res?.error?.code

    if (errorCode) {
      throwErrorByErrorCode(
        errorCode,
        ERROR_CODE_TIP_MAP,
        TRANSLATOR_NAME,
        'https://learn.microsoft.com/zh-cn/azure/cognitive-services/translator/reference/v3-0-reference',
        res?.error?.message,
      )
    }

    // NOTE 这里不像 百度、有道 一样会默认返回 翻译前后的文本
    const srcDistMap = res?.reduce?.((res, item, index) => {
      res[texts[index]] = item?.translations?.[0]?.text
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
