/**
 * 模板配置文件
 */
export type Config = {
  funcName: string // 自定义函数名，默认为 i18n
  entry: string // 入口文件
  fileRegExp: RegExp // 匹配文件名的正则表达式
  /**
   * 语言包文件输出配置
   */
  output: {
    path: string // 输出目录
    /**
     * 输出语言包的方式
     *
     * 假设有两个翻译的目标语言，分别为 en 和 jp
     *
     * single 只会生成一个聚合的语言包文件
     * 对应一个文件：langs.json, 格式如下：
     * {
     *   "en":{
     *     "xxx":"xxx"
     *   },
     *   "jp":{
     *     "xxx":"xxx"
     *   }
     * }
     *
     * multiple 每个语言都会生成对应的语言包文件
     * 对应两个文件：en.json, jp.json
     * en.json 格式如下，jp.json 也是如此
     * {
     *   "xxx":"xxx"
     * }
     */
    langType: 'single' | 'multiple'
    indentSize: number // 输出文件的缩进大小，默认为 2
  }
  /**
   * 百度翻译的配置
   */
  baiduConfig: {
    appid: string // 百度翻译的APPID
    key: string // 百度翻译的密钥
    from: string // 当前语言代码
    to: string[] // 翻译的目标语言代码
    codeLocaleMap?: Record<string, string> // 语言代码与locale的映射关系，key为语言代码，value为locale
    delay?: number // 接口调用延迟时长（单位:秒）
  }
}

/**
 * 语言包类型
 */
export type Langs = Partial<Record<string, Record<string, string>>>

type BaseFormatProps = {
  /**
   * 当前语言
   */
  locale: string
  /**
   * 动态参数的值
   */
  payload: number | string | unknown
}

/**
 * 国际化内部保存状态
 */
export type I18NState<T extends Langs> = {
  /**
   * 当前语言
   */
  locale?: keyof T | string
  /**
   * 语言包
   */
  langs?: T
  /**
   * 动态参数的起始位置，默认从0开始
   */
  beginIndex?: number
  /**
   * 格式化 数字 的回调函数
   * 翻译文本中动态参数配置了 {n0}，{n1}，{n3} 等形式
   * 要求必须要配置该回调
   *
   * 例如：
   * i18n('我有{n0}个苹果，{n1}个香蕉和{n2}个梨')
   */
  formatNumber?: (props: BaseFormatProps) => string | number
  /**
   * 格式化 货币 的回调函数
   * 翻译文本中动态参数配置了 {c0}，{c1}，{c3} 等形式
   * 要求必须要配置该回调
   *
   * 例如：
   * i18n('张三买房花了{d0}')
   */
  formatCurrency?: (props: BaseFormatProps) => string | number
  /**
   * 格式化 日期 的回调函数
   * 翻译文本中动态参数配置了 {d0}，{d1}，{d3} 等形式
   * 要求必须要配置该回调
   *
   * 例如：
   * i18n('今天的日期是{d0}')
   */
  formatDate?: (props: BaseFormatProps) => string
  /**
   * 格式化 时间 的回调函数
   * 翻译文本中动态参数配置了 {t0}，{t1}，{t3} 等形式
   * 要求必须要配置该回调
   *
   * 例如：
   * i18n('当前时间是{t0}')
   */
  formatTime?: (props: BaseFormatProps) => string
  /**
   * 格式化 时间 的回调函数
   * 翻译文本中动态参数配置了 {p0xxx}，{p1xxx}，{p3xxx} 等形式
   * 要求必须要配置该回调
   *
   * 例如：
   * i18n('我有{p0个苹果}，{p1个香蕉}和{p2个梨}')
   */
  formatPlural?: (
    props: BaseFormatProps & {
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
