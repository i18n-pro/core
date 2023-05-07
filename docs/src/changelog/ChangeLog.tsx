import { List, H3, H2, H4 } from 'jsx-to-md'

type Items = Parameters<typeof List>[0]['items']

type BusinessType = 'commandLine' | 'api' | 'docs'

type ChangeType =
  | 'added'
  | 'changed'
  | 'deprecated'
  | 'removed'
  | 'fixed'
  | 'security'

export const ChangeTypeImpl = ({ type }: { type: ChangeType }) => (
  <H4>{type}</H4>
)

export type ChangeTypeItemsType = Partial<Record<ChangeType, Items>>

export type BusinessRecordType = Record<BusinessType, ChangeTypeItemsType>

function ChangeLogDetail(props: {
  idPrefix: string
  type: ChangeType
  items: Items
}) {
  const { idPrefix, type, items } = props
  const titleId = `${idPrefix}-${type}`
  if (!items) return null

  return (
    <>
      <H4 id={titleId}>{type[0].toUpperCase() + type.slice(1)}</H4>
      <List items={items} />
    </>
  )
}

function Business(props: {
  type: BusinessType
  version: string
  changeTypeItemsType?: ChangeTypeItemsType
}) {
  const typeTextMap: Record<BusinessType, string> = {
    commandLine: tr('命令行工具'),
    api: 'API',
    docs: tr('文档'),
  }
  const { type, version, changeTypeItemsType } = props
  const title = typeTextMap[type]
  const titleId = `${version}-${title}`

  if (!changeTypeItemsType) return null

  const changeTypeOrders: ChangeType[] = [
    'changed',
    'added',
    'fixed',
    'removed',
    'deprecated',
    'security',
  ]
  return (
    <>
      <H3 id={titleId}>{title}</H3>
      {changeTypeOrders.map((changeType) => (
        <ChangeLogDetail
          idPrefix={titleId}
          type={changeType}
          items={changeTypeItemsType[changeType]}
        />
      ))}
    </>
  )
}

export interface ChangeLogProps extends Partial<BusinessRecordType> {
  version: string
  date: string
}

export default function ChangeLog(props: ChangeLogProps) {
  const { version, date } = props

  const businessTypeOrders: BusinessType[] = ['commandLine', 'api', 'docs']

  return (
    <>
      <H2>{`[${version}] - ${date}`}</H2>
      {businessTypeOrders.map((businessType) => (
        <Business
          type={businessType}
          version={version}
          changeTypeItemsType={props[businessType]}
        />
      ))}
    </>
  )
}
