import {
  Break,
  H1,
  Link,
  Bold,
  render,
  CodeBlock,
  BlockQuote,
  List,
} from 'jsx-to-md'
import {
  getCodeDemoDesc,
  getCodeDemoPrefix,
  getDocHref,
  getFormatterText,
  getTranslationText,
  getTypeTag,
  getTypeTagCode,
  getVariableInterpolation,
} from '../utils'

function CodeDemo(props: { isDot?: boolean }) {
  const { isDot } = props
  const prefix = getCodeDemoPrefix(isDot)

  return (
    <CodeBlock
      langType="js"
      code={`
// ${tr('普通字符串')}
${prefix}'${tr('你好世界')}')
${prefix}"${tr('你好世界')}")
${prefix}\`${tr('你好世界')}\`)

// ${getVariableInterpolation(true)}
${prefix}'${tr('嗨，')}{0}', '${tr('开发者朋友们')}')
${prefix}'${tr(
        '这是{0}，欢迎{1}，如果你觉得{2}，请给予{3}支持',
      )}', ' \`i18n-pro\` ', '${tr('使用')}', \`${tr('对你有帮助')}\`, ' ⭐️ ')

// ${getTypeTag(true)}
${getTypeTagCode(isDot)}`}
    />
  )
}

export default function Principle() {
  return (
    <>
      <H1>{tr('原理')}</H1>
      <BlockQuote>
        {tr(
          '{0}是当前库的核心特性之一，{1}',
          ` \`${tr('自动翻译')}\` `,
          render(<Link href={getDocHref('Q&A')}>{tr('了解更多')}</Link>),
        )}
      </BlockQuote>
      <Break />
      <Break />
      {tr('该库主要由两部分构成')}
      <List items={['U', tr('命令行工具'), tr('函数 API')]} />
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
      <Break />
      <Break />
      {getCodeDemoDesc()}
      <CodeDemo />
      <Break />
      {getCodeDemoDesc(true)}
      <CodeDemo isDot />
      <Bold>{tr('函数 API')}</Bold>：
      {tr(
        '通过 {0}、{1}、{2} 接入多语言支持',
        ' `initI18n` ',
        ' `t` ',
        ' `setI18n` ',
      )}
      <List
        items={[
          'U',
          render(
            <>
              <Bold>initI18n</Bold>：{tr('初始化配置，返回 API 对象')}
            </>,
          ),
          render(
            <>
              <Bold>t</Bold>：
              {tr(
                '包裹{0}实现国际化，也是命令行匹配标识',
                getTranslationText(),
              )}
            </>,
          ),
          render(
            <>
              <Bold>setI18n</Bold>：{tr('设置语言、语言包')}
            </>,
          ),
        ]}
      />
      {tr(
        '{0}与{1}搭配使用，轻松集成到任何{2}项目中',
        ` \`${tr(`命令行工具`)}\` `,
        ` \`${tr(`函数 API`)}\` `,
        ' `JavaScript` ',
      )}
    </>
  )
}
