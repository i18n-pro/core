import React, { Break, H1, UnorderList, ListItem, CodeBlock } from 'jsx-to-md'

export default function MatchRule() {
  return (
    <>
      <H1>{tr('匹配规则')}</H1>
      {tr('要求')}：
      <Break />
      <UnorderList>
        <ListItem>
          {tr(
            '{0}函数第一个参数只能是纯字符串，不能包含变量，或者js语句',
            '`i18n` ',
          )}
        </ListItem>
        <ListItem>
          {tr('不能包含{0}、{1}等特殊字符', ' `\\n`', '`\\t` ')}
        </ListItem>
        <ListItem>{tr('开始和结尾不能包含空格')}</ListItem>
        <ListItem>{tr('如果用字符串模块语法不能换行')}</ListItem>
      </UnorderList>
      <Break />
      {tr('不满足上面条件，可能会导致')}
      <Break />
      <UnorderList>
        <ListItem>{tr('翻译文本提取不正确')}</ListItem>
        <ListItem>{tr('翻译结果不正确')}</ListItem>
      </UnorderList>
      <Break />
      {tr('以下是可以匹配到的')}
      <CodeBlock>
        {`i18n('xxx')
i18n("xxx")
i18n(\`xxx\`)`}
      </CodeBlock>
      {tr('以下是不会被匹配到的')}
      <Break />
      <CodeBlock>
        {`const foo = 'foo'
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

// ${tr('字符串模板中有换行')}
i18n(\`
xxx
\`)`}
      </CodeBlock>
      {tr('如果需要拼接字符串，可以用动态参数')}
      <Break />
      <CodeBlock>
        {`i18n('我叫{0}，今年{1}岁，来自{2}，是一名{3}', '王尼玛', '22', '火星', '码农')`}
      </CodeBlock>
    </>
  )
}
