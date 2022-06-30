import { Langs, Config } from '../type'

const fs = require('fs')
const path = require('path')

/**
 * 加载语言包JSON文件
 * @param dirpath
 * @param filename
 * @returns
 */
function requreJsonFile<T extends object>(
  dirpath: string, // 目录路径
  filename: string, // 文件名
): T {
  let res = {} as T

  try {
    const filePath = path.join(dirpath, `${filename}.json`)
    const stat = fs.statSync(filePath)
    if (stat.isFile()) {
      res = require(filePath)
    }
    // eslint-disable-next-line no-empty
  } catch (error) {}

  return res
}

/**
 * 提取已翻译的语言包
 * @param porps
 */
export default function extraLangs(
  porps: Pick<Config['output'], 'langType' | 'path'> &
    Pick<Config['baiduConfig'], 'to' | 'codeLocaleMap'>,
) {
  let langs: Langs = {}
  const { langType, path: dirpath, to, codeLocaleMap = {} } = porps

  if (langType === 'single') {
    langs = requreJsonFile<Langs>(dirpath, 'langs')
  } else {
    to.forEach((langCode) => {
      const lang = requreJsonFile<Record<string, string>>(
        dirpath,
        codeLocaleMap[langCode] || langCode,
      )
      if (Object.keys(lang).length > 0) {
        // NOTE 这里是以语言代码为key
        langs[langCode] = lang
      }
    })
  }

  return langs
}
