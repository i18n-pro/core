import { i18nImpl } from './utils'
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
  return i18nImpl(state, text, ...args)
}

/**
 * 获取独立于主程序的i18n函数
 *
 * 适用于服务端，每个接口响应需要做国际化的处理
 *
 * @param props
 * @returns
 */
export function withI18N(props: {
  locale: string // 独立于主程序的语言
}) {
  const { locale } = props

  return {
    i18n: i18nImpl.bind(null, {
      ...state,
      locale,
    }),
  }
}
