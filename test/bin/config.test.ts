import fs from 'fs'
import path from 'path'
import { binConfig } from '../utils'

const { initConfig, readConfig } = binConfig

describe('验证配置文件', () => {
  describe('读取配置', () => {
    describe('正常操作', () => {
      const logFuncName = 'log'
      const spyLog = vi.spyOn(console, logFuncName)
      expect(spyLog.getMockName()).toBe(logFuncName)

      afterEach(() => {
        vi.clearAllMocks()
      })

      it('未指定路径，无 i18nrc.ts 默认读取 i18nrc.js', async () => {
        const config = await readConfig()
        expect(spyLog).toHaveBeenNthCalledWith(
          1,
          expect.stringContaining(''),
          expect.stringContaining('i18nrc.ts'),
        )
        expect(spyLog).toHaveBeenNthCalledWith(
          2,
          expect.stringContaining(''),
          expect.stringContaining('i18nrc.js'),
        )
        expect(spyLog).toHaveBeenCalledTimes(2)
        expect(config).toEqual(require('../../i18nrc'))
      })

      it('指定文件夹路径默认读取 i18nrc.ts', async () => {
        const config = await readConfig({
          path: path.resolve(__dirname, '../../template/'),
        })
        expect(spyLog).toHaveBeenLastCalledWith(
          expect.stringContaining(''),
          expect.stringContaining('i18nrc.ts'),
        )
        expect(spyLog).toHaveBeenCalledTimes(1)
        // 这里返回的 config 是普通的js对象，因此和 i18nrc.js 是一样的
        expect(config).toEqual(require('../../template/i18nrc.js'))
      })

      it('指定js文件路径路径', async () => {
        const config = await readConfig({
          path: path.resolve(__dirname, '../../template/i18nrc.js'),
          isFile: true,
        })
        expect(spyLog).toHaveBeenLastCalledWith(
          expect.stringContaining(''),
          expect.stringContaining('i18nrc.js'),
        )
        expect(spyLog).toHaveBeenCalledTimes(1)
        // 这里返回的 config 是普通的js对象，因此和 i18nrc.js 是一样的
        expect(config).toEqual(require('../../template/i18nrc.js'))
      })

      it('指定ts文件路径路径', async () => {
        const config = await readConfig({
          path: path.resolve(__dirname, '../../template/i18nrc.ts'),
          isFile: true,
        })
        expect(spyLog).toHaveBeenLastCalledWith(
          expect.stringContaining(''),
          expect.stringContaining('i18nrc.ts'),
        )
        expect(spyLog).toHaveBeenCalledTimes(1)
        // 这里返回的 config 是普通的js对象，因此和 i18nrc.js 是一样的
        expect(config).toEqual(require('../../template/i18nrc.js'))
      })
    })

    describe('异常操作', () => {
      afterEach(() => {
        vi.clearAllMocks()
      })

      it('配置文件不存在', async () => {
        const spyExit = vi.spyOn(process, 'exit')
        const spyLogo = vi.spyOn(console, 'log')
        spyExit.mockImplementation(() => Promise.resolve(undefined as never))
        await readConfig({
          path: './abc.js',
          isFile: true,
        })
        expect(spyLogo).toHaveBeenLastCalledWith(
          '❌',
          expect.stringMatching('Cannot find module'),
        )
      })

      it('配置文件不是对象格式', async () => {
        const spyExit = vi.spyOn(process, 'exit')
        const spyLogo = vi.spyOn(console, 'log')
        spyExit.mockImplementation(() => Promise.resolve(undefined as never))
        await readConfig({
          path: path.join(__dirname, '../i18n/non_object_config.ts'),
          isFile: true,
        })
        expect(spyLogo).toHaveBeenLastCalledWith(
          '❌',
          expect.stringMatching('配置文件不是有效配置'),
        )
      })

      it('配置文件是空对象', async () => {
        const spyExit = vi.spyOn(process, 'exit')
        const spyLogo = vi.spyOn(console, 'log')
        spyExit.mockImplementation(() => Promise.resolve(undefined as never))
        await readConfig({
          path: path.join(__dirname, '../i18n/empty_object_config.ts'),
          isFile: true,
        })
        expect(spyLogo).toHaveBeenLastCalledWith(
          '❌',
          expect.stringMatching('配置文件为空'),
        )
      })
    })
  })

  // NOTE 不知道为何，这个顺序在读取配置前的话，整个测试进程会崩溃
  describe('生成配置', () => {
    const readFileSyncFuncName = 'readFileSync'
    const writeFileSyncFuncName = 'writeFileSync'
    const spyReadFile = vi.spyOn(fs, readFileSyncFuncName)
    const spyWriteFile = vi.spyOn(fs, writeFileSyncFuncName)
    expect(spyReadFile.getMockName()).toBe(readFileSyncFuncName)
    expect(spyWriteFile.getMockName()).toBe(writeFileSyncFuncName)

    const logSuccessFuncName = 'log'
    const spyLog = vi.spyOn(console, logSuccessFuncName)
    expect(spyLog.getMockName()).toBe(logSuccessFuncName)

    beforeEach(() => {
      vi.clearAllMocks()
    })

    it('操作成功', () => {
      spyReadFile.mockImplementation(() => '')
      spyWriteFile.mockImplementation(() => '')
      initConfig()
      expect(spyReadFile).toHaveBeenCalled()
      expect(spyWriteFile).toHaveBeenCalled()
      expect(spyLog).toHaveBeenLastCalledWith(
        '✅',
        expect.stringContaining('初始化配置完成'),
        '\n',
      )
    })

    it('操作失败', () => {
      const errMsg = '操作失败'
      spyReadFile.mockImplementation(() => {
        throw errMsg
      })
      spyWriteFile.mockImplementation(() => '')
      initConfig()
      expect(spyReadFile).toHaveBeenCalled()
      expect(spyWriteFile).not.toHaveBeenCalled()
      expect(spyLog).toHaveBeenLastCalledWith(
        '❌',
        expect.stringContaining(errMsg),
      )
    })
  })
})
