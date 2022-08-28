/**
 * 匹配公共格式化文案的正则
 */
export const commonFormatterRegex = /(\{([ncdt])number\})/

/**
 * 匹配复数格式化文案的正则
 */
export const pluralFormatterRegex = /(\{(p)number[ ]{0,}([^ ]+?)\})/

/**
 * 匹配非正确复数格式化文案的正则
 */
export const invalidPluralFormatterRegex = /(\{(p)number\})/

/**
 * 内置标记与对应格式化回调函数名的映射关系
 */
export const tagFormatterNameMap = {
  n: 'formatNumber',
  c: 'formatCurrency',
  d: 'formatDate',
  t: 'formatTime',
  p: 'formatPlural',
}
