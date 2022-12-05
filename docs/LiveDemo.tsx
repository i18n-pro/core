import React, { Break, H1, UnorderList, ListItem, Link, Image } from 'jsx-to-md'

export default function LiveDemo() {
  return (
    <>
      <H1>Live Demo</H1>
      <UnorderList>
        <ListItem>
          <Link href="https://codesandbox.io/p/github/eyelly-wu/i18n-pro-react-demo/main">
            Open in CodeSandbox
          </Link>
        </ListItem>
        <ListItem>
          <Link href="https://stackblitz.com/edit/i18n-pro-react-demo">
            <Image
              alt="Open in StackBlitz"
              title="Open in StackBlitz"
              src="https://developer.stackblitz.com/img/open_in_stackblitz_small.svg"
            />
          </Link>
        </ListItem>
      </UnorderList>
    </>
  )
}
