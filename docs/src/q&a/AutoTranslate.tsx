import { H2, Bold, List, Break, CodeBlock } from 'jsx-to-md'
import { getTranslationText, getCodeDemoDesc, getCustomKey } from '../utils'

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
      {tr('{0}生成语言包的效果', ` \`${tr('自动翻译')}\` `)}
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
  const extraCopy = tr('自动提取文案')
  const shortcoming1 = tr('对于一词多译不友好')

  return (
    <>
      <H2>
        {order}. {tr('关于自动翻译的实现')}
      </H2>
      <Bold>{tr('实现关键步骤')}</Bold>
      <List items={['O', extraCopy, tr('自动翻译'), tr('自动生成语言包')]} />
      {tr(
        '以{0}作为{1}才能通过脚本识别出所有需要翻译的文案，从而实现{2}的目标，是{3}实现的基础',
        getTranslationText(),
        ' `key` ',
        ` \`${extraCopy}\` `,
        ` \`${tr('自动翻译')}\` `,
      )}
      <Break />
      <Break />
      {tr('但是仅以{0}作为{1}存在如下缺点：', getTranslationText(), ' `key` ')}
      <Break />
      <Break />
      <Break />
      <List items={['U', shortcoming1, tr('生成的语言包较大')]} />
      <Break />
      <Break />
      {tr(
        '为了解决{0}新增了{1}属性{2}的解决方案',
        ` \`${shortcoming1}\` `,
        ' `t.t` ',
        ` ${getCustomKey()} `,
      )}
      <Break />
      <Break />
      <Demo />
      <Demo isDot />
      <Break />
      <Break />
      {tr(
        '{0}的方式生成的语言包，就算是{1}调整了再次翻译也不会影响到已生成的语言包',
        ` ${getCustomKey()} `,
        getTranslationText(),
      )}
      <Break />
      <Break />

      {tr('当前设定下也会有如下优点')}
      <List
        items={[
          'U',
          tr('源码可读性强'),
          tr('{0}本身语言无需生成语言包', getTranslationText()),
        ]}
      />
      {tr(
        '如果你不能接受上述的不足，那么其他国际化方案更适合你；如果你能接受上述的不足，那么我相信{0}会带给你非常不错的开发体验',
        ' `i18n-pro` ',
      )}
    </>
  )
}
