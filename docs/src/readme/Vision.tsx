import React, { Break, H1 } from 'jsx-to-md'

export default function Vision() {
  return (
    <>
      <Break />
      <H1>{tr('愿景')}</H1>
      {tr('为了让接入国际化成为轻松且愉快的事{0}', '😄💪🏻')}
    </>
  )
}
