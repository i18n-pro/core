import path from 'path'
import { binExtraLangs } from '../utils'

describe.only('验证提取语言包', () => {
  it("当 langType='single' 时", () => {
    const langs = binExtraLangs.default({
      langType: 'single',
      path: path.join(__dirname, '../../i18n'),
      to: [],
    })

    const realLangs = require('../../i18n/langs.json')

    expect(langs).toMatchObject(realLangs)
  })

  it('当 langType="multiple" 时，获取到的是空对象', () => {
    const langs = binExtraLangs.default({
      langType: 'multiple',
      path: path.join(__dirname, '../../i18n'),
      to: ['en'],
    })

    expect(langs).toMatchObject({})
  })

  describe('当 langType="multiple" 时，临时指定文件返回', () => {
    type Item = [
      string, // 描述
      string[], // 配置的语言
      Record<string, string>, // 语言码和对应路径的映射
    ]

    const matrxi: Item[] = [
      ['未配置语言', [], {}],
      ['只配置一个', ['en'], { en: '../i18n/en.json' }],
      ['配置不存在的', ['jp'], {}],
    ]

    it.each(matrxi)('%s', (des, to, map) => {
      const langs = binExtraLangs.default({
        langType: 'multiple',
        path: path.join(__dirname, '../i18n'),
        to: to,
      })

      expect(langs).toMatchObject(
        Object.entries(map).reduce((res, [key, path]) => {
          res[key] = require(path)
          return res
        }, {}),
      )
    })
  })
})
