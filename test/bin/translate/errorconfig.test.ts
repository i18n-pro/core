import { describe, it, vi, expect } from 'vitest'
import { binTranslate, binUtils } from '../../utils'

const { setTranslateConfig } = binTranslate

describe('错误配置', () => {
  it('错误配置translator', () => {
    const spyConsole = vi.spyOn(binUtils, 'logError')
    const spyExit = vi.spyOn(process, 'exit')
    spyExit.mockImplementation((number) => {
      throw `over`
    })
    try {
      setTranslateConfig({
        translator: 'xxx',
      })
    } catch (error) {
      expect(error).toBe('over')
    }

    expect(spyExit).toHaveBeenLastCalledWith(1)

    expect(spyConsole).toHaveBeenLastCalledWith(
      expect.stringContaining(`translator = xxx`),
    )

    expect(spyConsole).toHaveBeenLastCalledWith(
      expect.stringMatching(/不存在.+的配置项/),
    )
  })

  describe('错误配置translatorConfig', () => {
    it('未配置对应配置项', () => {
      const translator = 'googlex'
      const spyConsole = vi.spyOn(binUtils, 'logError')
      const spyExit = vi.spyOn(process, 'exit')
      spyExit.mockImplementation(() => {
        throw `over`
      })
      try {
        setTranslateConfig({
          translator,
        })
      } catch (error) {
        expect(error).toBe('over')
      }

      expect(spyExit).toHaveBeenLastCalledWith(1)

      expect(spyConsole).toHaveBeenLastCalledWith(
        expect.stringContaining(`没有配置对应配置内容`),
      )
      expect(spyConsole).toHaveBeenLastCalledWith(
        expect.stringContaining(`translator = ${translator}`),
      )
      expect(spyConsole).toHaveBeenLastCalledWith(
        expect.stringContaining(`${translator}Config`),
      )
    })

    it('配置了空的配置项', () => {
      const spyConsole = vi.spyOn(binUtils, 'logError')
      const spyExit = vi.spyOn(process, 'exit')
      spyExit.mockImplementation(() => {
        throw `over`
      })
      try {
        setTranslateConfig({
          translator: 'baidu',
          baiduConfig: {},
        })
      } catch (error) {
        expect(error).toBe('over')
      }

      expect(spyExit).toHaveBeenLastCalledWith(1)

      expect(spyConsole).toHaveBeenLastCalledWith(
        expect.stringContaining(`没有配置对应配置内容`),
      )
      expect(spyConsole).toHaveBeenLastCalledWith(
        expect.stringContaining(`translator = baidu`),
      )
      expect(spyConsole).toHaveBeenLastCalledWith(
        expect.stringContaining(`baiduConfig`),
      )
    })
  })
})
