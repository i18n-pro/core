import { H1, Link, Image, Bold, List, render } from 'jsx-to-md'
import { linkObj, imageObj } from '../constants'

export default function Vision() {
  return (
    <>
      <H1>{tr('特性')}</H1>
      <List
        items={[
          'U',
          <>
            <Bold>{tr('轻量')}</Bold>：
            <Link {...linkObj.bundlesize}>
              <Image {...imageObj.bundlesize} />
            </Link>
          </>,
          <>
            <Bold>{tr('简单')}</Bold>：{tr('学习成本低，易上手')}
          </>,
          <>
            <Bold>{tr('灵活')}</Bold>：
            {tr(
              '支持动态参数、以及独特的类型标记和格式化回调（数字、货币、日期、时间、复数）',
            )}
          </>,
          [
            render(
              <>
                <Bold>{tr('自动翻译')}</Bold>：
                {tr('一个命令即可自动提取文本并翻译生成语言包')}
              </>,
            ),
            [
              'U',
              <>
                <Bold>{tr('支持增量翻译模式')}</Bold>：
                {tr('只翻译新增文本，智能移除未使用文本')}
              </>,
              <>
                <Bold>{tr('支持多翻译平台')}</Bold>：
                {`${tr('谷歌X')}、${tr('OpenAI')}、${tr('谷歌')}、${tr(
                  '微软',
                )}、${tr('腾讯')}、${tr('阿里云')}、${tr('有道')}、${tr(
                  '百度',
                )}`}
                （{tr('除{0}外，其他平台需自行注册账号', tr('谷歌X'))}）
              </>,
              <>
                <Bold>{tr('支持多种翻译日志')}</Bold>：
                {tr('多种类型翻译日志的输出，便于追踪与定位翻译问题')}
              </>,
            ],
          ],
          <>
            <Bold>keyless</Bold>：{tr('无需手动定义key，待翻译文本即key')}
          </>,
        ]}
      />
    </>
  )
}
