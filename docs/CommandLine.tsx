import React, { H1, H2, H3, Table, Column, Bold } from 'jsx-to-md'

const commonTableColumns: Column[] = [
  {
    title: tr('名称'),
    fieldName: 'name',
    align: 'center',
  },
  {
    title: tr('类型'),
    fieldName: 'type',
    align: 'center',
  },
  {
    title: tr('是否必设'),
    fieldName: 'required',
  },
  {
    title: tr('默认值'),
    fieldName: 'default',
  },
  {
    title: tr('说明'),
    fieldName: 'description',
  },
]

function getCommonTableColumns() {
  const commonTableColumns: Column[] = [
    {
      title: tr('名称'),
      fieldName: 'name',
      align: 'center',
    },
    {
      title: tr('类型'),
      fieldName: 'type',
      align: 'center',
    },
    {
      title: tr('是否必设'),
      fieldName: 'required',
    },
    {
      title: tr('默认值'),
      fieldName: 'default',
    },
    {
      title: tr('说明'),
      fieldName: 'description',
    },
  ]

  return commonTableColumns
}

type RecordItem = Record<
  'name' | 'type' | 'required' | 'default' | 'description',
  string | JSX.Element | number
>

function BasicConfig() {
  const data: RecordItem[] = [
    {
      name: 'funcName',
      type: 'string',
      required: tr('否'),
      default: 'i18n',
      description: (
        <>
          {tr('命令行匹配翻译文本的函数名dx')}
          <br />
          <br />
          {tr(
            '如果在使用{0}函数没有重命名，这里不需要调整，否则这里配置为重命名后的函数名',
            ' `i18n` ',
          )}
        </>
      ),
    },
    {
      name: 'entry',
      type: 'string',
      required: tr('是'),
      default: '-',
      description: tr('指定翻译文件目录（绝对路径）'),
    },
    {
      name: 'fileRegExp',
      type: 'RegExp',
      required: tr('否'),
      default: ' `/.[jt]s$/` ',
      description: (
        <>
          {tr('匹配文件名的正则表达式')}
          <br />
          <br />
          {tr('用于筛选需要被翻译的文件')}
        </>
      ),
    },
    {
      name: 'output',
      type: '[Output](#output)',
      required: tr('是'),
      default: '-',
      description: tr('输出文件相关的配置'),
    },
    {
      name: 'baiduConfig',
      type: '[BaiduConfig](#baiduconfig)',
      required: tr('是'),
      default: '-',
      description: tr('百度翻译相关的配置'),
    },
  ]

  return (
    <>
      <H3>{tr('基础配置')}</H3>
      <Table columns={getCommonTableColumns()} data={data} />
    </>
  )
}

function Output() {
  const data: RecordItem[] = [
    {
      name: 'path',
      type: 'string',
      required: tr('是'),
      default: '-',
      description: tr('语言包生成的目录（绝对路径）'),
    },
    {
      name: 'langType',
      type: `'single' \\| 'multiple'`,
      required: tr('否'),
      default: 'multiple',
      description: (
        <>
          {tr('输出语言包文件的形式')}
          <br />
          <br />
          {tr('假设目标语言是{0}', " `['en', 'jp']` ")}
          <br />
          <Bold>single</Bold>：
          {tr('只会生成一个聚合的语言包文件{0}，格式如下：', ' `langs.json`')}
          <br />
          {`\`${JSON.stringify({
            en: {
              xxx: 'xxx',
            },
            jp: {
              xxx: 'xxx',
            },
          })}\``}
          <br />
          <br />
          <Bold>multiple</Bold>：
          {tr(
            '每个目标语言都会生成对应的语言包文件，对应两个文件：{0}，格式如下：',
            ' `en.json`， `jp.json` ',
          )}
          <br />
          {`\`${JSON.stringify({
            xxx: 'xxx',
          })}\``}
        </>
      ),
    },
    {
      name: 'indentSize',
      type: 'number',
      required: tr('否'),
      default: 2,
      description: tr('语言包文件的缩进空格数'),
    },
  ]

  return (
    <>
      <H3>{tr('Output')}</H3>
      <Table columns={getCommonTableColumns()} data={data} />
    </>
  )
}

function BaiduConfig() {
  const data: RecordItem[] = [
    {
      name: 'appid',
      type: 'string',
      required: tr('是'),
      default: '-',
      description: tr(
        'APPID，需要{0}申请',
        `[${tr('注册账号')}](http://api.fanyi.baidu.com/doc/21 '${tr(
          '文档中有指导说明',
        )}')`,
      ),
    },
    {
      name: 'key',
      type: 'string',
      required: tr('是'),
      default: '-',
      description: tr('密钥，要求同上'),
    },
    {
      name: 'from',
      type: 'string',
      required: tr('是'),
      default: '-',
      description: (
        <>
          {tr(
            '被翻译文本的语言代码（例如中文的是{0}，英语的是{1}）',
            ' `zh`',
            ' `en`',
          )}
          <br />
          <br />
          <>
            {`[${tr('更多语言')}](http://api.fanyi.baidu.com/doc/21 '${tr(
              '搜索"语种列表"',
            )}')`}
            ，
          </>
          {tr('搜索{0}', `**${tr('语种列表')}**`)}
        </>
      ),
    },
    {
      name: 'to',
      type: 'string[]',
      required: tr('是'),
      default: '-',
      description: (
        <>
          {tr('翻译的目标语言代码，格式同上')}
          <br />
          <br />
          📢📢📢：
          {tr(
            '如果目标语言配置为{0}，那么生成的文件名{1}就是{2}，设置语言时的{3}也必须是{4}，如果需要{5}设置为{6}这种，就需要配合{7}来使用',
            " `['en']`",
            "(`output.langType=='multiple'`）",
            ' `en.json`',
            ' `locale` ',
            " `'en'`",
            ' `locale` ',
            " `'en_US'` ",
            ' `codeLocaleMap` ',
          )}
        </>
      ),
    },
    {
      name: 'codeLocaleMap',
      type: 'Record<string, string>',
      required: tr('否'),
      default: '{}',
      description: (
        <>
          {tr('设置语言代码与 `locale` 的映射关系')}
          <br />
          <br />
          {tr(
            '例如目标语言为{0}，想设置 `locale` 的值为{1}，那么需要配置{2}为{3}，最终生成的文件名{4}也会变成{5}',
            " `['en']`",
            " `'en_US'` ",
            ' `codeLocaleMap` ',
            ` \`${JSON.stringify({ en: 'en_US' })}\` `,
            "(`output.langType=='multiple'`）",
            ' `en_US.json` ',
          )}
        </>
      ),
    },
  ]

  return (
    <>
      <H3>{tr('BaiduConfig')}</H3>
      <Table columns={getCommonTableColumns()} data={data} />
    </>
  )
}

