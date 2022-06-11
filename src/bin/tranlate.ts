import {
  BAI_DU_MAX_LEGNTH,
  SPERATOR_STR,
  TRANSLATE_ERROR_TEXT,
} from './constants'
import { set } from 'lodash'
import { logError, logSuccess } from './utils'
import { Config } from '../type'
import chalk = require('chalk')
const md5 = require('md5-node')
const got = require('got')

const config = {
  appid: '',
  key: '',
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
      throw `${chalk.red('翻译接口返回错误')}：
      错误码：${res.error_code}
      错误信息：${res.error_msg}
      可根据错误码在 ${chalk.blueBright.underline(
        'http://api.fanyi.baidu.com/doc/21',
      )} 该文档中查看错误具体原因`
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
          `成功将 ${chalk.greenBright(text)} 从语言${chalk.redBright.italic(
            from,
          )} 翻译到语言${chalk.redBright.italic(
            to,
          )} 的内容为：${chalk.greenBright(dst)}`,
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
 */
export async function translateTextsToLangsImpl(props: {
  texts: string[] // 需要翻译的文本内容
  from: string // 被翻译内容的默认语言
  tos: string[] // 需要翻译到其他语言
}) {
  const { texts, from, tos } = props

  const success = {}
  const error = {}
  const langs = {}
  try {
    for (const to of tos) {
      const res = await translateTextsToLang({
        texts,
        from,
        to,
      })

      const { success: _success, error: _error } = res
      Object.entries(_success).forEach(([text, target]) => {
        set(success, `${text}.${to}`, target)
      })
      Object.entries(_error).forEach(([text, target]) => {
        set(error, `${text}.${to}`, target)
      })

      langs[to] = _success
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
