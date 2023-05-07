import {
  H1,
  H2,
  H3,
  Table,
  Column,
  Bold,
  TableOfContents,
  BlockQuote,
  Link,
  render,
  Break,
} from 'jsx-to-md'
import { initI18n } from '../utils'

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
      align: 'center',
    },
    {
      title: tr('默认值'),
      fieldName: 'default',
      align: 'center',
    },
    {
      title: tr('说明'),
      fieldName: 'description',
    },
  ]

  return commonTableColumns
}

function getCommonConfig() {
  return [
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
          {tr('设置语言代码与{0}的映射关系', ' `locale` ')}
          <br />
          <br />
          {tr(
            '例如目标语言为{0}，想设置{1}的值为{2}，那么需要配置{3}为{4}，最终生成的文件名{5}也会变成{6}',
            " `['en']`",
            ' `locale` ',
            " `'en_US'` ",
            ' `codeLocaleMap` ',
            ` \`${JSON.stringify({ en: 'en_US' })}\` `,
            "(`output.langType=='multiple'`）",
            ' `en_US.json` ',
          )}
        </>
      ),
    },
    {
      name: 'delay',
      type: 'number',
      required: tr('否'),
      default: '0',
      description: (
        <>
          {tr('单个接口分批次请求时，后续接口请求时间间隔(单位：秒)')}
          <br />
          <br />
          {tr(
            '用于解决接口有 QPS 限制，如果存在相关报错，可尝试配置该属性来解决',
          )}
        </>
      ),
    },
  ]
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
      default: 't',
      description: (
        <>
          {tr('命令行匹配翻译文案的函数名')}
          <br />
          <br />
          {tr(
            '如果在使用{0}函数没有重命名，这里不需要调整，否则这里配置为重命名后的函数名',
            ' `t` ',
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
      name: 'translator',
      type: ' `googlex` <br/> `openai` <br/> `google` <br/> `microsoft` <br/> `aliyun` <br/> `tencent` <br/> `youdao` <br/> `baidu`',
      required: tr('否'),
      default: 'googlex',
      description: (
        <>
          {tr('指定翻译平台，默认为{0}', ' `googlex` ')}
          <br />
          <br />
          {tr('指定好{0}后，还需配合对应的配置文件', ' `translator` ')}
          <br />
          {tr(
            '例如{0}配置为{1}, 则还需要配置{2}',
            ' `translator` ',
            ' `googlex` ',
            ' `googlexConfig` ',
          )}
        </>
      ),
    },
    {
      name: 'googlexConfig',
      type: '[GooglexConfig](#googlexconfig)',
      required: tr('否'),
      default: '-',
      description: tr('{0}翻译相关的配置', tr('谷歌X')),
    },
    {
      name: 'openaiConfig',
      type: '[OpenaiConfig](#openaiconfig)',
      required: tr('否'),
      default: '-',
      description: tr('{0}翻译相关的配置', 'OpenAI'),
    },
    {
      name: 'googleConfig',
      type: '[GoogleConfig](#googleconfig)',
      required: tr('否'),
      default: '-',
      description: tr('{0}翻译相关的配置', tr('谷歌')),
    },
    {
      name: 'microsoftConfig',
      type: '[MicrosoftConfig](#microsoftconfig)',
      required: tr('否'),
      default: '-',
      description: tr('{0}翻译相关的配置', tr('微软')),
    },
    {
      name: 'baiduConfig',
      type: '[BaiduConfig](#baiduconfig)',
      required: tr('否'),
      default: '-',
      description: tr('{0}翻译相关的配置', tr('百度')),
    },
    {
      name: 'youdaoConfig',
      type: '[YoudaoConfig](#youdaoconfig)',
      required: tr('否'),
      default: '-',
      description: tr('{0}翻译相关的配置', tr('有道')),
    },
    {
      name: 'tencentConfig',
      type: '[TencentConfig](#tencentconfig)',
      required: tr('否'),
      default: '-',
      description: tr('{0}翻译相关的配置', tr('腾讯')),
    },
    {
      name: 'aliyunConfig',
      type: '[AliyunConfig](#aliyunconfig)',
      required: tr('否'),
      default: '-',
      description: tr('{0}翻译相关的配置', tr('阿里云')),
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
      type: `'single' <br/> 'multiple'`,
      required: tr('否'),
      default: "'multiple'",
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
      {tr('输出文件的配置')}
      <Table columns={getCommonTableColumns()} data={data} />
    </>
  )
}

function GooglexConfig() {
  const data: RecordItem[] = [
    {
      name: 'proxy',
      type: 'string',
      required: tr('否'),
      default: '-',
      description: (
        <>
          {tr('配置代理服务')}
          <br />
          <br />
          {tr(
            '部分国家和地区不能正常访问{0}服务，需要配置代理才行',
            ' `谷歌` ',
          )}
          <br />
          格式：`protocol://hostname:port`
          <br />
          例如：`http://127.0.0.1:8087`
        </>
      ),
    },
    {
      name: 'from',
      type: 'string',
      required: tr('是'),
      default: '-',
      description: (
        <>
          {tr(
            '被翻译文案的语言代码（例如中文的是{0}，英文的是{1}）',
            ' `zh-CN`',
            ' `en`',
          )}
          <br />
          <br />
          <>
            {`[${tr(
              '支持语言',
            )}](https://github.com/AidanWelch/google-translate-api)`}
            ，
          </>
          {tr('需查阅对应文档')}
        </>
      ),
    },
    ...getCommonConfig(),
  ]

  return (
    <>
      <H3>GooglexConfig</H3>
      {tr('谷歌X翻译的配置')}
      <BlockQuote>
        {tr(
          '基于{0}实现，无需注册，免费使用',
          ` ${render(
            <Link href="https://github.com/AidanWelch/google-translate-api">
              google-translate-api-x
            </Link>,
          )} `,
        )}
      </BlockQuote>
      <Break />
      <Table columns={getCommonTableColumns()} data={data} />
    </>
  )
}

function OpenAIConfig() {
  const data: RecordItem[] = [
    {
      name: 'key',
      type: 'string',
      required: tr('是'),
      default: '-',
      description: tr(
        'OpenAI API Key，需要{0}申请',
        `[${tr('注册账号')}](https://chat.openai.com/auth/login)`,
      ),
    },
    {
      name: 'model',
      type: 'string',
      required: tr('是'),
      default: 'gpt-3.5-turbo',
      description: (
        <>
          {tr('指定模型版本')}
          <br />
          <br />
          {tr(
            '使用模型，默认为{0}，当前只兼容{1}模型',
            ' `gpt-3.5-turbo` ',
            ' `Chart` ',
          )}
        </>
      ),
    },
    {
      name: 'proxy',
      type: 'string',
      required: tr('否'),
      default: '-',
      description: (
        <>
          {tr('配置代理服务')}
          <br />
          <br />
          {tr(
            '部分国家和地区不能正常访问{0}服务，需要配置代理才行',
            ' `OpenAI` ',
          )}
          <br />
          格式：`protocol://hostname:port`
          <br />
          例如：`http://127.0.0.1:8087`
        </>
      ),
    },
    {
      name: 'from',
      type: 'string',
      required: tr('是'),
      default: '-',
      description: (
        <>
          {tr(
            '被翻译文案的语言（例如中文是{0}，英文是{1}）',
            ' `Chinese`',
            ' `English`',
          )}
          <br />
          <br />
          {tr('特殊说明：')}
          {tr(
            '由于{0}目前没有推出纯文本的翻译API，因此只能通过自定义的{1}来执行翻译，这里要求提供的翻译语言必须是英文',
            ' `OpenAI` ',
            ' `Prompt` ',
          )}
        </>
      ),
    },
    ...getCommonConfig(),
  ]

  return (
    <>
      <H3>OpenAIConfig</H3>
      {tr('OpenAI翻译的配置')}
      <Table columns={getCommonTableColumns()} data={data} />
    </>
  )
}

function GoogleConfig() {
  const data: RecordItem[] = [
    {
      name: 'projectId',
      type: 'string',
      required: tr('是'),
      default: '-',
      description: tr(
        '项目ID，需要{0}申请',
        `[${tr('注册账号')}](https://cloud.google.com/translate)`,
      ),
    },
    {
      name: 'location',
      type: 'string',
      required: tr('否'),
      default: '-',
      description: <>{tr('区域')}</>,
    },
    {
      name: 'from',
      type: 'string',
      required: tr('是'),
      default: '-',
      description: (
        <>
          {tr(
            '被翻译文案的语言代码（例如中文的是{0}，英语的是{1}）',
            ' `zh-CN`',
            ' `en`',
          )}
          <br />
          <br />
          <>
            {`[${tr(
              '更多语言',
            )}](https://cloud.google.com/translate/docs/languages )`}
          </>
        </>
      ),
    },
    ...getCommonConfig(),
  ]

  return (
    <>
      <H3>GoogleConfig</H3>
      {tr('{0}翻译的配置', tr('谷歌'))}
      <BlockQuote>
        {tr(
          '注意：该平台比较特殊，需要在本地环境提供额外的密匙，具体请参考{0}',
          render(
            <Link href="https://cloud.google.com/translate/docs/setup?hl=zh-cn#auth">
              {tr('文档')}
            </Link>,
          ),
        )}
      </BlockQuote>
      <Break />
      <Table columns={getCommonTableColumns()} data={data} />
    </>
  )
}

function MicroConfig() {
  const data: RecordItem[] = [
    {
      name: 'key',
      type: 'string',
      required: tr('是'),
      default: '-',
      description: tr(
        'Microsoft translator-key，需要{0}申请',
        `[${tr('注册 Azure 账号')}](https://azure.microsoft.com/)`,
      ),
    },
    {
      name: 'location',
      type: 'string',
      required: tr('否'),
      default: '-',
      description: <>{tr('区域')}</>,
    },
    {
      name: 'from',
      type: 'string',
      required: tr('是'),
      default: '-',
      description: (
        <>
          {tr(
            '被翻译文案的语言代码（例如中文的是{0}，英语的是{1}）',
            ' `zh-Hans`',
            ' `en`',
          )}
          <br />
          <br />
          <>
            {`[${tr(
              '更多语言',
            )}](https://learn.microsoft.com/zh-cn/azure/cognitive-services/translator/language-support)`}
          </>
        </>
      ),
    },
    ...getCommonConfig(),
  ]

  return (
    <>
      <H3>MicrosoftConfig</H3>
      {tr('{0}翻译的配置', tr('微软'))}
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
            '被翻译文案的语言代码（例如中文的是{0}，英语的是{1}）',
            ' `zh`',
            ' `en`',
          )}
          <br />
          <br />
          <>
            {`[${tr('更多语言')}](http://api.fanyi.baidu.com/doc/21 '${tr(
              '搜索{0}',
              '"语种列表"',
            )}')`}
            ，
          </>
          {tr('搜索{0}', '`语种列表`')}
        </>
      ),
    },
    ...getCommonConfig(),
  ]

  return (
    <>
      <H3>BaiduConfig</H3>
      {tr('百度翻译的配置')}
      <Table columns={getCommonTableColumns()} data={data} />
    </>
  )
}

