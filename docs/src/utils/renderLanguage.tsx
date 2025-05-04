import { Link, Break } from 'jsx-to-md'
import { langs } from '../constants'
import getDocHref from './getDocHref'

export default function renderLanguage(filename: string) {
  const separator = ' | '

  const res = langs.reduce((res, item, index) => {
    const { code, name } = item

    if (global.docLocale == code) {
      res.push(name)
    } else {
      res.push(<Link href={getDocHref(filename, undefined, code)}>{name}</Link>)
    }

    if (index != langs.length - 1) {
      res.push(separator)
    }

    return res
  }, [])
  return (
    <>
      <Break />
      <Break />
      {res}
      <Break />
      <Break />
    </>
  )
}
