import { join } from 'path'
import fs from 'fs'
import { logError, logSuccess } from './utils'
import type { Config } from '../type'
import chalk from './chalk'
import {
  JS_CONFIG_NAME,
  TS_CONFIG_NAME,
  RELATIVE_PATH,
  FILE_ENCODING,
} from './constants'
const tsNode = require('ts-node')

tsNode.register()

const configPath = join(process.cwd(), JS_CONFIG_NAME)
const tsConfigPath = join(process.cwd(), TS_CONFIG_NAME)

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

function parseTsConfig(props?: {
  path: string
  isFile?: boolean
}): Config | false {
  const { path, isFile } = props || {}
  const currentConfigPath = path
    ? isFile
      ? path
      : join(path, TS_CONFIG_NAME)
    : tsConfigPath

  try {
    console.log(chalk.greenBright(t('读取配置文件')), currentConfigPath)
    // 验证文件是否存在
    const isExist = fs.existsSync(currentConfigPath)
    if (!isExist) return false
    // 通过 ts-node 可以直接加载 .ts 文件
    let res = require(currentConfigPath)
    if (res.default) {
      res = res.default
    }
    if (typeof res !== 'object') {
      throw new Error(t('配置文件不是有效配置'))
    } else if (Object.keys(res).length === 0) {
      throw new Error(t('配置文件为空', JSON.stringify(res)))
    }
    return res
  } catch (error) {
    logError(error?.message || error)
    process.exit(0)
  }
}

/**
 * 解析配置文件
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
    process.exit(0)
  }
}

/**
 * 解析配置文件
 */
export function readConfig(props?: { path: string; isFile?: boolean }): Config {
  const { path, isFile = false } = props || {}
  if (isFile && path && !path.endsWith('.ts')) return parseJsConfig(props)
  let config
  // 尝试解析 ts 文件
  config = parseTsConfig(props)
  if (config) return config
  // 解析 js 文件
  config = parseJsConfig(props)
  return config
}
