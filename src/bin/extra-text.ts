import { logSuccess } from './utils'
import chalk from './chalk'

const fs = require('fs')

/**
 * 验证文案是否有效
 * @param label 包含 `'" 符号的完整整文本
 * @param content 符号内的文本内容
 * @param isCustomKey 是否是自定义key
 * @returns
 */
function validateLabelAndContent(
  label: string,
  content: string,
  isCustomKey = false,
) {
  // 这里字符串模板中引用变量
  if (label.match(/^`.*`$/) && label.includes('${')) return false

  if (
    !isCustomKey &&
    (content.startsWith(' ') ||
      content.endsWith(' ') ||
      content.includes('\n') ||
      content.includes('\\n') ||
      content.includes('\t') ||
      content.includes('\\t'))
  )
    return false

  return true
}

/**
 * 基于文本解析出 t 函数包裹的内容
 * @param fileContent
 * @param funcName 获取国际化文本的函数名
 * @param success 正确的列表
 * @param error 错误的列表
 */
export function extraTextFromT(
  fileContent: string,
  funcName: string,
  success: string[],
  error: string[],
) {
  const regexp = new RegExp(
    /[^a-zA-Z.]funcName\(\s*((['"`])(.+?)\2)(?:,|\))/.source.replace(
      'funcName',
      funcName,
    ),
    'g',
  )
  let temp: string[] | null

  while ((temp = regexp.exec(fileContent))) {
    const label = temp[1]
    const content = temp[3]
    if (!validateLabelAndContent(label, content)) {
      error.push(content)
    } else {
      success.push(content)
    }
  }
}

/**
 * 基于文本解析出 t.t 函数包裹的内容
 * @param fileContent
 * @param funcName 获取国际化文本的函数名
 * @param keyTextMap 自定义key与文案的映射（需要为一对一）
 * @param textKeyMap 文案与自定义key与的映射（可以是一对多）
 * @param textSuccess 正确的文案列表
 * @param textError 错误的文案列表
 * @param keySuccess 正确的自定义key列表
 * @param keyError 错误的自定义key列表
 */
export function extraTextFromTDotT(
  fileContent: string,
  funcName,
  keyTextMap: Record<string, string>,
  textKeyMap: Record<string, string[]>,
  textSuccess: string[],
  textError: string[],
  keySuccess: string[],
  keyError: string[],
) {
  const regexp = new RegExp(
    /\WfuncName\.t\(\s*((['"`])(.+?)\2),\s*((['"`])(.+?)\5)(?:,|\))/.source.replace(
      'funcName',
      funcName,
    ),
    'g',
  )

  let temp: string[] | null

  while ((temp = regexp.exec(fileContent))) {
    const keyLabel = temp[1]
    const keyContent = temp[3]
    const textLabel = temp[4]
    const textContent = temp[6]

    const keyValidate = validateLabelAndContent(keyLabel, keyContent, true)
    const textValidate = validateLabelAndContent(textLabel, textContent)

    if (keyValidate) {
      keySuccess.push(keyContent)
    } else {
      keyError.push(keyContent)
    }
    if (textValidate) {
      textSuccess.push(textContent)
    } else {
      textError.push(textContent)
    }

    // 自定义key和文案都有效
    if (keyValidate && textValidate) {
      const text = keyTextMap[keyContent]
      if (text && text != textContent) {
        keyError.push(
          t(
            '当前自定义 key=`{0}`，配置了不一样的文案（`{1}` 和 `{2}`），应该满足 key 与文案一对一的关系',
            keyContent,
            text,
            textContent,
          ),
        )
      } else if (!text) {
        keyTextMap[keyContent] = textContent
        const keys = textKeyMap[textContent] || []
        if (!keys.includes(keyContent)) {
          keys.push(keyContent)
          textKeyMap[textContent] = keys
        }
      }
    }
  }
}

/**
 * 根据文件路径提取tr函数包裹的文本内容
 * @param filepaths 文件路径
 * @param funcName 获取国际化文本的函数名
 * @returns
 */
export default function extraTexts(
  filepaths: string[],
  funcName = 't',
): {
  textSuccess: string[] // 正确的列表
  textError: string[] // 错误的列表
  keySuccess: string[] // 正确的列表
  keyError: string[] // 错误的列表
} {
  let textSuccess: string[] = []
  let textError: string[] = []
  let keySuccess: string[] = []
  let keyError: string[] = []
  const keyTextMap: Record<string, string> = {}
  const textKeyMap: Record<string, string[]> = {}

  filepaths.forEach((filepath) => {
    const fileContent = fs.readFileSync(filepath, {
      encoding: 'utf-8',
    })
    extraTextFromT(fileContent, funcName, textSuccess, textError)
    extraTextFromTDotT(
      fileContent,
      funcName,
      keyTextMap,
      textKeyMap,
      textSuccess,
      textError,
      keySuccess,
      keyError,
    )
  })

  textSuccess = Array.from(new Set(textSuccess))
  textError = Array.from(new Set(textError))
  keySuccess = Array.from(new Set(keySuccess))
  keyError = Array.from(new Set(keyError))

  logSuccess(
    chalk.greenBright(t('解析符合要求的翻译文案数:')),
    textSuccess.length,
  )
  logSuccess(
    chalk.greenBright(t('解析不符合要求的翻译文案数:')),
    textError.length,
  )
  logSuccess(
    chalk.greenBright(t('解析符合要求的自定义key数:')),
    keySuccess.length,
  )
  logSuccess(
    chalk.greenBright(t('解析不符合要求的自定义key数:')),
    keyError.length,
  )

  return {
    textSuccess,
    textError,
    keySuccess,
    keyError,
  }
}
