import https from 'https'
import { binTranslate } from '../../utils'
import {
  Langs,
  Translator,
  UnionBasicTranslatorConfig,
  UnionTranslatorConfig,
} from '../../../src/type'
import { LANGS_PATH } from './utils'

const { setTranslateConfig, translateTextsToLangsImpl } = binTranslate

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
})
