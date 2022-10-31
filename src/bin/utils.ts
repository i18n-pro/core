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

  const dirpath = filepath.slice(
    0,
    filepath.lastIndexOf(process.platform === 'win32' ? '\\' : '/'),
  )
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
        // 创建文件夹出错，直接结束
        return
      }
    } else {
      logError(error)
      // 如果是未知异常，这里就应该直接结束了
      return
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

/**
 * 修复翻译文本的可修复问题
 * @param text
 * @returns
 */
export function fixErrorTranslateText(text: string) {
  // 修复动标记态参数中间出现空格
  // 目前发现中文翻译到日文，会出现类似问题
  const res = text.replace(/\{[ncdtp]([ ]+)\d+[^}]*\}/gi, (t, i) => {
    return t.replace(i, '')
  })

  return res
}

/**
 * 获取基础动态参数翻译未匹配错误信息
 * @param src 原文本
 * @param dist 翻译文本
 * @param regExp 动态参数模板正则
 * @returns
 */
function getParamNotEqualMsgs(src: string, dist: string, regExp: RegExp) {
  const srcParams: string[] = src.match(regExp) || []
  const distParams: string[] = dist.match(regExp) || []

  const errorMsg = srcParams.reduce((res, i) => {
    if (!distParams.includes(i)) {
      res.push({
        msg: i18n('已翻译文案中缺少动态参数标识：{0}', i),
        index: i.match(/\d+/)[0],
      })
    }
    return res
  }, [])

  return errorMsg
}

/**
 * 获取复数类型动态参数的错误信息
 * @param src 源文本
 * @param dist 翻译文本
 * @returns
 */
function getPluralParamNotEqualMsgs(src: string, dist: string) {
  const regExp = /\{p\d+[^}]+\}/gi
  const srcParams: string[] = src.match(regExp) || []
  const distParams: string[] = dist.match(regExp) || []

  const errorMsg = srcParams.reduce((res, i) => {
    const index = i.match(/\d+/)[0]

    const isExist = distParams.some((i) =>
      new RegExp(regExp.source.replace('\\d+', index), 'gi').test(i),
    )

    if (!isExist) {
      res.push({
        msg: i18n('已翻译文案中缺少动态参数标识：{0}', i),
        index,
      })
    }
    return res
  }, [])

  return errorMsg
}

/**
 * 获取翻译后，翻译文本动态参数丢失的错误信息
 * @param src 源文本
 * @param dist 翻译文本
 */
export function getParamsNotEqualMsgs(src: string, dist: string) {
  // 普通动态参数
  const paramsMsgs = getParamNotEqualMsgs(src, dist, /\{\d+\}/g)
  // 普通标记类型的动态参数
  const tagParamsMsgs = getParamNotEqualMsgs(src, dist, /\{[ncdt]\d+\}/gi)
  // 复数标记类型的动态参数
  const pluralParams = getPluralParamNotEqualMsgs(src, dist)

  const res = [...paramsMsgs, ...tagParamsMsgs, ...pluralParams]
    .sort((a, b) => a.index - b.index)
    .map((i) => i.msg)

  return res
}

/**
 * 将命令参数转换成对象
 * @param args
 * @returns
 */
export function transferArgsToObj(
  args: string[],
): Record<string, string | boolean> {
  const isArgName = (value: string) =>
    value?.startsWith('-') || value?.startsWith('--')

  const res = args.reduce((res, item, index) => {
    if (isArgName(item)) {
      if (index === args.length - 1 || isArgName(args[index + 1])) {
        res[item] = true
      } else {
        res[item] = args[index + 1]
      }
    }
    return res
  }, {})

  return res
}
