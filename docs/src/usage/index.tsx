import {
  Break,
  H1,
  H2,
  CodeBlock,
  H3,
  Link,
  Image,
  render,
  TableOfContents,
  List,
  BlockQuote,
} from 'jsx-to-md'
import { resolve } from 'path'
import { imageObj } from '../constants'
import {
  getDocHref,
  initI18n,
  getFileContent,
  getTranslationText,
  getConfigName,
  getTranslationTextKey,
  getCustomKey,
  getText,
} from '../utils'

function Install() {
  return (
    <>
      <H2>{`1. ${tr('安装')}`}</H2>
      <CodeBlock
        langType="bash"
        code={`npm i i18n-pro
# ${tr('或者')}
yarn add i18n-pro
# ${tr('或者')}
pnpm i i18n-pro`}
      />
    </>
  )
}

function LinkApi() {
  return (
    <>
      <H2>{`2. ${tr('接入函数 API')}`}</H2>
      <H3>{tr('初始化')}</H3>
      <CodeBlock
        code={`
// i18n.js
import { initI18n } from 'i18n-pro'

const {
  t,
  setI18n,
} = initI18n({
  // ${tr('命名空间属性是必须配置的')}
  namespace: 'testI18n',
})

// ${tr(
          '可选：可将 API 挂载到全局对象，便于全局调用（Node 环境请将 window 替换为 global）',
        )}
// ${tr('注意：如在第三方库或组件中使用，不建议挂载，避免命名冲突')}
window.t = t
window.setI18n = setI18n

// ${tr('或导出 API 供其他模块使用')}
export { t, setI18n }
`}
      />
      <H3>{tr('项目入口文件引入 i18n.js')}</H3>
      <CodeBlock
        code={`
// App.js
import './i18n.js'

// ${tr('后续为应用渲染逻辑')}
`}
      />
      <H3>{tr('用{0}包裹{1}', ' `t` ', getTranslationText(true))}</H3>
      {tr('使用{0}函数包裹需要翻译的文案：', ' `t` ')}
      <CodeBlock
        langType="js"
        code={`
// test.js
// ${tr('如已挂载到全局，可省略下行')}
import { t } from './i18n.js'

// ${getTranslationTextKey(true)}
const text = t('hello world')
// ${getCustomKey(true)}
const keyText = t.t('custom-key', 'hello key')
`}
      />
    </>
  )
}

function InitConfig() {
  return (
    <>
      <Break />
      <H2>{`3. ${tr('初始化命令行配置文件')}`}</H2>
      {tr('在命令行终端输入如下命令，')}
      <Link href={getDocHref('COMMAND_LINE', tr('命令列表'))}>
        {tr('更多命令')}
      </Link>
      <CodeBlock langType="bash" code={`npx i18n init `} />
      {tr(
        '命令执行成功后会在当前目录下生成一个{0}的文件，默认配置如下：',
        getConfigName(),
      )}
      <CodeBlock
        code={getFileContent(
          resolve(__dirname, `../../../template/${getConfigName(true)}`),
        ).replace('../src/type', 'i18n-pro')}
      />
    </>
  )
}

function ModifyConfig() {
  return (
    <>
      <Break />
      <H2>{`4. ${tr('调整{0}配置', getConfigName())}`}</H2>
      {tr(
        '根据需求自行调整配置文件中的配置项，配置项的{0}',
        render(
          <Link
            href={getDocHref(
              'COMMAND_LINE',
              `1. ${tr('{0}配置', getConfigName())}`,
            )}
          >
            {tr('说明')}
          </Link>,
        ),
      )}
    </>
  )
}

function ExecuteTranslateCommand() {
  return (
    <>
      <Break />
      <H2>{`5. ${tr('执行翻译命令')}`}</H2>
      <CodeBlock langType="bash" code={`npx i18n t `} />
      {tr('命令执行成功的话，会在指定的目录下生成语言包文件')}
      <br />
      <br />
      {tr(
        '默认配置下，生成的语言包是每个语言单独文件形式{0}，会生成{1}个语言包：{2}和{3}',
        "（`output.langType == 'multiple'`）",
        ' `2` ',
        ' `zh.json` ',
        ' `ja.json` ',
      )}
      <CodeBlock
        langType="json"
        code={`// zh.json
{
  "hello world": "你好世界",
  "custom-key": "你好key"
}

// ja.json
{
  "hello world": "こんにちは世界",
  "custom-key": "こんにちはkey"
}
`}
      />
      {tr(
        '如果生成的语言包是聚合的形式{0}，会生成{1}个语言包：{2}',
        "（`output.langType == 'single'`）",
        ' `1` ',
        ' `langs.json` ',
      )}
      <CodeBlock
        langType="json"
        code={`// langs.json
{
  "zh": {
    "hello world": "你好世界",
    "custom-key": "你好key"
  },
  "ja": {
    "hello world": "こんにちは世界",
    "custom-key": "こんにちはkey"
  }
}
`}
      />
    </>
  )
}

function InitStaticImport() {
  return (
    <>
      <H3>{tr('静态导入')}</H3>
      <BlockQuote>
        {tr('该方式不适合纯前端项目，会导致首屏加载时间增长')}
      </BlockQuote>
      <Break />
      <Break />
      {tr(
        '如果生成的语言包是每个语言单独文件形式{0}，操作如下：',
        "（`output.langType == 'multiple'`）",
      )}
      <CodeBlock
        code={`// i18n.js
import { initI18n } from 'i18n-pro'
import zh from './i18n/zh.json'
import ja from './i18n/ja.json'
// ... ${tr('其他更多语言')}

initI18n({
  namespace: 'testI18n',
  locale: 'en',
  langs:{
    zh,
    ja,
    // ... ${tr('其他更多语言')}
  },
})`}
      />
      {tr(
        '如果生成的语言包是聚合的形式{0}，操作如下：',
        "（`output.langType == 'single'`）",
      )}
      <CodeBlock
        code={`// i18n.js
import { initI18n } from 'i18n-pro'
import langs from './i18n/langs.json'

initI18n({
  namespace: 'testI18n',
  locale: 'en',
  langs,
})
`}
      />
    </>
  )
}

