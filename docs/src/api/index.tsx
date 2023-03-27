import React, {
  Break,
  H1,
  H2,
  render,
  H3,
  CodeBlock,
  TableOfContents,
} from 'jsx-to-md'
import { initI18n } from '../utils'

function renderFormatDesc() {
  const formatTypes = [
    { type: 'formatNumber', name: tr('数字'), lowTag: 'n', upperTag: 'N' },
    { type: 'formatCurrency', name: tr('货币'), lowTag: 'c', upperTag: 'C' },
    { type: 'formatDate', name: tr('日期'), lowTag: 'd', upperTag: 'D' },
    { type: 'formatTime', name: tr('时间'), lowTag: 't', upperTag: 'T' },
    { type: 'formatPlural', name: tr('复数'), lowTag: 'p', upperTag: 'P' },
  ]

  return (
    <>
      {formatTypes.map(({ type, name, lowTag, upperTag }) => {
        return (
          <>
            <br />
            <b>{type}</b>：
            {tr(
              '格式化{0}类型动态参数的回调，对应的类型标记是{1}{2}{3}',
              render(<b>{name}</b>),
              render(<b> {lowTag} </b>),
              tr('或'),
              render(<b> {upperTag} </b>),
            )}
          </>
        )
      })}
    </>
  )
}

function APIList() {
  return (
    <>
      <H2>{tr('函数列表')}</H2>
      {tr('下面的类型是以{0}语法来表示的', ' `TypeScript` ')}
      <table>
        <tr>
          <th>{tr('函数名')}</th>
          <th>{tr('类型')}</th>
          <th>{tr('说明')}</th>
        </tr>
        <tr>
          <td>initI18n</td>
          <td>
            <pre>
              {`(
    props: {
        namespace: string,
        locale?: string,
        langs?: Record<strng, Record<string, string>>,
        beginIndex?: number,
        formatNumber?: ${render(<a href="#FormatFunc">FormatFunc</a>)},
        formatCurrency?: ${render(<a href="#FormatFunc">FormatFunc</a>)},
        formatDate?: ${render(<a href="#FormatDateFunc">FormatDateFunc</a>)},
        formatTime?: ${render(<a href="#FormatDateFunc">FormatDateFunc</a>)},
        formatPlural?: ${render(
          <a href="#FormatPluralFunc">FormatPluralFunc</a>,
        )},
    }
) => ({
  setI18n,
  t,
  withI18n,
})`}
            </pre>
          </td>
          <td>
            {tr('初始化固定配置，获取核心 API')}
            <br />
            <br />
            <b>namespace</b>：{tr('指定命名空间')}
            <br />
            <b>locale</b>：{tr('指定当前语言')}
            <br />
            <b>langs</b>：{tr('设置当前语言包')}
            <br />
            <b>beginIndex</b>：
            {tr(
              '设置{0}函数中动态参数起始下标，默认为 0',
              render(<code> t </code>),
            )}
            {renderFormatDesc()}
            <br />
            <br />
            📢📢📢：
            {tr(
              '{0}的值默认跟语言代码相对应，如需自定义，需参考{1}的用法',
              render(<code>locale</code>),
              render(<code>codeLocaleMap</code>),
            )}
          </td>
        </tr>
      </table>
      <span>{tr('以下是核心API')}</span>
      <table>
        <tr>
          <th>{tr('函数名')}</th>
          <th>{tr('类型')}</th>
          <th>{tr('说明')}</th>
        </tr>
        <tr>
          <td>t</td>
          <td>
            <pre>
              {`(
  text: string,
  ...args: Array&lt;string|number|unknown&gt;
) =&gt; string`}
            </pre>
          </td>
          <td>
            {tr('获取国际化文本')}
            <br />
            <br />
            {tr(
              '内部会根据当前语言{0}从语言包{1}中获取{2}对应的翻译文本，未匹配到对应翻译内容会直接显示{3}本身内容',
              render(<code> locale </code>),
              render(<code> langs </code>),
              render(<code> text </code>),
              render(<code> text </code>),
            )}
            <br />
            <b>text</b>：{tr('待翻译的文本')}
            <br />
            <b>args</b>：
            {tr(
              '表示动态参数，没有个数限制，{0}文本中需要以{1}的形式来接收，{2}表示动态参数的位置，从 0 开始（可在{3}中自定义起始值），第1个参数对应 0，对2个参数对应1，以此往复',
              render(<code> text </code>),
              render(<code> {'{index}'} </code>),
              render(<code> index </code>),
              render(<code> initI18n </code>),
            )}
            <br />
            <br />
            {tr('例如')}：
            {render(
              <code>
                {`t('这个男人叫{0}，意外获得了超能力，这个女人叫{1}，意外被{2}追杀，这个小孩叫{3}，意外遭遇了意外', '小帅', '小美', 'FBI',
                '小白')`}
              </code>,
            )}
            <br />
            {tr('当前语言（中文:zh）的执行结果是')}：
            这个男人叫小帅，意外获得了超能力，这个女人叫小美，意外被FBI追杀，这个小孩叫小白，意外遭遇了意外
            <br />
            {tr('百度翻译成英语的结果是')}：The man's name is 小帅, and he
            accidentally obtained super power. The woman's name is 小美, and she
            was accidentally chased by FBI. The child's name is 小白, and she
            was accidentally hit by an accident
          </td>
        </tr>
        <tr>
          <td>setI18n</td>
          <td>
            <pre>
              {`(
    props: {
        locale?: string,
        langs?: Record<string, Record<string, string>>,
    }
) => void`}
            </pre>
          </td>
          <td>
            {tr('设置语言、语言包')}
            <br />
            <br />
            <b>locale</b>：{tr('指定当前语言')}
            <br />
            <b>langs</b>：
            {tr('设置当前语言包，支持增量添加，新增的会覆盖合并到原有的之中')}
            <br />
          </td>
        </tr>
        <tr>
          <td>withI18n</td>
          <td>
            <pre>
              {`(
    props:{
          locale: string
    }
) => ({ t })`}
            </pre>
          </td>
          <td>
            {tr('获取独立于主程序的{0}函数', render(<code> t </code>))}
            <br />
            <br />
            {tr('适用于服务端，每个接口响应需要做国际化的处理')}
          </td>
        </tr>
      </table>
    </>
  )
}

