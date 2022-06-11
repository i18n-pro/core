#! /usr/bin/env node
import extraFile from './extra-file'
import { writeFilesSync } from './utils'
import { LOG_DIR_NAME } from './constants'
import extraTrTexts from './extra-text'
import { setTranslateConfig, translateTextsToLangsImpl } from './tranlate'
import { initConfig, readConfig } from './config'

const path = require('path')

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
    tos: ['en', 'jp'],
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

switch (command) {
  case 'init':
    initConfig()
    break
  case 'translate':
  case '-T':
    tranlateControner()
    break
  default:
    console.log(`请输入正确的命令：`)
}
