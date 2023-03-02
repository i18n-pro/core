import { binGoogleTranslate } from '../../utils'
import { MockRequestProps } from './utils'

const { translationClientForTest } = binGoogleTranslate

export function googleMockRequestImpl(props: MockRequestProps) {
  const { type } = props
  const spyTranslateText: any = vi.spyOn(
    translationClientForTest,
    'translateText',
  )

  switch (type) {
    case 'normal':
      {
        const { to, langs } = props

        // 这里需要模拟 request 实现
        spyTranslateText.mockImplementation(({ contents }) => {
          const currentLang = langs[to]

          return [
            {
              translations: contents.map((text) => {
                return { translatedText: currentLang?.[text] }
              }, [] as Array<{ translatedText: string }>),
            },
          ]
        })
      }
      break
    case 'errorMsg':
      {
        const { errorCode, errorMsg } = props
        spyTranslateText.mockImplementation(() => {
          throw `${errorCode}: ${errorMsg}`
        })
      }
      break
    case 'noErrorMsg':
      {
        spyTranslateText.mockImplementation(() => {
          throw ''
        })
      }
      break
  }

  return () => {
    // 正常发起一次接口请求
    expect(spyTranslateText).toHaveBeenCalledOnce()
  }
}
