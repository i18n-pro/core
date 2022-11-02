import React, { Image, Link, Break } from 'jsx-to-md'
import { linkObj, imageObj, langs } from './constants'

const sperator = ' | '

function renderLanguage() {
  const res = langs.reduce((res, item, index) => {
    const { code, locale, name } = item

    if (global.docLocale == code) {
      res.push(name)
    } else {
      res.push(
        <Link title={name} href={`./readme_${locale}`}>
          {name}
        </Link>,
      )
    }

    if (index != langs.length - 1) {
      res.push(sperator)
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

export default function Top() {
  return (
    <div style={{ textAlign: 'center' }}>
      <Break />
      <Link {...linkObj['github']}>
        <Image {...imageObj['logo']} />
      </Link>
      <Break />
      {renderLanguage()}
      <p style={{ fontSize: 18 }}>{tr('轻量、简单、灵活的自动翻译工具')}</p>
      <Break />
      <Break />
      <Link {...linkObj['npm']}>
        <Image {...imageObj['npm-version']} />
      </Link>
      <Break />
      <Link {...linkObj.npm}>
        <Image {...imageObj['npm-download']} />
      </Link>{' '}
      <Break />
      <Link {...linkObj.npm}>
        <Image {...imageObj['npm-quality-score']} />
      </Link>{' '}
      <Break />
      <Link {...linkObj.bundlesize}>
        <Image {...imageObj.bundlesize} />
      </Link>{' '}
      <Break />
      <Link {...linkObj.dependenices}>
        <Image {...imageObj.dependenices} />
      </Link>{' '}
      <Break />
      <Link {...linkObj['github-stars']}>
        <Image {...imageObj['github-stars']} />
      </Link>{' '}
      <Break />
      <Link {...linkObj['last-commit']}>
        <Image {...imageObj['last-commit']} />
      </Link>{' '}
      <Break />
      <Link {...linkObj['github-issues']}>
        <Image {...imageObj['github-issues']} />
      </Link>{' '}
      <Break />
      <Link {...linkObj.codecov}>
        <Image {...imageObj.codecov} />
      </Link>{' '}
      <Break />
      <Link {...linkObj['lgtm-alerts']}>
        <Image {...imageObj['lgtm-alerts']} />
      </Link>{' '}
      <Break />
      <Link {...linkObj['lgtm-quality']}>
        <Image {...imageObj['lgtm-quality']} />
      </Link>{' '}
      <Break />
    </div>
  )
}
