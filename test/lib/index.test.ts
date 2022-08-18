import { describe, it, expect } from 'vitest'
import { getCurrentLib } from '../utils'

const { setI18N, i18n } = getCurrentLib()

describe('基础功能验证', () => {
  const basicLangs = {
    en: {
      验证的文本: 'Verification text',
      测试的内容: 'Test content',
      '你好世界!': 'Hello World!',
    },
  }

  it('未配置langs及locale，i18n 函数的返回值是原本的翻译内容', () => {
    setI18N()
    Object.entries(basicLangs['en']).forEach(([text]) => {
      expect(i18n(text)).toBe(text)
    })
  })

  it('配置langs未配置locale，i18n函数的返回值是原本的翻译内容', () => {
    setI18N({
      langs: basicLangs,
    })

    Object.entries(basicLangs['en']).forEach(([text, trText]) => {
      expect(i18n(text)).toBe(text)
      expect(i18n(text)).not.toBe(trText)
    })
  })

  it('配置locale未配置langs，i18n函数的返回值是原本的翻译内容', () => {
    setI18N({
      langs: undefined,
      locale: 'en',
    })

    Object.entries(basicLangs['en']).forEach(([text, trText]) => {
      expect(i18n(text)).toBe(text)
      expect(i18n(text)).not.toBe(trText)
    })
  })

  it('配置locale及langs，i18n函数的返回值是目标语言的翻译内容', () => {
    setI18N({
      langs: basicLangs,
      locale: 'en',
    })

    Object.entries(basicLangs['en']).forEach(([text, trText]) => {
      expect(i18n(text)).toBe(trText)
      expect(i18n(text)).not.toBe(text)
    })
  })

  it('配置locale及langs，但是没有对应目前语言的语言包，i18n函数的返回值是原本的翻译内容', () => {
    setI18N({
      langs: basicLangs,
      locale: 'jp',
    })

    Object.entries(basicLangs['en']).forEach(([text, trText]) => {
      expect(i18n(text)).toBe(text)
      expect(i18n(text)).not.toBe(trText)
    })
  })

  it('配置locale及langs，当前文本没有对应的翻译文本，i18n函数的返回值是原本的翻译内容', () => {
    setI18N({
      langs: basicLangs,
      locale: 'en',
    })

    Object.entries(basicLangs['en']).forEach(([text, trText]) => {
      const newText = '测试' + text
      expect(i18n(newText)).toBe(newText)
      expect(i18n(newText)).not.toBe(trText)
    })
  })
})

describe('动态参数验证', () => {
  it('基本功能', () => {
    expect(i18n('你好{0}', '世界')).toBe('你好世界')

    expect(i18n('你好{0}，我是{1}', '张三', '李四')).toBe('你好张三，我是李四')

    expect(
      i18n(
        '我叫{0}，今年{1}岁，来自{2}，是一名{3}',
        '王尼玛',
        22,
        '火星',
        '码农',
      ),
    ).toBe('我叫王尼玛，今年22岁，来自火星，是一名码农')
  })

  it('字符串中参数多于真实参数，动态参数的模板会原样输出', () => {
    expect(i18n('你好{0}')).toBe('你好{0}')

    expect(i18n('你好{0}，我是{1}', '张三')).toBe('你好张三，我是{1}')

    expect(i18n('我叫{0}，今年{1}岁，来自{2}，是一名{3}', '王尼玛', 22)).toBe(
      '我叫王尼玛，今年22岁，来自{2}，是一名{3}',
    )
  })

  it('字符串中参数少于真实参数，多余的参数不会被输出', () => {
    expect(i18n('你好{0}', '世界', '!')).toBe('你好世界')

    expect(i18n('你好{0}，我是{1}', '张三', '李四', '!', '!')).toBe(
      '你好张三，我是李四',
    )

    expect(
      i18n(
        '我叫{0}，今年{1}岁，来自{2}，是一名{3}',
        '王尼玛',
        22,
        '火星',
        '码农',
        '!',
        '!',
        '!',
        '!',
        '!',
        '!',
        '!',
      ),
    ).toBe('我叫王尼玛，今年22岁，来自火星，是一名码农')
  })

  it('设置起始下标', () => {
    setI18N({
      beginIndex: '1',
    })
    expect(i18n('你好{0}', '世界')).toBe('你好世界')

    setI18N({
      beginIndex: 1,
    })
    expect(i18n('你好{0}', '世界')).not.toBe('你好世界')
    expect(i18n('你好{1}', '世界')).toBe('你好世界')

    setI18N({
      beginIndex: 2,
    })
    expect(i18n('你好{0}，我是{1}', '张三', '李四')).not.toBe(
      '你好张三，我是李四',
    )
    expect(i18n('你好{2}，我是{3}', '张三', '李四')).toBe('你好张三，我是李四')

    setI18N({
      beginIndex: 10,
    })

    expect(
      i18n(
        '我叫{0}，今年{1}岁，来自{2}，是一名{3}',
        '王尼玛',
        22,
        '火星',
        '码农',
      ),
    ).not.toBe('我叫王尼玛，今年22岁，来自火星，是一名码农')

    expect(
      i18n(
        '我叫{0}，今年{1}岁，来自{2}，是一名{3}',
        '王尼玛',
        22,
        '火星',
        '码农',
      ),
    ).toBe('我叫{0}，今年{1}岁，来自{2}，是一名{3}')

    expect(
      i18n(
        '我叫{10}，今年{11}岁，来自{12}，是一名{13}',
        '王尼玛',
        22,
        '火星',
        '码农',
      ),
    ).toBe('我叫王尼玛，今年22岁，来自火星，是一名码农')
  })
})
