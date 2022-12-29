import { Config } from '../../type'
import fetch from '../fetch'
import {
  sha256,
  collectRes,
  getURLStringFromObj,
  handleTranslateFail,
  throwErrorByErrorCode,
} from './utils'

const config: Config['youdaoConfig'] = {
  appKey: '',
  key: '',
  from: '',
  to: [],
}

const ERROR_CODE_TIP_MAP = {
  102: i18n('不支持的语言类型'),
  108: i18n('appKey 配置不正确'),
  202: i18n('key 配置不正确'),
}

const EXIT_ERROR_CODES = ['102', '108', '202']

/**
 * 设置翻译配置
 * @param configProp
 */
export function setYoudaoConfig(configProp: Config['youdaoConfig']) {
  Object.entries(configProp).forEach(([key, value]) => {
    config[key] = value
  })
}

function truncate(q) {
  const len = q.length
  if (len <= 20) return q
  return q.substring(0, 10) + len + q.substring(len - 10, len)
}

/**
 * 翻译多个文本到单个语言的具体实现
 */
export async function translateByYoudao(props: {
  texts: string[] // 需要翻译的文本内容
  from: string // 被翻译内容的默认语言
  to: string // 需要翻译到其他语言
}) {
  const { texts, from, to } = props
  const { appKey, key } = config

  const success: Record<string, string> = {}
  const error: Record<string, string> = {}
  const textErrorMsg: Record<string, string[]> = {}

  const salt = new Date().getTime()
  const curtime = Math.round(new Date().getTime() / 1000)
  const str1 = appKey + truncate(texts.join('')) + salt + curtime + key
  const sign = sha256(str1)

  const body = {
    q: texts,
    appKey,
    salt,
    from,
    to,
    sign,
    signType: 'v3',
    curtime,
  }

  let errorCode

  try {
    const res: any = await fetch('https://openapi.youdao.com/v2/api', {
      method: 'POST',
      data: getURLStringFromObj(body),
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
      },
    })

    errorCode = res.errorCode

    if (errorCode != '0') {
      throwErrorByErrorCode(
        errorCode,
        ERROR_CODE_TIP_MAP,
        i18n('有道'),
        'https://ai.youdao.com/DOCSIRMA/html/%E8%87%AA%E7%84%B6%E8%AF%AD%E8%A8%80%E7%BF%BB%E8%AF%91/API%E6%96%87%E6%A1%A3/%E6%89%B9%E9%87%8F%E7%BF%BB%E8%AF%91%E6%9C%8D%E5%8A%A1/%E6%89%B9%E9%87%8F%E7%BF%BB%E8%AF%91%E6%9C%8D%E5%8A%A1-API%E6%96%87%E6%A1%A3.html#section-10',
      )
    }

    const srcDistMap = res?.translateResults?.reduce?.((res, item) => {
      const { query, translation } = item
      res[query] = translation

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