function FunctionType() {
  return (
    <>
      <Break />
      <H2>{tr('函数类型')}</H2>
      <H3>FormatFunc</H3>
      {tr('通用的格式化回调类型')}
      <CodeBlock
        langType="ts"
        code={`type FormatFunc = <T>(props:{
  locale: string, // ${tr('当前语言')}
  payload: string | number | unknow | T, // ${tr('动态参数')}
}) => number | string`}
      />
      <H3>FormatDateFunc</H3>
      {tr('日期（时间）的格式化回调函数类型')}
      <CodeBlock
        langType="ts"
        code={`type FormatDateFunc = <T>(props:{
  locale: string, // ${tr('当前语言')}
  payload: string | number | Date | unknow | T, // ${tr('动态参数')}
}) => string`}
      />
      <H3>FormatPluralFunc</H3>
      {tr('复数的格式化回调函数类型')}
      <CodeBlock
        langType="ts"
        code={`type FormatPluralFunc = <T>(props:{
  locale: string, // ${tr('当前语言')}
  payload: string | number | unknow | T, // ${tr('动态参数')}
  text: string // ${tr(
    '默认将量词和名词组合起来的字符串，不需要复数处理的语言可以直接返回该属性',
  )}
  keyword: string // ${tr('复数关键词')}
}) => string`}
      />
    </>
  )
}

export default function API(props) {
  initI18n(props)

  return (
    <>
      <H1 skip>{tr('函数API')}</H1>
      <TableOfContents text={tr('目录')} open={false} />
      <APIList />
      <FunctionType />
    </>
  )
}
