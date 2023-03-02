import { binAliyunTranslate } from '../../utils'
import { MockRequestProps } from './utils'

const { mockClientUtil } = binAliyunTranslate

export function aliyunMockRequestImpl(props: MockRequestProps) {
  const { type } = props

  const spyGetClient = vi.spyOn(mockClientUtil, 'getClient')

  switch (type) {
    case 'normal':
      {
        const { to, langs } = props
        const currentLang = langs[to]

        // 这里需要模拟 request 实现
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
      }
      break
    case 'errorMsg':
      {
        const { errorCode, errorMsg } = props
        // 这里需要模拟 request 实现
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
      }
      break
    case 'noErrorMsg':
      // 这里需要模拟 request 实现
      mockClientUtil.setClient({
        getBatchTranslateWithOptions() {
          return Promise.reject('')
        },
      } as any)
      break
  }

  return () => {
    // 这里，阿里云批量翻译比较特殊，可能不止一次
    expect(spyGetClient).toHaveBeenCalled()
  }
}
