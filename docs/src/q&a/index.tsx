import { H1, H2, Break, CodeBlock, TableOfContents, Bold } from 'jsx-to-md'
import { initI18n } from '../utils'

function NonsupportObjectParamsResolve() {
  return (
    <>
      <H2>{`1. ${tr('动态参数（插值变量）为什么不支持对象属性解析？')}`}</H2>
      {tr('示例代码')}
      <CodeBlock
        code={`// ${tr('对象属性解析')}
i18n('我叫{name}，今年{age}岁，来自{base}，是一名{job}', {
  name: '王尼玛',
  age: 22,
  base: '火星',
  job: '码农',
})

// ${tr('当前库的下标解析')}
i18n('我叫{0}，今年{1}岁，来自{2}，是一名{3}',
  '王尼玛',
  '22',
  '火星',
  '码农',
)`}
      />
      {tr(
        '主要原因是文本中包含属性名，不利于通过第三方平台翻译，上面的示例从中文翻译到英文还OK，如果是英文翻译到中文或其他语言，动态参数中的属性名也会被翻译，这就是问题所在',
      )}
      <Break />
      <Break />
      {tr('对象属性解析的示例')}
      <CodeBlock
        code={`// ${tr('待翻译文本为中文')}
const zh = '我叫{name}，今年{age}岁，来自{base}，是一名{job}'

// ${tr('通过百度翻译成英文，看似OK的')}
const zhToEn = \`My name is {name}. I'm {age} years old. I'm from {base}. I'm a {job} \`

// ${tr(
          '再通过百度翻译将上面的英文翻译成中文，可以发现{job}的翻译就出问题了，而且不同的翻译平台，可能出现在的问题也不一样',
        )}
const enToZh = '我的名字是｛name｝。我{age}岁。我来自{base}。我是{工作}'`}
      />
      {tr('再来看看下标解析的示例')}
      <CodeBlock
        code={`// ${tr('待翻译文本为中文')}
const zh = '我叫{0}，今年{1}岁，来自{2}，是一名{3}'

// ${tr('通过百度翻译成英文')}
const zhToEn = \`My name is {0}. I'm {1} years old. I'm from {2}. I'm a {3}\`

// ${tr('通过百度翻译将上面的英文翻译成中文，不会出现上面参数匹配不上的问题')}
const enToZh = '我的名字是｛0｝。我是｛1｝岁。我来自｛2｝。我是｛3｝'`}
      />
      {tr(
        '虽然通过机器翻译本来就不能做到100%的准确率，但是这种方式可以尽量避免不必要的错误',
      )}
    </>
  )
}

function DateAndTime() {
  return (
    <>
      <H2>
        {`2. ${tr(
          '动态参数类型{0}和{1}分开有必要吗？',
          `**${tr('日期')}**`,
          `**${tr('时间')}**`,
        )}`}
      </H2>
      {tr(
        '个人感觉其实是没有必要的，只是设计上已经实现了，大家可以酌情灵活选择使用，当然不排除有的业务场景这样分开处理会更方便',
      )}
    </>
  )
}

function SupportRichText() {
  const richText1 = tr('hello {0}world{1}', '<b style="color:red;">', '</b>')
  const richText2 = tr('hello {0}', `<b style="color:red;">${tr('world')}</b>`)

  return (
    <>
      <H2>{`3. ${tr('是否会支持富文本文案？')}`}</H2>
      {tr(
        '不会支持，因为自动翻译是该库的核心功能，实现该功能的基本原则就是翻译文案需要为普通的纯文本，支持富文本与现有这一套实现逻辑上会存在冲突',
      )}
      <br />
      <br />
      <Bold>{tr('某些场景下，可以利用动态参数来实现富文本的效果')}</Bold>
      <br />
      {tr(
        '例如这里的文案是{0}，页面上需要将{1}显示为红色粗体的样式',
        ' `hello world` ',
        ' `world` ',
      )}
      <br />
      <Bold>{tr('方案一')}</Bold>
      <CodeBlock
        code={`
t('hello {0}world{1}', '<b style="color:red;">', '</b>')

// ${tr('{0}函数执行后返回结果：{1}', 't ', richText1)}`}
      />
      {tr('渲染效果是：')}
      <br />
      {richText1}
      <br />
      <br />
      <Bold>{tr('方案二')}</Bold>
      <br />
      <CodeBlock
        code={`
t('Hello {0}', \`<b style="color:red;">${"${t('world')}"}</b>\`)

// ${tr('{0}函数执行后返回结果：{1}', 't ', richText1)}`}
      />
      {tr('渲染效果是：')}
      <br />
      {richText2}
      <br />
      <br />
      {tr('针对上面两种方案，可以根据实际场景酌情考虑使用')}
    </>
  )
}

export default function QAndA(props) {
  initI18n(props)

  return (
    <>
      <H1 skip>Q&A</H1>
      <TableOfContents text={tr('目录')} open={false} />
      <NonsupportObjectParamsResolve />
      <DateAndTime />
      <SupportRichText />
    </>
  )
}
