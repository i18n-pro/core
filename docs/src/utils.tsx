import { Break, getAnchor, Link } from 'jsx-to-md'
import { initI18n as originInitI18n } from '@lib'
import { readFileSync } from 'fs'
import en from './i18n/en.json'
import packageInfo from '../../package.json'
import { langs } from './constants'

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

export function getDocHref(
  filename: string,
  anchorProp?: string,
  localeProp?: string,
) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { version: originVersion, codeNameMap, homepage } = packageInfo
  const locale = localeProp || global.docLocale
  let name = codeNameMap[locale]
  name = name ? `_${name}` : ''
  const anchor = anchorProp ? getAnchor(anchorProp) : ''
  let version = `v${originVersion}`

  // only in dev branch
  const DEV_FILENAMES = ['CONTRIBUTION_GUIDELINES']

  if (DEV_FILENAMES.includes(filename)) {
    version = 'dev'
  }

  if (filename === 'README') {
    return locale === 'en'
      ? `${homepage}/tree/${version}${anchor || '#readme'}`
      : `${homepage}/blob/${version}/${filename}${name}.md${anchor}`
  } else {
    return `${homepage}/blob/${version}/docs/dist/${filename}${name}.md${anchor}`
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

export function getCustomKey(normal = false) {
  const text = tr('自定义key')
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

export function getTypeTagCode(isDot = false) {
  let prefix = 't('

  if (isDot) {
    prefix = `t.t('custom-key', `
  }

  const text = `
// ${tr('数字类型')}
${prefix}'${tr('用户数达到了{0}', '{n0}')}', 100000000)

// ${tr('货币类型')}
${prefix}'${tr('售价为{0}', '{c0}')}', 14999)

// ${tr('日期类型')}
${prefix}\`${tr('今天的日期是{0}', '{d0}')}\`, new Date())

// ${tr('时间类型')}
${prefix}'${tr('当前时间：{0}', '{t0}')}', new Date())

// ${tr('复数类型')}
${prefix}'${tr(
    '我有{0}，{1}和{2}',
    `{${tr('p0个苹果')}}`,
    `{${tr('p1个香蕉')}}`,
    `{${tr('p2个梨')}}`,
  )}', 5, 4, 3) `
  return text
}

export function renderLanguage(filename: string) {
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
