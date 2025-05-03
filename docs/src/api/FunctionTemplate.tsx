import { Break, H3, H4, H5, H6 } from 'jsx-to-md'
import FunctionTemplateWrapper from './FunctionTemplateWrapper'

export interface FunctionTemplateProps {
  name: string
  description: string | React.ReactNode
  type: string
  props: Record<string, string | JSX.Element>
  returns?: unknown
  level?: number
  property?: FunctionTemplateProps[]
}

function TypeCode(props: { content: string }) {
  const { content } = props
  return <pre>{content}</pre>
}

export default function FunctionTemplate(props: FunctionTemplateProps) {
  const {
    name,
    description,
    type,
    props: propsProp,
    returns,
    level = 3,
    property,
  } = props

  const typeText = tr('类型')
  const propsText = tr('参数说明')

  const levelHeaderMap = {
    3: H3,
    4: H4,
    5: H5,
    6: H6,
  }

  const titleLevel = level
  const otherLevel = level + 1
  const TitleHeader = levelHeaderMap[titleLevel]
  const OtherHeader = levelHeaderMap[otherLevel]

  const getId = (title: string) => `${level}-${name}-${title}`

  return (
    <>
      <TitleHeader id={level === 3 ? undefined : getId(name)}>
        {name}
      </TitleHeader>
      {description}
      <OtherHeader id={getId(typeText)}>{typeText}</OtherHeader>
      <TypeCode content={type} />
      <Break />
      <OtherHeader id={getId(propsText)}>{propsText}</OtherHeader>
      <table>
        <tr>
          <th>{tr('参数名')}</th>
          <th>{tr('说明')}</th>
        </tr>
        <tr>
          {Object.entries(propsProp).map(([key, desc]) => {
            return (
              <tr>
                <td>{key}</td>
                <td>{desc}</td>
              </tr>
            )
          })}
        </tr>
      </table>
      <Break />
      {returns && (
        <>
          <OtherHeader>{tr('返回值')}</OtherHeader>
        </>
      )}
      {Array.isArray(property) && property.length > 0 && (
        <>
          <OtherHeader>{tr('属性')}</OtherHeader>
          {property?.map((item) => (
            <>
              {/** TODO 这里目前存在bug, 引用自身的话会导致渲染空内容 */}
              <FunctionTemplateWrapper {...item} level={level + 2} />
            </>
          ))}
        </>
      )}
    </>
  )
}
