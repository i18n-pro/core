import https from 'https'
import { Langs } from '../../../src/type'
import { mockRequest } from '../../utils'

export function youdaoMockRequestImpl(props: { to: string; langs: Langs }) {
  const { to, langs } = props
  const spyRequest = vi.spyOn(https, 'request')

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

  return () => {
    // 正常发起一次接口请求
    expect(spyRequest).toHaveBeenCalledOnce()
  }
}
