import { Link } from 'jsx-to-md'
import { RecordItem } from '../types'

export default function getProxyConfig(service: string): RecordItem {
  return {
    name: 'proxy',
    type: 'string',
    required: tr('否'),
    default: '-',
    description: (
      <>
        {tr('配置代理服务')}
        <br />
        <br />
        {tr(
          '部分国家和地区不能正常访问{0}服务，需要配置代理才行',
          ` \`${service}\` `,
        )}
        <br />
        {tr('格式')}：`protocol://hostname:port`
        <br />
        {tr('例如')}：`http://127.0.0.1:8087`
        {global.docLocale === 'zh' && (
          <>
            <br />
            <br />
            友情提示：国内用户需要科学上网才能获取代理地址，
            <a href="https://github.com/eyelly-wu/vpn">了解如何科学上网</a>
          </>
        )}
      </>
    ),
  }
}
