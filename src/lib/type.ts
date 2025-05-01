import { LangPack, Langs } from '../type'
export { Langs, Config, LangPack } from '../type'

type BaseFormatProps<T> = {
  /**
   * current locale
   */
  locale: string
  /**
   * the value of Interpolation Variable
   */
  payload: number | string | unknown | T
  /**
   * the function of `t`
   */
  t: Translate
}

type DateFormatProps<T> = BaseFormatProps<T> & {
  /**
   * the value of Interpolation Variable
   */
  payload: BaseFormatProps<T>['payload'] | Date
}

/**
 * the state of i18n
 */
export type I18nState = {
  /**
   * namespace
   */
  namespace: string
  /**
   * current locale
   */
  locale?: string
  /**
   * language packs
   */
  langs?: Partial<Record<string, (() => Promise<LangPack>) | LangPack>>
  /**
   * the position of Interpolation Variable，default starting from 0
   */
  beginIndex?: number
  /**
   * 格式化 数字 的回调函数
   * 翻译文本中动态参数配置了 {n0}，{n1}，{n3} 等形式
   * 要求必须要配置该回调
   *
   * 例如：
   * t('我有{n0}个苹果，{n1}个香蕉和{n2}个梨')
   */
  formatNumber?: <T>(props: BaseFormatProps<T>) => string | number
  /**
   * 格式化 货币 的回调函数
   * 翻译文本中动态参数配置了 {c0}，{c1}，{c3} 等形式
   * 要求必须要配置该回调
   *
   * 例如：
   * t('张三买房花了{d0}')
   */
  formatCurrency?: <T>(props: BaseFormatProps<T>) => string | number
  /**
   * 格式化 日期 的回调函数
   * 翻译文本中动态参数配置了 {d0}，{d1}，{d3} 等形式
   * 要求必须要配置该回调
   *
   * 例如：
   * t('今天的日期是{d0}')
   */
  formatDate?: <T>(props: DateFormatProps<T>) => string
  /**
   * 格式化 时间 的回调函数
   * 翻译文本中动态参数配置了 {t0}，{t1}，{t3} 等形式
   * 要求必须要配置该回调
   *
   * 例如：
   * t('当前时间是{t0}')
   */
  formatTime?: <T>(props: DateFormatProps<T>) => string
  /**
   * 格式化 时间 的回调函数
   * 翻译文本中动态参数配置了 {p0xxx}，{p1xxx}，{p3xxx} 等形式
   * 要求必须要配置该回调
   *
   * 例如：
   * t('我有{p0个苹果}，{p1个香蕉}和{p2个梨}')
   */
  formatPlural?: <T>(
    props: BaseFormatProps<T> & {
      /**
       * 复数的关键字
       */
      keyword: string
      /**
       * 默认结合动态参数后的文本内容
       * 不需要复数的语言，例如中文可以直接返回该属性
       */
      text: string
    },
  ) => string
}

/**
 * Sets or updates the internationalization state
 * @param state Internationalization state
 * @returns Updated internationalization state
 */
export type SetI18n = (stateProp?: {
  /**
   * current locale
   */
  locale?: string
  /**
   * language packs
   */
  langs?: Partial<Langs>
}) => Promise<Readonly<I18nState>>

/**
 * Get the internationalized text based on the Original text
 * @param text Original text
 * @param args Dynamic parameter
 */
export interface Translate {
  (text: string, ...args: Array<string | number | unknown>): string
  /**
   * Get the internationalized text based on the custom key
   * @param key Custom key
   * @param text Default language translation text
   * @param args Dynamic parameter
   * @returns Translated string
   */
  t: (
    key: string,
    text: string,
    ...args: Array<string | number | unknown>
  ) => string
  /**
   * Returns a new translation function bound with the specified locale.
   *
   * This method allows you to switch the locale context for translations.
   * The returned Translate function will use the provided locale for translation,
   * enabling you to format messages according to the new locale settings.
   * If no locale is provided, the current locale remains in effect.
   *
   * @param locale Optional new locale identifier (e.g., "en", "zh").
   * @returns A new instance of the Translate function bound with the specified locale.
   */
  withLocale: (locale?: string) => Translate
}

export type Condition = {
  namespace: string
  locale: null | string
}
