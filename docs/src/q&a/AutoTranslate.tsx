import { H2, Bold, List, Break, CodeBlock } from 'jsx-to-md'
import {
  getTranslationText,
  getCodeDemoDesc,
  getCustomKey,
  getText,
  getAutoTranslateText,
  getTranslationTextKey,
} from '../utils'

function Demo(props: { isDot?: boolean }) {
  const { isDot = false } = props
  const key = isDot ? 'custom-key' : 'hello world'
  const prefix = isDot ? `t.t('${key}', ` : `t(`

  return (
    <>
      <Break />
      <Break />
      {getCodeDemoDesc(isDot)}
      <CodeBlock
        code={`
const text = ${prefix}'hello world')`}
      />
      {tr('{0}生成语言包的效果', ` \`${getAutoTranslateText(true)}\` `)}
      <CodeBlock
        langType="json"
        code={`
// zh.json
{
  "${key}": "你好世界"
}

// jp.json
{
  "${key}": "こんにちは世界"
}
`}
      />
    </>
  )
}

export default function AutoTranslate(props: { order: string }) {
  const { order } = props
  const extraCopy = tr('提取文案')
  const shortcoming1 = tr('不适用于一词多义场景')

  return (
    <>
      <H2>
        {order}. {tr('{0}原理与流程', getAutoTranslateText(true))}
      </H2>
      <Bold>{tr('流程：')}</Bold>
      <List
        items={['O', extraCopy, tr('调用翻译平台 API'), tr('生成语言包')]}
      />
      {tr(
        '在整个流程中，{0}是最关键的环节。采用{1}的方式，既直观又便于编写，也便于脚本自动识别和处理内容',
        getText(extraCopy),
        getTranslationTextKey(),
      )}
      <Break />
      <Break />
      <Demo />
      {tr('但仅采用{0}方式也存在一定局限性：', getTranslationTextKey())}
      <Break />
      <Break />
      <Break />
      <List items={['U', shortcoming1]} />
      <Break />
      <Break />
      {tr(
        '可通过{0}的{1}属性实现{2}来优化{3}',
        getText('t.t'),
        getText('key'),
        getCustomKey(),
        getText(shortcoming1),
      )}
      <Break />
      <Break />
      <Demo isDot />
      <Break />
      <Break />
      {tr(
        '使用{0}生成的语言包，即使{1}变化，已生成的语言包不受影响',
        getCustomKey(),
        getTranslationText(),
      )}
      <Break />
      <Break />
      <Bold>{tr('每次{0}生成语言包文案的顺序', getAutoTranslateText())}</Bold>
      <List
        items={[
          'O',
          tr('{0}已翻译的', getCustomKey()),
          tr(
            '{0}已翻译的，基于{1}生成',
            getCustomKey(),
            getTranslationTextKey(),
          ),
          tr('{0}新翻译的', getCustomKey()),
          tr('{0}已翻译的', getTranslationTextKey()),
          tr('{0}新翻译的', getTranslationTextKey()),
        ]}
      />
    </>
  )
}
