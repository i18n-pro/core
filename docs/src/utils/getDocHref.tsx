import { getAnchor } from 'jsx-to-md'
import packageInfo from '../../../package.json'

export default function getDocHref(
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
