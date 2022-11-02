import React, { Break, H1, UnorderList, ListItem, Link, Image } from 'jsx-to-md'
import { linkObj, imageObj } from './constants'

export default function Vision() {
  return (
    <>
      <Break />
      <H1>{tr('特性')}</H1>
      <UnorderList>
        <ListItem>
          {tr('轻量：')}
          <Link {...linkObj.bundlesize}>
            <Image {...imageObj.bundlesize} />
          </Link>
        </ListItem>
        <ListItem>{tr('简单：学习成本低，易上手')}</ListItem>
        <ListItem>
          {tr(
            '灵活：支持动态参数、以及独特的类型标记和格式化回调（数字、货币、日期、时间、复数）',
          )}
        </ListItem>
        <ListItem>
          {tr('自动翻译：一个命令即可自动提取文本并翻译生成语言包')}
        </ListItem>
        <ListItem>{tr('keyless：无需手动定义key，待翻译文本即key')}</ListItem>
      </UnorderList>
    </>
  )
}
