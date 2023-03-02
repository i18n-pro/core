import https from 'https'
import { mockRequest } from '../../utils'
import { MockRequestProps } from './utils'

export function microsoftMockRequestImpl(props: MockRequestProps) {
  const { type } = props
  const spyRequest = vi.spyOn(https, 'request')

  switch (type) {
    case 'normal':
      {
        const { to, langs } = props
        const currentLang = langs[to]

        // 这里需要模拟 request 实现
        spyRequest.mockImplementation(
          mockRequest({
            data: Object.entries(langs[to] as object).reduce(
              (res, [src, dst]) => {
                res.push({
                  translations: [
                    {
                      text: dst,
                    },
                  ],
                })
                return res
              },
              [] as Array<{ translations: { text: string }[] }>,
            ),
            getResData(requestData: { [key: string]: '' }) {
              let texts = []
              try {
                texts = JSON.parse(Object.keys(requestData)[0])
              } catch (error) {
                console.error(error)
              }
              return texts.map(({ text }) => {
                return {
                  translations: [
                    {
                      text: currentLang?.[text],
                    },
                  ],
                } as { translations: { text: string | undefined }[] }
              })
            },
          }),
        )
      }
      break
    case 'errorMsg':
      {
        const { errorCode, errorMsg } = props
        // 这里需要模拟 request 实现
        spyRequest.mockImplementation(
          mockRequest({
            data: {
              error: {
                code: errorCode,
                message: errorMsg,
              },
            },
          }),
        )
      }
      break
    case 'noErrorMsg':
      // 这里需要模拟 request 实现
      spyRequest.mockImplementationOnce(
        mockRequest({
          errorType: 'onError',
          errorMsg: '',
          data: {},
        }),
      )
      break
  }

  return () => {
    // 正常发起一次接口请求
    expect(spyRequest).toHaveBeenCalledOnce()
  }
}
