import { createHash } from 'node:crypto'
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
  let errorText = errorMsg
    ? i18n('错误信息: {0}', chalk.redBright(errorMsg))
    : ''

  if (errorCodeTipMap[errorCode]) {
    errorText = i18n(
      '可能原因是: {0}',
      chalk.redBright(errorCodeTipMap[errorCode]),
    )
  }

  throw `${chalk.redBright(i18n('{0}翻译接口返回错误', translatorName))}：
      ${i18n('错误码')}：${errorCode}
      ${i18n(
        '可根据错误码在 {0} 该文档中查看错误具体原因',
        chalk.blueBright.underline(docUrl),
      )}
      ${errorText}
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
}) {
  const { from, to, texts, srcDistMap, success, error, textErrorMsg } = props

  texts.forEach((text) => {
    const dst = srcDistMap[text]
    if (typeof dst !== 'undefined') {
      const newDst = fixErrorTranslateText(dst)
      const currentTextError = getParamsNotEqualMsgs(text, newDst)
      if (currentTextError.length > 0) {
        textErrorMsg[text] = currentTextError
      }
      success[text] = newDst
      logSuccess(
        i18n(
          '{0}({1}{2}{3})：{4}{5}{6}',
          chalk.greenBright(i18n('翻译成功')),
          chalk.redBright.italic(from),
          chalk.bold.greenBright(' → '),
          chalk.redBright.italic(to),
          text,
          chalk.bold.greenBright(' → '),
          newDst,
        ),
      )
    } else {
      error[text] = i18n('当前文本【{0}】未被翻译', text)
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
  exitCodes: string[],
  texts: string[],
  error: Record<string, string>,
) {
  logError(e)

  if (errorCode && exitCodes.includes(errorCode)) {
    process.exit(1)
  }

  let currentErrorText = e || TRANSLATE_ERROR_TEXT

  currentErrorText = e
    ?.replaceAll('\n', '')
    ?.replaceAll(STYLE_EOF, '')
    ?.replaceAll(chalk.redBright().replace(STYLE_EOF, ''), '')
    ?.replaceAll(chalk.blueBright.underline().replace(STYLE_EOF, ''), '')

  texts.forEach((text) => {
    error[text] = currentErrorText
  })
}
