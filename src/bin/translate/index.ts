import { encode } from 'gpt-3-encoder'
import { SEPARATOR_STR } from '../constants'
import { logError } from '../utils'
import {
  InnerConfig,
  Langs,
  MaxLengthConfigMap,
  TranslatorConfig,
  UnionBasicTranslatorConfig,
  UnionTranslatorConfig,
} from '../../type'
import chalk from '../chalk'
import { setBaiduConfig, translateByBaidu } from './baidu'
import { setYoudaoConfig, translateByYoudao } from './youdao'
import { setTencentConfig, translateByTencent } from './tencent'
import { setAliyunConfig, translateByAliyun } from './aliyun'
import { setMicrosoftConfig, translateByMicrosoft } from './microsoft'
import { setGoogleConfig, translateByGoogle } from './google'
import { setOpenAIConfig, translateByOpenAI } from './openai'
import { setGooglexConfig, translateByGooglex } from './googlex'

let config: TranslatorConfig = {
  from: '',
  to: [],
  codeLocaleMap: undefined,
}

// 记录最后一次请求完成的时间戳
let lastRequestTimestamp = 0

// 内部实验性的属性配置
let innerConfig: InnerConfig = {
  maxLengthConfig: {
    maxLengthType: 'allStrLength',
    maxLength: 100000,
  },
}

const translatorImplMap = {
  baidu: translateByBaidu,
  youdao: translateByYoudao,
  tencent: translateByTencent,
  aliyun: translateByAliyun,
  microsoft: translateByMicrosoft,
  google: translateByGoogle,
  googlex: translateByGooglex,
  openai: translateByOpenAI,
}

const translatorSetConfigMap = {
  baidu: setBaiduConfig,
  youdao: setYoudaoConfig,
  tencent: setTencentConfig,
  aliyun: setAliyunConfig,
  microsoft: setMicrosoftConfig,
  google: setGoogleConfig,
  googlex: setGooglexConfig,
  openai: setOpenAIConfig,
}

const maxLengthMap: MaxLengthConfigMap = {
  baidu: {
    maxLengthType: 'allStrLength',
    maxLength: 3000,
    separator: SEPARATOR_STR,
  },
  youdao: {
    maxLengthType: 'allStrLength',
    maxLength: 5000,
  },
  tencent: {
    maxLengthType: 'allStrLength',
    maxLength: 5000,
  },
  aliyun: {
    maxLengthType: 'strLengthAndArrLength',
    maxLength: 1000,
    maxArrayLength: 50,
  },
  microsoft: {
    maxLengthType: 'allStrLengthAndArrLength',
    maxLength: 5000,
    maxArrayLength: 1000,
  },
  google: {
    maxLengthType: 'allStrLength',
    maxLength: 5000,
  },
  googlex: {
    maxLengthType: 'allStrLength',
    maxLength: 5000,
  },
  openai: {
    maxLengthType: 'allTokenLength',
    maxLength: 1000,
    separator: SEPARATOR_STR,
  },
}

let currentTranslatorImpl: typeof translateByBaidu
let currentTranslatorSetConfig: (config: UnionBasicTranslatorConfig) => void

/**
 * 设置翻译配置
 * @param configProp
 */
