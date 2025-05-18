import { Image, Link, Break } from 'jsx-to-md'
import { linkObj, imageObj } from '../constants'
import { renderLanguage } from '../utils'

export default function Top() {
  const props = {
    align: 'center',
  }

  return (
    <div {...props}>
      <p style={{ fontSize: 18 }}>
        {tr('开箱即用的轻量级 JavaScript 国际化自动翻译解决方案')}
      </p>
      <Break />
      {renderLanguage('README')}
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
      <a href="https://ibb.co/hxDQ1w69">
        <img
          src="https://i.ibb.co/JW56Fg1t/2025-05-18-175603.gif"
          alt="2025-05-18-175603"
        />
      </a>
      <Break />
    </div>
  )
}
