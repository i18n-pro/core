/* eslint-disable @typescript-eslint/no-explicit-any */
import { URLSearchParams } from 'url'
import * as Lib from '../src/lib'
import * as BinIndex from '../src/bin'
import * as BinConfig from '../src/bin/config'
import * as BinChalk from '../src/bin/chalk'
import * as BinExtraLangs from '../src/bin/extra-langs'
import * as BinExtraText from '../src/bin/extra-text'
import * as BinFetch from '../src/bin/fetch'
import * as BinTranslate from '../src/bin/translate'
import * as BinConstants from '../src/bin/constants'
import * as BinUtils from '../src/bin/utils'
import * as BinExtraFile from '../src/bin/extra-file'
import * as BinI18n from '../src/bin/i18n'
import * as BinAliyunTranslate from '../src/bin/translate/aliyun'
import * as BinGoogleTranslate from '../src/bin/translate/google'

/**
 * 获取当前指定路径模块的导出内容
 * 可用于分别测试源码及打包后的模块
 * @returns
 */
async function getCurrentModule<T>(path: string): Promise<T> {
  let pkg = await import(path)

  const type = process.env.NODE_ENV
  switch (type) {
    case 'pkg':
      pkg = require(path.replace('src', 'dist/src'))
      break
  }

  return pkg
}

/**
 * 改变 process.argv 参数
 * @param args 参数列表
 */
export function changeProcessArgv(...args: string[]) {
  process.argv.splice(0, 1, '', '', ...args)
}

// 获取当前 lib 的导出内容
export const lib = await getCurrentModule<typeof Lib>('../src/lib/index')

// 获取当前 bin/index 的导出内容
export const binIndex = await getCurrentModule<typeof BinIndex>(
  '../src/bin/index',
)

// 获取当前 bin-config 的导出内容
export const binConfig = await getCurrentModule<typeof BinConfig>(
  '../src/bin/config',
)

// 获取当前 bin-chalk 的导出内容
export const binChalk = await getCurrentModule<typeof BinChalk>(
  '../src/bin/chalk',
)

// 获取当前 bin-extra-langs 的导出内容
export const binExtraLangs = await getCurrentModule<typeof BinExtraLangs>(
  '../src/bin/extra-langs',
)

// 获取当前 bin-extra-text 的导出内容
export const binExtraText = await getCurrentModule<typeof BinExtraText>(
  '../src/bin/extra-text',
)

// 获取当前 bin-fetch 的导出内容
export const binFetch = await getCurrentModule<typeof BinFetch>(
  '../src/bin/fetch',
)

// 获取当前 bin-translate 的导出内容
export const binTranslate = await getCurrentModule<typeof BinTranslate>(
  '../src/bin/translate',
)

// 获取当前 bin-constants 的导出内容
export const binConstants = await getCurrentModule<typeof BinConstants>(
  '../src/bin/constants',
)

// 获取当前 bin-utils 的导出内容
export const binUtils = await getCurrentModule<typeof BinUtils>(
  '../src/bin/utils',
)

// 获取当前 bin-extra-file 的导出内容
export const binExtraFile = await getCurrentModule<typeof BinExtraFile>(
  '../src/bin/extra-file',
)

// 获取当前 bin-i18n 的导出内容
export const binI18n = await getCurrentModule<typeof BinI18n>('../src/bin/i18n')

// 获取当前 bin/translate/aliyun 的导出内容
export const binAliyunTranslate = await getCurrentModule<
  typeof BinAliyunTranslate
>('../src/bin/translate/aliyun')

// 获取当前 bin/translate/google 的导出内容
export const binGoogleTranslate = await getCurrentModule<
  typeof BinGoogleTranslate
>('../src/bin/translate/google')

/**
 * 简易获取模拟 http.request 的方法
 * @param props
 * @returns
 */
export function mockRequest(props: {
  data: any // 响应数据
  errorType?:
    | 'onError' // 模拟整个请求错误
    | 'resolveError' // 模拟解析数据错误
  errorMsg?: string // 如果需要模拟请求错误，可以设置错误信息
  getResData?: (requestData: any) => any // 根据请求参数动态返回响应数据，配置了该属性 data 将失效
}) {
  const { data, errorType, errorMsg = '错误信息', getResData } = props

  return (_url, _option, outCallback) => {
    // 记录请求的参数
    let requestData: any

    const mockReq: any = {
      on: (type, callback) => {
        switch (type) {
          case 'data':
            {
              const str = JSON.stringify(
                getResData ? getResData(requestData) : data,
              )
              if (errorType === 'resolveError') {
                callback('')
              } else {
                const arr = str.split(/(,)/)
                arr.forEach((str) => callback(str))
              }
            }
            break
          case 'end':
            callback()
            break
        }
      },
    }

    return {
      on: (type: string, callback: (arg0: string) => void) => {
        if (type === 'error' && errorType === 'onError') callback(errorMsg)
      },
      write: (data) => {
        const temp = {}
        new URLSearchParams(data).forEach((value, name) => {
          temp[name] = value
        })
        requestData = temp
      },
      end: () => {
        // 这样可以方便模拟整个请求失败
        outCallback(mockReq)
      },
    } as any
  }
}
