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
  const { version, codeNameMap, homepage } = packageInfo
  const locale = global.docLocale
  let name = codeNameMap[locale]
  name = name ? `_${name}` : ''
  const anchor = anchorProp ? getAnchor(anchorProp) : ''

  if (filename === 'README') {
    return locale === 'en'
      ? `${homepage}/tree/v${version}${anchor}`
      : `${homepage}/blob/v${version}/${filename}${name}.md${anchor}`
  } else {
    return `${homepage}/blob/v${version}/docs/dist/${filename}${name}.md${anchor}`
  }
}

export function getFileContent(filepath: string) {
  const res = readFileSync(filepath, { encoding: 'utf-8' })
  return res
}

export function getIssueText(
  text: string,
  props: {
    issue?: number | number[]
    by?: string
  } = {},
) {
  const { issue, by } = props

  let showIssue: number[] | string = typeof issue === 'number' ? [issue] : issue

  showIssue =
    Array.isArray(showIssue) && showIssue.length
      ? showIssue.reduce((res, item, index) => {
          res += `${index === 0 ? '' : ' '}[#${item}](${
            packageInfo.bugs.url
          }/${item})`
          return res
        }, ' ')
      : ''

  const showBy = by ? ` by @[${by}](https://github.com/${by})` : ''

  return `${text}${showIssue}${showBy}`
}

function getText(text: string, normal = false) {
  if (normal) return text
  return ` \`${text}\` `
}

export function getTranslationText(normal = false) {
  const text = tr('翻译文案')
  return getText(text, normal)
}

export function getVariableInterpolation(normal = false) {
  const text = tr('变量插值')
  return getText(text, normal)
}

export function getInterpolationVariable(normal = false) {
  const text = tr('插值变量')
  return getText(text, normal)
}
