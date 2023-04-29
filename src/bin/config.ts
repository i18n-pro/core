import { join } from 'path'
import fs from 'fs'
import { logError, logSuccess } from './utils'
import type { Config } from '../type'
import chalk from './chalk'
import { CONFIG_NAME } from './constants'

const configPath = join(process.cwd(), CONFIG_NAME)

/**
 * 生成配置文件
 */
export function initConfig(pathProp?: string) {
  const targetPath = (() => {
    return typeof pathProp === 'string'
      ? join(pathProp, CONFIG_NAME)
      : configPath
  })()
  const sourcePath = join(__dirname, 'template/' + CONFIG_NAME)

  try {
    fs.copyFileSync(sourcePath, targetPath)
    console.log('\n')
    logSuccess(t(`初始化配置完成，已将配置文件写入到 {0} 中`, targetPath), '\n')
  } catch (error) {
    logError(error)
  }
}

/**
 * 解析配置文件
 */
export function readConfig(props?: { path: string; isFile?: boolean }): Config {
  const { path, isFile = false } = props || {}
  const currentConfigPath = path
    ? isFile
      ? path
      : join(path, CONFIG_NAME)
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
