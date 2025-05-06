import * as GoogleXTranslate from 'google-translate-api-x'
import { type googleTranslateApi } from 'google-translate-api-x'
import { BasicGooglexConfig } from '../../type'
import { collectRes, getTranslatorName, handleTranslateFail } from './utils'
import fetch from 'node-fetch'

// 该对象用于测试时可以代理mock
export const proxyGoogleXTranslate: typeof GoogleXTranslate = {
  ...GoogleXTranslate,
}

const config: BasicGooglexConfig = {
  from: '',
  to: [],
}

const ERROR_CODE_TIP_MAP = {}

const EXIT_ERROR_CODES = Object.keys(ERROR_CODE_TIP_MAP)

/**
 * 设置翻译配置
 * @param configProp
 */
export function setGooglexConfig(configProp: typeof config) {
  Object.entries(configProp).forEach(([key, value]) => {
    config[key] = value
  })
}

export async function translateImpl(
  props: Pick<typeof config, 'from' | 'proxy'> & {
    texts: string[]
    to: string
  },
): Promise<googleTranslateApi.TranslationResponse[]> {
  const { texts, from, to, proxy } = props

  let agent = null
  global.fetch = fetch

  if (proxy) {
    const createHttpsProxyAgent = require('https-proxy-agent')
    agent = createHttpsProxyAgent(proxy)
  }

  return proxyGoogleXTranslate.translate(texts, {
    from,
    to,
    requestOptions: {
      agent,
    },
  })
}

/**
 * 翻译多个文本到单个语言的具体实现
 */
export async function translateByGooglex(props: {
  texts: string[] // 需要翻译的文本内容
  from: string // 被翻译内容的默认语言
  to: string // 需要翻译到其他语言
}) {
  const { texts, from, to } = props

  const TRANSLATOR_NAME = getTranslatorName('googlex')
  const success: Record<string, string> = {}
  const error: Record<string, string> = {}
  const textErrorMsg: Record<string, string[]> = {}

  let errorCode

  try {
    console.log(t('翻译中...'))
    const res = await translateImpl({
      ...props,
      proxy: config.proxy,
    })

    const srcDistMap = res.reduce?.((res, item, index) => {
      res[texts[index]] = item.text
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
