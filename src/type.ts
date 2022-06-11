import { WalkStats } from 'walk'

/**
 * 模板配置文件
 */
export type Config = {
  entry: string // 入口文件
  filterFile: (stats: WalkStats) => boolean // 过滤文件的回调函数
  /**
   * 语言包文件输出配置
   */
  output: {
    path: string // 输出目录
  }
  /**
   * 百度翻译的配置
   */
  baiduConfig: {
    appid: string // 百度翻译的APPID
    key: string // 百度翻译的密钥
  }
  /**
   * 日志输出的配置
   */
  logConfig: {
    dirname?: string // 日志输出目录名称 默认为[.log]，位置会在 output 配置的目录下
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
