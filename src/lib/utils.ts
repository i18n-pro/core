import { tagFormatterNameMap } from './contants'
import { Langs, I18NState } from '../type'

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
  state: I18NState<Langs> // 国际化状态
}): string {
  const { type, originText, matchTagRes, arg, text: textProp, state } = props
  const { locale } = state
  const [, matchTemplate, f, keywords = ''] = matchTagRes
  const formatterName = tagFormatterNameMap[f?.toLocaleLowerCase()]
  const formatter = state[formatterName]
  let text = textProp

  if (typeof formatter !== 'function') {
    console.warn(
      `在翻译文本 ${originText} 中动态参数 ${matchTemplate} 未配置对应的格式化回调 ${formatterName}`,
    )

    return text.replace(matchTemplate, `${arg}${keywords}`)
  }

  if (typeof locale === 'undefined') {
    console.warn(
      `当前未配置 locale，可能会影响格式化回调 ${formatterName} 中的逻辑`,
    )
  }

  try {
    const content = formatter({
      locale,
      payload: arg,
      ...(() => {
        let res = {}
        if (type === 'plural') {
          const newKeywords = keywords?.trim?.()
          res = {
            keywords: newKeywords,
            text: `${arg}${keywords}`,
          }
        }
        return res
      })(),
    })
    text = text.replace(matchTemplate, content)
  } catch (error) {
    text = text.replace(matchTemplate, `${arg}${keywords}`)
    console.error(
      `在翻译文本 ${originText} 中动态参数 ${matchTemplate} 调用对应的格式化回调 ${formatterName} 出错，需检查回调逻辑，错误信息如下：`,
      error,
    )
  }

  return text
}
