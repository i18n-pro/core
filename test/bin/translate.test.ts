import http from 'http'
import { binTranslate, mockRequest, binConstants } from '../utils'
import { Langs } from '../../src/type'

const { setTranslateConfig, translateTextsToLangsImpl } = binTranslate
const { SEPARATOR_LENGTH } = binConstants

describe('验证翻译实现', () => {
  describe('没有内容需要翻译', () => {
    type Item = [
      string, // 描述内容
      string[], // 待翻译的文本内容
      string[], // 目标语言
      Langs, // 生成的语言包
    ]

    const langs = require('../../i18n/langs.json')
    const texts = Object.keys(langs['en'])

    const matrix: Item[] = [
      ['所有内容已翻译过', texts, ['en'], langs],
      ['未配置目标语言', texts, [], {}],
      ['没有需要翻译的文本内容', [], ['en'], { en: {} }],
    ]

    it.each(matrix)('%s', async (desc, texts, to, langs) => {
      const spyRequest = vi.spyOn(http, 'request')

      // 设置翻译配置
      setTranslateConfig({
        appid: '',
        key: '',
        from: 'zh',
        to,
      })

      // 执行翻译
      const res = await translateTextsToLangsImpl(texts, langs, true)

      // 未发起接口请求
      expect(spyRequest).toHaveBeenCalledTimes(0)
      // 语言包
      expect(res.langs).toEqual(langs)
      // 翻译成功
      expect(res.success).toEqual({})
      // 翻译失败
      expect(res.error).toEqual({})
    })
  })

  describe('有内容需要翻译', () => {
    it('已存在部分内容模拟新增', async () => {
      const langs = require('../../i18n/langs.json')
      const texts = Object.keys(langs['en'])
      const middleIndex = texts.length / 2
      const { existLangs, restLangs } = Object.entries(langs.en).reduce(
        (res, [from, to], index) => {
          if (index <= middleIndex) {
            res.existLangs.en[from] = to
            res.existTexts.push(from)
          } else {
            res.restLangs.en[from] = to
            res.restTexts.push(from)
          }
          return res
        },
        {
          existTexts: [] as string[],
          existLangs: {
            en: {},
          },
          restTexts: [] as string[],
          restLangs: {
            en: {},
          },
        },
      )
      const spyRequest = vi.spyOn(http, 'request')

      // 这里需要模拟 request 实现
      spyRequest.mockImplementation(
        mockRequest({
          data: {
            trans_result: Object.entries(restLangs.en).reduce(
              (res, [src, dst]) => {
                res.push({
                  src,
                  dst,
                })
                return res
              },
              [] as Array<{ src: string; dst: any }>,
            ),
          },
        }),
      )

      // 设置翻译配置
      setTranslateConfig({
        appid: '',
        key: '',
        from: 'zh',
        to: ['en'],
      })

      // 执行翻译
      const res = await translateTextsToLangsImpl(texts, existLangs, true)

      // 正常发起一次接口请求
      expect(spyRequest).toHaveBeenCalledTimes(1)
      // 语言包
      expect(res.langs).toEqual(langs)
      // 翻译成功
      expect(res.success).toEqual(
        Object.entries(restLangs.en).reduce((res, [from, to]) => {
          res[from] = {
            en: to,
          }
          return res
        }, {}),
      )
      // 翻译失败
      expect(res.error).toEqual({})
    })

    it('禁用增量模式', async () => {
      const langs = require('../../i18n/langs.json')
      const texts = Object.keys(langs['en'])
      const spyRequest = vi.spyOn(http, 'request')

      // 这里需要模拟 request 实现
      spyRequest.mockImplementation(
        mockRequest({
          data: {
            trans_result: Object.entries(langs.en).reduce((res, [src, dst]) => {
              res.push({
                src,
                dst,
              })
              return res
            }, [] as Array<{ src: string; dst: any }>),
          },
        }),
      )

      // 设置翻译配置
      setTranslateConfig({
        appid: '',
        key: '',
        from: 'zh',
        to: ['en'],
      })

      // 执行翻译
      const res = await translateTextsToLangsImpl(texts, langs, false)

      // 正常发起一次接口请求
      expect(spyRequest).toHaveBeenCalledTimes(1)
      // 语言包
      expect(res.langs).toEqual(langs)
      // 翻译成功
      expect(res.success).toEqual(
        Object.entries(langs.en).reduce((res, [from, to]) => {
          res[from] = {
            en: to,
          }
          return res
        }, {}),
      )
      // 翻译失败
      expect(res.error).toEqual({})
    })
  })

  describe('验证已知的几个错误码类型，禁用增量模式下', () => {
    type Item = [
      string, // 错误类型
      string, // 错误编码
      boolean, // 是否是已知错误码
    ]

    const matrix: Item[] = [
      ['appid 配置不正确', '52003', true],
      ['key 配置不正确', '54001', true],
      ['随意定的错误码信息', '100', false],
    ]

    const spyExit = vi.spyOn(process, 'exit')
    beforeEach(() => {
      spyExit.mockImplementation(() => undefined)
    })

    afterEach(() => {
      spyExit.mockClear()
    })

    it.each(matrix)('%s', async (error_msg, error_code, isAllKnow) => {
      const langs = require('../../i18n/langs.json')
      const texts = Object.keys(langs['en'])
      const spyRequest = vi.spyOn(http, 'request')
      const spyLog = vi.spyOn(console, 'log')

      // 这里需要模拟 request 实现
      spyRequest.mockImplementation(
        mockRequest({
          data: {
            error_code,
            error_msg,
          },
        }),
      )

      // 设置翻译配置
      setTranslateConfig({
        appid: '',
        key: '',
        from: 'zh',
        to: ['en'],
      })

      // 执行翻译
      const res = await translateTextsToLangsImpl(texts, {}, false)

      // 正常发起一次接口请求
      expect(spyRequest).toHaveBeenCalledTimes(1)
      // 控制台应该会正常输出一些日志信息
      expect(spyLog).toHaveBeenLastCalledWith(
        '❌',
        expect.stringContaining(`错误信息：${error_msg}`),
      )
      expect(spyLog).toHaveBeenLastCalledWith(
        '❌',
        expect.stringContaining(`错误码：${error_code}`),
      )

      // 已知错误码，会显示已知原因
      ;(isAllKnow
        ? expect(spyLog)
        : expect(spyLog).not
      ).toHaveBeenLastCalledWith('❌', expect.stringContaining('可能原因是'))

      // 语言包
      expect(res.langs).toEqual({ en: {} })
      // 翻译成功
      expect(res.success).toEqual({})
      // 翻译失败，失败信息中会包含对应错误的原因
      expect(res.error).toEqual(
        Object.entries(langs.en).reduce((res, [from]) => {
          res[from] = {
            en: expect.stringContaining(`错误信息：${error_msg}`),
          }
          return res
        }, {}),
      )
    })
  })

  describe('模拟一些错误场景', () => {
    it('存在部分文本未被翻译的情况', async () => {
      const langs = require('../../i18n/langs.json')
      const texts = Object.keys(langs['en'])
      const middleIndex = texts.length / 2
      const { lostTexts, existLangs, restLangs } = Object.entries(
        langs.en,
      ).reduce(
        (res, [from, to], index) => {
          if (index <= middleIndex) {
            res.existLangs.en[from] = to
            res.existTexts.push(from)
          } else if (index % 3 == 0) {
            res.lostTexts.push(from)
            res.lostLangs.en[from] = to
          } else {
            res.restLangs.en[from] = to
            res.restTexts.push(from)
          }
          return res
        },
        {
          lostTexts: [] as string[],
          lostLangs: { en: {} },
          existTexts: [] as string[],
          existLangs: {
            en: {},
          },
          restTexts: [] as string[],
          restLangs: {
            en: {},
          },
        },
      )
      const spyRequest = vi.spyOn(http, 'request')

      // 这里需要模拟 request 实现
      spyRequest.mockImplementation(
        mockRequest({
          data: {
            trans_result: Object.entries(restLangs.en).reduce(
              (res, [src, dst]) => {
                res.push({
                  src,
                  dst,
                })
                return res
              },
              [] as Array<{ src: string; dst: any }>,
            ),
          },
        }),
      )

      // 设置翻译配置
      setTranslateConfig({
        appid: '',
        key: '',
        from: 'zh',
        to: ['en'],
      })

      // 执行翻译
      const res = await translateTextsToLangsImpl(texts, existLangs, true)

      // 正常发起一次接口请求
      expect(spyRequest).toHaveBeenCalledTimes(1)
      // 语言包
      expect(res.langs).toEqual({
        en: {
          ...existLangs.en,
          ...restLangs.en,
        },
      })
      // 翻译成功
      expect(res.success).toEqual(
        Object.entries(restLangs.en).reduce((res, [from, to]) => {
          res[from] = {
            en: to,
          }
          return res
        }, {}),
      )

      // 翻译失败
      expect(res.error).toEqual(
        lostTexts.reduce((res, item) => {
          res[item] = {
            en: expect.stringContaining(`当前文本【${item}】未被翻译`),
          }
          return res
        }, {}),
      )
    })

    it('请求异常却未捕获到异常信息', async () => {
      const langs = require('../../i18n/langs.json')
      const texts = Object.keys(langs['en'])
      const spyRequest = vi.spyOn(http, 'request')

      // 这里需要模拟 request 实现
      spyRequest.mockImplementation(
        mockRequest({
          data: {},
          // 整个请求失败，并且没有返回错误信息的时候，最终会使用默认的错误信息
          errorMsg: '',
          errorType: 'onError',
        }),
      )

      // 设置翻译配置
      setTranslateConfig({
        appid: '',
        key: '',
        from: 'zh',
        to: ['en'],
      })

      // 执行翻译
      const res = await translateTextsToLangsImpl(texts, langs, false)

      // 正常发起一次接口请求
      expect(spyRequest).toHaveBeenCalledTimes(1)
      // 语言包
      expect(res.langs).toEqual({ en: {} })
      // 翻译成功
      expect(res.success).toEqual({})
      // 翻译失败
      expect(res.error).toEqual(
        Object.entries(langs.en).reduce((res, [from]) => {
          res[from] = {
            // 默认的错误信息
            en: binConstants.TRANSLATE_ERROR_TEXT,
          }
          return res
        }, {}),
      )
    })
  })

  describe('模拟字符数过多分批次进行翻译', () => {
    type Item = [
      number, // 每次请求的最大字符数
    ]

    const matrix: Item[] = [[100], [200], [500], [1000], [3000], [10000]]

    it.each(matrix)('本次请求最大字符数：%d', async (maxStringLength) => {
      const langs = require('../../i18n/langs.json')
      const texts = Object.keys(langs['en'])
      const spyRequest = vi.spyOn(http, 'request')
      // 计算出需要翻译调用翻译接口的次数
      let count = 0
      let strCount = 0
      for (let i = 0; i < texts.length; i++) {
        strCount += (i == 0 ? 0 : SEPARATOR_LENGTH) + texts[i].length
        if (
          i == texts.length - 1 ||
          (texts.length - 1 > i &&
            strCount + SEPARATOR_LENGTH + texts[i + 1].length > maxStringLength)
        ) {
          count++
          strCount = 0
        }
      }

      // 这里需要模拟 request 实现
      spyRequest.mockImplementation(
        mockRequest({
          data: {},
          getResData: (requestData) => {
            const { q } = requestData
            const currentTexts = q.split(binConstants.SEPARATOR_STR)
            const res = currentTexts.reduce((res, item) => {
              res.push({
                src: item,
                dst: langs.en[item],
              })
              return res
            }, [])
            return {
              trans_result: res,
            }
          },
        }),
      )

      // 设置翻译配置
      setTranslateConfig(
        {
          appid: '',
          key: '',
          from: 'zh',
          to: ['en'],
          delay: 1,
        },
        {
          maxStringLength,
        },
      )

      // 执行翻译
      const res = await translateTextsToLangsImpl(texts, langs, false)

      // 正常发起一次接口请求，这里可能不止一次
      expect(spyRequest).toHaveBeenCalledTimes(count)
      // 语言包
      expect(res.langs).toEqual(langs)
      // 翻译成功
      expect(res.success).toEqual(
        Object.entries(langs.en).reduce((res, [from, to]) => {
          res[from] = {
            en: to,
          }
          return res
        }, {}),
      )
      // 翻译失败
      expect(res.error).toEqual({})
    })
  })
})
