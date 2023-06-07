import { Break, H1 } from 'jsx-to-md'
import { initI18n } from '../utils'

export default function OutputLog(props) {
  initI18n(props)

  return (
    <>
      <H1 skip>{tr('贡献指南')}</H1>
      {tr('首先，对各位想要参与到本项目来表示热烈欢迎{0}', '👏🏻👏🏻👏🏻')}
      <Break />
      <Break />
      {tr(
        '但是抱歉的是，当前文档还在规划完善中...（也许你可以从该文档开始，写文档绝不是一件容易的事😂）',
      )}
      <Break />
      <Break />
      {tr('最后，请不要丢失你的热情，请持续保持关注！')}
    </>
  )
}