function YoudaoConfig() {
  const data: RecordItem[] = [
    {
      name: 'appKey',
      type: 'string',
      required: tr('是'),
      default: '-',
      description: tr(
        '应用ID，需要{0}申请',
        `[${tr('注册账号')}](https://ai.youdao.com '${tr(
          '文档中有指导说明',
        )}')`,
      ),
    },
    {
      name: 'key',
      type: 'string',
      required: tr('是'),
      default: '-',
      description: tr('应用密钥，要求同上'),
    },
    {
      name: 'from',
      type: 'string',
      required: tr('是'),
      default: '-',
      description: (
        <>
          {tr(
            '被翻译文案的语言代码（例如中文的是{0}，英语的是{1}）',
            ' `zh-CHS`',
            ' `en`',
          )}
          <br />
          <br />
          <>
            {`[${tr(
              '更多语言',
            )}](https://ai.youdao.com/DOCSIRMA/html/%E8%87%AA%E7%84%B6%E8%AF%AD%E8%A8%80%E7%BF%BB%E8%AF%91/API%E6%96%87%E6%A1%A3/%E6%96%87%E6%9C%AC%E7%BF%BB%E8%AF%91%E6%9C%8D%E5%8A%A1/%E6%96%87%E6%9C%AC%E7%BF%BB%E8%AF%91%E6%9C%8D%E5%8A%A1-API%E6%96%87%E6%A1%A3.html '${tr(
              '搜索{0}',
              '"支持语言"',
            )}')`}
            ，
          </>
          {tr('搜索{0}', '`支持语言`')}
        </>
      ),
    },
    ...getCommonConfig(),
  ]

  return (
    <>
      <H3>YoudaoConfig</H3>
      {tr('有道翻译的配置')}
      <Table columns={getCommonTableColumns()} data={data} />
    </>
  )
}

