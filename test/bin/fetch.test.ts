import http from 'http'
import { binfetch } from '../utils'

describe('验证 fetch', () => {
  it('模拟正常请求', async () => {
    const mockData = {
      data: {
        state: 'success',
        message: 'Hello World',
      },
    }
    const spyRequest = vi.spyOn(http, 'request')
    spyRequest.mockImplementation((_url, _option, callback) => {
      const mockReq: any = {
        on: (type, callback) => {
          const str = JSON.stringify(mockData)
          switch (type) {
            case 'data':
              // eslint-disable-next-line no-case-declarations
              const arr = str.split(/(,)/)
              arr.forEach((str) => callback(str))
              break
            case 'end':
              callback()
              break
          }
        },
      }
      callback?.(mockReq)
      return {
        on: () => undefined,
        write: () => undefined,
        end: () => undefined,
      } as any
    })
    const res = await binfetch.default(
      'http://fanyi-api.baidu.com/api/trans/vip/translate',
      {
        data: JSON.stringify({}),
      },
    )

    // 请求成功，但是没有权限
    expect(res).toMatchObject(mockData)
  })

  describe('模拟异常请求', () => {
    it('整个请求异常', async () => {
      const errorMsg = '错误信息'
      const spyRequest = vi.spyOn(http, 'request')
      spyRequest.mockImplementation(() => {
        return {
          on: (type: string, callback: (arg0: string) => void) => {
            if (type === 'error') callback(errorMsg)
          },
          write: () => undefined,
          end: () => undefined,
        } as any
      })
      try {
        await binfetch.default('xxx', {
          data: JSON.stringify({}),
        })
      } catch (error) {
        expect(error).toBe(errorMsg)
      }
    })

    it('解析数据异常', async () => {
      const errorMsg = '错误信息'
      const spyRequest = vi.spyOn(http, 'request')

      // 通过模拟 http.reqeust 实现达到返回错误数据
      spyRequest.mockImplementation((_url, _option, callback) => {
        const mockReq: any = {
          on: (type, callback) => {
            switch (type) {
              case 'data':
                callback('')
                break
              case 'end':
                callback()
                break
            }
          },
        }
        callback?.(mockReq)
        return {
          on: (type: string, callback: (arg0: string) => void) => {
            if (type === 'error') callback(errorMsg)
          },
          write: () => undefined,
          end: () => undefined,
        } as any
      })

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
