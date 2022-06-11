#! /usr/bin/env node
import extraFile from './extra-file'
import { getLocale, writeFilesSync } from './utils'
import { LOG_DIR_NAME } from './constants'
import extraTrTexts from './extra-text'
import { i18n } from '../lib/index'
import { setTranslateConfig, translateTextsToLangsImpl } from './tranlate'
import { initConfig, readConfig } from './config'
import { setI18N } from '../lib/index'

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
    console.log('没有解析到需要翻译的文件，本次操作已结束')
    return
  }

  const trTextRes: any = extraTrTexts(filespaths)

  writeFilesSync({
    filepath: path.join(outputPath, logDirname, 'keywords.json'),
    filecontent: trTextRes.success,
    showName: '提取的国际化文本',
  })

  if (trTextRes.error.length) {
    writeFilesSync({
      filepath: path.join(outputPath, logDirname, 'keywords-error.json'),
      filecontent: trTextRes.error,
      showName: '提取的错误配置国际化文本',
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
    showName: '翻译成功',
  })

  writeFilesSync({
    filepath: path.join(outputPath, logDirname, 'translate-error.json'),
    filecontent: error,
    showName: '翻译失败',
  })

  writeFilesSync({
    filepath: path.join(outputPath, logDirname, 'langs.json'),
    filecontent: langs,
    showName: '多语言聚合文件',
  })

  Object.entries(langs).forEach(([lang, content]) => {
    writeFilesSync({
      filepath: path.join(outputPath, lang + '.json'),
      filecontent: content as object,
      showName: `语言包 ${lang} 文件`,
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
  case '-T':
    tranlateControner()
    break
  case 'locale':
  case 'l':
  case '-L':
    break
  case 'v':
  case '-v':
  case 'version':
  case '--version':
    console.log(
      '\n',
      i18n('当前版本：{0}', chalk.greenBright(packageInfo.version)),
      '\n',
    )
    break
  case '-h':
  case 'h':
  case 'help':
  case '--help':
    console.log(`
i18n <${i18n('命令')}> [${i18n('参数')}]

${i18n('用法')}:

i18n  ${chalk.greenBright('init')}                                   ${i18n(
      '初始化配置文件',
    )}
i18n  ${chalk.greenBright('t | -t | -T | translate')}                ${i18n(
      '提取翻译文本并生成语言包',
    )}
i18n  ${chalk.greenBright('v | -v | version | --version')}           ${i18n(
      '显示版本信息',
    )}
i18n  ${chalk.greenBright('h | -h | help | --help')}                 ${i18n(
      '显示帮助信息',
    )}

${i18n('参数')}:
      ${chalk.greenBright('-l | -L | --locale')}    zh | en          ${i18n(
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
