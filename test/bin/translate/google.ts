import { Langs } from '../../../src/type'
import { binGoogleTranslate } from '../../utils'

const { translationClientForTest } = binGoogleTranslate

export function googleMockRequestImpl(props: { to: string; langs: Langs }) {
  const { to, langs } = props
  const spyTranslateText: any = vi.spyOn(
    translationClientForTest,
    'translateText',
  )

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

  return () => {
    // 正常发起一次接口请求
    expect(spyTranslateText).toHaveBeenCalledOnce()
  }
}

export function googleMockErrorRequestImpl(props: {
  errorCode: string
  errorMsg: string
}) {
  const { errorCode, errorMsg } = props
  const spyTranslateText: any = vi.spyOn(
    translationClientForTest,
    'translateText',
  )

  spyTranslateText.mockImplementation(() => {
    throw `${errorCode}: ${errorMsg}`
  })

  return () => {
    // 正常发起一次接口请求
    expect(spyTranslateText).toHaveBeenCalledOnce()
  }
}
