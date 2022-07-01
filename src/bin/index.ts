#! /usr/bin/env node
import extraFileSync from './extra-file'
import { getLocale, logWarning, writeFilesSync } from './utils'
import { LOG_DIR_NAME as logDirname, NON_INCREMENTAL } from './constants'
import extraTrTexts from './extra-text'
import { setTranslateConfig, translateTextsToLangsImpl } from './tranlate'
import { i18n, setI18N } from '../lib/index'
import { initConfig, readConfig } from './config'
import chalk from './chalk'
import extraLangs from './extra-langs'

const path = require('path')
const langs = (() => {
  let langs = {}
  try {
    langs = require('../../i18n/langs.json')
  } catch (error) {
    logWarning(
      chalk.yellowBright('读取多语言聚合语言包失败，采用默认 zh 的语言包'),
      '\n',
    )
  }
  return langs
})()
const packageInfo = require('../../package.json')

async function tranlateControner(props: {
  incrementalMode: boolean // 是否是增量翻译模式
}) {
  const { incrementalMode = true } = props
  const {
    funcName = 'i18n',
    entry,
    fileRegExp = /\.[jt]s$/,
    output: { path: outputPath, langType = 'multiple', indentSize = 2 },
    baiduConfig,
  } = readConfig()

  setTranslateConfig(baiduConfig)

  const filespaths = extraFileSync(entry, fileRegExp)

  if (filespaths.length === 0) {
    console.log(i18n('未解析到需要翻译的文件，本次操作已结束'))
    return
  }

  const trTextRes = extraTrTexts(filespaths, funcName)

  writeFilesSync({
    filepath: path.join(outputPath, logDirname, 'keywords.json'),
    filecontent: trTextRes.success,
    showName: i18n('提取的国际化文本'),
    indentSize,
  })

  if (trTextRes.error.length) {
    writeFilesSync({
      filepath: path.join(outputPath, logDirname, 'keywords-error.json'),
      filecontent: trTextRes.error,
      showName: i18n('提取的编写不规范的国际化文本'),
      indentSize,
    })
  }

  const sourceLangs = extraLangs({
    path: outputPath,
    langType,
    to: baiduConfig.to,
    codeLocaleMap: baiduConfig.codeLocaleMap,
  })

  const tranlateRes = await translateTextsToLangsImpl(
    trTextRes.success,
    sourceLangs,
    incrementalMode,
  )

  const { success, error, langs } = tranlateRes

  writeFilesSync({
    filepath: path.join(outputPath, logDirname, 'translate-success.json'),
    filecontent: success,
    showName: i18n('翻译成功'),
    indentSize,
  })

  writeFilesSync({
    filepath: path.join(outputPath, logDirname, 'translate-error.json'),
    filecontent: error,
    showName: i18n('翻译失败'),
    indentSize,
  })

  writeFilesSync({
    filepath: path.join(
      outputPath,
      langType === 'multiple' ? logDirname : '',
      'langs.json',
    ),
    filecontent: langs,
    showName: i18n('多语言聚合文件'),
    indentSize,
  })

  Object.entries(langs).forEach(([lang, content]) => {
    writeFilesSync({
      filepath: path.join(
        outputPath,
        langType === 'multiple' ? '' : logDirname,
        lang + '.json',
      ),
      filecontent: content as object,
      showName: i18n('语言包 {0} 文件', lang),
      indentSize,
    })
  })
}

const [command, ...args] = process.argv.slice(2)
const locale = getLocale([command, ...args])
setI18N({
  locale,
  langs,
})

switch (command) {
  case 'init':
    initConfig()
    break
  case 'translate':
  case 't':
    tranlateControner({
      incrementalMode: !args.includes(NON_INCREMENTAL),
    })
    break
  case 'v':
  case 'version':
    console.log(
      '\n',
      i18n('当前版本：{0}', chalk.greenBright(packageInfo.version)),
      '\n',
    )
    break
  case 'h':
  case 'help':
    console.log(`
${chalk.redBright('i18n')} <${chalk.greenBright(
      i18n('命令'),
    )}> [${chalk.yellowBright(i18n('参数'))}]


${i18n('用法')}:

i18n  ${chalk.greenBright('init')}                           ${i18n(
      '初始化配置文件',
    )}
i18n  ${chalk.greenBright('t | translate')}                  ${i18n(
      '提取翻译文本，自动翻译并生成语言包',
    )}
i18n  ${chalk.greenBright('v | version')}                    ${i18n(
      '显示版本信息',
    )}
i18n  ${chalk.greenBright('h | help')}                       ${i18n(
      '显示帮助信息',
    )}


${i18n('参数')}:

      ${chalk.yellowBright('-L | --locale')}    zh | en       ${i18n(
      '可选语言有中文（zh）/ 英文（{0}）， 默认为中文（zh）',
      'en',
    )}
      ${chalk.yellowBright(NON_INCREMENTAL)}              ${i18n(
      '非增量翻译模式进行翻译，已翻译的文本会完全被覆盖',
    )}
        `)
    break
  default:
    console.log(`
${chalk.redBright(i18n('输入命令有误:'))}
${i18n('可输入{0}查看帮助信息', chalk.greenBright(' i18n h '))}
    `)
}
