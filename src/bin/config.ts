import path from 'path'
import fs from 'fs'
import { logError, logSuccess } from './utils'
import type { Config } from '../type'
import chalk from './chalk'

const configPath = path.join(process.env.PWD, 'i18nrc.js')

/**
 * 生成配置文件
 */
export function initConfig() {
  const sourcePath = path.join(__dirname, '../../template/i18nrc.js')

  try {
    fs.copyFileSync(sourcePath, configPath)
    console.log('\n')
    logSuccess(
      i18n(`初始化配置完成，已将配置文件写入到 {0} 中`, configPath),
      '\n',
    )
  } catch (error) {
    logError(error)
  }
}

/**
 * 解析配置文件
 */
export function readConfig(): Config {
  try {
    console.log(chalk.greenBright(i18n('读取配置文件')), configPath)
    const res = require(configPath)
    if (typeof res !== 'object') {
      throw new Error(i18n('配置文件不是有效配置'))
    } else if (Object.keys(res).length === 0) {
      throw new Error(i18n('配置文件为空', JSON.stringify(res)))
    }
    return res
  } catch (error) {
    logError(error)
    process.exit(0)
  }
}
