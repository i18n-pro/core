import {
  BAI_DU_MAX_LEGNTH,
  SPERATOR_STR,
  TRANSLATE_ERROR_TEXT,
} from './constants'
import { set } from 'lodash'
import { logError, logSuccess } from './utils'
import { Config } from '../type'
import { i18n } from '../lib'

const chalk = require('chalk')
const md5 = require('md5-node')
const got = require('got')

const config: Config['baiduConfig'] = {
  appid: '',
  key: '',
  from: '',
  to: [],
}

/**
 * 设置翻译配置
 * @param configProp
 */
export function setTranslateConfig(configProp: Config['baiduConfig']) {
  Object.entries(configProp).forEach(([key, value]) => {
    config[key] = value
  })
}

/**
 * 翻译多个文本到单个语言的具体实现
 */
async function translateTextsToLangImpl(props: {
  texts: string[] // 需要翻译的文本内容
  from: string // 被翻译内容的默认语言
  to: string // 需要翻译到其他语言
}) {
  const { texts, from, to } = props
  const { appid, key } = config

  const translateText = texts.join(SPERATOR_STR)
  const success: Record<string, string> = {}
  const error: Record<string, string> = {}

  const q = translateText
  const salt = Date.now()
  const sign = md5(`${appid}${q}${salt}${key}`)

  const body = {
    q,
    from: from,
    to: to,
    appid,
    salt,
    sign,
  }

  try {
    const res = await got
      .post('http://api.fanyi.baidu.com/api/trans/vip/translate', {
        form: body,
      })
      .json()

    if (res.error_code) {
      throw `${chalk.red(i18n('翻译接口返回错误'))}：
      ${i18n('错误码')}：${res.error_code}
      ${i18n('错误信息')}：${res.error_msg}
      ${i18n(
        '可根据错误码在 {0} 该文档中查看错误具体原因',
        chalk.blueBright.underline('http://api.fanyi.baidu.com/doc/21'),
      )}`
    }

    const resMap = res?.trans_result?.reduce?.((res, item) => {
      const { src, dst } = item
      res[src] = dst

      return res
    }, {})

    texts.forEach((text) => {
      const dst = resMap[text]
      if (typeof dst !== 'undefined') {
        success[text] = dst
        logSuccess(
          i18n(
            '翻译成功({0}{1}{2})：{3}{4}{5}',
            chalk.redBright.italic(from),
            chalk.greenBright(' → '),
            chalk.redBright.italic(to),
            chalk.greenBright(text),
            chalk.redBright(' → '),
            chalk.greenBright(dst),
          ),
        )
      } else {
        error[text] = TRANSLATE_ERROR_TEXT
      }
    })
  } catch (e) {
    logError(e)
    texts.forEach((text) => {
      error[text] = TRANSLATE_ERROR_TEXT
    })
  }

  return {
    success,
    error,
  }
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

  let success = {}
  let error = {}
  let count = 0
  let fromTexts: string[] = []

  try {
    for (let i = 0; i < texts.length; i++) {
      const t = texts[i]
      fromTexts.push(t)
      count += (count === 0 ? 0 : SPERATOR_STR.length) + t.length

      if (
        i === texts.length - 1 || // 最后一个
        // 加上后面一个字符会超过最大字符
        (texts.length - 1 > i &&
          count + SPERATOR_STR.length + texts[i + 1].length > BAI_DU_MAX_LEGNTH)
      ) {
        const res = await translateTextsToLangImpl({
          texts: fromTexts,
          from,
          to,
        })
        const { success: _success, error: _error } = res
        success = {
          ...success,
          ..._success,
        }

        error = {
          ...error,
          ..._error,
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
  }
}

/**
 * 翻译多个文本到多个语言
 * @param texts 需要翻译的文本内容
 * @returns
 */
export async function translateTextsToLangsImpl(texts: string[]) {
  const { from, to: tos, codeLocaleMap = {} } = config

  const success = {}
  const error = {}
  const langs = {}
  try {
    for (const to of tos) {
      const locale = codeLocaleMap[to] || to

      const res = await translateTextsToLang({
        texts,
        from,
        to,
      })

      const { success: _success, error: _error } = res
      Object.entries(_success).forEach(([text, target]) => {
        set(success, `${text}.${locale}`, target)
      })
      Object.entries(_error).forEach(([text, target]) => {
        set(error, `${text}.${locale}`, target)
      })

      langs[locale] = _success
    }
  } catch (error) {
    logError(error)
  }

  return {
    success,
    error,
    langs,
  }
}
