import { Langs, Config, TranslatorConfig } from '../type'

const fs = require('fs')
const path = require('path')

/**
 * 加载语言包JSON文件
 * @param dirpath
 * @param filename
 * @returns
 */
function requireJsonFile<T extends object>(
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
 * @param props
 */
export default function extraLangs(
  props: Pick<Config['output'], 'langType' | 'path'> &
    Pick<TranslatorConfig, 'to' | 'codeLocaleMap'>,
) {
  let langs: Langs = {}
  const { langType, path: dirpath, to, codeLocaleMap = {} } = props

  if (langType === 'single') {
    langs = requireJsonFile<Langs>(dirpath, 'langs')
  } else {
    to.forEach((langCode) => {
      const locale = codeLocaleMap[langCode] || langCode
      const lang = requireJsonFile<Record<string, string>>(dirpath, locale)
      if (Object.keys(lang).length > 0) {
        langs[locale] = lang
      }
    })
  }

  return langs
}
