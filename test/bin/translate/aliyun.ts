import { binAliyunTranslate } from '../../utils'
import { Langs } from '../../../src/type'

const { mockClientUtil } = binAliyunTranslate

export function aliyunMockRequestImpl(props: { to: string; langs: Langs }) {
  const { to, langs } = props

  const spyGetClient = vi.spyOn(mockClientUtil, 'getClient')
  const currentLang = langs[to]

  mockClientUtil.setClient({
    getBatchTranslateWithOptions(params: any) {
      const { sourceText } = params
      const sourceTextObj = JSON.parse(sourceText)

      return Promise.resolve({
        body: {
          translatedList: Object.entries(sourceTextObj).reduce(
            (res, [index, src]) => {
              res.push({
                code: '200',
                index,
                translated: currentLang?.[src as string] as string,
              })
              return res
            },
            [] as Array<{
              code: string
              index: number | string
              translated: string
            }>,
          ),
        },
      })
    },
  } as any)

  return () => {
    // 这里，阿里云批量翻译比较特殊，可能不止一次
    expect(spyGetClient).toHaveBeenCalled()
  }
}

export function aliyunMockErrorRequestImpl(props: {
  errorCode: string
  errorMsg: string
}) {
  const { errorCode, errorMsg } = props

  const spyGetClient = vi.spyOn(mockClientUtil, 'getClient')

  mockClientUtil.setClient({
    getBatchTranslateWithOptions() {
      return Promise.resolve({
        body: {
          code: errorCode,
          message: errorMsg,
        },
      })
    },
  } as any)

  return () => {
    // 这里，阿里云批量翻译比较特殊，可能不止一次
    expect(spyGetClient).toHaveBeenCalled()
  }
}
