import { H1, Link, Image, Bold, List, render } from 'jsx-to-md'
import { linkObj, imageObj } from '../constants'
import {
  getCustomKey,
  getFormatterText,
  getPolysemyText,
  getTranslationTextKey,
  getTypeTag,
  getVariableInterpolation,
} from '../utils'

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
            <Bold>{tr('简单')}</Bold>：{tr('简单配置，快速启用')}
          </>,
          <>
            <Bold>{tr('灵活')}</Bold>：
            {tr(
              '支持{0}、以及独特的{1}和{2}',
              getVariableInterpolation(true),
              getTypeTag(true),
              getFormatterText(true),
            )}
          </>,
          [
            render(
              <>
                <Bold>{tr('自动翻译')}</Bold>：{tr('一键提取文案并生成语言包')}
              </>,
            ),
            [
              'U',
              <>
                <Bold>{tr('增量翻译')}</Bold>：
                {tr('只翻译新增文案，移除未使用文案')}
              </>,
              <>
                <Bold>{tr('多平台支持')}</Bold>：
                {`${tr('谷歌X')}、${tr('OpenAI')}、${tr('谷歌')}、${tr(
                  '微软',
                )}、${tr('腾讯')}、${tr('阿里云')}、${tr('有道')}、${tr(
                  '百度',
                )}${tr('等翻译平台')}`}
              </>,
              <>
                <Bold>{tr('翻译日志')}</Bold>：
                {tr('多种日志输出，便于追踪问题')}
              </>,
            ],
          ],
          render(
            <>
              <Bold>keyless</Bold>：
              {tr(
                '{0}，仅{1}时才需{2}',
                render(<Bold>{getTranslationTextKey(true)}</Bold>),
                getPolysemyText(true),
                getCustomKey(true),
              )}
            </>,
          ),
        ]}
      />
    </>
  )
}
