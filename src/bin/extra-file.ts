import { logSuccess } from './utils'
import chalk from './chalk'

const path = require('path')
const fs = require('fs')

/**
 * 提取文件路径入口
 * @param dirpath 文件目录路径
 * @param fileRegExp 文件匹配正则
 * @returns
 */
function extraFileSyncImpl(dirpath: string, fileRegExp: RegExp) {
  const filepaths: string[] = []
  const filenames: string[] = fs.readdirSync(dirpath)
  filenames.forEach((filename) => {
    const filepath = path.join(dirpath, filename)
    const stats = fs.statSync(filepath)
    if (stats.isDirectory()) {
      filepaths.push(...extraFileSyncImpl(filepath, fileRegExp))
    } else {
      if (fileRegExp.test(filename)) {
        filepaths.push(filepath)
        console.log(chalk.greenBright(t('已录入')), filepath)
      }
    }
  })
  return filepaths
}

/**
 * 提取文件路径入口
 * @param dirpath 文件目录路径
 * @param fileRegExp 文件匹配正则
 * @returns
 */
export default function extraFileSync(dirpath: string, fileRegExp: RegExp) {
  console.log(chalk.greenBright(t('开始解析路径：')), dirpath)

  const filepaths = extraFileSyncImpl(dirpath, fileRegExp)

  logSuccess(
    chalk.greenBright(t('解析符合要求的文件路径数:')),
    filepaths.length,
  )

  return filepaths
}
