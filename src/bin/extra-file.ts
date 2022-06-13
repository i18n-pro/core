import { logError, logSuccess } from './utils'
import type { WalkStats } from 'walk'
import { i18n } from '../lib'

const path = require('path')
const walk = require('walk')
const chalk = require('chalk')

// 提取相关的文件
export default function extraFile(props: {
  dirpath: string // 指定路径
  filterFile?: (walkStats: WalkStats) => boolean // 验证当前文件是否跳过的回调
  showFilepath?: boolean // 是否显示每个文件路径
}): Promise<string[]> {
  const {
    dirpath,
    filterFile = (walkStats) => walkStats.name.match(/.*\.[jt]?s?$/g),
    showFilepath = true,
  } = props

  const filepaths: string[] = []

  console.log(chalk.greenBright(i18n('开始解析路径：')), dirpath)

  return new Promise((resolve, reject) => {
    try {
      const walker = walk.walk(dirpath, {
        followLinks: true,
      })

      walker.on('file', (base: any, stats: WalkStats, next: () => void) => {
        if (filterFile?.(stats)) {
          const filepath = path.join(base, stats.name)
          filepaths.push(filepath)
          if (showFilepath) {
            console.log(i18n('已录入'), chalk.greenBright(filepath))
          }
        }
        next()
      })

      walker.on('end', () => {
        logSuccess(
          chalk.greenBright(i18n('解析符合要求的文件路径数:')),
          filepaths.length,
        )
        resolve(filepaths)
      })

      walker.on('errors', (base: any, stats: any, next: () => void) => {
        logError(i18n('遍历文件发生错误'), stats)
        next()
      })
    } catch (error) {
      reject(error)
    }
  })
}
