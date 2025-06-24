import { H1, Table, TableOfContents } from 'jsx-to-md'
import {
  getCustomKey,
  getInterpolationVariable,
  getText,
  getTranslationText,
  initI18n,
} from '../utils'

function getColumns() {
  return [
    {
      title: tr('文件名'),
      fieldName: 'filename',
    },
    {
      title: tr('说明'),
      fieldName: 'description',
    },
  ]
}

type RecordItem = Record<
  'filename' | 'description',
  string | JSX.Element | number
>

function getExtraErrorText(text: string) {
  return (
    <>
      {tr('不合规的{0}列表', text)}
      <br />({tr('不包含变量引用和{0}表达式', getText('JavaScript'))})
    </>
  )
}

// TODO 需要添加自定义key，text 冲突的日志
export default function OutputLog(props) {
  initI18n(props)

  const data: RecordItem[] = [
    {
      filename: 'filepaths.json',
      description: tr('匹配到的文件路径列表'),
    },
    {
      filename: 'keys-error.json',
      description: getExtraErrorText(getCustomKey()),
    },
    {
      filename: 'keys.json',
      description: tr('合规的{0}列表', getCustomKey()),
    },
    {
      filename: 'texts-error.json',
      description: getExtraErrorText(getTranslationText()),
    },
    {
      filename: 'texts.json',
      description: tr('合规的{0}列表', getTranslationText()),
    },
    {
      filename: 'translate-fail.json',
      description: tr('翻译失败{0}列表', getTranslationText()),
    },
    {
      filename: 'translate-error.json',
      description: (
        <>
          {tr('翻译异常{0}列表', getTranslationText())}
          <br />({tr('如{0}丢失等异常', getInterpolationVariable())})
        </>
      ),
    },
    {
      filename: 'translate-success.json',
      description: (
        <>
          {tr('翻译成功{0}列表', getTranslationText())}
          <br />( {tr('增量模式下仅包含本次新增翻译')})
        </>
      ),
    },
    {
      filename: 'langCode.json',
      description: (
        <>
          {tr('单语言包文件')}
          <br />
          {tr('仅在{0}时生成', getText(`output.langType == 'single'`))}
        </>
      ),
    },
    {
      filename: 'langs.json',
      description: (
        <>
          {tr('多语言聚合包文件')}
          <br />
          {tr('仅在{0}时生成', getText(`output.langType == 'multiple'`))}
        </>
      ),
    },
  ]

  return (
    <>
      <H1 skip>{tr('翻译日志')}</H1>
      <TableOfContents text={tr('目录')} open={false} />
      {tr(
        '翻译命令执行完成后，会在 {0}目录下生成{1}日志目录，包含以下日志文件：',
        getText('output.path'),
        getText('.log'),
      )}
      <Table columns={getColumns()} data={data} />
    </>
  )
}
