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
export function i18n(text: string, ...args: Array<string | number>): string {
  const { locale, langs, beginIndex = 0 } = state
  const lang = langs?.[locale]
  if (lang && lang[text]) {
    text = lang[text]
  }
  args.forEach((arg, index) => {
    text = text.replace(`{${index + beginIndex}}`, `${arg}`)
  })

  return text
}
