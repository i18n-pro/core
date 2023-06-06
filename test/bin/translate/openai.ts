import https from 'https'
import { mockRequest } from '../../utils'
import { MockRequestProps } from './utils'

export function openaiMockRequestImpl(props: MockRequestProps) {
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
            data: {},
            getResData(requestData: { [key: string]: '' }) {
              let texts = []
              let mockTranslateTexts
              try {
                const body = JSON.parse(Object.keys(requestData)[0])
                texts = body.messages[0].content
                  .split('return the translated JSON array only: ')
                  .slice(1)
                texts = JSON.parse(texts)
                mockTranslateTexts = texts.reduce((res, text) => {
                  // 这里需要模拟部分字段未翻译
                  res.push(currentLang?.[text] || '')
                  return res
                }, [] as string[])
              } catch (error) {
                console.error(error)
              }
              return {
                choices: [
                  {
                    message: {
                      content: `\n\n${JSON.stringify(mockTranslateTexts)}`,
                    },
                  },
                ],
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
      spyRequest.mockImplementation(
        mockRequest({
          errorType: 'onError',
          errorMsg: '',
          data: {},
        }),
      )
      break
  }

  return () => {
    // 由于token的限制，这里可能不止请求一次
    expect(spyRequest).toHaveBeenCalled()
  }
}
