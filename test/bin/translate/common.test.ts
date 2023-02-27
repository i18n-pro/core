import https from 'https'
import { binTranslate, binUtils, mockRequest, binChalk } from '../../utils'
import {
  Langs,
  Translator,
  UnionBasicTranslatorConfig,
  UnionTranslatorConfig,
} from '../../../src/type'
import { LANGS_PATH } from './utils'
import { baiduMockErrorRequestImpl, baiduMockRequestImpl } from './baidu'
import { youdaoMockErrorRequestImpl, youdaoMockRequestImpl } from './youdao'
import { tencentMockErrorRequestImpl, tencentMockRequestImpl } from './tencent'
import { aliyunMockErrorRequestImpl, aliyunMockRequestImpl } from './aliyun'
import {
  microsoftMockErrorRequestImpl,
  microsoftMockRequestImpl,
} from './microsoft'
import { googleMockErrorRequestImpl, googleMockRequestImpl } from './google'

const { setTranslateConfig, translateTextsToLangsImpl } = binTranslate

const translatorMockRequestMap = {
  baidu: baiduMockRequestImpl,
  youdao: youdaoMockRequestImpl,
  tencent: tencentMockRequestImpl,
  aliyun: aliyunMockRequestImpl,
  microsoft: microsoftMockRequestImpl,
  google: googleMockRequestImpl,
}

const translatorMockErrorRequestMap = {
  baidu: baiduMockErrorRequestImpl,
  youdao: youdaoMockErrorRequestImpl,
  tencent: tencentMockErrorRequestImpl,
  aliyun: aliyunMockErrorRequestImpl,
  microsoft: microsoftMockErrorRequestImpl,
  google: googleMockErrorRequestImpl,
}

