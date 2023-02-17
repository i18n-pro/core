import { initI18N as originInitI18N } from '@lib'
import en from './i18n/en.json'
import packageInfo from '../../package.json'

const { i18n, setI18N } = originInitI18N({ namespace: 'default' })

global.tr = i18n

export function initI18N({ locale }) {
  setI18N({
    locale,
    langs: {
      en,
    },
  })

  global.docLocale = locale
}

export function getDocHref(filename: string, anchorProp?: string) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { version, codeNameMap } = packageInfo as any
  let name = codeNameMap[global.docLocale]
  name = name ? `_${name}` : ''
  let anchor = anchorProp ? `#${anchorProp}` : ''
  anchor = anchor.replace(/ /g, '-').replace('.', '').toLocaleLowerCase()

  const res = `https://github.com/eyelly-wu/i18n-pro/blob/v${version}/docs/dist/${filename}${name}.md${anchor}`

  return res
}
