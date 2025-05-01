import { lib } from '../utils'
import { I18nState } from '../../src/lib'
import { describe, expect } from 'vitest'

const { initI18n } = lib

/**
 * 获取未配置 formatter 的警告提示信息
 * @param text 翻译文本
 * @param template 动态参数模板
 * @param formatterName 格式化回调函数名
 * @returns
 */
function getNoFormatterWarn(
  text: string,
  template: string,
  formatterName: string,
) {
  return `The dynamic parameter {${template}} in the translated text ${text} is not configured with the corresponding format callback ${formatterName}`
}

/**
 * 获取配置了 formatter，但未配置 locale 的警告提示信息
 * @param formatterName
 * @returns
 */
function getNoLocaleFormatterWarn(formatterName: string) {
  return `The locale is not currently configured and may affect the logic in the format callback ${formatterName}`
}

/**
 * 获取单格式化回调执行出错时的错误信息
 * @param text 翻译文本
 * @param template 动态参数模板
 * @param formatterName 格式化回调函数名
 * @param errorMsg 模拟错误信息
 * @returns
 */
function getFormatterRunError(
  text: string,
  template: string,
  formatterName: string,
  errorMsg: string | Error,
) {
  return [
    `An error occurred in calling the corresponding format callback ${formatterName} for dynamic parameter {${template}} in translated text ${text}. The callback logic needs to be checked. The error message is as follows: `,
    errorMsg,
  ]
}

/**
 * 获取未正确配置复数动态参数配置的警告
 * @param text 翻译文本
 * @param template 动态参数模板
 * @returns
 */
function getInvalidPluralWarn(text: string, template: string) {
  return `The plural dynamic parameter {${template}} in the translated text ${text} does not contain the text that needs to be plural, for example: t('I have {p0 apple}')`
}

describe('initI18n', () => {
  it('未设置namespace提示警告', () => {
    const spyWarn = vi.spyOn(console, 'warn')
    initI18n({})
    expect(spyWarn).toHaveBeenCalledTimes(1)
    expect(spyWarn).toHaveBeenLastCalledWith(
      'No namespace is set, and using with other libraries can cause bugs',
    )
  })

  it('相同namespace提示错误', () => {
    const spyError = vi.spyOn(console, 'error')
    spyError.mockClear()
    initI18n({ namespace: 'default' })
    expect(spyError).toHaveBeenCalledTimes(1)
    expect(spyError).toHaveBeenLastCalledWith(
      "A configuration with the same namespace 'default' already exists, so you may need to redefine one",
    )
  })
})

describe('基础功能验证', () => {
  const { setI18n, t } = initI18n({ namespace: 'basic' })

  const basicLangs = {
    en: {
      验证的文本: 'Verification text',
      测试的内容: 'Test content',
      '你好世界!': 'Hello World!',
    },
  }

  it('未配置langs及locale，i18n 函数的返回值是原本的翻译内容', () => {
    Object.entries(basicLangs['en']).forEach(([text]) => {
      expect(t(text)).toBe(text)
    })
  })

  it('配置langs未配置locale，i18n函数的返回值是原本的翻译内容', () => {
    Object.entries(basicLangs['en']).forEach(([text, trText]) => {
      expect(t(text)).toBe(text)
      expect(t(text)).not.toBe(trText)
    })
  })

  it('配置locale未配置langs，i18n函数的返回值是原本的翻译内容', () => {
    setI18n({
      langs: { en: {} },
      locale: 'en',
    })

    Object.entries(basicLangs['en']).forEach(([text, trText]) => {
      expect(t(text)).toBe(text)
      expect(t(text)).not.toBe(trText)
    })
  })

  it('配置locale及langs，i18n函数的返回值是目标语言的翻译内容', () => {
    setI18n({
      langs: basicLangs,
      locale: 'en',
    })

    Object.entries(basicLangs['en']).forEach(([text, trText]) => {
      expect(t(text)).toBe(trText)
      expect(t(text)).not.toBe(text)
    })
  })

  it('配置locale及langs，但是没有对应目前语言的语言包，i18n函数的返回值是原本的翻译内容', () => {
    setI18n({
      langs: basicLangs,
      locale: 'jp',
    })

    Object.entries(basicLangs['en']).forEach(([text, trText]) => {
      expect(t(text)).toBe(text)
      expect(t(text)).not.toBe(trText)
    })
  })

  it('配置locale及langs，当前文本没有对应的翻译文本，i18n函数的返回值是原本的翻译内容', () => {
    setI18n({
      langs: basicLangs,
      locale: 'en',
    })

    Object.entries(basicLangs['en']).forEach(([text, trText]) => {
      const newText = '测试' + text
      expect(t(newText)).toBe(newText)
      expect(t(newText)).not.toBe(trText)
    })
  })
})

describe('setI18n', () => {
  it('没用异步加载的 setI18n', async () => {
    const namespace = 'setI18n'
    const { setI18n } = initI18n({ namespace })
    const langs1 = {
      en: {
        1: 'en_1',
      },
    }
    const langs2 = {
      en: {
        2: 'en_2',
      },
    }
    const langs3 = {
      en: {
        3: 'en_3',
      },
      jp: {
        1: 'jp_1',
      },
    }

    let state = await setI18n({})

    expect(state).toEqual({ namespace })

    state = await setI18n({ langs: langs1 })
    expect(state).toEqual({ namespace, langs: langs1 })

    state = await setI18n({ langs: langs2, locale: 'en' })
    expect(state).toEqual({
      namespace,
      langs: {
        en: {
          ...langs1.en,
          ...langs2.en,
        },
      },
      locale: 'en',
    })

    state = await setI18n({ langs: langs3 })
    expect(state).toEqual({
      namespace,
      locale: 'en',
      langs: {
        en: {
          ...langs1.en,
          ...langs2.en,
          ...langs3.en,
        },
        jp: {
          ...langs3.jp,
        },
      },
    })
  })

  it('异步加载的 setI18n', async () => {
    const namespace = 'async setI18n'
    const zh = {
      'hello world': '你好世界',
    }
    const en = {
      'hello world': 'hello world',
    }

    const getEn = () =>
      new Promise<Record<string, string>>((resolve) => {
        setTimeout(() => {
          resolve(en)
        }, 1000)
      })

    const { setI18n } = initI18n({
      namespace,
      langs: {
        en: getEn,
        zh,
      },
    })
    const langs = {
      en: {
        3: 'en_3',
      },
      jp: {
        1: 'jp_1',
      },
    }

    // 空状态
    let state = await setI18n({})
    expect(state).toEqual({ namespace, langs: { en: getEn, zh } })

    // 异步加载语言包，并扩展语言包
    state = await setI18n({ locale: 'en', langs })
    expect(state).toEqual({
      namespace,
      locale: 'en',
      langs: {
        en: { ...en, ...langs.en },
        zh,
        jp: langs.jp,
      },
    })

    // 切换至中文
    state = await setI18n({ locale: 'zh' })
    expect(state).toEqual({
      namespace,
      locale: 'zh',
      langs: {
        en: { ...en, ...langs.en },
        zh,
        jp: langs.jp,
      },
    })
  })
})

