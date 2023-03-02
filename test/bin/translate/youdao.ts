import https from 'https'
import { mockRequest } from '../../utils'
import { MockRequestProps } from './utils'

export function youdaoMockRequestImpl(props: MockRequestProps) {
  const { type } = props
  const spyRequest = vi.spyOn(https, 'request')

  switch (type) {
    case 'normal':
      {
        const { to, langs } = props
        // 这里需要模拟 request 实现
        spyRequest.mockImplementation(
          mockRequest({
            data: {
              errorCode: '0',
              translateResults: Object.entries(langs[to] as object).reduce(
                (res, [src, dst]) => {
                  res.push({
                    query: src,
                    translation: dst,
                  })
                  return res
                },
                [] as Array<{ query: string; translation: any }>,
              ),
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
              errorCode,
              msg: errorMsg,
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