function TencentConfig() {
  const data: RecordItem[] = [
    {
      name: 'secretId',
      type: 'string',
      required: tr('是'),
      default: '-',
      description: tr(
        '用于标识 API 调用者身份，可以简单类比为用户名，需要{0}申请',
        `[${tr(
          '注册账号',
        )}](https://cloud.tencent.com/document/api/551/40566 '${tr(
          '文档中有指导说明',
        )}')`,
      ),
    },
    {
      name: 'secretKey',
      type: 'string',
      required: tr('是'),
      default: '-',
      description: tr(
        '用于验证 API 调用者的身份，可以简单类比为密码，要求同上',
      ),
    },
    {
      name: 'region',
      type: 'string',
      required: tr('是'),
      default: '-',
      description: (
        <>
          {tr('地域列表')}
          <br />
          <br />{' '}
          <>
            {`[${tr(
              '地域列表',
            )}](https://cloud.tencent.com/document/api/551/40566#2.-.E8.BE.93.E5.85.A5.E5.8F.82.E6.95.B0 '${tr(
              '搜索{0}',
              '"地域列表"',
            )}')`}
            ，
          </>
          {tr('搜索{0}', '`地域列表`')}
        </>
      ),
    },
    {
      name: 'from',
      type: 'string',
      required: tr('是'),
      default: '-',
      description: (
        <>
          {tr(
            '被翻译文案的语言代码（例如中文的是{0}，英语的是{1}）',
            ' `zh`',
            ' `en`',
          )}
          <br />
          <br />
          <>
            {`[${tr(
              '更多语言',
            )}](https://cloud.tencent.com/document/api/551/40566#2.-.E8.BE.93.E5.85.A5.E5.8F.82.E6.95.B0 '${tr(
              '搜索{0}',
              '"源语言"',
            )}')`}
            ，
          </>
          {tr('搜索{0}', '`源语言`')}
        </>
      ),
    },
    ...getCommonConfig(),
  ]

  return (
    <>
      <H3>TencentConfig</H3>
      {tr('腾讯翻译的配置')}
      <Table columns={getCommonTableColumns()} data={data} />
    </>
  )
}

