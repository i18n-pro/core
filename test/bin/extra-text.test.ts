import { readFileSync } from 'fs'
import { join } from 'path'
import { binExtraText } from '../utils'

const { extraTextFromT } = binExtraText

describe('验证翻译文本提取功能', () => {
  const content = readFileSync(join(__dirname, '../i18n/text.ts'), {
    encoding: 'utf-8',
  })

  const successTexts = [
    '中间 有空格',
    '普通文本',
    '普通文本{0}',
    '我叫{0}，今年{1}岁，来自{2}，是一名{3}',
    'a',
    'b',
  ]

  const errrorTexts = [
    '${foo}',
    '你好\\n啊', // NOTE 这里需要是\\n，不然匹配不正确
    '你好\t啊',
    '  前面有空格',
    '后面空格 ',
  ]

  describe('验证规范文本提取', () => {
    it('默认提取', () => {
      const success = []
      const error = []
      extraTextFromT(content, 't', success, error)
      expect(success).toEqual(successTexts)
    })

    it('自定义函数名（t -> i18n）', () => {
      const success = []
      const error = []
      extraTextFromT(content.replaceAll('t(', 'i18n('), 'i18n', success, error)
      expect(success).toEqual(successTexts)
    })
  })

  describe('验证不规范文本提取', () => {
    it('默认提取', () => {
      const success = []
      const error = []
      const texts = extraTextFromT(content, 't', success, error)
      expect(error[1]).toBe(errrorTexts[1])
    })

    it('未知匹配函数名i18n', () => {
      const success = []
      const error = []
      const texts = extraTextFromT(content, 'i18n', success, error)
      expect(success).toEqual([])
    })
  })
})
