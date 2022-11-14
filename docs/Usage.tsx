import React, {
  Break,
  H1,
  H2,
  CodeBlock,
  BlockQuote,
  H3,
  Link,
  Image,
  H4,
  render,
} from 'jsx-to-md'
import { imageObj } from './constants'

function Install() {
  return (
    <>
      <H2>{`1. ${tr('安装')}`}</H2>
      <CodeBlock langType="bash">
        {`npm i i18n-pro
# ${tr('或者')}
yarn add i18n-pro
# ${tr('或者')}
pnpm i i18n-pro`}
      </CodeBlock>
    </>
  )
}

function LinkApi() {
  return (
    <>
      <H2>{`2. ${tr('接入函数API')}`}</H2>
      📢📢📢：{tr('这一步主要是用{0}函数包裹需要被翻译的文本', ' `i18n` ')}
      <BlockQuote>
        {tr(
          '{0}是以{1}形式来构建的，通过{2}或者{3}的方式都能引入，本文档中主要以{4}来举例说明',
          ` \`${tr(`函数API`)}\` `,
          ' `UMD` ',
          ' `import` ',
          ' `require` ',
          ' `import` ',
        )}
      </BlockQuote>
      <H3>{tr('挂载全局对象的形式')}</H3>
      <H4>{tr('引用函数')}</H4>
      <CodeBlock langType="js">
        {`import { setI18N, i18n } from 'i18n-pro'

// ${tr('需要在应用页面渲染逻辑之前')}
// ${tr(
          '浏览器环境，注意：如果是{0}环境需要将{1}替换成{2}',
          'Node',
          'window',
          'global',
        )}
window.setI18N = setI18N
window.i18n = i18n
// ${tr('后续才是应用的页面渲染逻辑')}`}
      </CodeBlock>
      <H4>{tr('用{0}包裹需要翻译的文本', ' `i18n` ')}</H4>
      <CodeBlock langType="js">
        {`// ${tr('被翻译的文本')}
const text = i18n('${tr('你好世界')}')`}
      </CodeBlock>
      <H3>{tr('模块化引入的形式')}</H3>
      {tr(
        '跟挂载全局对象的唯一区别就是每个模块都需要单独引入，其他使用并无差别',
      )}
      <CodeBlock langType="js">
        {`import { setI18N, i18n } from 'i18n-pro'
// ${tr('就是每个模块都需上面这样引入')}

// ${tr('被翻译的文本')}
const text = i18n('${tr('你好世界')}')`}
      </CodeBlock>
    </>
  )
}

function InitConfig() {
  return (
    <>
      <Break />
      <H2>{`3. ${tr('初始化命令行配置文件')}`}</H2>
      {tr('在命令行终端输入如下命令，')}
      <Link href={`#${tr('命令列表')}`}>{tr('更多命令')}</Link>
      <CodeBlock langType="bash">{`npx i18n init `}</CodeBlock>
      {tr('然后会在当前目录下生成一个{0}的文件', ' `i18nrc.js` ')}
    </>
  )
}

function ModifyConfig() {
  return (
    <>
      <Break />
      <H2>{`4. ${tr('调整{0}配置', ' `i18nrc.js` ')}`}</H2>
      {tr(
        '根据需求自行调整配置文件中的配置项，配置项的{0}',
        render(<Link href={`#${tr('命令行')}`}>{tr('说明')}</Link>),
      )}
    </>
  )
}

function ExecuteTranslateCommand() {
  return (
    <>
      <Break />
      <H2>{`5. ${tr('执行翻译命令')}`}</H2>
      <CodeBlock langType="bash">{`npx i18n t `}</CodeBlock>
      {tr('命令执行成功的话，会在指定的目录下生成语言包文件')}
    </>
  )
}

function ImportLangs() {
  return (
    <>
      <Break />
      <H2>{`6. ${tr('引入语言包文件')}`}</H2>
      {tr('语言包已经有了，就需要应用到项目中了')}
      <Break />
      <Break />
      {tr(
        '如果生成的语言包是每个语言单独文件形式{0}，操作如下：',
        "（`output.langType == 'multiple'`）",
      )}
      <CodeBlock>
        {`import en from './i18n/en.json'
import jp from './i18n/jp.json'
// ... ${tr('其他更多语言')}

setI18N({
  locale: 'en',
  langs:{
    en,
    jp,
    // ... ${tr('其他更多语言')}
  },
})
// ${tr('后续才是应用的页面渲染逻辑')}`}
      </CodeBlock>
      {tr(
        '如果生成的语言包是聚合的形式{0}，操作如下：',
        "（`output.langType == 'single'`）",
      )}
      <CodeBlock>
        {`import langs from './i18n/langs.json'

setI18N({
  locale: 'en',
  langs,
})
// ${tr('后续才是应用的页面渲染逻辑')}`}
      </CodeBlock>
      {tr(
        '至此，项目已经完全接入了国际化，上面{0}指定为目标语言中任意一个，在页面上就能看到翻译好的内容了。后续如果项目中有新增的翻译文本（需要用{1}函数包裹哟），就仅仅需要再次执行翻译命令{2}生成最新的语言包就可以了',
        ' `locale` ',
        ' `i18n` ',
        ' `npx i18n t` ',
      )}
    </>
  )
}

function SwithLang() {
  return (
    <>
      <Break />
      <H2>{`7. ${tr('切换语言')}`}</H2>
      {tr(
        '正常情况下，执行如下方法就行，但是页面上已渲染的内容不会再更新，只有等对应文本的{0}函数重新执行，才有可能显示新语言对应的文本',
        ' `i18n` ',
      )}
      <CodeBlock>
        {`setI18N({
  locale: 'en', // ${tr('设置指定语言')}
})`}
      </CodeBlock>
      {tr(
        '尽管有的 UI库（例如{0}）可以利用它的{1}特性做到静态更新页面内容，但是对于不在组件内部的翻译文本内容，要做到静态更新也会有额外的处理成本，例如下面的这种场景，组件内使用了外部包含翻译内容的属性',
        ' `React`',
        ' `context` ',
      )}
      <CodeBlock>
        {`// ${tr('这个属性要做到静态更新，需要额外处理')}
// ${tr('这里只是说明存在这种情况，不给出明确解决方案')}
const FOO_TEXT = i18n('${tr('静态文本属性')}')

function App(){
  return (
    <>
      {FOO_TEXT}
    </>
  )
}`}
      </CodeBlock>
      {tr(
        '因此对于大部分的场景，在页面上切换语言时，建议{0}整个页面（如果还有好的方案请告知🤔）',
        `**${tr('直接刷新')}**`,
      )}
    </>
  )
}

function Demo() {
  return (
    <>
      <Break />
      <H2>8. DEMO</H2>
      {tr(
        '哈哈哈，除了上面的{0}，当前库{1}的控制台输出也接入了国际化',
        ' [Live Demo](#live-demo)',
        ` \`${tr('命令行工具')}\` `,
      )}
      <Break />
      <Break />
      {tr('通过命令{0}就能看英文版了', ' `npx i18n h -L en` ')}
      <Break />
      <Image {...imageObj['demo']} />
      <Break />
      {tr('感兴趣的同学，可以看看源码')}
    </>
  )
}

export default function Usage() {
  return (
    <>
      <Break />
      <H1>{tr('用法')}</H1>
      <Install />
      <LinkApi />
      <InitConfig />
      <ModifyConfig />
      <ExecuteTranslateCommand />
      <ImportLangs />
      <SwithLang />
      <Demo />
    </>
  )
}
