import { getAnchor } from 'jsx-to-md'
import { initI18n as originInitI18n } from '@lib'
import { readFileSync } from 'fs'
import en from './i18n/en.json'
import packageInfo from '../../package.json'

const { t, setI18n } = originInitI18n({ namespace: 'default' })

global.tr = t

export function initI18n({ locale }) {
  setI18n({
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
  const anchor = anchorProp ? getAnchor(anchorProp) : ''

  const res = `https://github.com/eyelly-wu/i18n-pro/blob/v${version}/docs/dist/${filename}${name}.md${anchor}`

  return res
}

export function getFileContent(filepath: string) {
  const res = readFileSync(filepath, { encoding: 'utf-8' })
  return res
}
