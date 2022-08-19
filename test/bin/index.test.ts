import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { binIndex, binConfig, changeProcessArgv, lib } from '../utils'
import langs from '../../i18n/langs.json'

const { execCommand } = binIndex

describe('验证命令行响应命令', () => {
  describe('初始化配置命令', () => {
    it('是否能正确响应', () => {
      // 修改命令行参数
      changeProcessArgv('init')
      const spy = vi.spyOn(binConfig, 'initConfig')
      expect(spy.getMockName()).toBe('initConfig')
      execCommand()
      // 正确匹配命令
      expect(spy).toHaveBeenCalledTimes(1)
    })

    it('是否正确匹配英文参数', () => {
      // 修改命令行参数
      changeProcessArgv('init', '', '', '-L', 'en')

      const spyConfig = vi.spyOn(binConfig, 'initConfig')
      expect(spyConfig.getMockName()).toBe('initConfig')

      const spyLib = vi.spyOn(lib, 'setI18N')
      expect(spyLib.getMockName()).toBe('setI18N')

      execCommand()
      // 正确匹配命令
      expect(spyConfig).toHaveBeenCalledTimes(1)
      // 正确匹配语言
      expect(spyLib).toHaveBeenCalledTimes(1)
      expect(spyLib).toHaveBeenCalledWith({
        locale: 'en',
        langs,
      })
    })

    it('生成的配置文件是否OK', () => {
      // 修改命令行参数
      changeProcessArgv('init')

      const spyConfig = vi.spyOn(binConfig, 'initConfig')
      expect(spyConfig.getMockName()).toBe('initConfig')

      execCommand()
      // 正确匹配命令
      expect(spyConfig).toHaveBeenCalledTimes(1)

      // 模板内容
      const templateContent = readFileSync(
        join(__dirname, '../../template/i18nrc.js'),
        'utf-8',
      )
      // 生成的配置文件内容
      const config = readFileSync(join(process.cwd(), 'i18nrc.js'), 'utf-8')

      expect(config).toBe(templateContent)
    })
  })
})
