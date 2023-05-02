#! /usr/bin/env node
import extraFileSync from './extra-file'
import {
  getLocale,
  getTransResultLength,
  logWarning,
  transferArgsToObj,
  writeFilesSync,
} from './utils'
import {
  LOG_DIR_NAME as logDirname,
  NON_INCREMENTAL,
  RELATIVE_PATH,
} from './constants'
import extraTexts from './extra-text'
import {
  getTranslateConfig,
  setTranslateConfig,
  translateTextsToLangsImpl,
} from './translate/index'
import { t, setI18n } from './i18n'
import { initConfig, readConfig } from './config'
import chalk from './chalk'
import extraLangs from './extra-langs'

const path = require('path')
const langs = (() => {
  let langs = {}
  try {
    langs = require(RELATIVE_PATH + 'i18n/langs.json')
  } catch (error) {
    logWarning(
      chalk.yellowBright('读取多语言聚合语言包失败，采用默认 zh 的语言包'),
      '\n',
    )
  }
  return langs
})()
const packageInfo = require(RELATIVE_PATH + 'package.json')

async function translateController({
  incrementalMode,
  configPath,
}: {
  incrementalMode: boolean // 是否是增量翻译模式
  configPath?: string // 配置文件路径
}) {
  const {
    funcName = 't',
    entry,
    fileRegExp = /\.[jt]s$/,
    output: { path: outputPath, langType = 'multiple', indentSize = 2 },
    ...restTranslatorConfig
  } = readConfig({
    path: configPath,
  })

  setTranslateConfig(restTranslatorConfig)

  const filepaths = extraFileSync(entry, fileRegExp)

  if (filepaths.length === 0) {
    console.log(t('未解析到需要翻译的文件，本次操作已结束'))
    return
  }

  const trTextRes = extraTexts(filepaths, funcName)

  const translateConfig = getTranslateConfig()

  const sourceLangs = extraLangs({
    path: outputPath,
    langType,
    to: translateConfig.to,
    codeLocaleMap: translateConfig.codeLocaleMap,
  })

  const translateRes = await translateTextsToLangsImpl(
    trTextRes.success,
    sourceLangs,
    incrementalMode,
  )

  const { success, error, langs, textErrorMsg } = translateRes

  writeFilesSync({
    filepath: path.join(outputPath, logDirname, 'filepaths.json'),
    fileContent: filepaths,
    showName: t(
      '匹配到的文件路径列表({0})',
      chalk.greenBright(filepaths.length),
    ),
    indentSize,
  })

  writeFilesSync({
    filepath: path.join(outputPath, logDirname, 'texts.json'),
    fileContent: trTextRes.success,
    showName: t(
      '提取的国际化文本({0})',
      chalk.greenBright(trTextRes.success.length),
    ),
    indentSize,
  })

  writeFilesSync({
    filepath: path.join(outputPath, logDirname, 'texts-error.json'),
    fileContent: trTextRes.error,
    showName: t(
      '提取的编写不规范的国际化文本({0})',
      chalk.redBright(trTextRes.error.length),
    ),
    indentSize,
  })

  writeFilesSync({
    filepath: path.join(outputPath, logDirname, 'translate-success.json'),
    fileContent: success,
    showName: t(
      '翻译成功({0})',
      chalk.greenBright(getTransResultLength(success)),
    ),
    indentSize,
  })

  writeFilesSync({
    filepath: path.join(outputPath, logDirname, 'translate-fail.json'),
    fileContent: error,
    showName: t('翻译失败({0})', chalk.redBright(getTransResultLength(error))),
    indentSize,
  })

  writeFilesSync({
    filepath: path.join(outputPath, logDirname, 'translate-error.json'),
    fileContent: textErrorMsg,
    showName: t(
      '翻译有误({0})',
      chalk.redBright(getTransResultLength(textErrorMsg)),
    ),
    indentSize,
  })

  writeFilesSync({
    filepath: path.join(
      outputPath,
      langType === 'multiple' ? logDirname : '',
      'langs.json',
    ),
    fileContent: langs,
    showName: t(
      '多语言聚合文件({0})',
      chalk.greenBright(getTransResultLength(langs)),
    ),
    indentSize,
  })

  Object.entries(langs).forEach(([lang, content]) => {
    writeFilesSync({
      filepath: path.join(
        outputPath,
        langType === 'multiple' ? '' : logDirname,
        lang + '.json',
      ),
      fileContent: content as object,
      showName: t(
        '语言包 {0} 文件({1})',
        lang,
        chalk.greenBright(Object.keys(content).length),
      ),
      indentSize,
    })
  })
}

export async function execCommand() {
  const [command, ...args] = process.argv.slice(2)
  const locale = getLocale([command, ...args])
  const argObj = transferArgsToObj(args)
  const configPath = (argObj['--path'] || argObj['-P']) as string

  setI18n({
    locale,
    langs,
  })

  switch (command) {
    case 'init':
      initConfig(configPath)
      break
    case 'translate':
    case 't':
      {
        const label = chalk.yellowBright(t('共耗时'))
        console.time(label)
        await translateController({
          incrementalMode: !args.includes(NON_INCREMENTAL),
          configPath,
        })
        console.timeLog(label)
      }
      break
    case 'v':
    case 'version':
      console.log(
        '\n',
        t('当前版本：{0}', chalk.greenBright(packageInfo.version)),
        '\n',
      )
      break
    case 'h':
    case 'help':
      console.log(`
  ${chalk.redBright('i18n')} <${chalk.greenBright(
        t('命令'),
      )}> [${chalk.yellowBright(t('参数'))}]


  ${t('用法')}:

  i18n  ${chalk.greenBright('init')}                           ${t(
        '初始化配置文件',
      )}
  i18n  ${chalk.greenBright('t | translate')}                  ${t(
        '提取翻译文本，自动翻译并生成语言包',
      )}
  i18n  ${chalk.greenBright('v | version')}                    ${t(
        '显示版本信息',
      )}
  i18n  ${chalk.greenBright('h | help')}                       ${t(
        '显示帮助信息',
      )}


  ${t('参数')}:

        ${chalk.yellowBright('-L | --locale')}    zh | en       ${t(
        '可选语言有中文（zh）/ 英文（{0}）， 默认为英文（en）',
        'en',
      )}
        ${chalk.yellowBright(NON_INCREMENTAL)}              ${t(
        '非增量翻译模式进行翻译，已翻译的文本会完全被覆盖',
      )}
        ${chalk.yellowBright('-P | --path')}                    ${t(
        '指定配置文件路径（参数为绝对路径）',
      )}
          `)
      break
    default:
      console.log(`
  ${chalk.redBright(t('输入命令有误:'))}
  ${t('可输入{0}查看帮助信息', chalk.greenBright(' i18n h '))}
      `)
  }
}

if (!process.env.NODE_ENV) {
  execCommand()
}
