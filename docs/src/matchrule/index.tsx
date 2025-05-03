import { H1, CodeBlock, TableOfContents, List, Break } from 'jsx-to-md'
import {
  getDemoDesc,
  getTranslationText,
  getVariableInterpolation,
  initI18n,
} from '../utils'

function MatchAble(props: { isDot?: boolean }) {
  const { isDot } = props
  const prefix = isDot ? `t.t('custom-key', ` : `t(`

  return (
    <>
      <Break />
      <Break />
      {getDemoDesc(isDot)}
      <CodeBlock
        code={`${prefix}'xxx')
${prefix}"xxx")
${prefix}\`xxx\`)`}
      />
    </>
  )
}

function NotMatchAble(props: { isDot?: boolean }) {
  const { isDot } = props
  const prefix = isDot ? `t.t('custom-key', ` : `t(`

  return (
    <>
      <Break />
      <Break />
      {getDemoDesc(isDot)}
      <CodeBlock
        code={`const foo = 'foo'
const fooFunc = (x:string) => x

// ${tr('不满足纯字符串')}
${prefix}foo)
${prefix}'xxx' + foo)
${prefix}\`${'${foo}'}\`)
${prefix}fooFunc(foo))

// ${tr('包含{0}或者{1}', ' \\n ', ' \\t')}
${prefix}'x\\nx')
${prefix}'x\\tx')

// ${tr('前后包含空格')}
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
  const prefix = isDot ? `t.t('custom-key', ` : `t(`

  return (
    <>
      <Break />
      <Break />
      {getDemoDesc(isDot)}
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

  return (
    <>
      <H1 skip>{tr('匹配规则')}</H1>
      <TableOfContents text={tr('目录')} open={false} />
      {tr('{0}和{1}函数的{2}参数的要求', ' `t` ', ' `t.t` ', ' `text` ')}：
      <List
        items={[
          'U',
          tr(
            '只能是纯字符串，不能包含变量，或者{1}语句',
            ' `t` ',
            ' `JavaScript` ',
          ),
          tr('不能包含{0}、{1}等特殊字符', ' `\\n`', '`\\t` '),
          tr('开始和结尾不能包含空格'),
          tr('如果用{0}语法不能换行', ` \`${tr('模板字符串')}\` `),
        ]}
      />
      {tr('不满足上面条件，可能会导致')}
      <List
        items={[
          'U',
          tr('{0}提取不正确', getTranslationText()),
          tr('翻译结果不正确'),
        ]}
      />
      {tr('以下是可以匹配到的')}
      <MatchAble />
      <MatchAble isDot />
      {tr('以下是不会被匹配到的')}
      <NotMatchAble />
      <NotMatchAble isDot />
      {tr('如果需要拼接字符串，可以用{0}', getVariableInterpolation())}
      <VariableInterpolation />
      <VariableInterpolation isDot />
    </>
  )
}
