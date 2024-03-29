import { createHash } from 'node:crypto'
import { Translator } from 'src/type'
import chalk, { STYLE_EOF } from '../chalk'
import { TRANSLATE_ERROR_TEXT } from '../constants'
import {
  fixErrorTranslateText,
  getParamsNotEqualMsgs,
  logError,
  logSuccess,
} from '../utils'

/**
 * MD5加密算法
 * @param str 加密的字符
 * @returns
 */
export function md5(str: string): string {
  return createHash('md5').update(str).digest('hex').toString()
}

/**
 * sha256加密算法
 * @param str 加密的字符
 * @returns
 */
export function sha256(str: string): string {
  return createHash('sha256').update(str).digest('hex').toString()
}

/**
 * 将对象转换成URL
 * @param obj
 * @returns
 */
export function getURLStringFromObj(obj: Record<string, unknown>) {
  const data = Object.entries(obj).reduce((res, [key, value]) => {
    if (Array.isArray(value)) {
      res += value.reduce((arrRes, item) => {
        arrRes += `${res != '' || arrRes != '' ? '&' : ''}${key}=${item}`
        return arrRes
      }, '')
    } else {
      res += `${res != '' ? '&' : ''}${key}=${value}`
    }
    return res
  }, '')

  return data
}

/**
 * 根据错误码抛出错误提示信息
 * @param errorCode 错误码
 * @param errorCodeTipMap 内置错误码与提示信息的映射
 * @param translatorName 翻译平台的名称
 * @param docUrl 错误码参考文档的url
 * @param errorMsg 接口默认返回的错误信息
 */
export function throwErrorByErrorCode(
  errorCode: string,
  errorCodeTipMap: Record<string | number, string>,
  translatorName: string,
  docUrl: string,
  errorMsg?: string,
) {
  const errorText = errorMsg
    ? '\n   ' + t('错误信息: {0}', chalk.redBright(errorMsg))
    : ''

  let errorReason = errorCodeTipMap[errorCode]
  errorReason = errorReason
    ? t('可能原因是: {0}', chalk.redBright(errorCodeTipMap[errorCode]))
    : ''

  throw `${chalk.redBright(t('{0}翻译接口返回错误', translatorName))}：
   ${t('错误码')}：${errorCode}${errorText}
   ${t(
     '可根据错误码在 {0} 该文档中查看错误具体原因',
     chalk.blueBright.underline(docUrl),
   )}
   ${errorReason}
      `
}

/**
 * 从翻译结果中收集翻译信息，并输出翻译正确的内容
 */
export function collectRes(props: {
  from: string // 原语言
  to: string // 翻译目标语言
  texts: string[] // 需要翻译的文本内容
  srcDistMap: Record<string, string> // 单条被翻译文本与翻译结果的映射
  success: Record<string, string> // 翻译成功对象
  error: Record<string, string> // 翻译失败对象
  textErrorMsg: Record<string, string[]> // 翻译有误对象
  translatorName: string // 翻译平台名称
}) {
  const {
    from,
    to,
    texts,
    srcDistMap,
    success,
    error,
    textErrorMsg,
    translatorName,
  } = props

  texts.forEach((text) => {
    const dst = srcDistMap[text]
    if (typeof dst === 'string' && dst) {
      const newDst = fixErrorTranslateText(dst)
      const currentTextError = getParamsNotEqualMsgs(text, newDst)
      if (currentTextError.length > 0) {
        textErrorMsg[text] = currentTextError
      }
      success[text] = newDst
      logSuccess(
        t(
          '{0}({1}{2}{3})：{4}{5}{6}',
          chalk.greenBright(t('{0}翻译成功', translatorName)),
          chalk.redBright.italic(from),
          chalk.bold.greenBright(' → '),
          chalk.redBright.italic(to),
          text,
          chalk.bold.greenBright(' → '),
          newDst,
        ),
      )
    } else {
      error[text] = t('当前文案【{0}】未被翻译', text)
    }
  })
}

/**
 * 处理翻译失败的结果，并输出错误信息
 * @param e 翻译时的捕获的异常信息
 * @param errorCode 错误码
 * @param exitCodes 结束任务的错误码列表
 * @param texts 需要翻译的文本内容
 * @param error 翻译失败对象
 */
export function handleTranslateFail(
  e: any,
  errorCode: string,
  exitCodes: Array<string | number>,
  texts: string[],
  error: Record<string, string>,
) {
  logError(e)

  if (errorCode && exitCodes.includes(errorCode)) {
    process.exit(1)
  }

  let currentErrorText = e || TRANSLATE_ERROR_TEXT

  currentErrorText = currentErrorText
    ?.toString()
    ?.replaceAll('\n', '')
    ?.replaceAll(STYLE_EOF, '')
    ?.replaceAll(chalk.redBright().replace(STYLE_EOF, ''), '')
    ?.replaceAll(chalk.blueBright.underline().replace(STYLE_EOF, ''), '')

  texts.forEach((text) => {
    error[text] = currentErrorText
  })
}

export function getTranslatorName(translator: Translator) {
  const translatorTextMap: Record<Translator, string> = {
    aliyun: t('阿里云'),
    baidu: t('百度'),
    youdao: t('有道'),
    tencent: t('腾讯'),
    microsoft: t('微软'),
    google: t('谷歌'),
    googlex: t('谷歌X'),
    openai: 'OpenAI',
  }

  return translatorTextMap[translator]
}
