import {
  pluralFormatterRegex,
  commonFormatterRegex,
  invalidPluralFormatterRegex,
  tagFormatterNameMap,
} from './constants'
import { I18nState, Translate } from './type'

export const state = {}

export function getCurrentState(namespace: string) {
  return state[namespace] || {}
}

/**
 * 获取目标正则
 * @param regExp 基础正则
 * @param index 动态参数的起始下标
 * @returns
 */
export function getTargetRegExp(regExp: RegExp, index: number) {
  return new RegExp(
    regExp.source.replace('number', index + ''),
    'i', // NOTE 标记忽略大小写
  )
}

export function defineT(
  t: Translate,
  defineBind: boolean,
  namespace: string,
  locale?: string,
): Translate {
  Object.defineProperty(t, 't', {
    get() {
      const state = getCurrentState(namespace)
      return translateImpl.bind(
        null,
        typeof locale === 'string' ? { ...state, locale } : state,
      )
    },
  })

  if (defineBind) {
    Object.defineProperty(t, 'bind', {
      get() {
        return () => {
          const state = getCurrentState(namespace)
          const newT = (...args) =>
            translateImpl.bind(null, state, null, ...args)
          defineT(newT as Translate, false, namespace)
          return newT
        }
      },
    })
  }

  return t
}

/**
 * 获取基于格式化回调处理后的文本
 * @param props
 * @returns
 */
export function getTextFromFormatter(props: {
  type: 'normal' | 'plural'
  originText: string // 默认待翻译的文案
  matchTagRes: string[] // 正则匹配的结果
  index: number // 动态参数的起始下标
  arg: unknown // 动态参数值
  text: string // 待处理的文案
  state: I18nState // Internationalization state
}): string {
  const { type, originText, matchTagRes, arg, text: textProp, state } = props
  const { locale } = state
  const [, matchTemplate, f, keyword = ''] = matchTagRes
  const formatterName = tagFormatterNameMap[f?.toLocaleLowerCase()]
  const formatter = state[formatterName]
  let text = textProp

  if (typeof formatter !== 'function') {
    console.warn(
      `The dynamic parameter ${matchTemplate} in the translated text ${originText} is not configured with the corresponding format callback ${formatterName}`,
    )

    return text.replace(matchTemplate, `${arg}${keyword}`)
  }

  if (typeof locale === 'undefined') {
    console.warn(
      `The locale is not currently configured and may affect the logic in the format callback ${formatterName}`,
    )
  }

  try {
    const content = formatter({
      locale,
      payload: arg,
      t: defineT(translateImpl.bind(null, state, null), false, state.namespace),
      ...(() => {
        let res = {}
        if (type === 'plural') {
          const newKeyword = keyword?.trim?.()
          res = {
            keyword: newKeyword,
            text: `${arg}${keyword}`,
          }
        }
        return res
      })(),
    })
    text = text.replace(matchTemplate, content)
  } catch (error) {
    text = text.replace(matchTemplate, `${arg}${keyword}`)
    console.error(
      `An error occurred in calling the corresponding format callback ${formatterName} for dynamic parameter ${matchTemplate} in translated text ${originText}. The callback logic needs to be checked. The error message is as follows: `,
      error,
    )
  }

  return text
}

/**
 * translate 函数API的具体实现
 * @param i18nState 当前i18n所有状态
 * @param key key
 * @param text Original text
 * @param args Dynamic parameter
 * @returns
 */
export function translateImpl(
  i18nState: I18nState,
  key: null | string = null,
  text: string,
  ...args: Array<string | number | unknown>
) {
  const { locale, langs, beginIndex = 0 } = i18nState
  const lang = langs?.[locale]
  let originText = text

  key = key === null ? text : key

  if (lang?.[key]) {
    text = lang[key]
    originText = text
  }

  args.forEach((arg, index) => {
    const currentIndex = beginIndex + index
    const currentInvalidPluralFormatterRegex = getTargetRegExp(
      invalidPluralFormatterRegex,
      currentIndex,
    )
    const invalidPluralMatchTagRes = text.match(
      currentInvalidPluralFormatterRegex,
    )

    if (invalidPluralMatchTagRes) {
      console.warn(
        `The plural dynamic parameter ${invalidPluralMatchTagRes[1]} in the translated text ${originText} does not contain the text that needs to be plural, for example: t('I have {p0 apple}')`,
      )
      return
    }

    const currentCommonFormatterRegex = getTargetRegExp(
      commonFormatterRegex,
      currentIndex,
    )
    const currentPluralFormatterRegex = getTargetRegExp(
      pluralFormatterRegex,
      currentIndex,
    )
    const commonMatchTagRes = text.match(currentCommonFormatterRegex)
    const pluralMatchTagRes = text.match(currentPluralFormatterRegex)

    if (!commonMatchTagRes && !pluralMatchTagRes) {
      text = text.replace(`{${currentIndex}}`, `${arg}`)
      return
    }

    text = getTextFromFormatter({
      type: pluralMatchTagRes ? 'plural' : 'normal',
      originText,
      matchTagRes: pluralMatchTagRes || commonMatchTagRes,
      index: currentIndex,
      arg,
      text,
      state: i18nState,
    })
  })

  return text
}
