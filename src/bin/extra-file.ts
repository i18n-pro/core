import { logError, logSuccess } from './utils'
import chalk from './chalk'
import glob from 'fast-glob'
const path = require('path')
const fs = require('fs')

function logPath(path: string) {
  console.log(chalk.greenBright(t('已录入')), path)
}

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
        logPath(filepath)
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
function extraFileSyncLegacy(dirpath: string, fileRegExp: RegExp) {
  console.log(chalk.greenBright(t('开始解析路径：')), dirpath)
  if (!dirpath || !fileRegExp) {
    logError(
      t('未正确配置{0},{1},{2}等属性', ' entry ', ' fileRegExp ', ' glob '),
    )
    return []
  }

  const filepaths = extraFileSyncImpl(dirpath, fileRegExp)

  return filepaths
}

/**
 * extra files by Glob pattern
 * @param globPattern
 * @param configPath
 * @returns
 */
function extraFileByGlob(globPattern: string | string[], configPath?: string) {
  console.log(
    chalk.greenBright(t('开始解析路径：')),
    configPath || process.cwd(),
  )
  console.log(chalk.greenBright(t('开始解析 Glob 语法：')), globPattern)
  const filepaths = glob.sync(globPattern, {
    onlyFiles: true,
    absolute: true,
    cwd: configPath,
  })

  filepaths.forEach((path) => logPath(path))

  return filepaths
}

export default function extraFileSync(props: {
  entry?: string
  fileRegExp?: RegExp
  input?: string | string[]
  configPath?: string
}) {
  let filepaths = []
  const { entry, fileRegExp, input, configPath } = props

  if (typeof input !== 'undefined') {
    filepaths = extraFileByGlob(input, configPath)
  } else {
    filepaths = extraFileSyncLegacy(entry, fileRegExp)
  }

  logSuccess(
    chalk.greenBright(t('解析符合要求的文件路径数:')),
    filepaths.length,
  )

  return filepaths
}
