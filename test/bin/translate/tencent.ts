import https from 'https'
import { Langs } from '../../../src/type'
import { mockRequest } from '../../utils'

export function tencentMockRequestImpl(props: { to: string; langs: Langs }) {
  const { to, langs } = props
  const spyRequest = vi.spyOn(https, 'request')

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
    }),
  )

  return () => {
    // 正常发起一次接口请求
    expect(spyRequest).toHaveBeenCalledOnce()
  }
}

export function tencentMockErrorRequestImpl(props: {
  errorCode: string
  errorMsg: string
}) {
  const { errorCode, errorMsg } = props
  const spyRequest = vi.spyOn(https, 'request')

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

  return () => {
    // 正常发起一次接口请求
    expect(spyRequest).toHaveBeenCalledOnce()
  }
}
