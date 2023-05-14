import { Break, H3, H4 } from 'jsx-to-md'

export interface FunctionTemplate {
  name: string
  description: string | React.ReactNode
  type: string
  props: Record<string, string | JSX.Element>
  returns?: unknown
}

function TypeCode(props: { content: string }) {
  const { content } = props
  return (
    <code>
      <pre>{content}</pre>
    </code>
  )
}

export default function FunctionTemplate(props: FunctionTemplate) {
  const { name, description, type, props: propsProp, returns } = props

  const typeText = tr('类型')
  const propsText = tr('参数说明')
  const getId = (title: string) => `${name}-${title}`

  return (
    <>
      <H3>{name}</H3>
      {description}
      <H4 id={getId(typeText)}>{typeText}</H4>
      <TypeCode content={type} />
      <Break />
      <H4 id={getId(propsText)}>{propsText}</H4>
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
          <H4>{tr('返回值')}</H4>
        </>
      )}
    </>
  )
}