function Config() {
  return (
    <>
      <H2>1. {tr('{0}配置', ' `i18nrc.js` ')}</H2>
      <BasicConfig />
      <Output />
      <BaiduConfig />
    </>
  )
}

function CommandList() {
  const columns: Column[] = [
    {
      title: tr('命令'),
      fieldName: 'command',
      align: 'center',
    },
    {
      title: tr('简写'),
      fieldName: 'alias',
      align: 'center',
    },
    {
      title: tr('用法'),
      fieldName: 'usage',
    },
    {
      title: tr('说明'),
      fieldName: 'description',
    },
  ]

  type CommandRecordItem = Record<
    'command' | 'alias' | 'usage' | 'description',
    string | JSX.Element | number
  >

  const data: CommandRecordItem[] = [
    {
      command: 'init',
      alias: '-',
      usage: '`npx i18n init`',
      description: tr('初始化配置文件'),
    },
    {
      command: 'translate',
      alias: 't',
      usage: (
        <>
          `npx i18n translate` <br /> `npx i18n t`
        </>
      ),
      description: tr('提取翻译文本，自动翻译并生成语言包'),
    },
    {
      command: 'version',
      alias: 'v',
      usage: (
        <>
          `npx i18n version`
          <br />
          `npx i18n v`
        </>
      ),
      description: tr('显示版本信息'),
    },
    {
      command: 'help',
      alias: 'h',
      usage: (
        <>
          `npx i18n help`
          <br />
          `npx i18n h`
        </>
      ),
      description: tr('显示帮助信息'),
    },
  ]

  return (
    <>
      <H3>{tr('命令列表')}</H3>
      <Table columns={columns} data={data} />
    </>
  )
}

function CommandProp() {
  const columns: Column[] = [
    {
      title: tr('参数名'),
      fieldName: 'name',
      align: 'center',
    },
    {
      title: tr('简写'),
      fieldName: 'alias',
      align: 'center',
    },
    {
      title: tr('参数值'),
      fieldName: 'value',
      align: 'center',
    },
    {
      title: tr('适用命令'),
      fieldName: 'command',
    },
    {
      title: tr('用法'),
      fieldName: 'usage',
    },
    {
      title: tr('说明'),
      fieldName: 'description',
    },
  ]

  type CommandRecordItem = Record<
    'name' | 'value' | 'command' | 'alias' | 'usage' | 'description',
    string | JSX.Element | number
  >

  const data: CommandRecordItem[] = [
    {
      name: '--locale',
      alias: '-L',
      value: 'en \\| zh',
      command: 'ALL',
      usage: (
        <>
          `npx i18n h -L en`
          <br />
          `npx i18n h --locale en`
        </>
      ),
      description: (
        <>
          {tr('指定命令行显示语言')}
          <br />
          <br />
          {tr('可选语言有中文（zh）/ 英文（en）， 默认为中文（zh）')}
        </>
      ),
    },
    {
      name: '--non-incremental',
      alias: '-',
      value: '-',
      command: (
        <>
          `t`
          <br />
          `translate`
        </>
      ),
      usage: '`npx i18n t --non-incremental`',
      description: (
        <>
          {tr('关闭增量翻译模式')}
          <br />
          <br />
          {tr(
            '⚠️⚠️⚠️：关闭增量翻译模式后，所有的文本会重新翻译，会导致{0}（非翻译平台翻译的）的文本丢失，需慎重考虑使用！！！',
            `**${tr('手工翻译')}**`,
          )}
        </>
      ),
    },
    {
      name: '--path',
      alias: '-P',
      value: '-',
      command: (
        <>
          `init`
          <br />
          `t`
          <br />
          `translate`
        </>
      ),
      usage: (
        <>
          `npx i18n init -P /xxx/xxx/xxx`
          <br />
          `npx i18n t -P /xxx/xxx/xxx`
        </>
      ),
      description: (
        <>
          {tr('指定配置文件路径（参数为绝对路径）')}
          <br />
          <br />
          {tr('只需要指定路径名，配置文件名默认为{0}', ' `i18nrc.js`')}
        </>
      ),
    },
  ]

  return (
    <>
      <H3>{tr('命令参数')}</H3>
      <Table columns={columns} data={data} />
    </>
  )
}

function Command() {
  return (
    <>
      <H2>2.{tr('命令')}</H2>
      <CommandList />
      <CommandProp />
    </>
  )
}

export default function CommandLine() {
  return (
    <>
      <H1>{tr('命令行')}</H1>
      <Config />
      <Command />
    </>
  )
}
