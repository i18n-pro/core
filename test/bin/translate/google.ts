import { Langs } from '../../../src/type'
import { binGoogleTranslate } from '../../utils'

const { translationClientForTest } = binGoogleTranslate

export function googleMockRequestImpl(props: { to: string; langs: Langs }) {
  const { to, langs } = props
  const spyTranslateText: any = vi.spyOn(
    translationClientForTest,
    'translateText',
  )

  spyTranslateText.mockImplementation(() => {
    return [
      {
        translations: Object.entries(langs[to] || {}).reduce(
          (res, [from, to]) => {
            res.push({ translatedText: to })
            return res
          },
          [] as Array<{ translatedText: string }>,
        ),
      },
    ]
  })

  return () => {
    // 正常发起一次接口请求
    expect(spyTranslateText).toHaveBeenCalledOnce()
  }
}
