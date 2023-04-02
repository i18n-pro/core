import { binGooglexTranslate } from '../../utils'
import { MockRequestProps } from './utils'

const { proxyObject } = binGooglexTranslate

export function googlexMockRequestImpl(props: MockRequestProps) {
  const { type } = props
  const translateImpl: any = vi.spyOn(proxyObject, 'translate')

  switch (type) {
    case 'normal':
      {
        const { to, langs } = props

        // 这里需要模拟 request 实现
        translateImpl.mockImplementation((object) => {
          const currentLang = langs[to]

          return object.texts.map((text) => {
            return { text: currentLang?.[text] }
          }, [] as Array<{ text: string }>)
        })
      }
      break
  }

  return () => {
    // 正常发起一次接口请求
    expect(translateImpl).toHaveBeenCalledOnce()
  }
}
