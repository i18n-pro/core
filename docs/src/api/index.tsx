import {
  Break,
  H1,
  H2,
  render,
  H3,
  CodeBlock,
  TableOfContents,
  getAnchor,
} from 'jsx-to-md'
import { getDocHref, initI18n } from '../utils'
import FunctionTemplate from './FunctionTemplate'

const langsTypeStr = `Record&lt;string, Record&lt;string, string&gt;&gt;`

function renderFormatDesc() {
  const formatTypes = [
    { type: 'formatNumber', name: tr('数字'), lowTag: 'n', upperTag: 'N' },
    { type: 'formatCurrency', name: tr('货币'), lowTag: 'c', upperTag: 'C' },
    { type: 'formatDate', name: tr('日期'), lowTag: 'd', upperTag: 'D' },
    { type: 'formatTime', name: tr('时间'), lowTag: 't', upperTag: 'T' },
    { type: 'formatPlural', name: tr('复数'), lowTag: 'p', upperTag: 'P' },
  ]

  const getDesc = (name: string, lowTag: string, upperTag: string) => {
    return tr(
      '格式化{0}类型动态参数的回调，对应的类型标记是{1}{2}{3}',
      render(<b>{name}</b>),
      render(<b> {lowTag} </b>),
      tr('或'),
      render(<b> {upperTag} </b>),
    )
  }

  return formatTypes.reduce((res, { type, name, lowTag, upperTag }) => {
    res[type] = getDesc(name, lowTag, upperTag)
    return res
  }, {})
}

function getTitleToA(title: string) {
  return render(<a href={getAnchor(title)}>{title}</a>)
}

function getFormatTypeString(prefix: '  ' | '    ') {
  return `${prefix}formatNumber?: ${getTitleToA('FormatFunc')},
${prefix}formatCurrency?: ${getTitleToA('FormatFunc')},
${prefix}formatDate?: ${getTitleToA('FormatDateFunc')},
${prefix}formatTime?: ${getTitleToA('FormatDateFunc')},
${prefix}formatPlural?: ${getTitleToA('FormatPluralFunc')},`
}

function APIList() {
  return (
    <>
      <H2>{tr('函数列表')}</H2>
      <FunctionTemplate
        name="initI18n"
        description={tr('初始化固定配置，获取核心 API')}
        type={`(
  props: {
    namespace: string,
    locale?: string,
    langs?: ${langsTypeStr},
    beginIndex?: number,
${getFormatTypeString('    ')}
  }
) => ({
  ${getTitleToA('t')},
  ${getTitleToA('setI18n')},
  ${getTitleToA('withI18n')},
})`}
        props={{
          namespace: tr('指定命名空间'),
          locale: (
            <>
              {tr('指定当前语言')}
              <br />
              <br />
              📢📢📢：
              {tr(
                '{0}的值默认跟语言代码相对应，如需自定义，需参考{1}的用法',
                ` ${render(<code>locale</code>)} `,
                ` ${render(<code>codeLocaleMap</code>)} `,
              )}
            </>
          ),
          langs: tr('设置当前语言包'),
          beginIndex: tr(
            '设置{0}函数中动态参数起始下标，默认为 0',
            ` ${render(<code>t</code>)} `,
          ),
          ...renderFormatDesc(),
        }}
      />

      <FunctionTemplate
        name="t"
        description={
          <>
            {tr('获取国际化文案')}
            <br />
            {tr(
              '内部会根据当前语言{0}从语言包{1}中获取{2}对应的翻译文案，未匹配到对应翻译内容会直接显示{3}本身内容',
              ` ${render(<code>locale</code>)} `,
              ` ${render(<code>langs</code>)} `,
              ` ${render(<code>text</code>)} `,
              ` ${render(<code>text</code>)} `,
            )}
          </>
        }
        type={`(
  text: string,
  ...args: Array&lt;string|number|unknown&gt;
) =&gt; string`}
        props={{
          text: tr(
            '待翻译的文案，该文案需满足特定{0}',
            ` ${render(
              <a href={getDocHref('MATCH_RULE')}>{tr('匹配规则')}</a>,
            )} `,
          ),
          args: tr(
            '表示动态参数，没有个数限制，{0}文案中需要以{1}的形式来接收，{2}表示动态参数的位置，从 0 开始（可在{3}中自定义起始值），第 1 个参数对应 0，对 2 个参数对应 1，以此往复',
            ` ${render(<code>text</code>)} `,
            ` ${render(<code>{'{index}'}</code>)} `,
            ` ${render(<code>index</code>)} `,
            ` ${render(<code>initI18n</code>)} `,
          ),
        }}
      />

      <FunctionTemplate
        name="setI18n"
        description={tr('设置语言、语言包')}
        type={`(
  props: {
    locale?: string,
    langs?: ${langsTypeStr},
  }
) => ${getTitleToA('I18nState')}`}
        props={{
          locale: tr('指定当前语言'),
          langs: tr(
            '设置当前语言包，支持增量添加，新增的会覆盖合并到原有的之中',
          ),
        }}
      />
      <FunctionTemplate
        name="withI18n"
        description={
          <>
            {tr('获取独立于主程序的{0}函数', ` ${render(<code>t</code>)} `)}
            <br />
            {tr('适用于服务端，每个接口响应需要做国际化的处理')}
          </>
        }
        type={`(
  props:{
    locale: string
  }
) => ({ ${getTitleToA('t')} })`}
        props={{
          locale: tr('指定当前语言'),
        }}
      />
    </>
  )
}

function TypeInfo(props: { name: string; desc: string; content: string }) {
  const { name, desc, content } = props
  return (
    <>
      <H3>{name}</H3>
      {desc}
      <Break />
      <pre>{content}</pre>
      <Break />
    </>
  )
}

function FunctionType() {
  return (
    <>
      <Break />
      <H2>{tr('函数类型')}</H2>
      <TypeInfo
        name="I18nState"
        desc={tr('命名空间下的状态')}
        content={`type I18nState = {
  namespace: string
  locale?: string
  langs?: ${langsTypeStr}
  beginIndex?: number
${getFormatTypeString('  ')}
}`}
      />
      <H3>FormatFunc</H3>
      {tr('通用的格式化回调类型')}
      <CodeBlock
        langType="ts"
        code={`type FormatFunc = <T>(props: {
  locale: string, // ${tr('当前语言')}
  payload: string | number | unknown | T, // ${tr('动态参数')}
}) => number | string`}
      />
      <H3>FormatDateFunc</H3>
      {tr('日期（时间）的格式化回调函数类型')}
      <CodeBlock
        langType="ts"
        code={`type FormatDateFunc = <T>(props: {
  locale: string, // ${tr('当前语言')}
  payload: string | number | Date | unknown | T, // ${tr('动态参数')}
}) => string`}
      />
      <H3>FormatPluralFunc</H3>
      {tr('复数的格式化回调函数类型')}
      <CodeBlock
        langType="ts"
        code={`type FormatPluralFunc = <T>(props: {
  locale: string, // ${tr('当前语言')}
  payload: string | number | unknown | T, // ${tr('动态参数')}
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
