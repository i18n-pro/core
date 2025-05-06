import { it, vi, expect, describe } from 'vitest'
import https from 'https'
import { mockRequest, binTranslate, binConstants } from '../../utils'
import { LANGS_PATH } from './utils'
import { MaxLengthType } from '../../../src/type'

const { setTranslateConfig, translateTextsToLangsImpl } = binTranslate
const { SEPARATOR_STR } = binConstants

const config = {
  maxLengthType: 'allStrLength' as MaxLengthType,
  maxLength: 3000,
  separator: SEPARATOR_STR,
}

// 当前已翻译的语言包
const textLangs = require(LANGS_PATH)

// 当前翻译的文案
const texts = Object.keys(textLangs['en'])

const copyTextKey = Object.keys(textLangs['en'])[0]
const copyText = textLangs['en'][copyTextKey]

// 模拟的自定义key语言包
const keyLangs = {
  key1: '已翻译好的key',
  key3: '要被移除的key',
}

// 模拟的自定义key语言包
const langsTextMap = {
  已翻译好的key: '已翻译好的key',
}

const customKeys = ['key1', 'key2']

// 所有的语言包
const allEnLangs = {
  ...keyLangs,
  ...textLangs.en,
}

// 模拟已存在的语言包
const existEnLangs = {
  key3: keyLangs.key3,
  ...textLangs.en,
}

describe('测试 t.t 的翻译', () => {
  type Item = [string, boolean]

  const matrix: Item[] = [
    ['非增量模式', false],
    ['增量模式', true],
  ]

  it.each(matrix)('测试 %s', async (name, incrementalMode) => {
    const spyRequest = vi.spyOn(https, 'request')

    // 这里需要模拟 request 实现
    spyRequest.mockImplementation(
      mockRequest({
        data: {},
        getResData: (requestData) => {
          const { q } = requestData
          const currentTexts = q.split(SEPARATOR_STR)

          const res = currentTexts.reduce((res, item) => {
            res.push({
              src: item,
              dst: langsTextMap[item] || allEnLangs[item] || '',
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
        translator: 'baidu',
        baiduConfig: {
          appid: '',
          key: '',
          from: 'zh',
          to: ['en'],
          delay: 0,
        },
      },
      {
        maxLengthConfig: config,
      },
    )

    // 执行翻译
    const res = await translateTextsToLangsImpl({
      texts,
      langsProp: {
        en: existEnLangs,
      },
      incrementalMode,
      customKeys,
      keyTextMap: {
        // 这里只有两个key
        key1: allEnLangs['key1'],
        key2: copyTextKey,
      },
    })

    expect(res.langs).toEqual({
      en: {
        key1: keyLangs.key1,
        key2: copyText,
        // 上面是自定义的key
        ...textLangs.en,
      },
    })
  })
})
