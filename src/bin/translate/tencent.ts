import { createHmac, BinaryToTextEncoding } from 'node:crypto'
import { Config } from '../../type'
import fetch from '../fetch'
import {
  sha256 as getHash,
  collectRes,
  handleTranslateFail,
  throwErrorByErrorCode,
} from './utils'

const config: Config['tencentConfig'] = {
  secretId: '',
  secretKey: '',
  projectId: undefined,
  region: '',
  from: '',
  to: [],
}

const TRANSLATOR_NAME = i18n('腾讯')

const ERROR_CODE_TIP_MAP = {
  'AuthFailure.SignatureFailure': i18n('secretId 或者 secretKey 配置不正确'),
}

const EXIT_ERROR_CODES = [
  'AuthFailure.SignatureFailure',
  'InternalError',
  'InvalidParameter',
  'MissingParameter',
  'InvalidParameterValue',
]

/**
 * 设置翻译配置
 * @param configProp
 */
export function setTencentConfig(configProp: typeof config) {
  Object.entries(configProp).forEach(([key, value]) => {
    config[key] = value
  })
}

export function sha256(message, secret = '', encoding?: BinaryToTextEncoding) {
  const hmac = createHmac('sha256', secret)
  return hmac.update(message).digest(encoding)
}

function getUTCDate(date: Date) {
  const year = date.getUTCFullYear()
  const month = ('0' + (date.getUTCMonth() + 1)).slice(-2)
  const day = ('0' + date.getUTCDate()).slice(-2)
  return `${year}-${month}-${day}`
}

/**
 * 获取请求相关的信息
 * @param props
 * @returns
 */
function getRequestInfo(props: {
  payload: Record<string, any> // 传输到后端的数据
  secretId: string
  secretKey: string
  region: string
  language: string
}) {
  const { payload: payloadProp, secretId, secretKey, region, language } = props
  // 密钥参数
  const SECRET_ID = secretId
  const SECRET_KEY = secretKey
  const action = 'TextTranslateBatch'
  const version = '2018-03-21'
  const endpoint = 'tmt.tencentcloudapi.com'
  const service = 'tmt'
  const dateObj = new Date()
  const timestamp = Math.round(dateObj.getTime() / 1000)
  const date = getUTCDate(dateObj)

  // ************* 步骤 1：拼接规范请求串 *************
  const signedHeaders = 'content-type;host'

  const payload = JSON.stringify(payloadProp)

  const hashedRequestPayload = getHash(payload)
  const httpRequestMethod = 'POST'
  const canonicalUri = '/'
  const canonicalQueryString = ''
  const canonicalHeaders =
    'content-type:application/json; charset=utf-8\n' + 'host:' + endpoint + '\n'

  const canonicalRequest =
    httpRequestMethod +
    '\n' +
    canonicalUri +
    '\n' +
    canonicalQueryString +
    '\n' +
    canonicalHeaders +
    '\n' +
    signedHeaders +
    '\n' +
    hashedRequestPayload

  // ************* 步骤 2：拼接待签名字符串 *************
  const algorithm = 'TC3-HMAC-SHA256'
  const hashedCanonicalRequest = getHash(canonicalRequest)
  const credentialScope = date + '/' + service + '/' + 'tc3_request'
  const stringToSign =
    algorithm +
    '\n' +
    timestamp +
    '\n' +
    credentialScope +
    '\n' +
    hashedCanonicalRequest

  // ************* 步骤 3：计算签名 *************
  const kDate = sha256(date, 'TC3' + SECRET_KEY)
  const kService = sha256(service, kDate)
  const kSigning = sha256('tc3_request', kService)
  const signature = sha256(stringToSign, kSigning, 'hex')
  // console.log(signature)

  // ************* 步骤 4：拼接 Authorization *************
  const authorization =
    algorithm +
    ' ' +
    'Credential=' +
    SECRET_ID +
    '/' +
    credentialScope +
    ', ' +
    'SignedHeaders=' +
    signedHeaders +
    ', ' +
    'Signature=' +
    signature

  return {
    payload,
    host: endpoint,
    headers: {
      Authorization: authorization,
      'content-type': 'application/json; charset=utf-8',
      // 'content-type': 'application/x-www-form-urlencoded',
      Host: endpoint,
      'X-TC-Action': action,
      'X-TC-Version': version,
      'X-TC-Timestamp': timestamp,
      'X-TC-Region': region,
      'X-TC-Language': language,
    },
  }
}

/**
 * 翻译多个文本到单个语言的具体实现
 */
export async function translateByTencent(props: {
  texts: string[] // 需要翻译的文本内容
  from: string // 被翻译内容的默认语言
  to: string // 需要翻译到其他语言
}) {
  const { texts, from, to } = props
  const {
    secretId,
    secretKey,
    projectId = 0,
    region,
    language = 'zh-CN',
  } = config

  const success: Record<string, string> = {}
  const error: Record<string, string> = {}
  const textErrorMsg: Record<string, string[]> = {}

  const { payload, host, headers } = getRequestInfo({
    payload: {
      SourceTextList: texts,
      Source: from,
      Target: to,
      ProjectId: projectId,
    },
    secretId,
    secretKey,
    region,
    language,
  })

  let errorCode
  //
  try {
    const res: any = await fetch(`https://${host}`, {
      method: 'POST',
      data: payload,
      headers,
    })

    errorCode = res?.Response?.Error?.Code

    if (errorCode) {
      throwErrorByErrorCode(
        errorCode,
        ERROR_CODE_TIP_MAP,
        TRANSLATOR_NAME,
        'https://cloud.tencent.com/document/api/551/40566#6.-.E9.94.99.E8.AF.AF.E7.A0.81',
        res?.Response?.Error?.Message,
      )
    }

    // NOTE 这里不像 百度、有道 一样会默认返回 翻译前后的文本
    const srcDistMap = res?.Response?.TargetTextList?.reduce?.(
      (res, item, index) => {
        res[texts[index]] = item

        return res
      },
      {},
    )

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
