import { Config as OpenApiConfig } from '@alicloud/openapi-client'
import alimt, { GetBatchTranslateRequest } from '@alicloud/alimt20181012'
import { RuntimeOptions } from '@alicloud/tea-util'
import type { BasicAliyunConfig } from '../../type'
import { collectRes, handleTranslateFail, throwErrorByErrorCode } from './utils'
import type Client from '@alicloud/alimt20181012'

const config: BasicAliyunConfig = {
  accessKeyId: '',
  accessKeySecret: '',
  from: '',
  to: [],
}

const TRANSLATOR_NAME = i18n('阿里云')

const ERROR_CODE_TIP_MAP = {
  MissingAccessKeyId: i18n('accessKeyId 或者 accessKeySecret 配置不正确'),
}

const EXIT_ERROR_CODES = ['MissingAccessKeyId']

/**
 * 设置翻译配置
 * @param configProp
 */
export function setAliyunConfig(configProp: typeof config) {
  Object.entries(configProp).forEach(([key, value]) => {
    config[key] = value
  })
}

export const mockClientUtil = (() => {
  let client: Client

  return {
    getClient() {
      return client
    },
    setClient(clientProp: Client) {
      client = clientProp
    },
  }
})()

/**
 * 调用阿里云SDK
 * @param props
 * @returns
 */
async function translateImpl(props: {
  texts: string[] // 需要翻译的文本内容
  from: string // 被翻译内容的默认语言
  to: string // 需要翻译到其他语言
}) {
  const { texts, from, to } = props
  const {
    accessKeyId,
    accessKeySecret,
    scene = 'general',
    apiType = 'translate_standard',
    endpoint = 'mt.aliyuncs.com',
  } = config

  const openApiConfig = new OpenApiConfig({
    accessKeyId,
    accessKeySecret,
  })
  openApiConfig.endpoint = endpoint
  const mockClient = mockClientUtil.getClient()
  const client = mockClient || new alimt(openApiConfig)
  const getBatchTranslateRequest = new GetBatchTranslateRequest({
    sourceText: JSON.stringify(
      texts.reduce((res, item, index) => {
        res[index] = item
        return res
      }, {}),
    ),
    sourceLanguage: from,
    targetLanguage: to,
    formatType: 'text',
    scene,
    apiType,
  })
  const runtime = new RuntimeOptions({})

  try {
    const res = await client.getBatchTranslateWithOptions(
      getBatchTranslateRequest,
      runtime,
    )

    return {
      code: res.body.code != 200 ? res.body.code : undefined,
      message: res.body.message,
      translatedList: res.body.translatedList,
    }
  } catch (error) {
    if (!error?.code) throw error
    return {
      code: error?.code,
      message: error?.data?.Message,
    }
  }
}

/**
 * 翻译多个文本到单个语言的具体实现
 */
export async function translateByAliyun(props: {
  texts: string[] // 需要翻译的文本内容
  from: string // 被翻译内容的默认语言
  to: string // 需要翻译到其他语言
}) {
  const { texts, from, to } = props
  const success: Record<string, string> = {}
  const error: Record<string, string> = {}
  const textErrorMsg: Record<string, string[]> = {}

  let errorCode

  try {
    const res: any = await translateImpl({
      ...props,
    })

    errorCode = res?.code
    if (errorCode) {
      throwErrorByErrorCode(
        errorCode,
        ERROR_CODE_TIP_MAP,
        TRANSLATOR_NAME,
        'https://next.api.aliyun.com/global-error-code?spm=api-workbench.API%20Document.0.0.49fe491dRlO8CY',
        res?.message,
      )
    }

    const srcDistMap = res?.translatedList?.reduce?.((res, item) => {
      const { code, index, translated } = item

      if (code == '200') {
        res[texts[index]] = translated
      }

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
