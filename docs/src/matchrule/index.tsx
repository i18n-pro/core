import { H1, CodeBlock, TableOfContents, List, Break, H2, H3 } from 'jsx-to-md'
import {
  getCodeDemoDesc,
  getTranslationText,
  getVariableInterpolation,
  initI18n,
  getCodeDemoPrefix,
  getText,
  getCustomKey,
} from '../utils'

function MatchAble(props: { isDot?: boolean }) {
  const { isDot } = props
  const prefix = getCodeDemoPrefix(isDot)

  return (
    <>
      <Break />
      <Break />
      {getCodeDemoDesc(isDot)}
      <CodeBlock
        code={`${prefix}'hello world')
${prefix}"hello world")
${prefix}\`hello world\`)`}
      />
    </>
  )
}

function NotMatchAble(props: { isDot?: boolean }) {
  const { isDot } = props
  const prefix = getCodeDemoPrefix(isDot)

  return (
    <>
      <Break />
      <Break />
      {getCodeDemoDesc(isDot)}
      <CodeBlock
        code={`const foo = 'foo'
const fooFunc = (x:string) => x

// ${tr('非字符串字面量')}
${prefix}foo)
${prefix}'xxx' + foo)
${prefix}\`${'${foo}'}\`)
${prefix}fooFunc(foo))

// ${tr('包含{0}或者{1}', ' \\n ', ' \\t')}
${prefix}'x\\nx')
${prefix}'x\\tx')

// ${tr('包含首尾空白字符')}
${prefix}' xxx')
${prefix}'xxx  ')
${prefix}' xxx ')

// ${tr('{0}语法中有换行', tr('模板字符串'))}
${prefix}\`
x
x
x
\`)`}
      />
    </>
  )
}

function VariableInterpolation(props: { isDot?: boolean }) {
  const { isDot } = props
  const prefix = getCodeDemoPrefix(isDot)

  return (
    <>
      <Break />
      <Break />
      {getCodeDemoDesc(isDot)}
      <CodeBlock
        code={`${prefix}'${tr(
          '我叫{0}，今年{1}岁，来自{2}，是一名{3}',
        )}', '${tr('王尼玛')}', 35, '${tr('火星')}', '${tr('码农')}')`}
      />
    </>
  )
}

export default function MatchRule(props) {
  initI18n(props)

  const commonRequirement1 = tr('必须为字符串字面量')
  const commonRequirement2 = tr(
    '不得包含{0}表达式或变量',
    getText('JavaScript'),
  )

  return (
    <>
      <H1 skip>{tr('匹配规则')}</H1>
      <TableOfContents text={tr('目录')} open={false} />
      <H2>{tr('规则')}</H2>
      <H3>{tr('参数{0}规则', getText('text'))}</H3>
      {tr('适用于{0}和{1}函数：', getText('t'), getText('t.t'))}
      <List
        items={[
          'U',
          commonRequirement1,
          commonRequirement2,
          tr('不得包含特殊字符（如{0}、{1}）', getText('\\n'), getText('\\t')),
          tr('不得包含首尾空白字符'),
          tr('{0}必须为单行', getText(tr('模板字符串'))),
        ]}
      />
      <H3>{tr('参数{0}规则', getText('key'))}</H3>
      {tr('适用于{0}函数：', getText('t.t'))}
      <List items={['U', commonRequirement1, commonRequirement2]} />
      {tr('不符合上述规则可能导致：')}
      <List
        items={[
          'U',
          tr('{0}或{1}提取异常', getTranslationText(), getCustomKey()),
          tr('自动翻译结果异常'),
        ]}
      />
      <H2>{tr('可被匹配示例')}</H2>
      <MatchAble />
      <MatchAble isDot />

      <H2>{tr('不可匹配示例')}</H2>
      <NotMatchAble />
      <NotMatchAble isDot />
      <H2>{tr('{0}示例', getVariableInterpolation())}</H2>
      {tr('如需拼接字符串，请使用{0}', getVariableInterpolation())}
      <VariableInterpolation />
      <VariableInterpolation isDot />
    </>
  )
}
