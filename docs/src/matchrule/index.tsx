import {
  H1,
  UnorderedList,
  ListItem,
  CodeBlock,
  TableOfContents,
} from 'jsx-to-md'
import { initI18n } from '../utils'

export default function MatchRule(props) {
  initI18n(props)

  return (
    <>
      <H1 skip>{tr('匹配规则')}</H1>
      <TableOfContents text={tr('目录')} open={false} />
      {tr('要求')}：
      <UnorderedList>
        <ListItem>
          {tr(
            '{0}函数第一个参数只能是纯字符串，不能包含变量，或者js语句',
            '`t` ',
          )}
        </ListItem>
        <ListItem>
          {tr('不能包含{0}、{1}等特殊字符', ' `\\n`', '`\\t` ')}
        </ListItem>
        <ListItem>{tr('开始和结尾不能包含空格')}</ListItem>
        <ListItem>
          {tr('如果用{0}语法不能换行', ` \`${tr('模板字符串')}\` `)}
        </ListItem>
      </UnorderedList>
      {tr('不满足上面条件，可能会导致')}
      <UnorderedList>
        <ListItem>{tr('翻译文本提取不正确')}</ListItem>
        <ListItem>{tr('翻译结果不正确')}</ListItem>
      </UnorderedList>
      {tr('以下是可以匹配到的')}
      <CodeBlock
        code={`i18n('xxx')
i18n("xxx")
i18n(\`xxx\`)`}
      />
      {tr('以下是不会被匹配到的')}
      <CodeBlock
        code={`const foo = 'foo'
const fooFunc = (x:string) => x

// ${tr('不满足纯字符串')}
i18n(foo)
i18n('xxx' + foo)
i18n(\`${'${foo}'}\`)
i18n(fooFunc(foo))

// ${tr('包含{0}或者{1}', ' \\n ', ' \\t')}
i18n('x\\nx')
i18n('x\\tx')

// ${tr('前后包含空格')}
i18n(' xxx')
i18n('xxx  ')
i18n(' xxx ')

// ${tr('{0}语法中有换行', tr('模板字符串'))}
i18n(\`
xxx
\`)`}
      />
      {tr('如果需要拼接字符串，可以用动态参数')}
      <CodeBlock
        code={`i18n('${tr('我叫{0}，今年{1}岁，来自{2}，是一名{3}')}', '${tr(
          '王尼玛',
        )}', 35, '${tr('火星')}', '${tr('码农')}')`}
      />
    </>
  )
}