describe('动态参数验证', () => {
  const { t } = initI18n({ namespace: 'dynamic-parameter' })

  it('基本功能', () => {
    /** t */
    expect(t('你好{0}', '世界')).toBe('你好世界')

    expect(t('你好{0}，我是{1}', '张三', '李四')).toBe('你好张三，我是李四')

    expect(
      t('我叫{0}，今年{1}岁，来自{2}，是一名{3}', '王尼玛', 22, '火星', '码农'),
    ).toBe('我叫王尼玛，今年22岁，来自火星，是一名码农')

    /** t.t */
    expect(t.t('xxx', '你好{0}', '世界')).toBe('你好世界')

    expect(t.t('xxx', '你好{0}，我是{1}', '张三', '李四')).toBe(
      '你好张三，我是李四',
    )

    expect(
      t.t(
        'xxx',
        '我叫{0}，今年{1}岁，来自{2}，是一名{3}',
        '王尼玛',
        22,
        '火星',
        '码农',
      ),
    ).toBe('我叫王尼玛，今年22岁，来自火星，是一名码农')
  })

  it('字符串中参数多于真实参数，动态参数的模板会原样输出', () => {
    /** t */
    expect(t('你好{0}')).toBe('你好{0}')

    expect(t('你好{0}，我是{1}', '张三')).toBe('你好张三，我是{1}')

    expect(t('我叫{0}，今年{1}岁，来自{2}，是一名{3}', '王尼玛', 22)).toBe(
      '我叫王尼玛，今年22岁，来自{2}，是一名{3}',
    )

    /** t.t */
    expect(t.t('xxx', '你好{0}')).toBe('你好{0}')

    expect(t.t('xxx', '你好{0}，我是{1}', '张三')).toBe('你好张三，我是{1}')

    expect(
      t.t('xxx', '我叫{0}，今年{1}岁，来自{2}，是一名{3}', '王尼玛', 22),
    ).toBe('我叫王尼玛，今年22岁，来自{2}，是一名{3}')
  })

  it('字符串中参数少于真实参数，多余的参数不会被输出', () => {
    /** t */
    expect(t('你好{0}', '世界', '!')).toBe('你好世界')

    expect(t('你好{0}，我是{1}', '张三', '李四', '!', '!')).toBe(
      '你好张三，我是李四',
    )

    expect(
      t(
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

    /** t.t */
    expect(t.t('xxx', '你好{0}', '世界', '!')).toBe('你好世界')

    expect(t.t('xxx', '你好{0}，我是{1}', '张三', '李四', '!', '!')).toBe(
      '你好张三，我是李四',
    )

    expect(
      t.t(
        'xxx',
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

  describe('设置起始下标', () => {
    it('非数字', () => {
      const { t } = initI18n({
        namespace: 'beginIndex-no-number',
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        beginIndex: '1' as any,
      })
      expect(t('你好{0}', '世界')).toBe('你好世界')
      expect(t.t('xxx', '你好{0}', '世界')).toBe('你好世界')
    })

    it('数字1', () => {
      const { t } = initI18n({
        namespace: 'beginIndex-1',
        beginIndex: 1,
      })
      /** t */
      expect(t('你好{0}', '世界')).not.toBe('你好世界')
      expect(t('你好{1}', '世界')).toBe('你好世界')

      /** t.t */
      expect(t.t('xxx', '你好{0}', '世界')).not.toBe('你好世界')
      expect(t.t('xxx', '你好{1}', '世界')).toBe('你好世界')
    })

    it('数字2', () => {
      const { t } = initI18n({
        namespace: 'beginIndex-2',
        beginIndex: 2,
      })

      /** t */
      expect(t('你好{0}，我是{1}', '张三', '李四')).not.toBe(
        '你好张三，我是李四',
      )

      expect(t('你好{2}，我是{3}', '张三', '李四')).toBe('你好张三，我是李四')

      /** t.t */
      expect(t.t('xxx', '你好{0}，我是{1}', '张三', '李四')).not.toBe(
        '你好张三，我是李四',
      )

      expect(t.t('xxx', '你好{2}，我是{3}', '张三', '李四')).toBe(
        '你好张三，我是李四',
      )
    })

    it('数字10', () => {
      const { t } = initI18n({
        namespace: 'beginIndex-10',
        beginIndex: 10,
      })

      /** t */
      expect(
        t(
          '我叫{0}，今年{1}岁，来自{2}，是一名{3}',
          '王尼玛',
          22,
          '火星',
          '码农',
        ),
      ).not.toBe('我叫王尼玛，今年22岁，来自火星，是一名码农')

      expect(
        t(
          '我叫{0}，今年{1}岁，来自{2}，是一名{3}',
          '王尼玛',
          22,
          '火星',
          '码农',
        ),
      ).toBe('我叫{0}，今年{1}岁，来自{2}，是一名{3}')

      expect(
        t(
          '我叫{10}，今年{11}岁，来自{12}，是一名{13}',
          '王尼玛',
          22,
          '火星',
          '码农',
        ),
      ).toBe('我叫王尼玛，今年22岁，来自火星，是一名码农')
      /** t.t */
      expect(
        t.t(
          'xxx',
          '我叫{0}，今年{1}岁，来自{2}，是一名{3}',
          '王尼玛',
          22,
          '火星',
          '码农',
        ),
      ).not.toBe('我叫王尼玛，今年22岁，来自火星，是一名码农')

      expect(
        t.t(
          'xxx',
          '我叫{0}，今年{1}岁，来自{2}，是一名{3}',
          '王尼玛',
          22,
          '火星',
          '码农',
        ),
      ).toBe('我叫{0}，今年{1}岁，来自{2}，是一名{3}')

      expect(
        t.t(
          'xxx',
          '我叫{10}，今年{11}岁，来自{12}，是一名{13}',
          '王尼玛',
          22,
          '火星',
          '码农',
        ),
      ).toBe('我叫王尼玛，今年22岁，来自火星，是一名码农')
    })
  })
})

describe('格式化数字', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  const formatterName = 'formatNumber'
  const text1 = '我有{n0}个苹果，{N1}个香蕉和{n2}个梨'
  const trText1 = '我有5个苹果，4个香蕉和3个梨'

  it('未配置 formatNumber，并尝试大小写验证', () => {
    const { t } = initI18n({ namespace: 'format-number-no-config' })
    const lastWarnMsg = getNoFormatterWarn(text1, 'n2', formatterName)
    const spyWarn = vi.spyOn(console, 'warn')

    /** t */

    // 未配置时，默认走正常的匹配逻辑
    expect(t(text1, 5, 4, 3)).toBe(trText1)

    // 最后一次输出内容匹配
    expect(spyWarn).toHaveBeenLastCalledWith(lastWarnMsg)

    // 3次警告输出
    expect(spyWarn).toHaveBeenCalledTimes(3)

    /** t.t */
    spyWarn.mockClear()
    // 未配置时，默认走正常的匹配逻辑
    expect(t.t('xxx', text1, 5, 4, 3)).toBe(trText1)

    // 最后一次输出内容匹配
    expect(spyWarn).toHaveBeenLastCalledWith(lastWarnMsg)

    // 3次警告输出
    expect(spyWarn).toHaveBeenCalledTimes(3)
  })

  it('正确配置 formatNumber', () => {
    const formatNumber = vi.fn(({ payload, locale, t }) => {
      expect(locale).toBeUndefined()
      expect(t).toBeInstanceOf(Function)
      expect(t('你好{0}', '世界')).toBe('你好世界')
      return payload
    })

    const { setI18n, t } = initI18n({
      namespace: 'format-number-config',
      formatNumber,
      locale: undefined,
    })

    const trText2 = '我有15个苹果，14个香蕉和13个梨'
    const spyWarn = vi.spyOn(console, 'warn')

    /** t */

    // 根据格式化回调的值返回
    expect(t(text1, 5, 4, 3)).toBe(trText1)

    // 最后一次输出内容匹配
    expect(spyWarn).toHaveBeenLastCalledWith(
      getNoLocaleFormatterWarn(formatterName),
    )

    // 未配置locale有3次警告输出
    expect(spyWarn).toHaveBeenCalledTimes(3)

    /** t.t */

    // 根据格式化回调的值返回
    expect(t.t('xxx', text1, 5, 4, 3)).toBe(trText1)

    // 最后一次输出内容匹配
    expect(spyWarn).toHaveBeenLastCalledWith(
      getNoLocaleFormatterWarn(formatterName),
    )

    // 未配置locale有6次警告输出
    expect(spyWarn).toHaveBeenCalledTimes(6)

    formatNumber.mockImplementation(({ payload, locale }) => {
      expect(locale).toBe('zh')
      return payload + 10
    })

    setI18n({
      locale: 'zh',
    })

    // 清除之前的记录
    spyWarn.mockClear()

    // 根据格式化回调的值返回
    expect(t(text1, 5, 4, 3)).toBe(trText2)
    expect(t.t('xxx', text1, 5, 4, 3)).toBe(trText2)

    // 现在不应该有警告
    expect(spyWarn).toHaveBeenCalledTimes(0)
  })

  it('正确配置 formatNumber，模拟抛异常，并验证起始下标', () => {
    const errMsg = '模拟异常'
    const formatNumber = vi.fn(({ locale }) => {
      expect(locale).toBe('zh')
      throw errMsg
    })

    const { t } = initI18n({
      namespace: 'format-number-config-error',
      formatNumber,
      locale: 'zh',
      beginIndex: 10,
    })

    const text1 = '我有{n10}个苹果，{n11}个香蕉和{n12}个梨'
    const trText1 = '我有5个苹果，4个香蕉和3个梨'
    const spyWarn = vi.spyOn(console, 'warn')
    const spyError = vi.spyOn(console, 'error')

    /** t */

    // 如果formatter出错，还是走原有的匹配逻辑
    expect(t(text1, 5, 4, 3)).toBe(trText1)

    // 没有警告输出
    expect(spyWarn).toHaveBeenCalledTimes(0)

    // 会有三次错误输出
    expect(spyError).toHaveBeenCalledTimes(3)

    // 正确输出错误信息
    expect(spyError).toHaveBeenLastCalledWith(
      ...getFormatterRunError(text1, 'n12', formatterName, errMsg),
    )

    /** t.t */
    spyWarn.mockClear()
    spyError.mockClear()

    // 如果formatter出错，还是走原有的匹配逻辑
    expect(t.t('xxx', text1, 5, 4, 3)).toBe(trText1)

    // 没有警告输出
    expect(spyWarn).toHaveBeenCalledTimes(0)

    // 会有三次错误输出
    expect(spyError).toHaveBeenCalledTimes(3)

    // 正确输出错误信息
    expect(spyError).toHaveBeenLastCalledWith(
      ...getFormatterRunError(text1, 'n12', formatterName, errMsg),
    )
  })
})

describe('格式化货币', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  const formatterName = 'formatCurrency'
  const text1 = '他买房花了{c0}'
  const trText1 = '他买房花了200'

  it('未配置 formatCurrency', () => {
    const { t } = initI18n({
      namespace: 'format-currency-no-config',
      beginIndex: 0,
    })
    const lastWarnMsg = getNoFormatterWarn(text1, 'c0', formatterName)
    const spyWarn = vi.spyOn(console, 'warn')

    /** t */

    // 未配置时，默认走正常的匹配逻辑
    expect(t(text1, 200)).toBe(trText1)

    // 最后一次输出内容匹配
    expect(spyWarn).toHaveBeenLastCalledWith(lastWarnMsg)

    // 1次警告输出
    expect(spyWarn).toHaveBeenCalledTimes(1)

    /** t.t */

    spyWarn.mockClear()

    // 未配置时，默认走正常的匹配逻辑
    expect(t.t('xxx', text1, 200)).toBe(trText1)

    // 最后一次输出内容匹配
    expect(spyWarn).toHaveBeenLastCalledWith(lastWarnMsg)

    // 1次警告输出
    expect(spyWarn).toHaveBeenCalledTimes(1)
  })

  it('正确配置 formatCurrency', () => {
    const formatCurrency = vi.fn(({ payload, locale, t }) => {
      expect(locale).toBeUndefined()
      expect(t).toBeInstanceOf(Function)
      expect(t('你好{0}', '世界')).toBe('你好世界')
      expect(t.t('xxx', '你好{0}', '世界')).toBe('你好世界')
      return payload + '万'
    })

    const { setI18n, t } = initI18n({
      namespace: 'format-currency-config',
      beginIndex: 0,
      formatCurrency,
      locale: undefined,
    })

    const trText1 = '他买房花了200万'
    const trText2 = '他买房花了200W'
    const trText3 = '他买房花了￥200W'
    const spyWarn = vi.spyOn(console, 'warn')

    // 根据格式化回调的值返回
    expect(t(text1, 200)).toBe(trText1)
    expect(t.t('xxx', text1, 200)).toBe(trText1)

    // 最后一次输出内容匹配
    expect(spyWarn).toHaveBeenLastCalledWith(
      getNoLocaleFormatterWarn(formatterName),
    )

    // 未配置locale有1次警告输出
    expect(spyWarn).toHaveBeenCalledTimes(2)

    type Payload = {
      money: number // 货币
      base: 1 | 10 | 100 | 1000 | 10000 // 单位值，真实金额是 money x base
      show:
        | 'withUnit' // 100W
        | 'withUnitAndSymbol' // ￥100W
    }

    formatCurrency.mockImplementation(
      ({ payload, locale }: { payload: Payload; locale: string }) => {
        expect(locale).toBe('zh')
        const { money, base = 10000, show = 'withUnit' } = payload

        const baseUnitMap = {
          1: 'K',
          10: 'K',
          100: 'K',
          1000: 'K',
          10000: 'W',
        }

        return `${show === 'withUnitAndSymbol' ? '￥' : ''}${money}${
          baseUnitMap[base]
        }`
      },
    )

    setI18n({
      locale: 'zh',
    })

    // 清除之前的记录
    spyWarn.mockClear()

    // 根据格式化回调的值返回
    expect(
      t(text1, {
        money: 200,
      }),
    ).toBe(trText2)
    expect(
      t.t('xxx', text1, {
        money: 200,
      }),
    ).toBe(trText2)

    // 根据格式化回调的值返回
    expect(
      t(text1, {
        money: 200,
        show: 'withUnitAndSymbol',
      }),
    ).toBe(trText3)
    expect(
      t.t('xxx', text1, {
        money: 200,
        show: 'withUnitAndSymbol',
      }),
    ).toBe(trText3)

    // 根据格式化回调的值返回
    expect(
      t('他买电脑花了{c0}', {
        money: 15,
        base: 1000,
        show: 'withUnitAndSymbol',
      }),
    ).toBe('他买电脑花了￥15K')
    expect(
      t.t('xxx', '他买电脑花了{c0}', {
        money: 15,
        base: 1000,
        show: 'withUnitAndSymbol',
      }),
    ).toBe('他买电脑花了￥15K')

    // 现在不应该有警告
    expect(spyWarn).toHaveBeenCalledTimes(0)
  })

  it('正确配置 formatCurrency，模拟抛异常', () => {
    const errMsg = '模拟异常'
    const formatCurrency = vi.fn(({ locale }) => {
      expect(locale).toBe('zh')
      throw errMsg
    })

    const { t, setI18n } = initI18n({
      namespace: 'format-currency-config-error',
      formatCurrency,
    })

    setI18n({
      locale: 'zh',
    })
    const spyWarn = vi.spyOn(console, 'warn')
    const spyError = vi.spyOn(console, 'error')

    /** t */
    // 如果formatter出错，还是走原有的匹配逻辑
    expect(t(text1, 200)).toBe(trText1)

    // 没有警告输出
    expect(spyWarn).toHaveBeenCalledTimes(0)

    // 会有1次错误输出
    expect(spyError).toHaveBeenCalledTimes(1)

    // 正确输出错误信息
    expect(spyError).toHaveBeenLastCalledWith(
      ...getFormatterRunError(text1, 'c0', formatterName, errMsg),
    )

    /** t.t */
    spyWarn.mockClear()
    spyError.mockClear()
    // 如果formatter出错，还是走原有的匹配逻辑
    expect(t.t('xxx', text1, 200)).toBe(trText1)

    // 没有警告输出
    expect(spyWarn).toHaveBeenCalledTimes(0)

    // 会有1次错误输出
    expect(spyError).toHaveBeenCalledTimes(1)

    // 正确输出错误信息
    expect(spyError).toHaveBeenLastCalledWith(
      ...getFormatterRunError(text1, 'c0', formatterName, errMsg),
    )
  })
})

describe('格式化日期', () => {
  const formatterName = 'formatDate'
  const text = '今天的日期是{d0}'
  const langs = {
    en: {
      [text]: `Today's date is {d0}`,
      xxx: `Today's date is {d0}`,
    },
  }
  const date = new Date()
  const trZhText = '今天的日期是' + formatDateByLocale(date)
  const trZhTextWithLocale = '今天的日期是' + formatDateByLocale(date, 'zh')
  const trEnTextWithLocale = langs.en[text].replace(
    '{d0}',
    formatDateByLocale(date, 'en'),
  )

  function formatDateByLocale(date: Date, locale?: 'en' | 'zh') {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()

    let res = ''

    switch (locale) {
      case 'en':
        res = `${day}/${month}/${year}`
        break
      case 'zh':
        res = `${year}/${month}${day}`
        break
      default:
        res = date.toString()
        break
    }

    return res
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('未配置 formatDate', () => {
    const { t } = initI18n({ namespace: 'format-date-no-config' })
    const lastWarnMsg = getNoFormatterWarn(text, 'd0', formatterName)
    const spyWarn = vi.spyOn(console, 'warn')

    /** t */
    // 未配置时，默认走正常的匹配逻辑
    expect(t(text, date)).toBe(trZhText)

    // 最后一次输出内容匹配
    expect(spyWarn).toHaveBeenLastCalledWith(lastWarnMsg)

    // 1次警告输出
    expect(spyWarn).toHaveBeenCalledTimes(1)

    /** t.t */
    spyWarn.mockClear()
    // 未配置时，默认走正常的匹配逻辑
    expect(t.t('xxx', text, date)).toBe(trZhText)

    // 最后一次输出内容匹配
    expect(spyWarn).toHaveBeenLastCalledWith(lastWarnMsg)

    // 1次警告输出
    expect(spyWarn).toHaveBeenCalledTimes(1)
  })

  it('正确配置 formatDate', () => {
    const formatDate = vi.fn(({ payload, locale, t }) => {
      expect(t).toBeInstanceOf(Function)
      expect(t('你好{0}', '世界')).toBe('你好世界')
      return formatDateByLocale(payload, locale)
    })

    const { t, setI18n } = initI18n({
      namespace: 'format-date-config',
      locale: undefined,
      formatDate,
      langs,
    })
    const spyWarn = vi.spyOn(console, 'warn')

    /** t */
    // 根据格式化回调的值返回
    expect(t(text, date)).toBe(trZhText)

    // 最后一次输出内容匹配
    expect(spyWarn).toHaveBeenLastCalledWith(
      getNoLocaleFormatterWarn(formatterName),
    )

    // 未配置locale有1次警告输出
    expect(spyWarn).toHaveBeenCalledTimes(1)

    /** t.t */
    spyWarn.mockClear()
    // 根据格式化回调的值返回
    expect(t.t('xxx', text, date)).toBe(trZhText)

    // 最后一次输出内容匹配
    expect(spyWarn).toHaveBeenLastCalledWith(
      getNoLocaleFormatterWarn(formatterName),
    )

    // 未配置locale有1次警告输出
    expect(spyWarn).toHaveBeenCalledTimes(1)

    setI18n({
      locale: 'zh',
    })

    // 清除之前的记录
    spyWarn.mockClear()

    // 根据格式化回调的值返回
    expect(t(text, date)).toBe(trZhTextWithLocale)
    expect(t.t('xxx', text, date)).toBe(trZhTextWithLocale)

    // 现在不应该有警告
    expect(spyWarn).toHaveBeenCalledTimes(0)

    setI18n({
      locale: 'en',
    })

    // 清除之前的记录
    spyWarn.mockClear()

    // 根据格式化回调的值返回，这里匹配英文对应的文案
    expect(t(text, date)).toBe(trEnTextWithLocale)
    expect(t.t('xxx', text, date)).toBe(trEnTextWithLocale)

    // 现在不应该有警告
    expect(spyWarn).toHaveBeenCalledTimes(0)
  })

  it('正确配置 formatDate，模拟抛异常', () => {
    const errMsg = '模拟异常'
    const formatDate = vi.fn(({ locale }) => {
      expect(locale).toBe('zh')
      throw errMsg
    })

    const { t } = initI18n({
      namespace: 'format-date-config-error',
      formatDate,
      locale: 'zh',
      langs,
    })
    const spyWarn = vi.spyOn(console, 'warn')
    const spyError = vi.spyOn(console, 'error')

    /** t */
    // 如果formatter出错，还是走原有的匹配逻辑
    expect(t(text, date)).toBe(trZhText)

    // 没有警告输出
    expect(spyWarn).toHaveBeenCalledTimes(0)

    // 会有1次错误输出
    expect(spyError).toHaveBeenCalledTimes(1)

    // 正确输出错误信息
    expect(spyError).toHaveBeenLastCalledWith(
      ...getFormatterRunError(text, 'd0', formatterName, errMsg),
    )

    /** t.t */
    spyWarn.mockClear()
    spyError.mockClear()
    // 如果formatter出错，还是走原有的匹配逻辑
    expect(t.t('xxx', text, date)).toBe(trZhText)

    // 没有警告输出
    expect(spyWarn).toHaveBeenCalledTimes(0)

    // 会有1次错误输出
    expect(spyError).toHaveBeenCalledTimes(1)

    // 正确输出错误信息
    expect(spyError).toHaveBeenLastCalledWith(
      ...getFormatterRunError(text, 'd0', formatterName, errMsg),
    )
  })
})

describe('格式化时间', () => {
  const formatterName = 'formatTime'
  const text = '当前时间是{t0}'
  const langs = {
    en: {
      [text]: `The current time is {t0}`,
      xxx: `The current time is {t0}`,
    },
  }
  const date = new Date()
  const trZhText = '当前时间是' + formatTimeByLocale(date)
  const trZhTextWithLocale = '当前时间是' + formatTimeByLocale(date, 'zh')
  const trEnTextWithLocale = langs.en[text].replace(
    '{t0}',
    formatTimeByLocale(date, 'en'),
  )

  function formatTimeByLocale(date: Date, locale?: 'en' | 'zh') {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()

    let res = ''

    switch (locale) {
      case 'en':
        res = `${day}-${month}-${year}-${hour}-${minute}-${second}`
        break
      case 'zh':
        res = `${year}/${month}${day} ${hour}:${minute}:${second}`
        break
      default:
        res = date.toString()
        break
    }

    return res
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('未配置 formatTime', () => {
    const { t } = initI18n({
      namespace: 'format-time-no-config',
      langs,
      beginIndex: 0,
    })
    const lastWarnMsg = getNoFormatterWarn(text, 't0', formatterName)
    const spyWarn = vi.spyOn(console, 'warn')

    /** t */
    // 未配置时，默认走正常的匹配逻辑
    expect(t(text, date)).toBe(trZhText)

    // 最后一次输出内容匹配
    expect(spyWarn).toHaveBeenLastCalledWith(lastWarnMsg)

    // 1次警告输出
    expect(spyWarn).toHaveBeenCalledTimes(1)

    /** t.t */
    spyWarn.mockClear()
    // 未配置时，默认走正常的匹配逻辑
    expect(t.t('xxx', text, date)).toBe(trZhText)

    // 最后一次输出内容匹配
    expect(spyWarn).toHaveBeenLastCalledWith(lastWarnMsg)

    // 1次警告输出
    expect(spyWarn).toHaveBeenCalledTimes(1)
  })

  it('正确配置 formatTime', () => {
    const formatTime = vi.fn(({ payload, locale, t }) => {
      expect(t).toBeInstanceOf(Function)
      expect(t('你好{0}', '世界')).toBe('你好世界')
      return formatTimeByLocale(payload, locale)
    })

    const { setI18n, t } = initI18n({
      namespace: 'format-time-config',
      langs,
      beginIndex: 0,
      formatTime,
      locale: undefined,
    })

    const spyWarn = vi.spyOn(console, 'warn')

    /** t */
    // 根据格式化回调的值返回
    expect(t(text, date)).toBe(trZhText)

    // 最后一次输出内容匹配
    expect(spyWarn).toHaveBeenLastCalledWith(
      getNoLocaleFormatterWarn(formatterName),
    )

    // 未配置locale有1次警告输出
    expect(spyWarn).toHaveBeenCalledTimes(1)

    /** t.t */
    spyWarn.mockClear()
    // 根据格式化回调的值返回
    expect(t.t('xxx', text, date)).toBe(trZhText)

    // 最后一次输出内容匹配
    expect(spyWarn).toHaveBeenLastCalledWith(
      getNoLocaleFormatterWarn(formatterName),
    )

    // 未配置locale有1次警告输出
    expect(spyWarn).toHaveBeenCalledTimes(1)

    setI18n({
      locale: 'zh',
    })

    // 清除之前的记录
    spyWarn.mockClear()

    // 根据格式化回调的值返回
    expect(t(text, date)).toBe(trZhTextWithLocale)
    expect(t.t('xxx', text, date)).toBe(trZhTextWithLocale)

    // 现在不应该有警告
    expect(spyWarn).toHaveBeenCalledTimes(0)

    setI18n({
      locale: 'en',
    })

    // 清除之前的记录
    spyWarn.mockClear()

    // 根据格式化回调的值返回，这里匹配英文对应的文案
    expect(t(text, date)).toBe(trEnTextWithLocale)
    expect(t.t('xxx', text, date)).toBe(trEnTextWithLocale)

    // 现在不应该有警告
    expect(spyWarn).toHaveBeenCalledTimes(0)
  })

  it('正确配置 formatTime，模拟抛异常', () => {
    const errMsg = '模拟异常'
    const formatTime = vi.fn(({ locale }) => {
      expect(locale).toBe('zh')
      throw errMsg
    })

    const { t } = initI18n({
      namespace: 'format-time-config-error',
      langs,
      beginIndex: 0,
      formatTime,
      locale: 'zh',
    })

    const spyWarn = vi.spyOn(console, 'warn')
    const spyError = vi.spyOn(console, 'error')

    /** t */
    // 如果formatter出错，还是走原有的匹配逻辑
    expect(t(text, date)).toBe(trZhText)

    // 没有警告输出
    expect(spyWarn).toHaveBeenCalledTimes(0)

    // 会有1次错误输出
    expect(spyError).toHaveBeenCalledTimes(1)

    // 正确输出错误信息
    expect(spyError).toHaveBeenLastCalledWith(
      ...getFormatterRunError(text, 't0', formatterName, errMsg),
    )

    /** t.t */
    spyWarn.mockClear()
    spyError.mockClear()
    // 如果formatter出错，还是走原有的匹配逻辑
    expect(t.t('xxx', text, date)).toBe(trZhText)

    // 没有警告输出
    expect(spyWarn).toHaveBeenCalledTimes(0)

    // 会有1次错误输出
    expect(spyError).toHaveBeenCalledTimes(1)

    // 正确输出错误信息
    expect(spyError).toHaveBeenLastCalledWith(
      ...getFormatterRunError(text, 't0', formatterName, errMsg),
    )
  })
})

describe('格式化复数', () => {
  const formatterName = 'formatPlural'
  const text = '我有{p0个苹果}，{p1个香蕉}和{p2个梨}'
  const text2 = '我有{p0}个苹果'
  const text3 = '列表中有{p0个国家或地区}'

  const langs = {
    en: {
      [text]: `I have {P0 apples}, {P1 bananas} and {P2 pears}`,
      xxx: `I have {P0 apples}, {P1 bananas} and {P2 pears}`,
      [text2]: `I have {P0} apples`,
      xxx2: `I have {P0} apples`,
      xxx3: 'there have {p0 Country or Region} in the list',
    },
  }
  const trZhText = '我有5个苹果，4个香蕉和3个梨'
  const trEnTextWithLocale = `I have 5 apples, 4 bananas and 3 pears`
  const trEnTextWithLocaleAndCountZero = `I have no apple, no banana and no pear`
  const trEnTextWithLocaleAndCountOne = `I have one apple, one banana and one pear`

  function formatPlural({ payload, locale, keyword, text, t }) {
    expect(t).toBeInstanceOf(Function)
    expect(t('你好{0}', '世界')).toBe('你好世界')
    let resText = ''
    switch (locale) {
      case 'en':
        switch (keyword) {
          case 'apple':
          case 'apples':
            if (payload > 1) {
              resText = `${payload} apples`
            } else if ([1, '1'].includes(payload)) {
              resText = `one apple`
            } else {
              resText = `no apple`
            }
            break
          case 'banana':
          case 'bananas':
            if (payload > 1) {
              resText = `${payload} bananas`
            } else if ([1, '1'].includes(payload)) {
              resText = `one banana`
            } else {
              resText = `no banana`
            }
            break
          case 'pear':
          case 'pears':
            if (payload > 1) {
              resText = `${payload} pears`
            } else if ([1, '1'].includes(payload)) {
              resText = `one pear`
            } else {
              resText = `no pear`
            }
            break
          case 'Country or Region':
            resText =
              payload === 0
                ? `no Country or Region`
                : payload > 1
                ? `${payload} Countries or Regions`
                : `${payload} Country or Region`
            break
        }
        break
      case 'zh':
      default:
        resText = text
        break
    }

    return resText
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('未配置 formatPlural', () => {
    const { t } = initI18n({
      namespace: 'format-plural-no-config',
      langs,
      beginIndex: 0,
      locale: undefined,
    })
    const lastWarnMsg = getNoFormatterWarn(text, 'p2个梨', formatterName)
    const spyWarn = vi.spyOn(console, 'warn')

    /** t */
    // 未配置时，默认走正常的匹配逻辑
    expect(t('测试{p0 a b }存在空格的场景', 1)).toBe('测试1 a b 存在空格的场景')
    expect(t(text, 5, 4, 3)).toBe(trZhText)

    // 最后一次输出内容匹配
    expect(spyWarn).toHaveBeenLastCalledWith(lastWarnMsg)

    // 3次警告输出
    expect(spyWarn).toHaveBeenCalledTimes(4)

    /** t.t */
    spyWarn.mockClear()
    // 未配置时，默认走正常的匹配逻辑
    expect(t.t('xxx', '测试{p0 a b }存在空格的场景', 1)).toBe(
      '测试1 a b 存在空格的场景',
    )
    expect(t.t('xxx', text, 5, 4, 3)).toBe(trZhText)

    // 最后一次输出内容匹配
    expect(spyWarn).toHaveBeenLastCalledWith(lastWarnMsg)

    // 3次警告输出
    expect(spyWarn).toHaveBeenCalledTimes(4)
  })

  it('正确配置 formatPlural', () => {
    const { setI18n, t } = initI18n({
      namespace: 'format-plural-config',
      langs,
      beginIndex: 0,
      locale: undefined,
      formatPlural,
    })
    const spyWarn = vi.spyOn(console, 'warn')

    /** t */
    // 根据格式化回调的值返回
    expect(t(text, 5, 4, 3)).toBe(trZhText)
    expect(t('测试{p0 a b }存在空格的场景', 1)).toBe('测试1 a b 存在空格的场景')

    // 最后一次输出内容匹配
    expect(spyWarn).toHaveBeenLastCalledWith(
      getNoLocaleFormatterWarn(formatterName),
    )

    // 未配置locale有3次警告输出
    expect(spyWarn).toHaveBeenCalledTimes(4)

    /** t.t */
    spyWarn.mockClear()
    // 根据格式化回调的值返回
    expect(t.t('xxx', text, 5, 4, 3)).toBe(trZhText)
    expect(t.t('xxx', '测试{p0 a b }存在空格的场景', 1)).toBe(
      '测试1 a b 存在空格的场景',
    )

    // 最后一次输出内容匹配
    expect(spyWarn).toHaveBeenLastCalledWith(
      getNoLocaleFormatterWarn(formatterName),
    )

    // 未配置locale有3次警告输出
    expect(spyWarn).toHaveBeenCalledTimes(4)

    setI18n({
      locale: 'zh',
    })

    // 清除之前的记录
    spyWarn.mockClear()

    // 根据格式化回调的值返回
    expect(t(text, 5, 4, 3)).toBe(trZhText)
    expect(t.t('xxx', text, 5, 4, 3)).toBe(trZhText)

    // 现在不应该有警告
    expect(spyWarn).toHaveBeenCalledTimes(0)

    setI18n({
      locale: 'en',
    })

    // 清除之前的记录
    spyWarn.mockClear()

    expect(t('xxx3', 100)).toBe(
      'there have 100 Countries or Regions in the list',
    )
    expect(t.t('xxx3', text3, 100)).toBe(
      'there have 100 Countries or Regions in the list',
    )

    expect(t('xxx3', 1)).toBe('there have 1 Country or Region in the list')
    expect(t.t('xxx3', text3, 1)).toBe(
      'there have 1 Country or Region in the list',
    )

    expect(t('xxx3', 0)).toBe('there have no Country or Region in the list')
    expect(t.t('xxx3', text3, 0)).toBe(
      'there have no Country or Region in the list',
    )

    // 根据格式化回调的值返回，这里匹配英文对应的文案
    expect(t(text, 5, 4, 3)).toBe(trEnTextWithLocale)
    expect(t.t('xxx', text, 5, 4, 3)).toBe(trEnTextWithLocale)

    // 现在不应该有警告
    expect(spyWarn).toHaveBeenCalledTimes(0)

    /** 验证量数为0时的情况 */

    // 根据格式化回调的值返回，这里匹配英文对应的文案
    expect(t(text, 0, 0, 0)).toBe(trEnTextWithLocaleAndCountZero)
    expect(t.t('xxx', text, 0, 0, 0)).toBe(trEnTextWithLocaleAndCountZero)

    // 现在不应该有警告
    expect(spyWarn).toHaveBeenCalledTimes(0)

    /** 验证量数为1时的情况 */

    // 根据格式化回调的值返回，这里匹配英文对应的文案
    expect(t(text, 1, 1, 1)).toBe(trEnTextWithLocaleAndCountOne)
    expect(t.t('xxx', text, 1, 1, 1)).toBe(trEnTextWithLocaleAndCountOne)

    // 现在不应该有警告
    expect(spyWarn).toHaveBeenCalledTimes(0)
  })

  it('正确配置 formatPlural，模拟抛异常', () => {
    const errMsg = '模拟异常'
    const formatPlural = vi.fn(({ locale }) => {
      expect(locale).toBe('zh')
      throw errMsg
    })
    const { t } = initI18n({
      namespace: 'format-plural-config-error',
      langs,
      beginIndex: 0,
      locale: 'zh',
      formatPlural,
    })

    const spyWarn = vi.spyOn(console, 'warn')
    const spyError = vi.spyOn(console, 'error')

    /** t */
    // 如果formatter出错，还是走原有的匹配逻辑
    expect(t(text, 5, 4, 3)).toBe(trZhText)

    // 没有警告输出
    expect(spyWarn).toHaveBeenCalledTimes(0)

    // 会有3次错误输出
    expect(spyError).toHaveBeenCalledTimes(3)

    // 正确输出错误信息
    expect(spyError).toHaveBeenLastCalledWith(
      ...getFormatterRunError(text, 'p2个梨', formatterName, errMsg),
    )

    /** t */
    spyWarn.mockClear()
    spyError.mockClear()
    // 如果formatter出错，还是走原有的匹配逻辑
    expect(t.t('xxx', text, 5, 4, 3)).toBe(trZhText)

    // 没有警告输出
    expect(spyWarn).toHaveBeenCalledTimes(0)

    // 会有3次错误输出
    expect(spyError).toHaveBeenCalledTimes(3)

    // 正确输出错误信息
    expect(spyError).toHaveBeenLastCalledWith(
      ...getFormatterRunError(text, 'p2个梨', formatterName, errMsg),
    )
  })

  it('正确配置 formatPlural，未正确设置动态参数标记', () => {
    const { t } = initI18n({
      namespace: 'format-plural-config-undefined',
      langs,
      beginIndex: 0,
      locale: 'en',
      formatPlural,
    })
    const spyWarn = vi.spyOn(console, 'warn')
    const spyError = vi.spyOn(console, 'error')

    /** t */
    // 如果错误配置格式化标记，那么i18n函数将原样返回
    expect(t(text2, 5)).toBe(langs.en[text2])

    // 会有0次错误输出
    expect(spyError).toHaveBeenCalledTimes(0)

    // 1次警告输出
    expect(spyWarn).toHaveBeenCalledTimes(1)

    // 正确输出错误信息
    expect(spyWarn).toHaveBeenLastCalledWith(
      getInvalidPluralWarn(langs.en[text2], 'P0'),
    )

    /** t.t */
    spyWarn.mockClear()
    // 如果错误配置格式化标记，那么i18n函数将原样返回
    expect(t.t('xxx2', text2, 5)).toBe(langs.en[text2])

    // 会有0次错误输出
    expect(spyError).toHaveBeenCalledTimes(0)

    // 1次警告输出
    expect(spyWarn).toHaveBeenCalledTimes(1)

    // 正确输出错误信息
    expect(spyWarn).toHaveBeenLastCalledWith(
      getInvalidPluralWarn(langs.en[text2], 'P0'),
    )
  })
})

it('模拟服务端，验证 t.withLocale', () => {
  const text = '服务器异常，请稍后再试'

  const langs = {
    en: {
      [text]: 'The server is hidden. Please try again later',
    },
  }

  const { setI18n, t } = initI18n({
    namespace: 'withI18n',
    beginIndex: 0,
    locale: 'en',
  })

  // NOTE 语言设置要在 withI18N逻辑执行之前
  setI18n({
    langs,
  })

  const serverResponse = vi.fn((locale: string, reqLocale: string) => {
    const _i18n = t.withLocale(reqLocale)

    // 主程序
    expect(t(text)).toBe(langs[locale]?.[text] || text)
    // 接口
    expect(_i18n(text)).toBe(langs[reqLocale]?.[text] || text)
  })

  function check(locale: string, reqLocale: string) {
    // 设置主程序语言
    setI18n({
      locale,
    })

    // 接口语言
    serverResponse(locale, reqLocale)
  }

  // 当前主程序语言为zh，接口为en
  check('zh', 'en')

  // 当前主程序语言为zh，接口为zh
  check('zh', 'zh')

  // 当前主程序语言为en，接口为zh
  check('en', 'zh')

  // 当前主程序语言为en，接口为en
  check('en', 'en')
})

describe('t.t', () => {
  const state: I18nState = {
    langs: {
      en: {
        测试: 'test',
        xxx: 'test2',
      },
    },
  }

  describe('initI18n t', () => {
    const { t, setI18n } = initI18n({
      ...state,
      locale: 'en',
      namespace: 'initI18n t',
      formatNumber({ locale, t, payload }) {
        expect(t.t('xxx', '')).toBe('test2')
        expect(t.t('testCurrency', '测试金额{c0}', 1000)).toBe('测试金额1000')
        return payload
      },
      formatCurrency({ locale, t, payload }) {
        expect(t.t('xxx', '')).toBe('test2')
        expect(t.t('testDate', '测试日期{d0}', 1000)).toBe('测试日期1000')
        return payload
      },
      formatDate({ locale, t, payload }) {
        expect(t.t('xxx', '')).toBe('test2')
        expect(t.t('testTime', '测试时间{t0}', 1000)).toBe('测试时间1000')
        return payload
      },
      formatTime({ locale, t, payload }) {
        expect(t.t('xxx', '')).toBe('test2')
        expect(t.t('testPlural', '测试复数{p0个苹果}', 10000)).toBe(
          '测试复数10000个苹果',
        )
        return payload
      },
      formatPlural({ locale, t, payload, text }) {
        expect(t.t('xxx', '')).toBe('test2')
        return text
      },
    })

    it('验证 t.t 基本属性', () => {
      expect(typeof t.t).toBe('function')
      expect(t.t('xxx', '')).toBe('test2')
    })

    it('验证 t.withLocale 基本属性', () => {
      const newT = t.withLocale()
      expect(newT('测试')).toBe('test')
      expect(newT.t('xxx', '')).toBe('test2')
    })

    it('验证 formatXXX 中的t.t', () => {
      expect(t('数字是{n0}', 10000)).toBe('数字是10000')
    })
  })

  describe('withI18n t', () => {
    const { setI18n, t: originT } = initI18n({
      ...state,
      namespace: 'withI18n t',
      formatNumber({ locale, t, payload }) {
        expect(t.t('xxx', '')).toBe('test2')
        expect(t.t('testCurrency', '测试金额{c0}', 1000)).toBe('测试金额1000')
        return payload
      },
      formatCurrency({ locale, t, payload }) {
        expect(t.t('xxx', '')).toBe('test2')
        expect(t.t('testDate', '测试日期{d0}', 1000)).toBe('测试日期1000')
        return payload
      },
      formatDate({ locale, t, payload }) {
        expect(t.t('xxx', '')).toBe('test2')
        expect(t.t('testTime', '测试时间{t0}', 1000)).toBe('测试时间1000')
        return payload
      },
      formatTime({ locale, t, payload }) {
        expect(t.t('xxx', '')).toBe('test2')
        expect(t.t('testPlural', '测试复数{p0个苹果}', 10000)).toBe(
          '测试复数10000个苹果',
        )
        return payload
      },
      formatPlural({ locale, t, payload, text }) {
        expect(t.t('xxx', '')).toBe('test2')
        return text
      },
    })

    const t = originT.withLocale('en')
    setI18n(undefined)

    it('验证 t.t 基本属性', () => {
      expect(typeof t.t).toBe('function')
      expect(t.t('xxx', '')).toBe('test2')
    })

    it('验证 t.withLocale 基本属性', () => {
      const newT = t.withLocale()
      expect(newT('测试')).toBe('test')
      expect(newT.t('xxx', '')).toBe('test2')
    })

    it('验证 formatXXX 中的t.t', () => {
      expect(t('数字是{n0}', 10000)).toBe('数字是10000')
    })
  })
})
