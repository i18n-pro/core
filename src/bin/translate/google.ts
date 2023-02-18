import { TranslationServiceClient } from '@google-cloud/translate'
import { BasicGoogleConfig } from '../../type'
import chalk from '../chalk'
import { collectRes, handleTranslateFail } from './utils'

const config: BasicGoogleConfig = {
  projectId: '',
  location: 'global',
  from: '',
  to: [],
}

const TRANSLATOR_NAME = i18n('谷歌')

const ERROR_CODE_TIP_MAP = {
  '5 NOT_FOUND': i18n('projectId 配置不正确'),
  '3 INVALID_ARGUMENT': i18n('location 或者 语言代码 配置不正确'),
}

const EXIT_ERROR_CODES = Object.keys(ERROR_CODE_TIP_MAP)

/**
 * 设置翻译配置
 * @param configProp
 */
export function setGoogleConfig(configProp: typeof config) {
  Object.entries(configProp).forEach(([key, value]) => {
    config[key] = value
  })
}
;``
const translationClient = new TranslationServiceClient()

async function translateImpl(
  props: Pick<typeof config, 'projectId' | 'location' | 'from'> & {
    texts: string[]
    to: string
  },
) {
  const { projectId, location, texts, from, to } = props

  const request = {
    parent: `projects/${projectId}/locations/${location}`,
    contents: texts,
    mimeType: 'text/plain',
    sourceLanguageCode: from,
    targetLanguageCode: to,
  }

  let response = []
  const res = {
    errorMsg: '',
    reason: '',
    translations: [] as any[],
    errorCode: 'noCode',
  }
  try {
    response = await translationClient.translateText(request)
    const [{ translations }] = response
    res.translations = translations
  } catch (e) {
    const message = e.message || e
    Object.entries(ERROR_CODE_TIP_MAP).some(([code, msg]) => {
      if (message.includes(code)) {
        res.reason = msg
        res.errorCode = code
        return true
      }
    })
    res.errorMsg = message
  }

  return res
}

/**
 * 翻译多个文本到单个语言的具体实现
 */
export async function translateByGoogle(props: {
  texts: string[] // 需要翻译的文本内容
  from: string // 被翻译内容的默认语言
  to: string // 需要翻译到其他语言
}) {
  const { texts, from, to } = props
  const { projectId, location } = config

  const success: Record<string, string> = {}
  const error: Record<string, string> = {}
  const textErrorMsg: Record<string, string[]> = {}

  let errorCode

  try {
    const res: any = await translateImpl({
      projectId,
      location,
      ...props,
    })

    errorCode = res?.errorCode

    if (res?.errorMsg) {
      throw `${chalk.redBright(i18n('{0}翻译接口返回错误', TRANSLATOR_NAME))}：
      ${i18n('错误信息')}：${res.errorMsg}
      ${
        res.reason
          ? `${i18n('可能原因是: {0}', chalk.redBright(res.reason))}`
          : ''
      }
         `
    }

    const srcDistMap = res.translations.reduce?.((res, item, index) => {
      res[texts[index]] = item?.translatedText
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