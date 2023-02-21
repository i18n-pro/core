import alimt from '@alicloud/alimt20181012'
import { binAliyunTranslate } from '../../utils'
import { Langs } from '../../../src/type'

const { mockClientUtil } = binAliyunTranslate

export function aliyunMockRequestImpl(props: { to: string; langs: Langs }) {
  const { to, langs } = props
  console.log({
    type: typeof alimt,
  })

  const spyGetClient = vi.spyOn(mockClientUtil, 'getClient')

  mockClientUtil.setClient({
    getBatchTranslateWithOptions() {
      return Promise.resolve({
        body: {
          translatedList: Object.entries(langs[to] as object).reduce(
            (res, [src, dst], index) => {
              res.push({
                code: '200',
                index,
                translated: dst,
              })
              return res
            },
            [] as Array<{ code: string; index: number; translated: string }>,
          ),
        },
      })
    },
  } as any)

  return () => {
    // 正常发起一次接口请求
    expect(spyGetClient).toHaveBeenCalledOnce()
  }
}