function AliyunConfig() {
  const data: RecordItem[] = [
    {
      name: 'accessKeyId',
      type: 'string',
      required: tr('是'),
      default: '-',
      description: tr(
        'AccessKey ID，需要{0}申请',
        `[${tr('注册账号')}](https://mt.console.aliyun.com/basic '${tr(
          '文档中有指导说明',
        )}')`,
      ),
    },
    {
      name: 'accessKeySecret',
      type: 'string',
      required: tr('是'),
      default: '-',
      description: tr('AccessKey Secret，要求同上'),
    },
    {
      name: 'scene',
      type: 'string',
      required: tr('否'),
      default: 'general',
      description: (
        <>
          {tr('场景')}
          <br />
          <br />
          {tr('具体可选值需要根据当前API的类型：')}
          <br />
          {`[${tr(
            '普通版：参考文档',
          )}](https://help.aliyun.com/document_detail/158244.html '${tr(
            '搜索{0}',
            '"Scene"',
          )}')`}
          ，{tr('搜索{0}', '`Scene`')}
          <br />
          {`[${tr(
            '专业版：参考文档',
          )}](https://help.aliyun.com/document_detail/158267.html '${tr(
            '搜索{0}',
            '"Scene"',
          )}')`}
          ，{tr('搜索{0}', '`Scene`')}
        </>
      ),
    },
    {
      name: 'from',
      type: 'string',
      required: tr('是'),
      default: '-',
      description: (
        <>
          {tr(
            '被翻译文案的语言代码（例如中文的是{0}，英语的是{1}）',
            ' `zh`',
            ' `en`',
          )}
          <br />
          <br />
          <>
            {`[${tr(
              '更多语言',
            )}](https://help.aliyun.com/document_detail/215387.html?spm=a2c4g.11186623.0.0.5d572e50TWfreB#Zcs6q '${tr(
              '搜索{0}',
              '"语言代码列表"',
            )}')`}
            ，
          </>
          {tr('搜索{0}', '`语言代码列表`')}
        </>
      ),
    },
    ...getCommonConfig(),
  ]

  return (
    <>
      <H3>AliyunConfig</H3>
      {tr('阿里云翻译的配置')}
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
      <GooglexConfig />
      <OpenAIConfig />
      <GoogleConfig />
      <MicroConfig />
      <BaiduConfig />
      <YoudaoConfig />
      <TencentConfig />
      <AliyunConfig />
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
      fieldName: 'shorthand',
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
    'command' | 'shorthand' | 'usage' | 'description',
    string | JSX.Element | number
  >

  const data: CommandRecordItem[] = [
    {
      command: 'init',
      shorthand: '-',
      usage: '`npx i18n init`',
      description: tr('初始化配置文件'),
    },
    {
      command: 'translate',
      shorthand: 't',
      usage: (
        <>
          `npx i18n translate` <br /> `npx i18n t`
        </>
      ),
      description: tr('提取翻译文案，自动翻译并生成语言包'),
    },
    {
      command: 'version',
      shorthand: 'v',
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
      shorthand: 'h',
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
      fieldName: 'shorthand',
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
    'name' | 'value' | 'command' | 'shorthand' | 'usage' | 'description',
    string | JSX.Element | number
  >

  const data: CommandRecordItem[] = [
    {
      name: '--locale',
      shorthand: '-L',
      value: '`en` \\| `zh`',
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
          {tr('可选语言有中文（zh）/ 英文（en）， 默认为英文（en）')}
        </>
      ),
    },
    {
      name: '--non-incremental',
      shorthand: '-',
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
            '⚠️⚠️⚠️：关闭增量翻译模式后，所有的文案会重新翻译，会导致{0}（非翻译平台翻译的）的文案丢失，需慎重考虑使用！！！',
            `**${tr('手工翻译')}**`,
          )}
        </>
      ),
    },
    {
      name: '--path',
      shorthand: '-P',
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
      <H2>2. {tr('命令')}</H2>
      <CommandList />
      <CommandProp />
    </>
  )
}

export default function CommandLine(props) {
  initI18n(props)

  return (
    <>
      <H1 skip>{tr('命令行')}</H1>
      <TableOfContents text={tr('目录')} open={false} />
      <Config />
      <Command />
    </>
  )
}
