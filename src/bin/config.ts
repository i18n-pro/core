import { join, resolve } from 'path'
import fs, { unlinkSync } from 'fs'
import { build } from 'esbuild'
import { pathToFileURL } from 'url'
import { checkIsInPkg, checkIsInTest, logError, logSuccess } from './utils'
import type { Config } from '../type'
import chalk from './chalk'
import {
  JS_CONFIG_NAME,
  TS_CONFIG_NAME,
  RELATIVE_PATH,
  FILE_ENCODING,
} from './constants'

const configPath = join(process.cwd(), JS_CONFIG_NAME)
const tsConfigPath = join(process.cwd(), TS_CONFIG_NAME)

/**
 * 动态加载 esm 模块
 * 当前代码编译后是 commonjs 模块，为了避免 import 会被编译为 require
 * 导致报错：require() of ES Module xxxx\i18nrc.mjs not supported.
 * 这里使用了 new Function('path', 'return import(path)') 的方式来动态加载 esm 模块
 * 但是这样会导致在 windows 下使用时，路径需要使用 file:// 协议
 * 这里使用了 pathToFileURL 来转换路径
 * 这样就可以在 windows 下使用了
 */
const dynamicImport = new Function('path', 'return import(path)')

async function loadTsEsmConfig(tsPath: string) {
  const outputPath = join(process.cwd(), `i18nrc.mjs`)
  const url = pathToFileURL(resolve(outputPath)).href
  const isTest = checkIsInTest()
  const isPkg = checkIsInPkg()

  /**
   * 这里比较特殊，因为需要编译ts文件才能正常加载
   * 但是在测试中，不能使用 esbuild 来编译 ts 文件
   * 否则会导致测试失败
   */
  if (isTest && isPkg) {
    return undefined
  }

  if (isTest) {
    const res = await import(tsPath)
    if (typeof res?.default != 'undefined') {
      return res?.default
    }

    return res
  }

  /**
   * esbuild 编译 ts 文件为 esm 模块，然后动态加载
   * 因为目前 ts 本身不支持 esm 模块，所以这里使用 esbuild 来编译
   */
  await build({
    entryPoints: [tsPath],
    outfile: outputPath,
    bundle: true,
    format: 'esm',
    platform: 'node',
    logLevel: 'silent',
  })

  let config = undefined
  try {
    config = await dynamicImport(url)
  } catch (error) {
    logError(error)
  } finally {
    unlinkSync(outputPath)
  }
  return config.default || config
}

/**
 * 生成配置文件
 */
export function initConfig(type: 'js' | 'ts' = 'ts', pathProp?: string) {
  const configName = type === 'ts' ? TS_CONFIG_NAME : JS_CONFIG_NAME
  const targetPath = (() => {
    return typeof pathProp === 'string'
      ? join(process.cwd(), pathProp, configName)
      : type === 'ts'
      ? tsConfigPath
      : configPath
  })()
  const sourcePath = join(__dirname, RELATIVE_PATH + 'template/' + configName)

  try {
    let content = fs.readFileSync(sourcePath, { encoding: FILE_ENCODING })
    content = content.replace('../src/type', 'i18n-pro')
    fs.writeFileSync(targetPath, content, {
      encoding: FILE_ENCODING,
    })
    console.log('\n')
    logSuccess(t(`初始化配置完成，已将配置文件写入到 {0} 中`, targetPath), '\n')
  } catch (error) {
    logError(error)
  }
}

/**
 * 解析ts配置文件
 * @param props
 * @returns
 */
async function parseTsConfig(props?: {
  path: string
  isFile?: boolean
}): Promise<Config | false> {
  const { path, isFile } = props || {}
  const currentConfigPath = path
    ? isFile
      ? path
      : join(path, TS_CONFIG_NAME)
    : tsConfigPath
  const isTest = checkIsInTest()

  try {
    console.log(chalk.greenBright(t('读取配置文件')), currentConfigPath)
    // 验证文件是否存在
    const isExist = fs.existsSync(currentConfigPath)
    if (!isExist) return false
    const res = await loadTsEsmConfig(currentConfigPath)

    if (typeof res !== 'object') {
      throw new Error(t('配置文件不是有效配置'))
    } else if (Object.keys(res).length === 0) {
      throw new Error(t('配置文件为空', JSON.stringify(res)))
    }
    return res
  } catch (error) {
    logError(error?.message || error)
    if (!isTest) {
      process.exit(0)
    }
  }
}

/**
 * 解析js配置文件
 */
export function parseJsConfig(props?: {
  path: string
  isFile?: boolean
}): Config {
  const { path, isFile = false } = props || {}
  const currentConfigPath = path
    ? isFile
      ? path
      : join(path, JS_CONFIG_NAME)
    : configPath
  const isTest = checkIsInTest()

  try {
    console.log(chalk.greenBright(t('读取配置文件')), currentConfigPath)
    const res = require(currentConfigPath)
    if (typeof res !== 'object') {
      throw new Error(t('配置文件不是有效配置'))
    } else if (Object.keys(res).length === 0) {
      throw new Error(t('配置文件为空', JSON.stringify(res)))
    }
    return res
  } catch (error) {
    logError(error?.message || error)
    if (!isTest) {
      process.exit(0)
    }
  }
}

/**
 * 解析配置文件
 */
export async function readConfig(props?: {
  path: string
  isFile?: boolean
}): Promise<Config> {
  const { path, isFile = false } = props || {}
  if (isFile && path) {
    return path.endsWith('.ts')
      ? (parseTsConfig(props) as Promise<Config>)
      : parseJsConfig(props)
  }
  let config
  // 尝试解析 ts 文件
  config = await parseTsConfig(props)
  if (config) return config
  // 解析 js 文件
  config = parseJsConfig(props)
  return config
}
