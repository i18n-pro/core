import {
  pluralFormatterRegex,
  commonFormatterRegex,
  invalidPluralFormatterRegex,
  tagFormatterNameMap,
} from './constants'
import { Condition, I18nState, Translate } from './type'

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

/**
 * 定义 t 函数的属性
 * @param t
 * @param condition
 * @returns
 */
export function defineTranslateProperties(
  t: Translate,
  condition: Condition,
): Translate {
  Object.defineProperties(t, {
    t: {
      get: () => generateTranslate(condition, true),
    },
    /**
     * 绑定 locale 返回新的 t 方法
     * t.t 属性还存在，同时也适用于服务端场景
     */
    withLocale: {
      get: () => (locale?: string) =>
        generateTranslate({
          ...condition,
          // 未设置 locale 需要保持之前的状态
          locale: locale || condition.locale,
        }),
    },
  })
  return t
}

/**
 * 生成 t 函数
 * @param condition
 * @param isDotT 是否是 t.t 场景
 * @returns
 */
export function generateTranslate(
  condition: Condition,
  isDotT = false,
): Translate {
  const t = isDotT
    ? translateImpl.bind(null, condition)
    : translateImpl.bind(null, condition, null)

  if (!isDotT) {
    defineTranslateProperties(t, condition)
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
  condition: Condition
}): string {
  const {
    type,
    originText,
    matchTagRes,
    arg,
    text: textProp,
    state,
    condition,
  } = props
  const { locale: locale_ } = state
  const locale = condition.locale || locale_
  const [, matchTemplate, f, keyword = ''] = matchTagRes
  const formatterName = tagFormatterNameMap[f?.toLowerCase()]
  const formatter = state[formatterName]
  let text = textProp

  if (typeof formatter !== 'function') {
    console.warn(
      `Missing formatter \`${formatterName}\` for \`${matchTemplate}\` in \`${originText}\`.`,
    )
    return text.replace(matchTemplate, `${arg}${keyword}`)
  }

  if (typeof locale === 'undefined') {
    console.warn(
      `The locale is not configured and may affect the logic in formatter \`${formatterName}\`.`,
    )
  }

  try {
    const content = formatter({
      locale,
      payload: arg,
      t: generateTranslate(condition),
      ...(type === 'plural'
        ? { keyword: keyword.trim(), text: `${arg}${keyword}` }
        : {}),
    })
    text = text.replace(matchTemplate, content)
  } catch (error) {
    console.error(
      `Error in formatter \`${formatterName}\` for \`${matchTemplate}\` in \`${originText}\`:`,
      error,
    )
    text = text.replace(matchTemplate, `${arg}${keyword}`)
  }

  return text
}

/**
 * translate 函数 API的具体实现
 * @param i18nState 当前i18n所有状态
 * @param key key
 * @param text Original text
 * @param args Dynamic parameter
 * @returns
 */
export function translateImpl(
  condition: Condition,
  key: null | string = null,
  text: string,
  ...args: Array<string | number | unknown>
) {
  const i18nState = getCurrentState(condition.namespace)
  const { locale: locale_, langs, beginIndex = 0 } = i18nState
  const locale = condition.locale || locale_
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
        `Invalid plural parameter \`${invalidPluralMatchTagRes[1]}\` in \`${originText}\`.`,
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
      condition,
    })
  })

  return text
}

export function isObject(object?: object) {
  return typeof object === 'object' && object !== null
}
