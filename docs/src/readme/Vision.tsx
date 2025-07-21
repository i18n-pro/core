import { Break, H1 } from 'jsx-to-md'

export default function Vision() {
  return (
    <>
      <Break />
      <H1>{tr('愿景')}</H1>
      {tr('让国际化变得轻松且愉快{0}', '😄💪🏻')}
    </>
  )
}
