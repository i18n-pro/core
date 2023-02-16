import { URLSearchParams } from 'node:url'
import { SEPARATOR_STR } from '../constants'
import { BasicBaiduConfig } from '../../type'
import fetch from '../fetch'
import {
  md5,
  collectRes,
  handleTranslateFail,
  throwErrorByErrorCode,
} from './utils'

const config: BasicBaiduConfig = {
  appid: '',
  key: '',
  from: '',
  to: [],
  delay: 0,
}

const TRANSLATOR_NAME = i18n('百度')

const ERROR_CODE_TIP_MAP = {
  52003: i18n('appid 配置不正确'),
  54001: i18n('key 配置不正确'),
  54003: i18n(
    '多个人同时使用了同一个APPID的执行翻译，建议注册个人账号来使用或者调整配置项{0}(具体可参考配置项文档说明)',
    'baiduConfig.delay',
  ),
}

const EXIT_ERROR_CODES = ['52003', '54001']

/**
 * 设置翻译配置
 * @param configProp
 */
export function setBaiduConfig(configProp: BasicBaiduConfig) {
  Object.entries(configProp).forEach(([key, value]) => {
    config[key] = value
  })
}

/**
 * 翻译多个文本到单个语言的具体实现
 */
export async function translateByBaidu(props: {
  texts: string[] // 需要翻译的文本内容
  from: string // 被翻译内容的默认语言
  to: string // 需要翻译到其他语言
}) {
  const { texts, from, to } = props
  const { appid, key } = config

  const translateText = texts.join(SEPARATOR_STR)
  const success: Record<string, string> = {}
  const error: Record<string, string> = {}
  const textErrorMsg: Record<string, string[]> = {}

  const q = translateText
  const salt = Date.now()
  const sign = md5(`${appid}${q}${salt}${key}`)

  const body = {
    q,
    from: from,
    to: to,
    appid,
    salt,
    sign,
  }

  let errorCode

  try {
    const res: any = await fetch(
      'https://api.fanyi.baidu.com/api/trans/vip/translate',
      {
        method: 'POST',
        data: new URLSearchParams(body as any).toString(),
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
        },
      },
    )

    errorCode = res.error_code
    if (errorCode) {
      throwErrorByErrorCode(
        errorCode,
        ERROR_CODE_TIP_MAP,
        TRANSLATOR_NAME,
        'http://api.fanyi.baidu.com/doc/21',
        res.error_msg,
      )
    }

    const srcDistMap = res?.trans_result?.reduce?.((res, item) => {
      const { src, dst } = item
      res[src] = dst

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
    console.log({ e })
    handleTranslateFail(e, errorCode, EXIT_ERROR_CODES, texts, error)
  }

  return {
    success,
    error,
    textErrorMsg,
  }
}
