import https from 'https'
import { Langs } from '../../../src/type'
import { mockRequest } from '../../utils'

export function microsoftMockRequestImpl(props: { to: string; langs: Langs }) {
  const { to, langs } = props
  const spyRequest = vi.spyOn(https, 'request')
  const currentLang = langs[to]

  // 这里需要模拟 request 实现
  spyRequest.mockImplementation(
    mockRequest({
      data: Object.entries(langs[to] as object).reduce((res, [src, dst]) => {
        res.push({
          translations: [
            {
              text: dst,
            },
          ],
        })
        return res
      }, [] as Array<{ translations: { text: string }[] }>),
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

  return () => {
    // 正常发起一次接口请求
    expect(spyRequest).toHaveBeenCalledOnce()
  }
}

export function microsoftMockErrorRequestImpl(props: {
  errorCode: string
  errorMsg: string
}) {
  const { errorCode, errorMsg } = props
  const spyRequest = vi.spyOn(https, 'request')

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

  return () => {
    // 正常发起一次接口请求
    expect(spyRequest).toHaveBeenCalledOnce()
  }
}
