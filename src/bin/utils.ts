import fs from 'fs'
import chalk from './chalk'

/**
 * 日志输出函数的默认实现
 * @param rest
 * @returns
 */
function log(...rest: Array<string | number>) {
  return console.log(...rest)
}

// 公共的操作成功的日志输出方法
export const logSuccess = log.bind(null, '✅')

// 公共的操作失败的日志输出方法
export const logError = log.bind(null, '❌')

// 公共的操作警告的日志输出方法
export const logWarning = log.bind(null, '⚠️')

// 同步写入文本内容到指定文件
export function writeFilesSync(props: {
  filepath: string // 文件路径
  fileContent: string[] | object // 文件内容
  showName: string // 文本名称
  indentSize: number // 缩进大小
}) {
  const { filepath, fileContent, showName, indentSize } = props

  const dirpath = filepath.slice(0, filepath.lastIndexOf('/'))
  try {
    // 先检查当前文件夹是否存在
    fs.statSync(dirpath)
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
    fs.writeFileSync(filepath, JSON.stringify(fileContent, null, indentSize))
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
