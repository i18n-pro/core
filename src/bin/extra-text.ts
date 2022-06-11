const fs = require('fs')
const chalk = require('chalk')
import { logSuccess } from './utils'

/**
 * 基于文本解析出tr函数包裹的内容
 * @param fileCotent
 */
export function extraTrText(fileCotent: string): {
  success: string[] // 正确的列表
  error: string[] // 错误的列表
} {
  const regexp = /\Wtr\(((['"`])(.+?)\2),?\W/g
  const success: string[] = []
  const error: string[] = []
  let temp: string[] | null
  while ((temp = regexp.exec(fileCotent))) {
    const label = temp[1]
    const content = temp[3]
    if (
      (label.match(/^`.*`$/) && label.includes('${')) ||
      content.startsWith(' ') ||
      content.startsWith('\t') ||
      content.includes('\n')
    ) {
      error.push(content)
    } else {
      success.push(content)
    }
  }
  // console.log({ res, fileCotent })
  return {
    success,
    error,
  }
}

/**
 * 根据文件路径提取tr函数包裹的文本内容
 * @param filepaths 文件路径
 * @returns
 */
export default function extraTrTexts(filepaths: string[]): {
  success: string[] // 正确的列表
  error: string[] // 错误的列表
} {
  let success: string[] = []
  let error: string[] = []
  filepaths.forEach((filepath) => {
    const filecontent = fs.readFileSync(filepath, {
      encoding: 'utf-8',
    })
    const trTextRes = extraTrText(filecontent)
    success.push(...trTextRes.success)
    error.push(...trTextRes.error)
  })

  success = Array.from(new Set(success))
  error = Array.from(new Set(error))

  logSuccess(chalk.greenBright('解析符合要求的国际化文本数:'), success.length)
  logSuccess(chalk.greenBright('解析不符合要求的国际化文本数:'), error.length)

  return {
    success,
    error,
  }
}
