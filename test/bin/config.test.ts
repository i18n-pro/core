import fs from 'fs'
import path from 'path'
import { binConfig } from '../utils'

const { initConfig, readConfig } = binConfig

describe('验证配置文件', () => {
  describe('生成配置', () => {
    const copyFileSyncFuncName = 'copyFileSync'
    const spyFs = vi.spyOn(fs, copyFileSyncFuncName)
    expect(spyFs.getMockName()).toBe(copyFileSyncFuncName)

    const logSuccessFuncName = 'log'
    const spyLog = vi.spyOn(console, logSuccessFuncName)
    expect(spyLog.getMockName()).toBe(logSuccessFuncName)

    it('操作成功', () => {
      spyFs.mockImplementation(() => undefined)
      initConfig()
      expect(spyFs).toHaveBeenCalled()
      expect(spyLog).toHaveBeenLastCalledWith(
        '✅',
        expect.stringContaining('初始化配置完成'),
        '\n',
      )
    })

    it('操作失败', () => {
      const errMsg = '操作失败'
      spyFs.mockImplementation(() => {
        throw errMsg
      })
      initConfig()
      expect(spyFs).toHaveBeenCalled()
      expect(spyLog).toHaveBeenLastCalledWith(
        '❌',
        expect.stringContaining(errMsg),
      )
    })
  })

  describe('读取配置', () => {
    it('正常操作', () => {
      const config = readConfig()
      expect(config).toEqual(require('../../i18nrc'))
    })

    describe('异常操作', () => {
      afterEach(() => {
        vi.clearAllMocks()
      })

      it('配置文件不存在', () => {
        const spyExit = vi.spyOn(process, 'exit')
        const spyLogo = vi.spyOn(console, 'log')
        spyExit.mockImplementation(() => Promise.resolve(undefined as never))
        readConfig('./abc.js')
        expect(spyLogo).toHaveBeenLastCalledWith(
          '❌',
          expect.stringMatching('Cannot find module'),
        )
      })

      it('配置文件不是对象格式', () => {
        const spyExit = vi.spyOn(process, 'exit')
        const spyLogo = vi.spyOn(console, 'log')
        spyExit.mockImplementation(() => Promise.resolve(undefined as never))
        readConfig(path.join(__dirname, '../i18n/non_object_config.ts'))
        expect(spyLogo).toHaveBeenLastCalledWith(
          '❌',
          expect.stringMatching('配置文件不是有效配置'),
        )
      })

      it('配置文件是空对象', () => {
        const spyExit = vi.spyOn(process, 'exit')
        const spyLogo = vi.spyOn(console, 'log')
        spyExit.mockImplementation(() => Promise.resolve(undefined as never))
        readConfig(path.join(__dirname, '../i18n/empty_object_config.ts'))
        expect(spyLogo).toHaveBeenLastCalledWith(
          '❌',
          expect.stringMatching('配置文件为空'),
        )
      })
    })
  })
})
