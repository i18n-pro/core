import { Break, H1, H2, render, H3, TableOfContents } from 'jsx-to-md'
import {
  getFormatterText,
  getInterpolationVariable,
  getTitleToA,
  initI18n,
} from '../utils'
import FunctionTemplate from './FunctionTemplate'
import T from './T'

const langsTypeStr = `Record&lt;string, (() => Promise&lt;${getTitleToA(
  'LangPack',
)}&gt;) | ${getTitleToA('LangPack')}&gt;`

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
      '{0}类型{1}的{2}，对应的类型标记是{3}{4}{5}',
      render(<b> {name} </b>),
      ` ${render(<code>{getInterpolationVariable(true)}</code>)} `,
      ` ${render(<code>{getFormatterText(true)}</code>)} `,
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
            '设置{0}函数中{1}起始下标，默认为 0',
            ` ${render(<code>t</code>)} `,
            ` ${render(<code>{getInterpolationVariable(true)}</code>)} `,
          ),
          ...renderFormatDesc(),
        }}
      />

      <T />

      <FunctionTemplate
        name="setI18n"
        description={tr('设置语言、语言包')}
        type={`(
  props: {
    locale?: string,
    langs?: ${langsTypeStr},
  }
) => Promise&lt;${getTitleToA('I18nState')}&gt;`}
        props={{
          locale: tr('指定当前语言'),
          langs: tr(
            '设置当前语言包，支持增量添加，新增的会覆盖合并到原有的之中',
          ),
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
      <H2>{tr('其他类型')}</H2>
      {tr(
        '以下类型是为了方便文档说明，与代码中类型写法上会存在区别，需以实际代码为准',
      )}
      <TypeInfo
        name="LangPack"
        desc={tr('语言包')}
        content={`type LangPack = Record&lt;string, string&gt;`}
      />
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
      <TypeInfo
        name="FormatFunc"
        desc={tr('通用的{0}类型', ` ${getFormatterText()} `)}
        content={`type FormatFunc = &lt;T&gt;(props: {
  /**
   * ${tr('当前语言')}
   */
  locale: string,
  /**
   * ${getInterpolationVariable(true)}
   */
  payload: string | number | unknown | T,
  /**
   * ${tr('{0}函数', 't ')}
   */
  t: ${getTitleToA('t')},
}) => number | string`}
      />
      <TypeInfo
        name="FormatDateFunc"
        desc={tr('日期（时间）的{0}类型', ` ${getFormatterText()} `)}
        content={`type FormatDateFunc = &lt;T&gt;(props: {
  /**
   * ${tr('当前语言')}
   */
  locale: string,
  /**
   * ${getInterpolationVariable(true)}
   */
  payload: string | number | Date | unknown | T,
  /**
   * ${tr('{0}函数', 't ')}
   */
  t: ${getTitleToA('t')},
}) => string`}
      />
      <TypeInfo
        name="FormatPluralFunc"
        desc={tr('复数的{0}类型', ` ${getFormatterText()} `)}
        content={`type FormatPluralFunc = &lt;T&gt;(props: {
  /**
   * ${tr('当前语言')}
   */
  locale: string,
  /**
   * ${getInterpolationVariable(true)}
   */
  payload: string | number | unknown | T,
  /**
   * ${tr(
     '默认将量词和名词组合起来的字符串，不需要复数处理的语言可以直接返回该属性',
   )}
   */
  text: string
  /**
   * ${tr('复数关键词')}
   */
  keyword: string
  /**
   * ${tr('{0}函数', 't ')}
   */
  t: ${getTitleToA('t')},
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
