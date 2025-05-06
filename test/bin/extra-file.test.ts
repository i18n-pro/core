import { describe, it, vi, expect } from 'vitest'
import path from 'path'
import { binExtraFile, binUtils } from '../utils'

const matchTestTsFileCount = 12

describe('验证提取语提取文件', () => {
  describe('验证配置 entry 和 fileRegExp 的形式', () => {
    it('未配置 entry', () => {
      const spyLogError = vi.spyOn(binUtils, 'logError')
      const filepaths = binExtraFile.default({
        entry: '',
      })

      expect(spyLogError).toHaveBeenCalledTimes(1)
      expect(filepaths).toEqual([])
    })

    it('未配置 fileRegExp', () => {
      const spyLogError = vi.spyOn(binUtils, 'logError')
      const filepaths = binExtraFile.default({
        entry: 'test',
      })

      expect(spyLogError).toHaveBeenCalledTimes(1)
      expect(filepaths).toEqual([])
    })

    it('正确配置 entry 和 fileRegExp', () => {
      const spyLogError = vi.spyOn(binUtils, 'logError')
      const filepaths = binExtraFile.default({
        entry: path.join(__dirname, '../'),
        fileRegExp: /.test.ts$/,
      })

      expect(spyLogError).toHaveBeenCalledTimes(0)
      expect(filepaths.length).toEqual(matchTestTsFileCount)
    })
  })

  describe('验证配置 glob 的形式', () => {
    it('配置为普通字符串', () => {
      const filepaths = binExtraFile.default({
        input: '**/*.test.ts',
      })

      expect(filepaths.length).toEqual(matchTestTsFileCount)
    })

    it('配置为字符串数组', () => {
      const filepaths = binExtraFile.default({
        input: ['**/*.test.ts'],
      })

      expect(filepaths.length).toEqual(matchTestTsFileCount)
    })

    it('配置为字符串数组，且支持排除', () => {
      const filepaths = binExtraFile.default({
        input: ['**/*.test.ts', '!**/bin/*.test.ts'],
      })

      expect(filepaths.length).toEqual(4)
    })
  })
})
