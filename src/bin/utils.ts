import chalk from './chalk'
import { i18n } from '../lib'

const fs = require('fs')

/**
 *  公共的操作成功的日志输出方法
 * @param rest
 */
export function logSuccess(...rest: string[] | number[]) {
  console.log('✅', ...rest)
}

/**
 * 公共的操作失败的日志输出方法
 * @param rest
 */
export function logError(...rest: string[] | number[]) {
  console.log('❌', ...rest)
}

// 同步写入文本内容到指定文件
export function writeFilesSync(props: {
  filepath: string // 文件路径
  filecontent: string[] | object // 文件内容
  showName: string // 文本名称
}) {
  const { filepath, filecontent, showName } = props

  const dirpath = filepath.slice(0, filepath.lastIndexOf('/'))
  try {
    // 先检查当前文件夹是否存在
    const fileStat = fs.statSync(dirpath)
  } catch (error) {
    if (error?.message?.includes?.('no such file or directory')) {
      try {
        fs.mkdirSync(dirpath, {
          recursive: true,
        })
        logSuccess(
          i18n(
            `检测到指定目录 {0} 不存在，已创建该目录`,
            chalk.greenBright(dirpath),
          ),
        )
      } catch (error) {
        logError(error)
      }
    } else {
      logError(error)
    }
  }

  try {
    fs.writeFileSync(filepath, JSON.stringify(filecontent, null, 2))
    logSuccess(
      i18n(
        `已将 {0} 写入到 {1} 中`,
        showName,
        chalk.blueBright.underline.italic(filepath),
      ),
    )
  } catch (error) {
    logError(error)
  }
}

/**
 * 从命令行行参数中获取指定语言
 * @param args 命令行参数
 * @returns
 */
export function getLocale(args: string[]) {
  let locale = 'zh'
  args.some((arg, index) => {
    if (
      (arg === '-L' || arg === '--locale') &&
      ['zh', 'en'].includes(args[index + 1])
    ) {
      locale = args[index + 1]
      return true
    }
  })
  return locale
}
