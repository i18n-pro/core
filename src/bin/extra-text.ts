import { i18n } from '../lib'
import { logSuccess } from './utils'
import chalk from './chalk'

const fs = require('fs')

/**
 * 基于文本解析出tr函数包裹的内容
 * @param fileCotent
 * @param funcName 获取国际化文本的函数名
 */
export function extraTrText(
  fileCotent: string,
  funcName,
): {
  success: string[] // 正确的列表
  error: string[] // 错误的列表
} {
  const regexp = new RegExp(
    /\WfuncName\(\n*[ ]*((['"`])(.+?)\2),?\W/.source.replace(
      'funcName',
      funcName,
    ),
    'g',
  )
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
export default function extraTrTexts(
  filepaths: string[],
  funcName = 'i18n',
): {
  success: string[] // 正确的列表
  error: string[] // 错误的列表
} {
  let success: string[] = []
  let error: string[] = []
  filepaths.forEach((filepath) => {
    const filecontent = fs.readFileSync(filepath, {
      encoding: 'utf-8',
    })
    const trTextRes = extraTrText(filecontent, funcName)
    success.push(...trTextRes.success)
    error.push(...trTextRes.error)
  })

  success = Array.from(new Set(success))
  error = Array.from(new Set(error))

  logSuccess(
    chalk.greenBright(i18n('解析符合要求的国际化文本数:')),
    success.length,
  )
  logSuccess(
    chalk.greenBright(i18n('解析不符合要求的国际化文本数:')),
    error.length,
  )

  return {
    success,
    error,
  }
}
