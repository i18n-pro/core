import { logSuccess } from './utils'
import chalk from './chalk'

const fs = require('fs')

/**
 * 基于文本解析出tr函数包裹的内容
 * @param fileContent
 * @param funcName 获取国际化文本的函数名
 */
export function extraText(
  fileContent: string,
  funcName,
): {
  success: string[] // 正确的列表
  error: string[] // 错误的列表
} {
  const regexp = new RegExp(
    /\WfuncName\(\n*[ ]*((['"`])(.+?)\2)(,|\))/.source.replace(
      'funcName',
      funcName,
    ),
    'g',
  )
  const success: string[] = []
  const error: string[] = []
  let temp: string[] | null
  while ((temp = regexp.exec(fileContent))) {
    const label = temp[1]
    const content = temp[3]
    if (
      (label.match(/^`.*`$/) && label.includes('${')) ||
      content.startsWith(' ') ||
      content.endsWith(' ') ||
      content.includes('\n') ||
      content.includes('\\n') ||
      content.includes('\t') ||
      content.includes('\\t')
    ) {
      error.push(content)
    } else {
      success.push(content)
    }
  }

  return {
    success,
    error,
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
  success: string[] // 正确的列表
  error: string[] // 错误的列表
} {
  let success: string[] = []
  let error: string[] = []
  filepaths.forEach((filepath) => {
    const fileContent = fs.readFileSync(filepath, {
      encoding: 'utf-8',
    })
    const trTextRes = extraText(fileContent, funcName)
    success.push(...trTextRes.success)
    error.push(...trTextRes.error)
  })

  success = Array.from(new Set(success))
  error = Array.from(new Set(error))

  logSuccess(
    chalk.greenBright(t('解析符合要求的国际化文本数:')),
    success.length,
  )
  logSuccess(
    chalk.greenBright(t('解析不符合要求的国际化文本数:')),
    error.length,
  )

  return {
    success,
    error,
  }
}
