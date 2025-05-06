import { vi, expect } from 'vitest'
import { binGooglexTranslate } from '../../utils'
import { MockRequestProps } from './utils'

const { proxyGoogleXTranslate } = binGooglexTranslate

export function googlexMockRequestImpl(props: MockRequestProps) {
  const { type } = props
  const translateImpl: any = vi.spyOn(proxyGoogleXTranslate, 'translate')

  switch (type) {
    case 'normal':
      {
        const { langs } = props

        // 这里需要模拟 request 实现
        translateImpl.mockImplementation((texts, { to }) => {
          const currentLang = langs[to]

          return texts.map((text) => {
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
