import React, {
  Break,
  H1,
  UnorderedList,
  ListItem,
  Link,
  Image,
  Bold,
} from 'jsx-to-md'
import { linkObj, imageObj } from './constants'

export default function Vision() {
  return (
    <>
      <H1>{tr('特性')}</H1>
      <UnorderedList>
        <ListItem>
          <Bold>{tr('轻量')}</Bold>：
          <Link {...linkObj.bundlesize}>
            <Image {...imageObj.bundlesize} />
          </Link>
        </ListItem>
        <ListItem>
          <Bold>{tr('简单')}</Bold>：{tr('学习成本低，易上手')}
        </ListItem>
        <ListItem>
          <Bold>{tr('灵活')}</Bold>：
          {tr(
            '支持动态参数、以及独特的类型标记和格式化回调（数字、货币、日期、时间、复数）',
          )}
        </ListItem>
        <ListItem>
          <Bold>{tr('自动翻译')}</Bold>：
          {tr('一个命令即可自动提取文本并翻译生成语言包')}
        </ListItem>
        <ListItem>
          <Bold>keyless</Bold>：{tr('无需手动定义key，待翻译文本即key')}
        </ListItem>
      </UnorderedList>
    </>
  )
}
