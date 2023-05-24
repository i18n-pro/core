import { H1, Link, render, TableOfContents } from 'jsx-to-md'
import {
  getDocHref,
  getInterpolationVariable,
  getIssueText,
  getTranslationText,
  initI18n,
} from '../utils'
import Template from './ChangeLog'

function V_1_0_0() {
  return (
    <Template
      version="1.0.0"
      date="2022-06-13"
      commandLine={{
        added: [
          'U',
          tr('新增{0}的基本实现', ` \`${tr('命令行工具')}\` `),
          tr('新增语言切换命令行参数'),
        ],
      }}
      api={{
        added: ['U', tr('新增{0}和{1}函数API', ' `i18n` ', ' `setI18N` ')],
      }}
    />
  )
}

function V_1_1_0() {
  return (
    <Template
      version="1.1.0"
      date="2022-06-25"
      commandLine={{
        changed: [
          'U',
          tr('配置项{0}已废弃，由{1}代替', ' `filterFile` ', ' `fileRegExp` '),
        ],
        added: [
          'U',
          tr('新增{0}配置项支持生成不同格式的语言包', ' `output.langType` '),
          tr(
            '新增{0}、{1}、{2}百度翻译的配置项',
            ' `from`',
            '`to`',
            '`codeLocaleMap` ',
          ),
          tr('新增{0}配置项支持自定义匹配函数名', ' `funcName` '),
        ],
        fixed: [
          'U',
          tr(
            '修复日志文件{0}在文案包含{1}的情况下格式错误',
            ' `translate-success.json` ',
            ' `.` ',
          ),
        ],
        removed: [
          'U',
          tr(
            '移除了{0}，{1}，{2}，{3}等依赖库',
            ' `got`',
            '`walk`',
            '`chalk`',
            '`lodash` ',
          ),
        ],
      }}
      docs={{
        added: ['U', tr('新增{0}说明文档', ' `README` ')],
      }}
    />
  )
}

function V_1_1_1() {
  return (
    <Template
      version="1.1.1"
      date="2022-06-25"
      docs={{
        fixed: ['U', tr('修复文档中图片不显示的问题')],
      }}
    />
  )
}

function V_1_2_0() {
  return (
    <Template
      version="1.2.0"
      date="2022-07-05"
      commandLine={{
        changed: [
          'U',
          [
            tr(
              '优化命令行不输命令只输参数{0}也能显示对应语言的提示',
              ' `-L` | `--locale` ',
            ),
            ['U', `npx i18n -L zh`, `npx i18n --locale zh`],
          ],
          tr(
            '优化翻译失败的输出日志{0}给出了失败具体原因',
            ' `translate-error.json` ',
          ),
          tr('调整百度翻译接口批量翻译的请求字符数上限为{0}', ' `3000`'),
        ],
        added: [
          'U',
          tr('新增翻译命令执行的耗时统计输出'),
          tr(
            '新增新的翻译日志类型{0}：配到的文件路径列表',
            ' `filepaths.json` ',
          ),
          [
            tr('新增{0}模式', ` \`${tr('增量翻译')}\` `),
            [
              'U',
              tr(
                '该模式默认开启，可通过命令参数{0}关闭',
                ' `--non-incremental` ',
              ),
              tr('支持只翻译目标语言未翻译过的文案'),
              tr('支持智能移除语言包中已翻译却未再使用的文案'),
            ],
          ],
          tr(
            '新增{0}配置属性，用于指定输出文件缩进空格数',
            ' `output.indentSize` ',
          ),
          tr(
            '新增{0}配置属性，用于设置百度翻译的延迟时间',
            ' `baiduConfig.delay` ',
          ),
          tr(
            '新增匹配规则约束：{0}中不能包含特殊字符{1}',
            getTranslationText(),
            ' `\\t`',
          ),
        ],
        fixed: [
          'U',
          tr(
            '修复{0}包含{1}特殊字符导致翻译异常',
            getTranslationText(),
            ' `\\t` ',
          ),
        ],
      }}
      api={{
        added: [
          'U',
          tr(
            '新增{0}函数参数属性{1}，用于指定{2}的起始下标',
            ' `setI18N` ',
            ' `beginIndex`',
            getInterpolationVariable(),
          ),
        ],
        fixed: [
          'U',
          tr('修复{0}设置单个属性会导致其他属性状态丢失', ' `setI18N` '),
        ],
      }}
      docs={{
        added: [
          'U',
          tr(
            '新增{0}文档说明',
            render(
              <Link href={getDocHref('OUTPUT_LOG')}>{tr('翻译日志')}</Link>,
            ),
          ),
        ],
      }}
    />
  )
}

function V_1_2_1() {
  return (
    <Template
      version="1.2.1"
      date="2022-07-07"
      commandLine={{
        fixed: [
          'U',
          tr('修复执行命令报错：{0}', "`Error: Cannot find module 'md5-node'`"),
        ],
      }}
    />
  )
}