export function setTranslateConfig(
  configProp: UnionTranslatorConfig,
  innerConfigProp?: InnerConfig,
) {
  const { translator = 'googlex' } = configProp

  if (!Object.keys(translatorImplMap).includes(translator)) {
    logError(
      t(
        '不存在{0}的配置项',
        chalk.yellowBright(` translator = ${translator} `),
      ),
    )
    process.exit(1)
  }

  config = configProp[`${translator}Config`]

  if (typeof config === 'undefined' || Object.keys(config).length == 0) {
    logError(
      t(
        '当前{0}没有配置对应配置内容{1}',
        chalk.yellowBright(` translator = ${translator} `),
        chalk.redBright(` ${translator}Config `),
      ),
    )
    process.exit(1)
  }
  currentTranslatorImpl = translatorImplMap[translator]
  currentTranslatorSetConfig = translatorSetConfigMap[translator]
  currentTranslatorSetConfig(configProp[`${translator}Config`])
  innerConfig = {
    ...innerConfig,
    ...(() => {
      const maxLengthConfig = maxLengthMap[translator]
      if (maxLengthConfig) return { maxLengthConfig }
      return {}
    })(),
    ...(innerConfigProp || {}),
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
  tokens: number // token的长度
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
  const {
    maxLengthConfig: {
      maxLengthType,
      maxLength,
      maxArrayLength,
      separator = '',
    },
  } = innerConfig

  let success = {}
  let error = {}
  let count = 0
  let fromTexts: string[] = []
  let textErrorMsg: Record<string, string[]> = {}
  let tokens = 0

  try {
    for (let i = 0; i < texts.length; i++) {
      const text = texts[i]

      // 限制单个文本的字符长度
      if (
        maxLengthType === 'strLengthAndArrLength' &&
        text.length > maxLength
      ) {
        error[text] = t('当前文案超出最大字符数限制：{0}', maxLength)
        continue
      }

      fromTexts.push(text)
      count += (count === 0 ? 0 : separator.length) + text.length

      if (
        i === texts.length - 1 ||
        // 限制请求总字符串
        (['allStrLength', 'allStrLengthAndArrLength'].includes(maxLengthType) &&
          texts.length - 1 > i &&
          // 多加一个文本超出限制
          count + separator.length + texts[i + 1].length > maxLength) ||
        // 限制数组长度
        (['strLengthAndArrLength', 'allStrLengthAndArrLength'].includes(
          maxLengthType,
        ) &&
          fromTexts.length == maxArrayLength) ||
        (['allTokenLength'].includes(maxLengthType) &&
          texts.length - 1 > i &&
          // 多加一个文本超出限制
          (tokens = encode(fromTexts + texts[i + 1]).length) > maxLength)
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
              t(
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
          tokens,
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
 * @param props
 */
export async function translateTextsToLangsImpl(props: {
  /** 普通的文案 */
  texts: string[]
  /**  自定义key与文案的映射(一对一) */
  keyTextMap: Record<string, string>
  /** 自定义key列表 */
  customKeys: string[]
  /** 已翻译的语言包 */
  langsProp: Langs
  /** 是否增量模式 */
  incrementalMode: boolean
}) {
  const { texts, customKeys, keyTextMap, langsProp, incrementalMode } = props
  const { from, to: tos, codeLocaleMap = {} } = config

  const success = {}
  const error = {}
  const textErrorMsg = {}
  const langs = {}

  // 标识文案即key的key是否存在
  const textIsExist = texts.reduce((res, text) => {
    res[text] = true
    return res
  }, {})

  // 标识自定义key的key是否存在
  const keyIsExist = customKeys.reduce((res, text) => {
    res[text] = true
    return res
  }, {})

  try {
    for (const to of tos) {
      const locale = codeLocaleMap[to] || to
      const lang = langsProp[locale] || {}
      // 自定义key待翻译的文案列表
      const keyToTranslateText = []
      // 自定义key，带翻译的文案和key的映射
      const textKeysMap = {}
      // 文案即key已翻译好的语言包
      const translatedLang = {}
      // 自定义key已翻译好的语言包
      const keyTranslatedLang = {}
      // 自定义key已翻译好的语言包基于文案即key的
      const keyTranslatedLangCopy = {}
      // 文案即key新翻译的语言包
      const translateSuccess = {}
      // 自定义key新翻译的语言包
      const keyTranslateSuccess = {}

      // 用于记录已翻译的语言包
      Object.entries(lang).forEach(([key, translatedText]) => {
        // 增量翻译模式
        if (incrementalMode) {
          // 文案即key的处理，没有内容的需要翻译
          if (textIsExist[key]) {
            // 记录已翻译的语言
            translatedLang[key] = translatedText
          }
        }

        // 自定义key的处理，如果本身存在，不管是不是增量模式都保留
        if (keyIsExist[key]) {
          // 记录已翻译的语言
          keyTranslatedLang[key] = translatedText
        }
      })

      // 文案即key待翻译的文案列表
      // 增量时，翻译没有翻译过的，否则翻译所有的
      const toTranslateText = incrementalMode
        ? texts.reduce((res, key) => {
            const translatedText = lang[key]
            // 判断当前key是否有翻译内容
            if (!translatedText) {
              res.push(key)
            }

            return res
          }, [])
        : [...texts]

      // 增量翻译模式

      // 自定义key的处理
      customKeys.forEach((key) => {
        const translatedText = lang[key]

        // 增量模式下，key本身没有内容或者其文案没有翻译内容需要翻译
        if (incrementalMode) {
          // 判断当前key是否有翻译内容
          if (!translatedText) {
            // 当前自定义key对应的文案
            const text = keyTextMap[key]
            // 当前文案是否有翻译内容
            const translatedText = lang[text]
            if (!translatedText) {
              keyToTranslateText.push(text)
              const keys = textKeysMap[text] || []
              keys.push(key)
              textKeysMap[text] = keys
            } else {
              // 对于自定义key，文案本身有翻译内容，直接复用无需再翻译
              keyTranslatedLangCopy[key] = translatedText
            }
          }
        } else {
          // 非增量模式下，自定义key没有翻译内容的，则需要翻译
          if (!translatedText) {
            // 当前自定义key对应的文案
            const text = keyTextMap[key]
            keyToTranslateText.push(text)
            const keys = textKeysMap[text] || []
            keys.push(key)
            textKeysMap[text] = keys
          }
        }
      })

      // 所有待翻译的文案
      const allToTranslateText = [...keyToTranslateText, ...toTranslateText]

      const res = await translateTextsToLang({
        texts: allToTranslateText,
        from,
        to,
      })

      const {
        success: _success,
        error: _error,
        textErrorMsg: _textErrorMsg,
      } = res

      Object.entries(_success).forEach(([text, target]) => {
        // 文案即key的翻译结果
        if (toTranslateText.includes(text)) {
          translateSuccess[text] = target
        }

        // 自定义key的翻译结果
        if (keyToTranslateText.includes(text)) {
          // 当前文案对应的自定义key的列表
          const keys = textKeysMap[text]
          keys?.forEach((key) => {
            // 记录自定义key的翻译结果
            keyTranslateSuccess[key] = target
          })
        }
      })

      // 记录翻译成功的信息
      mergeTranslateLog(locale, _success, success)

      // 记录翻译失败的信息
      mergeTranslateLog(locale, _error, error)

      // 记录翻译结果不准确的信息
      mergeTranslateLog(locale, _textErrorMsg, textErrorMsg)

      // 合并翻译成功的和原有已翻译的
      langs[locale] = {
        ...keyTranslatedLang, // 自定义key已翻译的
        ...keyTranslatedLangCopy, // 自定义key已翻译的，基于文案即key的
        ...keyTranslateSuccess, // 自定义key新翻译的
        ...translatedLang, // 文案即key已翻译的
        ...translateSuccess, // 文案即key新翻译的
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
