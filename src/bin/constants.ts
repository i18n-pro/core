import { i18n } from '../lib'

// 设置为全局属性
global.i18n = i18n

// 日志文件的生成目录
export const LOG_DIR_NAME = '.log'

// 百度每次翻译的最大字符数
export const BAI_DU_MAX_LENGTH = 3000

// 多文本翻译时字符间的分割符
export const SEPARATOR = '\n'

// 分隔符的个数
export const SEPARATOR_LENGTH = 1

// 实际的分割符
export const SEPARATOR_STR = SEPARATOR.repeat(SEPARATOR_LENGTH)

// 翻译失败的文本内容显示
export const TRANSLATE_ERROR_TEXT = i18n('翻译失败')

// 非增量翻译模式
export const NON_INCREMENTAL = '--non-incremental'

// 配置文件名
export const CONFIG_NAME = 'i18nrc.js'

// 相对定位的公共前缀
export const RELATIVE_PATH = __filename.endsWith('js') ? '../../../' : '../../'
