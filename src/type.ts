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
 * 可供选择的翻译器（翻译平台）
 */
export type Translator =
  | 'baidu'
  | 'youdao'
  | 'tencent'
  | 'aliyun'
  | 'microsoft'
  | 'google'
  | 'googlex'
  | 'openai'

/**
 * 公共的基础配置
 */
type BasicConfig = {
  funcName: string // 自定义函数名，默认为 i18n
  entry?: string // 入口文件
  fileRegExp?: RegExp // 匹配文件名的正则表达式
  /** 通过 Glob 语法来过滤文件 */
  input?: string | string[]
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
    langType?: 'single' | 'multiple'
    indentSize?: number // 输出文件的缩进大小，默认为 2
  }
  /**
   * 指定翻译平台，默认为【百度】
   */
  translator?: Translator
  /**
   * 允许其他任意属性
   */
  [key: string]: unknown
}

type DefineTranslatorConfig<T extends Translator, C extends object> = {
  translator: T
} & Record<`${T}Config`, C>

/**
 * 基础百度翻译的配置
 */
export type BasicBaiduConfig = {
  appid: string // 百度翻译的APPID
  key: string // 百度翻译的密钥
} & TranslatorConfig

/**
 * 完整的百度翻译的配置
 */
export type BaiduConfig = DefineTranslatorConfig<'baidu', BasicBaiduConfig>

/**
 * 有道翻译的配置
 */
export type BasicYoudaoConfig = {
  appKey: string // 有道翻译的APPID
  key: string // 有道翻译的密钥
} & TranslatorConfig

/**
 * 完整的有道翻译的配置
 */
export type YoudaoConfig = DefineTranslatorConfig<'youdao', BasicYoudaoConfig>

/**
 * 腾讯翻译的配置
 */
export type BasicTencentConfig = {
  secretId: string // 用于标识 API 调用者身份，可以简单类比为用户名
  secretKey: string // 用于验证 API 调用者的身份，可以简单类比为密码
  region: string // 地域列表
  projectId?: string // 项目ID
  language?: string // 接口错误返回的提示信息的语言类型，取值：zh-CN，en-US，默认为zh-CN
} & TranslatorConfig

/**
 * 完整的腾讯翻译的配置
 */
export type TencentConfig = DefineTranslatorConfig<
  'tencent',
  BasicTencentConfig
>

/**
 * 阿里云翻译的配置
 */
export type BasicAliyunConfig = {
  accessKeyId: string // AccessKey ID
  accessKeySecret: string // AccessKey Secret
  scene?: string // 场景
  apiType?: string // API Type
  endpoint?: string // 服务地址，默认为 mt.aliyuncs.com
} & TranslatorConfig

/**
 * 完整的阿里云翻译的配置
 */
export type AliyunConfig = DefineTranslatorConfig<'aliyun', BasicAliyunConfig>

/**
 * 微软翻译的配置
 */
export type BasicMicrosoftConfig = {
  key: string // Microsoft translator-key
  location: string // 区域
} & TranslatorConfig

/**
 * 完整的微软翻译的配置
 */
export type MicrosoftConfig = DefineTranslatorConfig<
  'microsoft',
  BasicMicrosoftConfig
>

/**
 * 谷歌翻译的配置
 */
export type BasicGoogleConfig = {
  projectId: string // 项目ID
  location?: string // 区域
} & TranslatorConfig

/**
 * 完整的谷歌翻译的配置
 */
export type GoogleConfig = DefineTranslatorConfig<'google', BasicGoogleConfig>

/**
 * 谷歌翻译X的配置
 */
export type BasicGooglexConfig = {
  proxy?: string // 代理配置
} & TranslatorConfig

/**
 * 完整的谷歌X翻译的配置
 */
export type GooglexConfig = Omit<
  DefineTranslatorConfig<'googlex', BasicGooglexConfig>,
  'translator'
> & {
  translator?: 'googlex'
}

/**
 * OpenAI翻译的配置
 */
export type BasicOpenAIConfig = {
  key: string // OpenAI API Key
  model?: string // 使用模型，默认为 gpt-3.5-turbo，当前只兼容Chart模型
  proxy?: string // 代理配置
} & TranslatorConfig

/**
 * 完整的OpenAI翻译的配置
 */
export type OpenAIConfig = DefineTranslatorConfig<'openai', BasicOpenAIConfig>

/**
 * 翻译器基础的联合类型
 */
export type UnionBasicTranslatorConfig =
  | BasicBaiduConfig
  | BasicYoudaoConfig
  | BasicTencentConfig
  | BasicAliyunConfig
  | BasicMicrosoftConfig
  | BasicGoogleConfig
  | BasicGooglexConfig
  | BasicOpenAIConfig

/**
 * 翻译器的联合类型
 */
export type UnionTranslatorConfig =
  | BaiduConfig
  | YoudaoConfig
  | TencentConfig
  | AliyunConfig
  | MicrosoftConfig
  | GoogleConfig
  | GooglexConfig
  | OpenAIConfig

/**
 * 模板配置文件
 */
export type Config = BasicConfig & UnionTranslatorConfig

/**
 * 语言包类型
 */
export type Langs = Partial<Record<string, Record<string, string>>>

/**
 * 最大字符数限制类型
 */
export type MaxLengthType =
  | 'allStrLength' // 所有字符数限制
  | 'strLengthAndArrLength' // 单个字符限制长度，并且数组长度也需限制
  | 'allStrLengthAndArrLength' // 限制数组长度和总字符数
  | 'allTokenLength' // 所有字符Token长度

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