describe('验证翻译公共逻辑', () => {
  describe('没有内容需要翻译', () => {
    type Item = [
      string, // 描述内容
      Translator | undefined, // 翻译器
      Omit<UnionBasicTranslatorConfig, 'from' | 'to'>, // 配置
      string[], // 待翻译的文本内容
      string[], // 目标语言
      Langs, // 生成的语言包
    ]

    const langs = require(LANGS_PATH)
    const texts = Object.keys(langs['en'])
    // key 为translator, value 为对应基础配置
    const translatorConfigMap = {
      undefined: {
        appid: '',
        key: '',
      },
      baidu: {
        appid: '',
        key: '',
      },
      youdao: {
        appKey: '',
        key: '',
      },
      tencent: {
        secretId: '',
        secretKey: '',
        region: '',
      },
      aliyun: {
        accessKeyId: '',
        accessKeySecret: '',
      },
      microsoft: {
        key: '',
        location: '',
      },
      google: {
        projectId: '',
      },
    }

    const commonItem: [string, string[], string[], Langs][] = [
      ['所有内容已翻译过', texts, ['en'], langs],
      ['未配置目标语言', texts, [], {}],
      ['没有需要翻译的文本内容', [], ['en'], { en: {} }],
    ]

    const matrix: Item[] = Object.entries(translatorConfigMap).reduce(
      (res, [translator, config]) => {
        commonItem.forEach((item) => {
          console.log({ item })
          const [first, ...rest] = item

          res.push([
            `${
              translator == 'undefined' ? '未配置 translator' : translator
            }: ${first}`,
            translator == 'undefined' ? undefined : (translator as Translator),
            config as Omit<UnionBasicTranslatorConfig, 'from' | 'to'>,
            ...rest,
          ])
        })
        return res
      },
      [] as Item[],
    )

    it.each(matrix)(
      '%s',
      async (desc, translator, config, texts, to, langs) => {
        const spyRequest = vi.spyOn(https, 'request')

        // 设置翻译配置
        setTranslateConfig({
          translator,
          [(translator || 'baidu') + 'Config']: {
            ...config,
            from: 'zh',
            to,
          },
        } as UnionTranslatorConfig)

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
      },
    )
  })

  describe.skip('错误配置', () => {
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
        const spyConsole = vi.spyOn(binUtils, 'logError')
        const spyExit = vi.spyOn(process, 'exit')
        spyExit.mockImplementation(() => {
          throw `over`
        })
        try {
          setTranslateConfig({
            translator: 'baidu',
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
})

describe('验证翻译实现', () => {
  describe('有内容需要翻译', () => {
    type Item = [Translator, object]

    const matrix: Item[] = [
      ['baidu', { from: 'zh', to: ['en'] }],
      ['youdao', { from: 'zh', to: ['en'] }],
      ['tencent', { from: 'zh', to: ['en'] }],
      ['aliyun', { from: 'zh', to: ['en'] }],
      ['microsoft', { from: 'zh', to: ['en'] }],
      ['google', { from: 'zh', to: ['en'] }],
    ]

    it.each(matrix)(
      '%s: 已存在部分内容模拟新增',
      async (translator, config) => {
        const to = 'en'
        const langs = require(LANGS_PATH)
        const texts = Object.keys(langs[to])
        const middleIndex = texts.length / 2
        const { existLangs, restLangs } = Object.entries(langs[to]).reduce(
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

        // 调用各自的模拟函数，模拟请求实现
        const expectCallback = translatorMockRequestMap[translator]?.({
          to,
          langs: restLangs,
        })

        // 设置翻译配置
        setTranslateConfig({
          translator,
          [translator + 'Config']: config,
        } as UnionTranslatorConfig)

        // 执行翻译
        const res = await translateTextsToLangsImpl(texts, existLangs, true)

        // 验证模拟请求
        expectCallback?.()
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
      },
    )

    it.each(matrix)('%s: 禁用增量模式', async (translator, config) => {
      const to = 'en'
      const langs = require(LANGS_PATH)
      const texts = Object.keys(langs[to])

      // 调用各自的模拟函数，模拟请求实现
      const expectCallback = translatorMockRequestMap[translator]?.({
        to,
        langs,
      })

      // 设置翻译配置
      setTranslateConfig({
        translator,
        [translator + 'Config']: config,
      } as UnionTranslatorConfig)

      // 执行翻译
      const res = await translateTextsToLangsImpl(texts, langs, false)
      // 验证模拟请求
      expectCallback?.()
      console.log({
        resLangs: res.langs,
        langs,
      })
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
      Translator,
      string, // 错误信息
      object,
      string, // 错误编码
      boolean, // 是否是已知错误码
    ]

    const matrix: Item[] = [
      ['baidu', 'appid 配置不正确', { from: 'zh', to: ['en'] }, '52003', true],
      ['baidu', 'key 配置不正确', { from: 'zh', to: ['en'] }, '54001', true],
      ['baidu', '随意定的错误码信息', { from: 'zh', to: ['en'] }, '100', false],
      ['youdao', '不支持的语言类型', { from: 'zh', to: ['en'] }, '102', true],
      ['youdao', 'appKey 配置不正确', { from: 'zh', to: ['en'] }, '108', true],
      ['youdao', 'key 配置不正确', { from: 'zh', to: ['en'] }, '202', true],
      [
        'youdao',
        '随意定的错误码信息',
        { from: 'zh', to: ['en'] },
        '100',
        false,
      ],
      [
        'tencent',
        'secretId 或者 secretKey 配置不正确',
        { from: 'zh', to: ['en'] },
        'AuthFailure.SignatureFailure',
        true,
      ],
      [
        'tencent',
        '随意定的错误码信息',
        { from: 'zh', to: ['en'] },
        '100',
        false,
      ],
      [
        'aliyun',
        'accessKeyId 或者 accessKeySecret 配置不正确',
        { from: 'zh', to: ['en'] },
        'MissingAccessKeyId',
        true,
      ],
      [
        'aliyun',
        '随意定的错误码信息',
        { from: 'zh', to: ['en'] },
        '100',
        false,
      ],
      [
        'microsoft',
        'key 或者 location 配置不正确',
        { from: 'zh', to: ['en'] },
        '401000',
        true,
      ],
      [
        'microsoft',
        '随意定的错误码信息',
        { from: 'zh', to: ['en'] },
        '100',
        false,
      ],
      [
        'google',
        'projectId 配置不正确',
        { from: 'zh', to: ['en'] },
        '5 NOT_FOUND',
        true,
      ],
      [
        'google',
        'location 或者 语言代码 配置不正确',
        { from: 'zh', to: ['en'] },
        '3 INVALID_ARGUMENT',
        true,
      ],
      [
        'google',
        '随意定的错误码信息',
        { from: 'zh', to: ['en'] },
        '100',
        false,
      ],
    ]

    const spyExit = vi.spyOn(process, 'exit')
    const spyLog = vi.spyOn(console, 'log')
    beforeEach(() => {
      spyExit.mockImplementation(() => undefined)
      spyLog.mockClear()
    })

    afterEach(() => {
      spyExit.mockClear()
    })

    it.each(matrix)(
      '%s：%s',
      async (translator, errorMsg, config, errorCode, isAllKnow) => {
        const langs = require(LANGS_PATH)
        const texts = Object.keys(langs['en'])

        // 调用各自的模拟函数，模拟请求实现
        const expectCallback = translatorMockErrorRequestMap[translator]?.({
          errorCode,
          errorMsg,
        })

        // 设置翻译配置
        setTranslateConfig({
          translator,
          [translator + 'Config']: config,
        } as UnionTranslatorConfig)

        // 执行翻译
        const res = await translateTextsToLangsImpl(texts, {}, false)

        // 验证模拟请求
        expectCallback?.()

        // NOTE 这里google的没有固定的错误信息返回格式，因此这里判断排除google
        if (!['google'].includes(translator)) {
          // 控制台应该会正常输出一些日志信息
          expect(spyLog).toHaveBeenCalledWith(
            '❌',
            expect.stringContaining(
              `错误信息: ${binChalk.default.redBright(errorMsg)}`,
            ),
          )

          expect(spyLog).toHaveBeenCalledWith(
            '❌',
            expect.stringContaining(`错误码：${errorCode}`),
          )
        }

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
              en: ['google'].includes(translator)
                ? // NOTE google 接口异常信息会包含“错误码”，它的错误码跟其他服务的错误码不统一
                  expect.stringContaining(errorCode)
                : expect.stringContaining(`错误信息: ${errorMsg}`),
            }
            return res
          }, {}),
        )
      },
    )
  })

  describe.todo('模拟一些错误场景', () => {
    it('存在部分文本未被翻译的情况', async () => {
      const langs = require(LANGS_PATH)
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
      const spyRequest = vi.spyOn(https, 'request')

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
        baiduConfig: {
          appid: '',
          key: '',
          from: 'zh',
          to: ['en'],
        },
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
      const langs = require(LANGS_PATH)
      const texts = Object.keys(langs['en'])
      const spyRequest = vi.spyOn(https, 'request')

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
        baiduConfig: {
          appid: '',
          key: '',
          from: 'zh',
          to: ['en'],
        },
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

  describe.todo('模拟字符数过多分批次进行翻译', () => {
    type Item = [
      number, // 每次请求的最大字符数
    ]

    const matrix: Item[] = [[100], [200], [500], [1000], [3000], [10000]]

    it.each(matrix)('本次请求最大字符数：%d', async (maxStringLength) => {
      const langs = require(LANGS_PATH)
      const texts = Object.keys(langs['en'])
      const spyRequest = vi.spyOn(https, 'request')
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
          baiduConfig: {
            appid: '',
            key: '',
            from: 'zh',
            to: ['en'],
            delay: 1,
          },
        },
        {
          maxLengthConfig: {
            maxLengthType: 'allStrLength',
            maxLength: maxStringLength,
          },
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
