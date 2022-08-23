import http from 'http'
import { binfetch, mockRequest } from '../utils'

describe('验证 fetch', () => {
  it('模拟正常请求', async () => {
    const mockData = {
      data: {
        state: 'success',
        message: 'Hello World',
      },
    }
    const spyRequest = vi.spyOn(http, 'request')
    spyRequest.mockImplementation(mockRequest({ data: mockData }))
    const res = await binfetch.default(
      'http://fanyi-api.baidu.com/api/trans/vip/translate',
      {
        data: JSON.stringify({}),
      },
    )

    // 请求成功，但是没有权限
    expect(res).toEqual(mockData)
  })

  describe('模拟异常请求', () => {
    it('整个请求异常', async () => {
      const errorMsg = '错误信息'
      const spyRequest = vi.spyOn(http, 'request')
      spyRequest.mockImplementation(
        mockRequest({
          data: {},
          errorType: 'onError',
          errorMsg,
        }),
      )
      try {
        await binfetch.default('xxx', {
          data: JSON.stringify({}),
        })
      } catch (error) {
        expect(error).toBe(errorMsg)
      }
    })

    it('解析数据异常', async () => {
      const spyRequest = vi.spyOn(http, 'request')

      // 通过模拟 http.reqeust 实现达到返回错误数据
      spyRequest.mockImplementation(
        mockRequest({ data: {}, errorType: 'resolveError' }),
      )

      try {
        await binfetch.default('xxx', {
          data: JSON.stringify({}),
        })
      } catch (error) {
        expect(error.toString()).toContain('Unexpected end of JSON input')
      }
    })
  })
})