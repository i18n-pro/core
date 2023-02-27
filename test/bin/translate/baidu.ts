import https from 'https'
import { Langs } from '../../../src/type'
import { mockRequest } from '../../utils'

export function baiduMockRequestImpl(props: { to: string; langs: Langs }) {
  const { to, langs } = props
  const spyRequest = vi.spyOn(https, 'request')

  // 这里需要模拟 request 实现
  spyRequest.mockImplementation(
    mockRequest({
      data: {
        trans_result: Object.entries(langs[to] as object).reduce(
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

  return () => {
    // 正常发起一次接口请求
    expect(spyRequest).toHaveBeenCalledOnce()
  }
}

export function baiduMockErrorRequestImpl(props: {
  errorCode: string
  errorMsg: string
}) {
  const { errorCode, errorMsg } = props
  const spyRequest = vi.spyOn(https, 'request')

  // 这里需要模拟 request 实现
  spyRequest.mockImplementationOnce(
    mockRequest({
      data: {
        error_code: errorCode,
        error_msg: errorMsg,
      },
    }),
  )

  return () => {
    // 正常发起一次接口请求
    expect(spyRequest).toHaveBeenCalledOnce()
  }
}
