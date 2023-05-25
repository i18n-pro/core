import {
  Break,
  H1,
  UnorderedList,
  ListItem,
  Link,
  Bold,
  render,
  CodeBlock,
  BlockQuote,
} from 'jsx-to-md'
import {
  getDocHref,
  getInterpolationVariable,
  getTranslationText,
  getTypeTagCode,
  getVariableInterpolation,
} from '../utils'

export default function Principle() {
  return (
    <>
      <H1>{tr('原理')}</H1>
      <BlockQuote>
        {tr(
          '以{0}作为key是该库所有功能实现的关键，如果对此有任何疑问，{1}',
          getTranslationText(),
          render(<Link href={getDocHref('Q&A')}>{tr('请查看')}</Link>),
        )}
      </BlockQuote>
      <Break />
      <Break />
      {tr('该库主要由两部分构成')}
      <UnorderedList>
        <ListItem>{tr('命令行工具')}</ListItem>
        <ListItem>{tr('函数API')}</ListItem>
      </UnorderedList>
      <Bold>{tr('命令行工具')}</Bold>：
      {tr(
        '根据指定规则（正则匹配）解析出需要翻译的文案，并通过翻译平台将文案翻译到指定目标语言，最后生成语言包文件',
      )}
      <Break />
      <Break />
      {tr(
        '解析文案的{0}简易示例如下',
        ` ${render(
          <Link href={getDocHref('MATCH_RULE')}>{tr('匹配规则')}</Link>,
        )} `,
      )}
      <CodeBlock
        langType="js"
        code={`
/** ${tr('普通字符串')} */

t('hello world')
t("hello world")
t(\`hello world\`)


/** ${tr('支持{0}', getVariableInterpolation(true))} */

t('hello {0}', '${tr('开发者朋友们')}'),
t('${tr(
          '这是{0}，欢迎{1}，如果你觉得{2}，请给予{3}支持',
        )}', ' \`i18n-pro\` ', '${tr('使用')}', \`${tr('不错')}\`, ' ⭐️ ')


/** ${tr(
          '{0}类型标记，需配合对应的格式化回调',
          getInterpolationVariable(true),
        )} */
${getTypeTagCode()}`}
      />
      <Bold>{tr('函数API')}</Bold>：
      {tr(
        '将国际化语言包接入到项目中，由{0}、{1}、{2}和{3}构成',
        ' `initI18n` ',
        ' `t` ',
        ' `setI18n` ',
        ' `withI18n` ',
      )}
      <UnorderedList>
        <ListItem>
          <Bold>initI18n</Bold>：
          {tr('用于初始化固定配置，最后返回包含如下 3 个 API 的对象')}
        </ListItem>
        <ListItem>
          <Bold>t</Bold>：
          {tr(
            '用于包裹{0}实现国际化，也作为命令行匹配{1}规则的标识',
            getTranslationText(),
            getTranslationText(),
          )}
        </ListItem>
        <ListItem>
          <Bold>setI18n</Bold>：{tr('设置语言、语言包')}
        </ListItem>
        <ListItem>
          <Bold>withI18n</Bold>：
          {tr('适用于服务端，每个接口响应需要做国际化的处理')}
        </ListItem>
      </UnorderedList>
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
