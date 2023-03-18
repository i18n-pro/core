import https from 'node:https'
import type { IncomingMessage, RequestOptions } from 'node:http'
import createHttpsProxyAgent from 'https-proxy-agent'
import { HttpsProxyAgentOptions } from '../type'

/**
 * 基于内置 http封装请求方法
 * @param url
 * @param options
 * @returns
 */
export default function fetch(
  url: string,
  options: {
    data: Record<string, unknown> | unknown // 请求数据
    proxy?: HttpsProxyAgentOptions
  } & RequestOptions,
): Promise<unknown> {
  const { data, proxy, ...restOptions } = options

  const agent = proxy ? createHttpsProxyAgent(proxy) : undefined

  return new Promise((resolve, reject) => {
    const req = https.request(
      url,
      {
        ...restOptions,
        agent,
      },
      (reqs: IncomingMessage) => {
        let res = ''
        reqs.on('data', (d: NodeJS.ArrayBufferView | ArrayBuffer) => {
          res += d
        })
        reqs.on('end', () => {
          try {
            const content = JSON.parse(res)
            resolve(content)
          } catch (error) {
            reject(error)
          }
        })
      },
    )

    req.on('error', (err: unknown) => {
      reject(err)
    })

    req.write(data)

    req.end()
  })
}
