import { logError, logSuccess } from './utils'
import type { Config } from '../type'
import path = require('path')
import fs = require('fs')
import { isEmpty } from 'lodash'

const configPath = path.join(process.env.PWD, 'i18nrc.js')

/**
 * 生成配置文件
 */
export function initConfig() {
  const sourcePath = path.join(__dirname, '../../template/i18nrc.js')

  try {
    fs.copyFileSync(sourcePath, configPath)
    logSuccess(`已将配置文件写入到 ${configPath} 中`)
  } catch (error) {
    logError(error)
  }
}

/**
 * 解析配置文件
 */
export function readConfig(): Config {
  try {
    console.log(`读取配置文件 ${configPath}`)
    const res = require(configPath)
    if (isEmpty(res)) {
      throw new Error('配置文件为空' + JSON.stringify(res))
    } else if (typeof res !== 'object') {
      throw new Error('配置文件不是有效配置')
    }
    return res
  } catch (error) {
    logError(error)
    process.exit(0)
  }
}
