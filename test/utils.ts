import * as Lib from '../src/lib'
import * as BinIndex from '../src/bin'
import * as BinConfig from '../src/bin/config'
import * as BinChalk from '../src/bin/chalk'
import * as BinExtraLangs from '../src/bin/extra-langs'

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
      pkg = require(path.replace('src', 'dist'))
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
