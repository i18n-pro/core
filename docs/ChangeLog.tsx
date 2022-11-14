import React, {
  H1,
  H2,
  H3,
  Link,
  ListItem,
  render,
  UnorderList,
} from 'jsx-to-md'

function VersionTitle({ version, date }: { version: string; date: string }) {
  return <H2>{`[${version}] - ${date}`}</H2>
}

enum ChangeType {
  Added = 'Added',
  Changed = 'Changed',
  Deprecated = 'Deprecated',
  Removed = 'Removed',
  Fixed = 'Fixed',
  Security = 'Security',
}

const ChangeTypeImpl = ({ type }: { type: ChangeType }) => <H3>{type}</H3>
const Added = () => <ChangeTypeImpl type={ChangeType.Added} />
const Changed = () => <ChangeTypeImpl type={ChangeType.Changed} />
// const Deprecated = () => <ChangeTypeImpl type={ChangeType.Deprecated} />
const Removed = () => <ChangeTypeImpl type={ChangeType.Removed} />
const Fixed = () => <ChangeTypeImpl type={ChangeType.Fixed} />
// const Security = () => <ChangeTypeImpl type={ChangeType.Security} />

function V_1_0_0() {
  return (
    <>
      <VersionTitle version="1.0.0" date="2022-06-13" />
      <Added />
      <UnorderList>
        <ListItem>{tr('新增语言切换命令行参数')}</ListItem>
        <ListItem>
          {tr('新增{0}和{1}函数API', ' `i18n` ', ' `setI18N` ')}
        </ListItem>
        <ListItem>
          {tr('新增{0}的基本实现', ` \`${tr('命令行工具')}\` `)}
        </ListItem>
      </UnorderList>
    </>
  )
}

function V_1_1_0() {
  return (
    <>
      <VersionTitle version="1.1.0" date="2022-06-25" />
      <Added />
      <UnorderList>
        <ListItem>{tr('新增{0}说明文档', ' `README` ')}</ListItem>
        <ListItem>
          {tr('新增{0}配置项支持生成不同格式的语言包', ' `output.langType` ')}
        </ListItem>
        <ListItem>
          {tr(
            '新增{0}、{1}、{2}百度翻译的配置项',
            ' `from`',
            '`to`',
            '`codeLocaleMap` ',
          )}
        </ListItem>
        <ListItem>
          {tr('新增{0}配置项支持自定义匹配函数名', ' `funcName` ')}
        </ListItem>
      </UnorderList>
      <Changed />
      <UnorderList>
        <ListItem>
          {tr('配置项{0}已废弃，由{1}代替', ' `filterFile` ', ' `fileRegExp` ')}
        </ListItem>
      </UnorderList>
      <Removed />
      <UnorderList>
        <ListItem>
          {tr(
            '移除了{0}，{1}，{2}，{3}等依赖库',
            ' `got`',
            '`walk`',
            '`chalk`',
            '`lodash` ',
          )}
        </ListItem>
      </UnorderList>
      <Fixed />
      <UnorderList>
        <ListItem>
          {tr(
            '修复日志文件{0}在文本包含{1}的情况下格式错误',
            '（translate-success.json）',
            ' `.` ',
          )}
        </ListItem>
      </UnorderList>
    </>
  )
}

function V_1_1_1() {
  return (
    <>
      <VersionTitle version="1.1.1" date="2022-06-25" />
      <Fixed />
      <UnorderList>
        <ListItem>{tr('修复文档中图片不显示的问题')}</ListItem>
      </UnorderList>
    </>
  )
}