function V_1_3_0() {
  return (
    <Template
      version="1.3.0"
      date="2022-09-13"
      commandLine={{
        changed: [
          'U',
          tr(
            '{0}由{1}改为{2}类型，{3}由{4}来标识',
            '`translate-error.json` ',
            `**${tr('翻译失败')}**`,
            `**${tr('翻译错误')}**`,
            `**${tr('翻译失败')}**`,
            ' `translate-fail.json` ',
          ),
        ],
        added: ['U', tr('添加新的日志输出类型：翻译有误的文案列表')],
        fixed: [
          'U',
          tr('修复{0}在多个语言切换时不生效', ' `baiduConfig.delay` '),
        ],
      }}
      api={{
        added: [
          'U',
          tr('添加{0}函数API用于支持服务端场景', ' `withI18N` '),
          [
            tr(
              '添加{0}类型标记和类型格式化回调函数',
              getInterpolationVariable(),
            ),
            [
              'U',
              tr(
                '支持 数字、货币、日期、时间、复数 等类型的{0}标记',
                getInterpolationVariable(),
              ),
              tr(
                '{0}添加了{1}、{2}、{3}、{4}、{5}等属性',
                '`setI18N` ',
                ' `formatNumber`',
                '`formatCurrency`',
                '`formatDate`',
                '`formatTime`',
                '`formatPlural` ',
              ),
            ],
          ],
        ],
      }}
    />
  )
}

function V_1_3_1() {
  return (
    <Template
      version="1.3.1"
      date="2022-09-21"
      commandLine={{
        fixed: [
          'U',
          getIssueText(tr('修复初始化命令在 Windows 系统中报异常'), {
            issue: 1,
          }),
        ],
      }}
    />
  )
}

function V_1_3_2() {
  return (
    <Template
      version="1.3.2"
      date="2022-09-24"
      commandLine={{
        fixed: [
          'U',
          getIssueText(
            tr(
              '修复在 Windows 系统中执行翻译命令后会意外生成类{0}文件夹',
              ' `xxx.jso` ',
            ),
            {
              issue: 2,
            },
          ),
        ],
      }}
    />
  )
}

function V_2_0_0() {
  return (
    <Template
      version="2.0.0"
      date="2023-0x-xx"
      commandLine={{
        changed: [
          'U',
          tr('设置命令行语言默认为英文'),
          tr('调整命令行初始化默认配置模板'),
        ],
        added: [
          'U',
          tr('新增翻译执行后，控制台输出内容对不同日志类型的数量统计显示'),
          [
            tr('新增如下翻译平台的支持'),
            [
              'U',
              tr('谷歌X'),
              'OpenAI',
              tr('谷歌'),
              tr('微软'),
              tr('阿里云'),
              tr('腾讯'),
              tr('有道'),
            ],
          ],
          tr(
            '初始化命令和翻译命令添加{0}参数，用于支持灵活指定配置文件路径',
            ' `-P` | `--path` ',
          ),
        ],
        fixed: [
          'U',
          tr(
            '修复当{0}和{1}不同时，识别已翻译的语言包错误，最终导致重复翻译',
            ' `' + tr('语言代码') + '` ',
            ' `locale` ',
          ),
        ],
      }}
      api={{
        changed: [
          'U',
          [
            tr('调整API命名'),
            [
              'U',
              [
                tr('遵循小驼峰命名规则'),
                ['U', '`setI18N` → `setI18n`', '`withI18N` → `withI18n`'],
              ],
              [tr('更简洁'), ['U', '`i18n` → `t`']],
            ],
          ],
          [
            tr('调整{0}用法', ' `setI18n` '),
            [
              'U',
              tr(
                '{0}函数只能动态修改{1}和{2}，其他的属性均由{3}首次调用定义，后续不可更改',
                ' `setI18n` ',
                ' `locale` ',
                ' `langs` ',
                ' `initI18n` ',
              ),
              tr('增加返回参数，会返回当前命名空间下的所有配置状态'),
            ],
          ],
        ],
        added: [
          'U',
          [
            tr('添加对命名空间的支持'),
            [
              'U',
              tr(
                '新增{0}函数用于获取原有的核心的{1}、{2}、{3}函数',
                ' `initI18n` ',
                ' `t` ',
                ' `setI18n` ',
                ' `withI18n` ',
              ),
              tr('新增{0}属性用于支持命名空间', ' `namespace` '),
            ],
          ],
        ],
      }}
      docs={{
        changed: [
          'U',
          tr(
            '更新{0}文档格式，将独立区分{1}、{2}、{3}更新的内容',
            ' `Changelog` ',
            ` \`${tr('命令行工具')}\` `,
            ' `API` ',
            ` \`${tr('文档')}\` `,
          ),
        ],
        added: ['U', tr('新增英文文档，并设置为默认语言文档')],
        fixed: [
          'U',
          tr('修复{0}文档中相同标题生成的目录锚点导航异常', ' `Changelog` '),
        ],
      }}
    />
  )
}

export default function ChangeLog(props) {
  initI18n(props)

  return (
    <>
      <H1 skip>{tr('更新日志')}</H1>
      <TableOfContents text={tr('目录')} open={false} />
      <V_2_0_0 />
      <V_1_3_2 />
      <V_1_3_1 />
      <V_1_3_0 />
      <V_1_2_1 />
      <V_1_2_0 />
      <V_1_1_1 />
      <V_1_1_0 />
      <V_1_0_0 />
    </>
  )
}
