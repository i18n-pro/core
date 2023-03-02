import { Langs } from '../../../src/type'

export const LANGS_PATH = '../../../i18n/langs.json'

export type MockRequestProps =
  | {
      type: 'normal' // 正常请求
      to: string
      langs: Langs
    }
  | {
      type: 'errorMsg' // 模拟指定错误信息
      errorCode: string
      errorMsg: string
    }
  | {
      type: 'noErrorMsg' // 模拟未捕获到错误信息
    }
