#! /usr/bin/env node
import extraFile from './extra-file'
import { getLocale, writeFilesSync } from './utils'
import { LOG_DIR_NAME } from './constants'
import extraTrTexts from './extra-text'
import { setTranslateConfig, translateTextsToLangsImpl } from './tranlate'
import { i18n, setI18N } from '../lib/index'
import { initConfig, readConfig } from './config'
import chalk = require('chalk')

const path = require('path')
const langs = require('../../locale/.log/langs.json')
const packageInfo = require('../../package.json')

async function tranlateControner() {
  const {
    entry,
    filterFile,
    output: { path: outputPath },
    baiduConfig,
    logConfig: { dirname: logDirname } = { dirname: LOG_DIR_NAME },
  } = readConfig()

  setTranslateConfig(baiduConfig)

  const filespaths = await extraFile({
    dirpath: entry,
    filterFile,
  })

  if (filespaths.length === 0) {
    console.log(i18n('未解析到需要翻译的文件，本次操作已结束'))
    return
  }

  const trTextRes = extraTrTexts(filespaths)

  writeFilesSync({
    filepath: path.join(outputPath, logDirname, 'keywords.json'),
    filecontent: trTextRes.success,
    showName: i18n('提取的国际化文本'),
  })

  if (trTextRes.error.length) {
    writeFilesSync({
      filepath: path.join(outputPath, logDirname, 'keywords-error.json'),
      filecontent: trTextRes.error,
      showName: i18n('提取的编写不规范的国际化文本'),
    })
  }

  const tranlateRes = await translateTextsToLangsImpl({
    texts: trTextRes.success,
    from: 'zh',
    tos: ['en'],
  })

  const { success, error, langs } = tranlateRes

  writeFilesSync({
    filepath: path.join(outputPath, logDirname, 'translate-success.json'),
    filecontent: success,
    showName: i18n('翻译成功'),
  })

  writeFilesSync({
    filepath: path.join(outputPath, logDirname, 'translate-error.json'),
    filecontent: error,
    showName: i18n('翻译失败'),
  })

  writeFilesSync({
    filepath: path.join(outputPath, logDirname, 'langs.json'),
    filecontent: langs,
    showName: i18n('多语言聚合文件'),
  })

  Object.entries(langs).forEach(([lang, content]) => {
    writeFilesSync({
      filepath: path.join(outputPath, lang + '.json'),
      filecontent: content as object,
      showName: i18n('语言包 {0} 文件', lang),
    })
  })
}

const [command, ...args] = process.argv.slice(2)
const locale = getLocale(args)
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
    tranlateControner()
    break
  case '--locale':
  case '-L':
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
      '提取翻译文本并生成语言包',
    )}
i18n  ${chalk.greenBright('v | version')}                    ${i18n(
      '显示版本信息',
    )}
i18n  ${chalk.greenBright('h| help')}                        ${i18n(
      '显示帮助信息',
    )}


${i18n('参数')}:

      ${chalk.yellowBright('-L | --locale')}    zh | en       ${i18n(
      '指定命令行显示语言，可选语言有中文(zh)/ 英文(en), 默认为中文(zh)',
    )}
        `)
    break
  default:
    console.log(`
${chalk.redBright(i18n('输入命令有误:'))}
${i18n('可输入{0}查看帮助信息', chalk.greenBright(' i18n -h '))}
    `)
}
