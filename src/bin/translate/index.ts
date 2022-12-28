import {
  BAI_DU_MAX_LENGTH,
  SEPARATOR_STR,
  YOU_DAO_MAX_LENGTH,
} from '../constants'
import { logError } from '../utils'
import { Config, Langs, TranslatorConfig } from '../../type'
import chalk from '../chalk'
import { setBaiduConfig, translateByBaidu } from './baidu'
import { setYoudaoConfig, translateByYoudao } from './youdao'

let config: TranslatorConfig = {
  from: '',
  to: [],
  codeLocaleMap: undefined,
}

// 记录最后一次请求完成的时间戳
let lastRequestTimestamp = 0

// 内部实验性的属性配置
let innerConfig = {
  maxStringLength: BAI_DU_MAX_LENGTH,
}

const translatorImplMap = {
  baidu: translateByBaidu,
  youdao: translateByYoudao,
}

const translatorSetConfigMap = {
  baidu: setBaiduConfig,
  youdao: setYoudaoConfig,
}

const translatorMaxStringLengthMap = {
  baidu: BAI_DU_MAX_LENGTH,
  youdao: YOU_DAO_MAX_LENGTH,
}

let currentTranslatorImpl: typeof translateByBaidu
let currentTranslatorSetConfig: (
  config: Config['baiduConfig'] | Config['youdaoConfig'],
) => void

/**
 * 设置翻译配置
 * @param configProp
 */
export function setTranslateConfig(
  configProp: Pick<Config, 'translator' | 'baiduConfig' | 'youdaoConfig'>,
  innerConfigProp = {
    maxStringLength: 1000000,
  },
) {
  const { translator = 'baidu' } = configProp

  if (!Object.keys(translatorImplMap).includes(translator)) {
    logError(i18n('不存在 {0} 的配置项', `translator = ${translator}`))
    process.exit(1)
  }

  config = configProp[`${translator}Config`]
  currentTranslatorImpl = translatorImplMap[translator]
  currentTranslatorSetConfig = translatorSetConfigMap[translator]
  currentTranslatorSetConfig(configProp[`${translator}Config`])
  innerConfig = {
    ...innerConfigProp,
    ...(() => {
      const maxStringLength = translatorMaxStringLengthMap[translator]
      if (maxStringLength) return { maxStringLength }
      return {}
    })(),
  }
}

/**
 * 获取当前翻译配置
 * @returns
 */
export function getTranslateConfig() {
  return config
}

/**
 * 翻译多个文本到单个语言的具体实现
 */
async function translateTextsToLangImpl(props: {
  texts: string[] // 需要翻译的文本内容
  from: string // 被翻译内容的默认语言
  to: string // 需要翻译到其他语言
}) {
  const res = await currentTranslatorImpl(props)

  return res
}

/**
 * 翻译多个文本到单个语言
 */
async function translateTextsToLang(props: {
  texts: string[] // 需要翻译的文本内容
  from: string // 被翻译内容的默认语言
  to: string // 需要翻译到其他语言
}) {
  const { texts, from, to } = props
  const { delay } = config
  const { maxStringLength } = innerConfig

  let success = {}
  let error = {}
  let count = 0
  let fromTexts: string[] = []
  let textErrorMsg: Record<string, string[]> = {}

  try {
    for (let i = 0; i < texts.length; i++) {
      const t = texts[i]
      fromTexts.push(t)
      count += (count === 0 ? 0 : SEPARATOR_STR.length) + t.length

      if (
        i === texts.length - 1 || // 最后一个
        // 加上后面一个字符会超过最大字符
        (texts.length - 1 > i &&
          count + SEPARATOR_STR.length + texts[i + 1].length > maxStringLength)
      ) {
        if (
          typeof delay === 'number' &&
          delay > 0 &&
          delay * 1000 > Date.now() - lastRequestTimestamp
        ) {
          const now = Date.now()
          let last = 0
          const prefix = '\u001b[100D'
          while ((last = Date.now() - now) < delay * 1000) {
            process.stdout.write(
              i18n(
                '{0}秒后将进行下一波翻译',
                chalk.redBright(Math.ceil((delay * 1000 - last) / 1000)),
              ) + prefix,
            )
          }
          process.stdout.write(prefix)
        }
        const res = await translateTextsToLangImpl({
          texts: fromTexts,
          from,
          to,
        })
        lastRequestTimestamp = Date.now()
        const {
          success: _success,
          error: _error,
          textErrorMsg: _textErrorMsg,
        } = res
        success = {
          ...success,
          ..._success,
        }

        error = {
          ...error,
          ..._error,
        }

        textErrorMsg = {
          ..._textErrorMsg,
        }

        fromTexts = []
        count = 0
      }
    }
  } catch (error) {
    logError(error)
  }

  return {
    success,
    error,
    textErrorMsg,
  }
}

/**
 * 合并翻译的结果用于日志输出
 * @param langCode 语言编码
 * @param textResMap 文本翻译结果
 * @param logTarget 日志输出对象
 */
function mergeTranslateLog(
  langCode: string,
  textResMap: Record<string, string | string[]>,
  logTarget: Record<string, Record<string, string | string[]>>,
) {
  Object.entries(textResMap).forEach(([text, target]) => {
    // NOTE 这里弃用lodash的set方法，因为字符中可能存在“.”，会导致结果异常
    logTarget[text] = {
      ...(logTarget[text] || {}),
      [langCode]: target,
    }
  })
}

/**
 * 翻译多个文本到多个语言
 * @param texts 需要翻译的文本内容
 * @param langsProp 已翻译的语言包
 * @param incrementalMode 是否增量模式
 * @returns
 */
export async function translateTextsToLangsImpl(
  texts: string[],
  langsProp: Langs,
  incrementalMode: boolean,
) {
  const { from, to: tos, codeLocaleMap = {} } = config

  const success = {}
  const error = {}
  const textErrorMsg = {}
  const langs = {}
  const textsMap = incrementalMode
    ? texts.reduce((res, item) => {
        res[item] = true
        return res
      }, {})
    : {}

  try {
    for (const to of tos) {
      const locale = codeLocaleMap[to] || to
      const lang = langsProp[to] || {}
      // 过滤已翻译的字段
      const filterTexts = incrementalMode
        ? texts.filter((text) => !lang[text])
        : texts
      // 根据最新的文本，过滤已翻译中被移除的字段
      const filterLang = incrementalMode
        ? Object.entries(lang).reduce((res, [text, target]) => {
            if (textsMap[text]) {
              res[text] = target
            }
            return res
          }, {})
        : {}

      const res = await translateTextsToLang({
        texts: filterTexts,
        from,
        to,
      })

      const {
        success: _success,
        error: _error,
        textErrorMsg: _textErrorMsg,
      } = res

      // 记录翻译成功的信息
      mergeTranslateLog(locale, _success, success)

      // 记录翻译失败的信息
      mergeTranslateLog(locale, _error, error)

      // 记录翻译结果不准确的信息
      mergeTranslateLog(locale, _textErrorMsg, textErrorMsg)

      // 合并翻译成功的和原有已翻译的
      langs[locale] = {
        ...filterLang,
        ..._success,
      }
    }
  } catch (error) {
    logError(error)
  }

  return {
    success,
    error,
    langs,
    textErrorMsg,
  }
}