function InitDynamicImport() {
  return (
    <>
      <H3>{tr('异步加载回调')}</H3>
      <BlockQuote>
        {tr(
          '推荐在每个语言单独文件形式时使用此方式，可实现按需异步加载，减少首屏体积，提升页面性能',
        )}
      </BlockQuote>
      <CodeBlock
        code={`// i18n.js
import { initI18n } from 'i18n-pro'
import ja from './i18n/ja.json'

initI18n({
  namespace: 'testI18n',
  // ${tr('注意：初始 locale 为非默认语言（如 ja）时，必须静态导入该语言包')}
  locale: 'ja',
  langs: {
    // ${tr('其他语言可按需动态加载')}
    zh: () => import('./i18n/zh.json'),
    ja, // 初始语言包必须静态导入
  },
})`}
      />
    </>
  )
}

function RuntimeDynamicImport() {
  return (
    <>
      <H3>{tr('运行时动态加载')}</H3>
      <BlockQuote>
        {tr(
          '适用于需要在运行时动态获取语言包的场景，例如通过远程接口拉取语言包数据，适合多端或动态语言环境',
        )}
      </BlockQuote>
      <Break />
      <Break />
      <CodeBlock
        code={`// ${tr('通过接口或其他方式动态获取语言包')}
const zh = await fetch('/xxx/xxx/zh.json').then(res => res.json())

// ${tr('设置当前语言及语言包，支持后续动态切换')}
setI18n({
  locale: 'zh',
  langs: {
    zh,
  },
})
`}
      />
    </>
  )
}

function ImportLangs() {
  return (
    <>
      <Break />
      <H2>{`6. ${tr('引入语言包')}`}</H2>
      {tr('语言包生成后，需要将其集成到项目中')}
      <Break />
      <Break />
      {tr('目前支持{0}种引入语言包的方式', ' `3` ')}
      <List
        items={['U', tr('静态导入'), tr('异步加载回调'), tr('运行时动态加载')]}
      />
      <InitStaticImport />
      <InitDynamicImport />
      <RuntimeDynamicImport />
      {tr(
        '至此，国际化功能已集成完毕。只需将 {0} 设置为目标语言，即可在页面上展示对应的翻译内容。后续如有新增{1}（需用 {2} 函数包裹），只需重新执行 {3} 命令生成最新语言包，即可确保所有新增内容均被翻译',
        getText('locale'),
        getTranslationText(),
        getText('t'),
        getText('npx i18n t'),
      )}
    </>
  )
}

function SwitchLang() {
  function getLibrary(lib: string, name?: string) {
    return render(
      <Link href={`https://github.com/i18n-pro/${lib.toLowerCase()}`}>
        {name || lib}
      </Link>,
    )
  }

  return (
    <>
      <Break />
      <H2>{`7. ${tr('切换语言')}`}</H2>
      {tr('通过如下方式切换当前语言：')}
      <CodeBlock
        code={`setI18n({
  locale: 'en', // ${tr('设置指定语言')}
})`}
      />
      <BlockQuote>
        {tr(
          '注意：仅调用 {0} 切换语言后，页面上已渲染的内容不会自动更新，只有重新执行 {1} 函数时才会显示新语言的文案',
          getText('setI18n'),
          getText('t'),
        )}
        <br />
        {tr('如需实现无刷新切换，建议结合以下主流前端框架的集成版本使用：')}
      </BlockQuote>

      <List
        items={[
          'U',
          getLibrary('React'),
          ['Vue', ['U', getLibrary('Vue', 'Vue3'), getLibrary('Vue2', 'Vue2')]],
          getLibrary('Solid'),
          getLibrary('Svelte'),
        ]}
      />
    </>
  )
}

function Demo() {
  return (
    <>
      <Break />
      <H2>8. Demo</H2>
      {tr('本节仅介绍基础用法，更多高级用法请参考后续文档')}
      <List
        items={[
          'U',
          tr(
            '真实示例请参考 {0}',
            ` ${render(
              <Link href={getDocHref('README', 'Live Demo')}>Live Demo</Link>,
            )} `,
          ),
          tr(
            '本文档多语言支持基于{0}和{1}实现',
            ' `i18n-pro` ',
            ` ${render(
              <Link href="https://github.com/eyelly-wu/jsx-to-md">
                jsx-to-md
              </Link>,
            )} `,
          ),
          [
            tr('{0}的控制台输出同样支持多语言', getText(tr('命令行工具'))),
            [
              'U',
              <>
                {tr(
                  '通过命令 {0} 可查看中文版的命令行交互界面',
                  ' `npx i18n h -L zh` ',
                )}
                <Image {...imageObj['demo']} />
              </>,
            ],
          ],
        ]}
      />
    </>
  )
}

export default function Usage(props) {
  initI18n(props)

  return (
    <>
      <H1 skip>{tr('快速上手')}</H1>
      <TableOfContents text={tr('目录')} open={false} />
      <Install />
      <LinkApi />
      <InitConfig />
      <ModifyConfig />
      <ExecuteTranslateCommand />
      <ImportLangs />
      <SwitchLang />
      <Demo />
    </>
  )
}
