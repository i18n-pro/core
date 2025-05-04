import React, { render } from 'jsx-to-md'
import {
  getTranslationText,
  getDocHref,
  getInterpolationVariable,
  getCustomKey,
  getTitleToA,
} from '../utils'
import FunctionTemplate from './FunctionTemplate'

function Description(props: { isDot?: boolean }) {
  const { isDot = false } = props

  return (
    <>
      {isDot
        ? tr(
            '获取{0}国际化文案',
            ` ${render(<code>{getCustomKey(true)}</code>)} `,
          )
        : tr('获取国际化文案')}
      <br />
      {tr(
        '内部会根据当前语言{0}从语言包{1}中获取{2}对应的{3}，未匹配到对应翻译内容会直接显示{4}本身内容',
        ` ${render(<code>locale</code>)} `,
        ` ${render(<code>langs</code>)} `,
        ` ${render(<code>{isDot ? 'key' : 'text'}</code>)} `,
        ` ${render(<code>{getTranslationText(true)}</code>)} `,
        ` ${render(<code>text</code>)} `,
      )}
    </>
  )
}

function getProps(isDot = false) {
  const extra = isDot
    ? {
        key: tr('自定义key'),
      }
    : {}

  return {
    ...extra,
    text: tr(
      '待翻译的文案，该文案需满足特定{0}',
      ` ${render(<a href={getDocHref('MATCH_RULE')}>{tr('匹配规则')}</a>)} `,
    ),
    args: tr(
      '表示{0}，没有个数限制，{1}文案中需要以{2}的形式来接收，{3}表示{4}的位置，从 0 开始（可在{5}中自定义起始值），第 1 个参数对应 0，对 2 个参数对应 1，以此往复',
      ` ${render(<code>{getInterpolationVariable(true)}</code>)} `,
      ` ${render(<code>text</code>)} `,
      ` ${render(<code>{'{index}'}</code>)} `,
      ` ${render(<code>index</code>)} `,
      ` ${render(<code>{getInterpolationVariable(true)}</code>)} `,
      ` ${render(<code>initI18n</code>)} `,
    ),
  }
}

export default function T() {
  return (
    <FunctionTemplate
      name="t"
      description={<Description />}
      type={`interface Translate {
  (text: string, ...args: Array&lt;string | number | unknown&gt;): string
  t: (
    key: string,
    text: string,
    ...args: Array&lt;string | number | unknown&gt;
  ) => string
  withLocale: (locale?: string) => Translate
}`}
      props={getProps()}
      property={[
        {
          headerId: 't.t',
          name: 't',
          description: <Description isDot />,
          type: `(
  key: string,
  text: string,
  ...args: Array&lt;string | number | unknown&gt;
) => string`,
          props: getProps(true),
        },
        {
          name: 'withLocale',
          description: (
            <>
              {tr('生成新的{0}函数', ` ${getTitleToA('t')} `)}
              <br />
              {tr('适用于服务端，每个接口响应需要做国际化的处理')}
            </>
          ),
          type: `(
  locale?: string,
) => Translate`,
          props: {
            locale: (
              <>
                {tr('指定当前语言')}
                <br />
                {tr('若未指定语言，则与生成前的语言保持一致')}
              </>
            ),
          },
        },
      ]}
    />
  )
}
