import * as i18nLibSource from '../src/lib'
import * as i18nLibPkg from '../dist/lib'

/**
 * 获取当前lib的导出内容
 * 可用于分别测试源码及打包后的lib
 * @returns
 */
export function getCurrentLib() {
  let pkg = i18nLibSource

  const type = process.env.NODE_ENV
  switch (type) {
    case 'pkg':
      pkg = i18nLibPkg
  }

  return pkg
}
