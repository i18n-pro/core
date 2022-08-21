import fs from 'fs'
import { binConfig } from '../utils'

const { initConfig } = binConfig

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
})
