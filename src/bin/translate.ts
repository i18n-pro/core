import {
  BAI_DU_MAX_LENGTH,
  SEPARATOR_STR,
  TRANSLATE_ERROR_TEXT,
} from './constants'
import { logError, logSuccess } from './utils'
import { Config, Langs } from '../type'
import fetch from './fetch'
import chalk, { STYLE_EOF } from './chalk'

const md5 = require('md5-node')
const url = require('url')

const config: Config['baiduConfig'] = {
  appid: '',
  key: '',
  from: '',
  to: [],
  delay: 0,
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

  const translateText = texts.join(SEPARATOR_STR)
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

  let res

  try {
    res = await fetch('http://api.fanyi.baidu.com/api/trans/vip/translate', {
      method: 'POST',
      data: new url.URLSearchParams(body).toString(),
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
      },
    })

    if (res.error_code) {
      const errorTextMap = {
        52003: i18n('appid 配置不正确'),
        54001: i18n('key 配置不正确'),
        54003: i18n(
          '多个人同时使用了同一个APPID的执行翻译，建议注册个人账号来使用或者调整配置项{0}(具体可参考配置项文档说明)',
          'baiduConfig.delay',
        ),
      }
      let errorText = errorTextMap[res.error_code]
      errorText = errorText
        ? i18n('可能原因是: {0}', chalk.redBright(errorText))
        : ''
      throw `${chalk.redBright(i18n('百度翻译接口返回错误'))}：
      ${i18n('错误码')}：${res.error_code}
      ${i18n('错误信息')}：${res.error_msg}
      ${i18n(
        '可根据错误码在 {0} 该文档中查看错误具体原因',
        chalk.blueBright.underline('http://api.fanyi.baidu.com/doc/21'),
      )}
      ${errorText}
      `
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
            '{0}({1}{2}{3})：{4}{5}{6}',
            chalk.greenBright(i18n('翻译成功')),
            chalk.redBright.italic(from),
            chalk.bold.greenBright(' → '),
            chalk.redBright.italic(to),
            text,
            chalk.bold.greenBright(' → '),
            dst,
          ),
        )
      } else {
        error[text] = i18n('当前文本【{0}】未被翻译', text)
      }
    })
  } catch (e) {
    logError(e)

    if (res?.error_code && ['52003', '54001'].includes(res.error_code)) {
      process.exit(1)
    }

    let currentErrorText = e || TRANSLATE_ERROR_TEXT

    if (res?.error_code) {
      currentErrorText = e
        ?.replaceAll('\n', '')
        ?.replaceAll(STYLE_EOF, '')
        ?.replaceAll(chalk.redBright().replace(STYLE_EOF, ''), '')
        ?.replaceAll(chalk.blueBright.underline().replace(STYLE_EOF, ''), '')
    }

    texts.forEach((text) => {
      error[text] = currentErrorText
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
  const { delay } = config

  let success = {}
  let error = {}
  let count = 0
  let fromTexts: string[] = []

  try {
    for (let i = 0; i < texts.length; i++) {
      const t = texts[i]
      fromTexts.push(t)
      count += (count === 0 ? 0 : SEPARATOR_STR.length) + t.length

      if (
        i === texts.length - 1 || // 最后一个
        // 加上后面一个字符会超过最大字符
        (texts.length - 1 > i &&
          count + SEPARATOR_STR.length + texts[i + 1].length >
            BAI_DU_MAX_LENGTH)
      ) {
        if (
          // 非第一次请求，才开始延迟
          (Object.keys(success).length != 0 ||
            Object.keys(error).length != 0) &&
          typeof delay === 'number' &&
          delay > 0
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
 * 合并翻译的结果用于日志输出
 * @param langCode 语言编码
 * @param textResMap 文本翻译结果
 * @param logTarget 日志输出对象
 */
function mergeTranslateLog(
  langCode: string,
  textResMap: Record<string, string>,
  logTarget: Record<string, Record<string, string>>,
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

      const { success: _success, error: _error } = res

      // 记录翻译成功的信息
      mergeTranslateLog(locale, _success, success)

      // 记录翻译失败的信息
      mergeTranslateLog(locale, _error, error)

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
  }
}
