import {
  commonFormatterRegex,
  invalidPluralFormatterRegex,
  pluralFormatterRegex,
} from './contants'
import { getTargetRegExp, getTextFromFormatter } from './utils'
import { Langs, I18NState } from '../type'

let state = {} as I18NState<Langs>

/**
 * 设置国际化状态
 * @param state 国际化状态
 */
export function setI18N(stateProp: I18NState<Langs>) {
  if (stateProp?.beginIndex && typeof stateProp.beginIndex !== 'number') {
    console.error('beginIndex must be a number')
    delete stateProp.beginIndex
  }

  state = {
    ...state,
    ...(stateProp || {}),
  }
}

/**
 * 基于原文本获取国际化后的文本
 * @param text 原文本
 * @param args 动态参数
 */
export function i18n(
  text: string,
  ...args: Array<string | number | unknown>
): string {
  const { locale, langs, beginIndex = 0 } = state
  const lang = langs?.[locale]
  let originText = text

  if (lang && lang[text]) {
    text = lang[text]
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
        `在翻译文本 ${originText} 中复数形式动态参数 ${invalidPluralMatchTagRes[1]} 未包含其需要复数处理的文案，例如：i18n('I have {p0 apple}')`,
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
      state,
    })
  })

  return text
}
