import React, {
  Break,
  H1,
  UnorderList,
  ListItem,
  Link,
  Bold,
  render,
  CodeBlock,
} from 'jsx-to-md'
import { linkObj } from './constants'

export default function Principle() {
  return (
    <>
      <Break />
      <H1>{tr('原理')}</H1>
      {tr('该库主要由两部分构成')}
      <Break />
      <UnorderList>
        <ListItem>{tr('命令行工具')}</ListItem>
        <ListItem>{tr('函数API')}</ListItem>
      </UnorderList>
      <Break />
      <Bold>{tr('命令行工具')}</Bold>：
      {tr(
        '根据指定规则解析出需要翻译的文本，并通过翻译平台将文本翻译到指定目标语言，最后生成语言包文件',
      )}
      <Break />
      <Break />
      {tr(
        '解析文本的{0}简易示例如下',
        render(
          <Link
            {...linkObj['matchting-rule']}
            title={linkObj['matchting-rule'].alias}
          />,
        ),
      )}
      <Break />
      <CodeBlock langType="js">
        {`// ${tr('普通字符串')}
i18n('xxx')
i18n("xxx")
i18n(\`xxx\`)

// ${tr('支持动态参数')}
i18n('xxx{0}xxx', param1)
i18n('xxx{0}xxx{1}xxx{2}xxx', param1, param2, param3)

// ${tr('动态参数类型标记')}
i18n('${tr('用户数达到了{0}', '{n0}')}', 100000000) // ${tr('数字类型')}
i18n('${tr('售价为{0}', '{c0}')}', 14999) // ${tr('货币类型')}
i18n('${tr('今天的日期是{0}', '{d0}')}', new Date()) // ${tr('日期类型')}
i18n('${tr('当前时间：{0}', '{t0}')}', new Date()) // ${tr('时间类型')}
i18n('${tr(
          '我有{0}，{1}和{2}',
          `{${tr('p0个苹果')}}`,
          `{${tr('p1个香蕉')}}`,
          `{${tr('p2个梨')}}`,
        )}', 5, 4, 3) // ${tr('复数类型')}`}
      </CodeBlock>
      <Break />
      <Bold>{tr('函数API')}</Bold>：
      {tr(
        '将国际化语言包接入到项目中，由{0}、{1}和{2}构成',
        ' `i18n`',
        '`setI18N` ',
        ' `withI18N` ',
      )}
      <Break />
      <UnorderList>
        <ListItem>
          <Bold>i18n</Bold>：
          {tr(
            '用于包裹被翻译文本实现国际化，也作为命令行匹配翻译文本规则的标识',
          )}
        </ListItem>
        <ListItem>
          <Bold>setI18N</Bold>：{tr('设置语言、语言包及其他配置项')}
        </ListItem>
        <ListItem>
          <Bold>withI18N</Bold>：
          {tr('适用于服务端，每个接口响应需要做国际化的处理')}
        </ListItem>
      </UnorderList>
      <Break />
      {tr(
        '所以{0}和{1}这两者搭配使用效果更佳，也正是由于这样的结构设计，使得{2}库可以很方便集成到任何的{3}项目中',
        ` \`${tr(`命令行工具`)}\` `,
        ` \`${tr(`函数API`)}\` `,
        ' `i18n-pro` ',
        ' `JavaScript` ',
      )}
    </>
  )
}
