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

  describe('查看帮助', () => {
    type Item = [
      string, // 用例描述
      string, // 命令
      'zh' | 'en',
      '命令' | 'command',
      '用法' | 'usage',
    ]

    const matrix: Item[] = [
      ['help', 'help', 'zh', '命令', '用法'],
      ['h', 'h', 'zh', '命令', '用法'],
      ['help -L en', 'help', 'en', 'command', 'usage'],
      ['h -L en', 'h', 'en', 'command', 'usage'],
    ]

    it.each(matrix)(
      '是否能正确响应 %s',
      (dscrption, command, locale, cm, usage) => {
        // 修改命令行参数
        changeProcessArgv(command, '', '', '-L', locale)
        const spy = vi.spyOn(console, 'log')
        expect(spy.getMockName()).toBe('log')
        execCommand()
        // 正确匹配命令
        expect(spy).toHaveBeenCalledTimes(1)
        // 简单验证是否正常输出
        expect(spy).toHaveBeenLastCalledWith(expect.stringContaining(cm))
        expect(spy).toHaveBeenLastCalledWith(expect.stringContaining(usage))
        expect(spy).toHaveBeenLastCalledWith(expect.stringContaining('i18n'))
      },
    )
  })

  describe('查看版本', () => {
    type Item = [
      string, // 用例描述
      string, // 命令
      'zh' | 'en',
      '当前版本' | 'Current version',
    ]

    const matrix: Item[] = [
      ['version', 'version', 'zh', '当前版本'],
      ['v', 'v', 'zh', '当前版本'],
      ['version -L en', 'version', 'en', 'Current version'],
      ['v -L en', 'v', 'en', 'Current version'],
    ]

    it.each(matrix)('是否能正确响应 %s', (dscrption, command, locale, tip) => {
      // 修改命令行参数
      changeProcessArgv(command, '', '', '-L', locale)
      const spy = vi.spyOn(console, 'log')
      expect(spy.getMockName()).toBe('log')
      execCommand()
      // 正确匹配命令
      expect(spy).toHaveBeenCalledTimes(1)
      // 简单验证是否正常输出
      expect(spy).toHaveBeenLastCalledWith(
        '\n',
        expect.stringContaining(tip),
        '\n',
      )
      expect(spy).toHaveBeenLastCalledWith(
        '\n',
        expect.stringContaining(require('../../package.json').version),
        '\n',
      )
    })
  })

  describe('命令错误', () => {
    type Item = [
      string, // 用例描述
      string, // 命令
      'zh' | 'en',
      '输入命令有误' | 'Error in input command',
    ]

    const matrix: Item[] = [
      ['xxx', 'xxx', 'zh', '输入命令有误'],
      ['xxx -L en', 'xxx', 'en', 'Error in input command'],
    ]

    it.each(matrix)('是否能正确响应 %s', (dscrption, command, locale, tip) => {
      // 修改命令行参数
      changeProcessArgv(command, '', '', '-L', locale)
      const spy = vi.spyOn(console, 'log')
      expect(spy.getMockName()).toBe('log')
      execCommand()
      // 正确匹配命令
      expect(spy).toHaveBeenCalledTimes(1)
      // 简单验证是否正常输出
      expect(spy).toHaveBeenLastCalledWith(expect.stringContaining(tip))
    })
  })
})
