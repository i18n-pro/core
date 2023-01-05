/**
 * 公共的翻译配置类型，适用于所有的翻译平台
 */
export type TranslatorConfig = {
  from: string
  to: string[]
  codeLocaleMap?: Record<string, string> // 语言代码与locale的映射关系，key为语言代码，value为locale
  delay?: number // 接口调用延迟时长（单位:秒）
}

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
   * 指定翻译平台，默认为【百度】
   */
  translator?: 'baidu' | 'youdao' | 'tencent' | 'aliyun' | 'microsoft'
  /**
   * 百度翻译的配置
   */
  baiduConfig: {
    appid: string // 百度翻译的APPID
    key: string // 百度翻译的密钥
  } & TranslatorConfig
  /**
   * 有道翻译的配置
   */
  youdaoConfig: {
    appKey: string // 有道翻译的APPID
    key: string // 有道翻译的密钥
  } & TranslatorConfig
  /**
   * 腾讯翻译的配置
   */
  tencentConfig: {
    secretId: string // 用于标识 API 调用者身份，可以简单类比为用户名
    secretKey: string // 用于验证 API 调用者的身份，可以简单类比为密码
    region: string // 地域列表
    projectId?: string // 项目ID
    language?: string // 接口错误返回的提示信息的语言类型，取值：zh-CN，en-US，默认为zh-CN
  } & TranslatorConfig
  /**
   * 阿里云翻译的配置
   */
  aliyunConfig: {
    accessKeyId: string // AccessKey ID
    accessKeySecret: string // AccessKey Secret
    scene?: string // 场景
    apiType?: string // API Type
    endpoint?: string // 服务地址，默认为 mt.aliyuncs.com
  } & TranslatorConfig
  /**
   * 微软翻译的配置
   */
  microsoftConfig: {
    key: string // Microsoft translator-key
    location: string // 区域
  } & TranslatorConfig
}

/**
 * 语言包类型
 */
export type Langs = Partial<Record<string, Record<string, string>>>

type BaseFormatProps<T> = {
  /**
   * 当前语言
   */
  locale: string
  /**
   * 动态参数的值
   */
  payload: number | string | unknown | T
}

type DateFormatProps<T> = BaseFormatProps<T> & {
  /**
   * 动态参数的值
   */
  payload: BaseFormatProps<T>['payload'] | Date
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
  formatNumber?: <T>(props: BaseFormatProps<T>) => string | number
  /**
   * 格式化 货币 的回调函数
   * 翻译文本中动态参数配置了 {c0}，{c1}，{c3} 等形式
   * 要求必须要配置该回调
   *
   * 例如：
   * i18n('张三买房花了{d0}')
   */
  formatCurrency?: <T>(props: BaseFormatProps<T>) => string | number
  /**
   * 格式化 日期 的回调函数
   * 翻译文本中动态参数配置了 {d0}，{d1}，{d3} 等形式
   * 要求必须要配置该回调
   *
   * 例如：
   * i18n('今天的日期是{d0}')
   */
  formatDate?: <T>(props: DateFormatProps<T>) => string
  /**
   * 格式化 时间 的回调函数
   * 翻译文本中动态参数配置了 {t0}，{t1}，{t3} 等形式
   * 要求必须要配置该回调
   *
   * 例如：
   * i18n('当前时间是{t0}')
   */
  formatTime?: <T>(props: DateFormatProps<T>) => string
  /**
   * 格式化 时间 的回调函数
   * 翻译文本中动态参数配置了 {p0xxx}，{p1xxx}，{p3xxx} 等形式
   * 要求必须要配置该回调
   *
   * 例如：
   * i18n('我有{p0个苹果}，{p1个香蕉}和{p2个梨}')
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
 * 最大字符数限制类型
 */
export type MaxLengthType =
  | 'allStrLength' // 所有字符数限制
  | 'strLengthAndArrLength' // 单个字符限制长度，并且数组长度也需限制
  | 'allStrLengthAndArrLength' // 限制数组长度和总字符数

/**
 * 最大字符限制配置
 */
export type MaxLengthConfig = {
  /**
   * 限制类型
   */
  maxLengthType: MaxLengthType
  /**
   * 最大字符数，根据【限制类型】不同，用途不同
   */
  maxLength: number
  /**
   * 数组最大长度
   */
  maxArrayLength?: number
  /**
   * 以字符串形式传递时，不同文本间的分割符
   */
  separator?: string
}

/**
 * 不同平台的最大字符限制配置
 */
export type MaxLengthConfigMap = Record<Config['translator'], MaxLengthConfig>

/**
 * 内部配置属性
 */
export type InnerConfig = {
  maxLengthConfig: MaxLengthConfig
}