function V_1_2_0() {
  return (
    <>
      <VersionTitle version="1.2.0" date="2022-07-05" />
      <Added />
      <UnorderList>
        <ListItem>{tr('新增翻译命令执行的耗时统计输出')}</ListItem>
        <ListItem>
          {tr(
            '新增{0}文档说明以及新的输出日志类型：配到的文件路径列表',
            render(<Link href={`#${tr('输出日志')}`}>{tr('输出日志')}</Link>),
          )}
        </ListItem>
        <ListItem>
          {tr('新增{0}模式', ` \`${tr('增量翻译')}\` `)}
          <UnorderList level={2}>
            <ListItem>
              {tr(
                '该模式默认开启，可通过命令参数{0}关闭',
                ' `--non-incremental` ',
              )}
            </ListItem>
            <ListItem>{tr('支持只翻译目标语言未翻译过的文本')}</ListItem>
            <ListItem>
              {tr('支持智能移除语言包中已翻译却未再使用的文本')}
            </ListItem>
          </UnorderList>
        </ListItem>
        <ListItem>
          {tr(
            '新增{0}函数参数属性{1}，用于指定动态参数的起始下标',
            ' `setI18N` ',
            ' `beginIndex`',
          )}
        </ListItem>
        <ListItem>
          {tr(
            '新增{0}配置属性，用于指定输出文件缩进空格数',
            ' `output.indentSize` ',
          )}
        </ListItem>
        <ListItem>
          {tr(
            '新增{0}配置属性，用于设置百度翻译的延迟时间',
            ' `baiduConfig.delay` ',
          )}
        </ListItem>
        <ListItem>
          {tr('新增匹配规则约束：翻译文本中不能包含特殊字符{0}', ' `\\t`')}
        </ListItem>
      </UnorderList>
      <Changed />
      <UnorderList>
        <ListItem>
          {tr(
            '优化命令行不输命令只输参数{0}也能显示对应语言的提示',
            ' `-L` | `--locale` ',
          )}
          <UnorderList level={2}>
            <ListItem>{'`npx i18n -L en`'}</ListItem>
            <ListItem>{'`npx i18n --locale en`'}</ListItem>
          </UnorderList>
        </ListItem>
        <ListItem>
          {tr(
            '优化翻译失败的输出日志{0}给出了失败具体原因',
            '（`translate-error.json`）',
          )}
        </ListItem>
        <ListItem>
          {tr('调整百度翻译接口批量翻译的请求字符数上限为{0}', ' `3000`')}
        </ListItem>
      </UnorderList>
      <Fixed />
      <UnorderList>
        <ListItem>
          {tr('修复{0}设置单个属性会导致其他属性状态丢失', ' `setI18N` ')}
        </ListItem>
        <ListItem>
          {tr('修复翻译文本包含{0}特殊字符导致翻译异常', ' `\\t` ')}
        </ListItem>
      </UnorderList>
    </>
  )
}

function V_1_2_1() {
  return (
    <>
      <VersionTitle version="1.2.1" date="2022-07-07" />
      <Fixed />
      <UnorderList>
        <ListItem>
          {tr(
            '修复执行命令报错：{0}',
            "`Error: Cannot find module 'md5-node'`",
          )}
        </ListItem>
      </UnorderList>
    </>
  )
}

function V_1_3_0() {
  return (
    <>
      <VersionTitle version="1.3.0" date="2022-09-13" />
      <Added />
      <UnorderList>
        <ListItem>{tr('添加新的日志输出类型：翻译有误的文本列表')}</ListItem>
        <ListItem>
          {tr('添加{0}函数API用于支持服务端场景', ' `withI18N` ')}
        </ListItem>
        <ListItem>
          {tr('添加动态参数类型标记和类型格式化回调函数')}
          <UnorderList level={2}>
            <ListItem>
              {tr('支持 数字、货币、日期、时间、复数 等类型的动态参数标记')}
            </ListItem>
            <ListItem>
              {tr(
                '{0}添加了{1}、{2}、{3}、{4}、{5}等属性',
                '`setI18N` ',
                ' `formatNumber`',
                '`formatCurrency`',
                '`formatDate`',
                '`formatTime`',
                '`formatPlural` ',
              )}
            </ListItem>
          </UnorderList>
        </ListItem>
      </UnorderList>
      <Changed />
      <UnorderList>
        <ListItem>
          {tr(
            '{0}由{1}改为{2}类型，{3}由{4}来标识',
            '`translate-error.json` ',
            `**${tr('翻译失败')}**`,
            `**${tr('翻译错误')}**`,
            `**${tr('翻译失败')}**`,
            ' `translate-fail.json` ',
          )}
        </ListItem>
      </UnorderList>
      <Fixed />
      <UnorderList>
        <ListItem>
          {tr('修复{0}在多个语言切换时不生效', ' `baiduConfig.delay` ')}
        </ListItem>
      </UnorderList>
    </>
  )
}

function V_1_3_1() {
  return (
    <>
      <VersionTitle version="1.3.1" date="2022-09-21" />
      <Fixed />
      <UnorderList>
        <ListItem>{tr('修复初始化命令在 Windows 系统中报异常')}</ListItem>
      </UnorderList>
    </>
  )
}

function V_1_3_2() {
  return (
    <>
      <VersionTitle version="1.3.2" date="2022-09-24" />
      <Fixed />
      <UnorderList>
        <ListItem>
          {tr(
            '修复在 Windows 系统中执行翻译命令后会意外生成类{0}文件夹',
            ' `xxx.jso` ',
          )}
        </ListItem>
      </UnorderList>
    </>
  )
}

function V_1_4_0() {
  return (
    <>
      <VersionTitle version="1.4.0" date="2022-xx-xx" />
      <Added />
      <UnorderList>
        <ListItem>{tr('新增英文文档，并设置为默认文档')}</ListItem>
        <ListItem>
          {tr(
            '初始化命令和翻译命令添加{0}参数，用于支持灵活指定配置文件路径',
            ' `-P` | `--path` ',
          )}
        </ListItem>
      </UnorderList>
      <Changed />
    </>
  )
}

export default function ChangeLog() {
  return (
    <>
      <H1>{tr('更新日志')}</H1>
      <V_1_4_0 />
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
