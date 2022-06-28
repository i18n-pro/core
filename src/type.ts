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

/**
 * 国际化内部保存状态
 */
export type I18NState<T extends Langs> = {
  locale: keyof T | string // 当前语言
  langs: T // 语言包
}
