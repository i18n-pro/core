import https from 'https'
import { mockRequest } from '../../utils'
import { MockRequestProps } from './utils'

export function tencentMockRequestImpl(props: MockRequestProps) {
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
            data: {
              Response: {
                TargetTextList: Object.entries(langs[to] as object).reduce(
                  (res, [src, dst], index) => {
                    res.push(dst)
                    return res
                  },
                  [] as string[],
                ),
              },
            },
            getResData(requestData: { [key: string]: '' }) {
              let SourceTextList = []
              try {
                const obj = JSON.parse(Object.keys(requestData)[0])
                SourceTextList = obj.SourceTextList
              } catch (error) {
                console.error(error)
              }
              return {
                Response: {
                  TargetTextList: SourceTextList.map((item) => {
                    return currentLang?.[item]
                  }),
                },
              }
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
              Response: {
                Error: {
                  Code: errorCode,
                  Message: errorMsg,
                },
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
