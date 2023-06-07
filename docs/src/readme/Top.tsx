import { Image, Link, Break } from 'jsx-to-md'
import { linkObj, imageObj } from '../constants'
import { renderLanguage } from '../utils'

export default function Top() {
  const props = {
    align: 'center',
  }

  return (
    <div {...props}>
      <Break />
      <Link {...linkObj['github']}>
        <Image {...imageObj['logo']} />
      </Link>
      <Break />
      {renderLanguage('README')}
      <p style={{ fontSize: 18 }}>
        {tr('适用于 JavaScript 的轻量、简单、灵活、自动翻译的国际化工具')}
      </p>
      <Break />
      <Break />
      <Link {...linkObj['npm']}>
        <Image {...imageObj['npm-version']} />
      </Link>
      <Break />
      <Link {...linkObj.npm}>
        <Image {...imageObj['npm-download']} />
      </Link>
      <Break />
      <Break />
      <Link {...linkObj['github-stars']}>
        <Image {...imageObj['github-stars']} />
      </Link>
      <Break />
      <Link {...linkObj['last-commit']}>
        <Image {...imageObj['last-commit']} />
      </Link>
      <Break />
      <Link {...linkObj['github-issues']}>
        <Image {...imageObj['github-issues']} />
      </Link>
      <Break />
      <Link {...linkObj.codecov}>
        <Image {...imageObj.codecov} />
      </Link>
      <Break />
      <Break />
      <Image
        alt="demo"
        src="https://s3.bmp.ovh/imgs/2023/06/06/c3261b545825fc71.gif"
      />
      <Break />
    </div>
  )
}
