import { readFileSync } from 'fs'
import { join } from 'path'
import { binExtraText } from '../utils'

const { extraTextFromT, extraTextFromTDotT } = binExtraText

describe('验证 t 翻译文本提取功能', () => {
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

describe('验证 t.t 翻译文本提取功能', () => {
  const content = readFileSync(join(__dirname, '../i18n/text2.ts'), {
    encoding: 'utf-8',
  })

  const successTexts = [
    '中间 有空格',
    '普通文本',
    '普通文本{0}',
    '普通文案',
    'a',
    '自定义key',
    '自定义key',
  ]

  const errorTexts = [
    '${foo}',
    '你好\\n啊', // NOTE 这里需要是\\n，不然匹配不正确
    '你好\\t啊',
    '  前面有空格',
    '后面空格 ',
    '当前自定义 key=`test`，配置了不一样的文案（`普通文案` 和 `a`），应该满足 key 与文案一对一的关系',
  ]

  const successKeys = [
    '中间 有空格的key',
    '普通文本key',
    '普通文本',
    'test',
    'test',
    'key2',
    'key3',
  ]

  const errorKeys = [
    '${key}',
    'key\\n中间', // NOTE 这里需要是\\n，不然匹配不正确
    'key\\t中间',
    '  key前面有空格',
    'key后面空格 ',
  ]

  const expectKeyTextMap = {
    '中间 有空格的key': '中间 有空格',
    普通文本key: '普通文本',
    普通文本: '普通文本{0}',
    test: '普通文案',
    key2: '自定义key',
    key3: '自定义key',
  }

  const expectTextKeyMap = {
    '中间 有空格': ['中间 有空格的key'],
    普通文本: ['普通文本key'],
    '普通文本{0}': ['普通文本'],
    普通文案: ['test'],
    自定义key: ['key2', 'key3'],
  }

  function getParams() {
    return {
      keySuccess: [],
      keyError: [],
      keyTextMap: {},
      textKeyMap: {},
      textSuccess: [],
      textError: [],
    }
  }

  describe('验证规范文本提取', () => {
    it('默认提取', () => {
      const {
        keySuccess,
        keyError,
        keyTextMap,
        textKeyMap,
        textSuccess,
        textError,
      } = getParams()
      extraTextFromTDotT(
        content,
        't',
        keyTextMap,
        textKeyMap,
        textSuccess,
        textError,
        keySuccess,
        keyError,
      )
      expect(textSuccess).toEqual(successTexts)
      expect(textError).toEqual(errorTexts)
      expect(keySuccess).toEqual(successKeys)
      expect(keyError).toEqual(errorKeys)
      expect(keyTextMap).toEqual(expectKeyTextMap)
      expect(textKeyMap).toEqual(expectTextKeyMap)
    })

    it('自定义函数名（t -> i18n）', () => {
      const {
        keySuccess,
        keyError,
        keyTextMap,
        textKeyMap,
        textSuccess,
        textError,
      } = getParams()
      extraTextFromTDotT(
        content.replaceAll(/t\.t\(/g, 'i18n.t('),
        'i18n',
        keyTextMap,
        textKeyMap,
        textSuccess,
        textError,
        keySuccess,
        keyError,
      )
      expect(textSuccess).toEqual(successTexts)
      expect(textError).toEqual(errorTexts)
      expect(keySuccess).toEqual(successKeys)
      expect(keyError).toEqual(errorKeys)
      expect(keyError).toEqual(errorKeys)
      expect(keyTextMap).toEqual(expectKeyTextMap)
      expect(textKeyMap).toEqual(expectTextKeyMap)
    })
  })

  describe('验证不规范文本提取', () => {
    it('未知匹配函数名i18n', () => {
      const {
        keySuccess,
        keyError,
        keyTextMap,
        textKeyMap,
        textSuccess,
        textError,
      } = getParams()
      extraTextFromTDotT(
        content,
        'i18n',
        keyTextMap,
        textKeyMap,
        textSuccess,
        textError,
        keySuccess,
        keyError,
      )
      expect(keySuccess).toEqual([])
      expect(keyError).toEqual([])
      expect(textSuccess).toEqual([])
      expect(textSuccess).toEqual([])
      expect(keyTextMap).toEqual({})
      expect(textKeyMap).toEqual({})
    })
  })
})
