import { H1, UnorderedList, ListItem, Link, Image } from 'jsx-to-md'

// TODO 这里需要和2.0的链接做区分
export default function LiveDemo() {
  const localeSuffixMap = {
    zh: 'zh-CN',
    en: '',
  }

  const suffix = localeSuffixMap[global.docLocale]

  const filename = `README${suffix ? `_${suffix}` : ''}.md`
  return (
    <>
      <H1>Live Demo</H1>
      <UnorderedList>
        <ListItem>
          <Link
            href={`https://codesandbox.io/p/github/i18n-pro/core-demo/v3?file=${filename}`}
          >
            Open in CodeSandbox
          </Link>
        </ListItem>
        <ListItem>
          <Link
            href={`https://stackblitz.com/github/i18n-pro/core-demo/tree/v3?file=${filename}`}
          >
            <Image
              alt="Open in StackBlitz"
              title="Open in StackBlitz"
              src="https://developer.stackblitz.com/img/open_in_stackblitz_small.svg"
            />
          </Link>
        </ListItem>
      </UnorderedList>
    </>
  )
}
