<div align="center" style="background:transparent;">

  [![logo][logo-image]][github-url]

  <p>轻量、简单、灵活的自动翻译工具</p>

  [![NPM version][npm-image]][npm-url]
  [![NPM downloads][download-image]][npm-url]
  [![][quality-score-image]][npm-url]
  [![][bundlesize-js-image]][bundlephobia-url]
  [![][dependenices-image]][dependenices-url]
  [![][github-starts-image]][github-starts-url]
  [![][last-commit-image]][last-commit-url]
  [![][github-issues-image]][github-issues-url]
  [![codecov][codecov-image]][codecov-url]
  [![Total alerts][lgtm-alerts-image]][lgtm-alerts-url]
  [![Language grade: JavaScript][lgtm-quality-image]][lgtm-quality-url]
</div>

<!--这里使用的是https://www.imgurl.org/作为图床-->
[demo-image]: https://s3.bmp.ovh/imgs/2022/06/25/4412a87c79ba36a8.gif
[logo-image]: https://s3.bmp.ovh/imgs/2022/06/25/3a1c742f283cf28e.png
[github-url]: https://github.com/eyelly-wu/i18n-pro
[npm-image]: https://img.shields.io/npm/v/i18n-pro.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/i18n-pro
[download-image]: https://img.shields.io/npm/dm/i18n-pro
[quality-score-image]: https://img.shields.io/npms-io/quality-score/i18n-pro
[bundlesize-js-image]: https://img.shields.io/bundlephobia/minzip/i18n-pro?color=brightgreen&style=plastic
[bundlephobia-url]: https://bundlephobia.com/package/i18n-pro
[dependenices-image]: https://img.shields.io/librariesio/release/npm/i18n-pro
[dependenices-url]: https://www.npmjs.com/package/i18n-pro?activeTab=dependencies
[github-starts-image]: https://img.shields.io/github/stars/eyelly-wu/i18n-pro?style=social
[github-starts-url]: https://github.com/eyelly-wu/i18n-pro/stargazers
[last-commit-image]: https://img.shields.io/github/last-commit/eyelly-wu/i18n-pro
[last-commit-url]: https://github.com/eyelly-wu/i18n-pro/commits/main
[github-issues-image]: https://img.shields.io/github/issues-raw/eyelly-wu/i18n-pro
[github-issues-url]: https://github.com/eyelly-wu/i18n-pro/issues
[baidu-api-type-url]: https://fanyiapp.cdn.bcebos.com/api/doc/%E7%99%BE%E5%BA%A6%E7%BF%BB%E8%AF%91%E5%BC%80%E6%94%BE%E5%B9%B3%E5%8F%B0%E9%80%9A%E7%94%A8%E7%BF%BB%E8%AF%91API%E6%9C%8D%E5%8A%A1%E5%8D%87%E7%BA%A7%E8%AF%B4%E6%98%8E.pdf
[codecov-image]: https://codecov.io/gh/eyelly-wu/i18n-pro/branch/main/graph/badge.svg?token=758C46SIE7
[codecov-url]: https://codecov.io/gh/eyelly-wu/i18n-pro
[lgtm-alerts-image]: https://img.shields.io/lgtm/alerts/g/eyelly-wu/i18n-pro.svg?logo=lgtm&logoWidth=18
[lgtm-alerts-url]: https://lgtm.com/projects/g/eyelly-wu/i18n-pro/alerts/
[lgtm-quality-image]: https://img.shields.io/lgtm/grade/javascript/g/eyelly-wu/i18n-pro.svg?logo=lgtm&logoWidth=18
[lgtm-quality-url]: https://lgtm.com/projects/g/eyelly-wu/i18n-pro/context:javascript


# 愿景
为了让接入国际化成为轻松且愉快的事😄💪🏻

# 特性
* 轻量：[![][bundlesize-js-image]][bundlephobia-url]
* 简单：学习成本低，易上手
* 灵活：支持动态参数、以及独特的类型标记和格式化回调（数字、货币、日期、时间、复数）
* 自动翻译：一个命令即可自动提取文本并翻译生成语言包
* keyless：无需手动定义key，待翻译文本即key

# Live Demo
* [Open in CodeSandbox](https://codesandbox.io/p/github/eyelly-wu/i18n-pro-react-demo/main)
* [![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz_small.svg)](https://stackblitz.com/edit/i18n-pro-react-demo)

# 原理

该库主要由两部分构成
* 命令行工具
* 函数API

**命令行工具**：根据指定规则解析出需要翻译的文本，并通过翻译平台将文本翻译到指定目标语言，最后生成语言包文件

解析文本的[匹配规则](#匹配规则)简易示例如下
```js
// 普通字符串
i18n('xxx')
i18n("xxx")
i18n(`xxx`)

// 支持动态参数
i18n('xxx{0}xxx', param1)
i18n('xxx{0}xxx{1}xxx{2}xxx', param1, param2, param3)

// 动态参数类型标记
i18n('用户数达到了{n0}', 100000000) // 数字类型
i18n('售价为{c0}', 14999) // 货币类型
i18n('今天的日期是{d0}', new Date()) // 日期类型
i18n('当前时间：{t0}', new Date()) // 时间类型
i18n('我有{p0个苹果}，{p1个香蕉}和{p2个梨}', 5, 4, 3) // 复数类型
```
**函数API**：将国际化语言包接入到项目中，由 `i18n`、`setI18N` 和 `withI18N` 构成

* **i18n**：用于包裹被翻译文本实现国际化，也作为命令行匹配翻译文本规则的标识
* **setI18N**：设置语言、语言包及其他配置项
* **withI18N**: 适用于服务端，每个接口响应需要做国际化的处理

所以 `命令行工具` 和 `函数API` 这两者搭配使用效果更佳，也正是由于这样的结构设计，使得 `i18n-pro` 库可以很方便集成到任何的 `JavaScript` 项目中

# 用法
## 1. 安装
```bash
npm i i18n-pro
# 或者
yarn add i18n-pro
# 或者
pnpm i i18n-pro
```
## 2. 接入函数API
📢📢📢：这一步主要是用 `i18n` 函数包裹需要被翻译的文本
> `函数API` 是以 `UMD` 形式来构建的，通过 `import` 或者 `require` 的方式都能引入，本文档中主要以 `import` 来举例说明
### 挂载全局对象的形式
#### 引用函数
```js
import { setI18N, i18n } from 'i18n-pro'

// 需要在应用页面渲染逻辑之前
// 浏览器环境，注意：如果是Node环境需要将window替换成global
window.setI18N = setI18N
window.i18n = i18n
// 后续才是应用的页面渲染逻辑
```
#### 用 `i18n` 包裹需要翻译的文本
```js
// 被翻译的文本
const text = i18n('你好世界')
```
### 模块化引入的形式
跟挂载全局对象的唯一区别就是每个模块都需要单独引入，其他使用并无差别
```js
import { setI18N, i18n } from 'i18n-pro'
// 就是每个模块都需上面这样引入

// 被翻译的文本
const text = i18n('你好世界')
```
## 3. 初始化命令行配置文件
在命令行终端输入如下命令，[更多命令](#命令列表)
```bash
npx i18n init
```
然后会在当前目录下生成一个 `i18nrc.js` 的文件
## 4. 调整 `i18nrc.js` 配置
根据需求自行调整配置文件中的配置项，配置项的[说明](#命令行)
## 5. 执行翻译命令
```bash
npx i18n t
```
命令执行成功的话，会在指定的目录下生成语言包文件
## 6. 引入语言包文件
语言包已经有了，就需要应用到项目中了

如果生成的语言包是每个语言单独文件形式（`output.langType == 'multiple'`），操作如下：
```js
import en from './i18n/en.json'
import jp from './i18n/jp.json'
// .. 其他更多语言

setI18N({
  locale: 'en',
  langs:{
    en,
    jp,
    // ...其他更多语言
  },
})
// 后续是应用页面渲染逻辑
```
如果生成的语言包是聚合的形式（`output.langType == 'single'`），操作如下：
```js
import langs from './i18n/langs.json'

setI18N({
  locale: 'en',
  langs,
})
// 后续是应用页面渲染逻辑
```
至此，项目已经完全接入了国际化，上面 `locale` 指定为目标语言中任意一个，在页面上就能看到翻译好的内容了。后续如果项目中有新增的翻译文本（需要用 `i18n` 函数包裹哟），就仅仅需要再次执行翻译命令 `npx i18n t` 生成最新的语言包就可以了
## 7. 切换语言
正常情况下，执行如下方法就行，但是页面上已渲染的内容不会再更新，只有等对应文本的 `i18n` 函数重新执行，才有可能显示新语言对应的文本
```js
setI18N({
  locale: 'en', // 设置指定语言
})
```
尽管有的 UI库（例如 `React`）可以利用它的 `context` 特性做到静态更新页面内容，但是对于不在组件内部的翻译文本内容，要做到静态更新也会有额外的处理成本，例如下面的这种场景，组件内使用了外部包含翻译内容的属性
```js
// 这个属性要做到静态更新，需要额外处理
// 这里只是说明存在这种情况，不给出明确解决方案
const FOO_TEXT = i18n('静态文本属性')

function App(){
  return (
    <>
      {FOO_TEXT}
    </>
  )
}
```
因此对于大部分的场景，在页面上切换语言时，建议**直接刷新**整个页面（如果还有好的方案请告知🤔）
## 8. DEMO
哈哈哈，除了上面的 [Live Demo](#live-demo)，当前库 `命令行工具` 的控制台输出也接入了国际化<br/>
通过命令 `npx i18n h -L en` 就能看英文版了<br/>
![图片][demo-image]<br/>
感兴趣的同学，可以看看源码
# 命令行
## 1. `i18nrc.js` 配置
### 基础配置
|    名称     |            类型             | 是否必设 |    默认值    | 说明                                                                                                                 |
| :---------: | :-------------------------: | :------: | :----------: | -------------------------------------------------------------------------------------------------------------------- |
|  funcName   |           string            |    否    |     i18n     | 命令行匹配翻译文本的函数名<br/><br/>如果在使用 `i18n` 函数没有重命名，这里不需要调整，否则这里配置为重命名后的函数名 |
|    entry    |           string            |    是    |      -       | 指定翻译文件目录（绝对路径）                                                                                         |
| fileRegExp  |           RegExp            |    否    | `/\.[jt]s$/` | 匹配文件名的正则表达式<br/><br/>用于筛选需要被翻译的文件                                                             |
|   output    |      [Output](#output)      |    是    |      -       | 输出文件相关的配置                                                                                                   |
| baiduConfig | [BaiduConfig](#baiduconfig) |    是    |      -       | 百度翻译相关的配置                                                                                                   |
### Output
输出文件的配置
|    名称    |          类型          | 是否必设 |   默认值   | 说明                                                                                                                                                                                                                                                                                                                         |
| :--------: | :--------------------: | :------: | :--------: | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|    path    |         string         |    是    |     -      | 语言包生成的目录（绝对路径）                                                                                                                                                                                                                                                                                                 |
|  langType  | 'single' \| 'multiple' |    否    | 'multiple' | 输出语言包文件的形式<br/><br/>假设目标语言是 `['en', 'jp']`<br/>**single** 只会生成一个聚合的语言包文件 `langs.json`，格式如下：<br/> `{ "en":{ "xxx":"xxx" }, "jp":{ "xxx":"xxx" } }` <br/><br/> **multiple** 每个目标语言都会生成对应的语言包文件，对应两个文件：`en.json`， `jp.json` ，格式如下：<br/> `{ "xxx":"xxx" }` |
| indentSize |         number         |    否    |     2      | 语言包文件的缩进空格数                                                                                                                                                                                                                                                                                                       |
### BaiduConfig
百度翻译的配置
|     名称      |         类型          | 是否必设 | 默认值 | 说明                                                                                                                                                                                                                                                                       |
| :-----------: | :-------------------: | :------: | :----: | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|     appid     |        string         |    是    |   -    | APPID，需要[注册账号](http://api.fanyi.baidu.com/doc/21 '文档中有指导说明')申请                                                                                                                                                                                            |
|      key      |        string         |    是    |   -    | 密钥，要求同上                                                                                                                                                                                                                                                             |
|     from      |        string         |    是    |   -    | 被翻译文本的语言代码（例如中文的是 `zh`，英语的是 `en`），[更多语言](http://api.fanyi.baidu.com/doc/21 '搜索"语种列表"')，搜索**语种列表**                                                                                                                                 |
|      to       |       string[]        |    是    |   -    | 翻译的目标语言代码，格式同上<br/><br/>📢📢📢：如果目标语言配置为 `['en']`，那么生成的文件名（`output.langType=='multiple'`时）就是 `en.json`，设置语言时的 `locale` 也必须是 `'en'`，如果需要 `locale` 设置为 `'en_US'` 这种，就需要配合 `codeLocaleMap` 来使用               |
| codeLocaleMap | Record<string,string> |    否    |   {}   | 设置语言代码与 `locale` 的映射关系<br/><br/>例如目标语言为 `['en']`，想设置 `locale` 的值为 `'en_US'`，那么需要配置 `codeLocaleMap` 为 `{ 'en' : 'en_US' }`，最终生成的文件名（`output.langType=='multiple'`时）也会变成 `en_US.json`                                      |
|     delay     |        number         |    否    |   0    | 接口调用延迟时长（单位:秒）<br/><br/>百度翻译平台根据不同[API服务类型][baidu-api-type-url]，对每秒请求数有限制，如果当前APPID只有1个用户使用，那么**普通版**可以设置为1，**高级版**和**尊享版**可不用设置；如果当前APPID多个用户同时在使用，`delay` 值越大接口越不容易报错 |
## 2. 命令
### 命令列表
|   命令    | 简写  | 用法                                    | 说明                               |
| :-------: | :---: | --------------------------------------- | ---------------------------------- |
|   init    |   -   | `npx i18n init`                         | 初始化配置文件                     |
| translate |   t   | `npx i18n translate` <br/> `npx i18n t` | 提取翻译文本，自动翻译并生成语言包 |
|  version  |   v   | `npx i18n version` <br/> `npx i18n v`   | 显示版本信息                       |
|   help    |   h   | `npx i18n help` <br/> `npx i18n h`      | 显示帮助信息                       |

### 命令参数
|      参数名       | 简写  |   参数值    | 适用命令                       | 用法                                                              | 说明                                                                                                                                             |
| :---------------: | :---: | :---------: | ------------------------------ | ----------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
|     --locale      |  -L   | en    \| zh | ALL                            | `npx i18n h -L en`<br/> `npx i18n h  --locale en`                 | 指定命令行显示语言<br/><br/>可选语言有中文（zh）/ 英文（en）， 默认为中文（zh）                                                                  |
| --non-incremental |   -   |      -      | `t` <br/> `translate`          | `npx i18n t --non-incremental`                                    | 关闭增量翻译模式<br/><br/> ⚠️⚠️⚠️：关闭增量翻译模式后，所有的文本会重新翻译，会导致**手工翻译**（非翻译平台翻译的）的文本丢失，需慎重考虑使用！！！ |
|      --path       |  -P   |      -      | `init`<br/>`t`<br/>`translate` | `npx i18n init -P /xxx/xxx/xxx`<br/> `npx i18n t -P /xxx/xxx/xxx` | 指定配置文件路径（参数为绝对路径）<br/><br/>只需要指定路径名，配置文件名默认为 `i18nrc.js`                                                       |
# 函数API
## 函数列表
下面的类型是以 `TypeScript` 语法来表示的
|  函数名  | 类型                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | 说明                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| :------: | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|   i18n   | (<br/>&nbsp;&nbsp;&nbsp;&nbsp;text: string, <br/>&nbsp;&nbsp;&nbsp;&nbsp;...args: Array<string \| number \| unknow><br/>) => string                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | 获取国际化文本<br/><br/>内部会根据当前语言（`locale`）从语言包中（`langs`）获取 `text` 对应的翻译文本，未匹配到对应翻译内容会直接显示 `text` 本身内容<br/>**text**：待翻译的文本<br/>**args**：表示动态参数，没有个数限制，`text` 文本中需要以 `{index}` 的形式来接收，`index` 表示动态参数的位置，从 0 开始（可在 `setI18N` 中自定义起始值），第1个参数对应 0，对2个参数对应1，以此往复 <br/><br/> 例如：`i18n('这个男人叫{0}，意外获得了超能力，这个女人叫{1}，意外被{2}追杀，这个小孩叫{3}，意外遭遇了意外', '小帅', '小美', 'FBI', '小白')`<br/> 当前语言的执行结果是：这个男人叫小帅，意外获得了超能力，这个女人叫小美，意外被FBI追杀，这个小孩叫小白，意外遭遇了意外<br/>百度翻译成英语的结果是：The man's name is 小帅, and he accidentally obtained super power. The woman's name is 小美, and she was accidentally chased by FBI. The child's name is 小白, and she was accidentally hit by an accident |
| setI18N  | (<br/>&nbsp;&nbsp;&nbsp;&nbsp;props: {<br/> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;locale?: string,<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;langs?: Record<strng, Record<string, string>>,<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;beginIndex?: number,<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;formatNumber?: [FormatFunc](#fortmatfunc),<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;formatCurrency?: [FormatFunc](#fortmatfunc),<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;formatDate?: [FormatDateFunc](#formatdatefunc),<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;formatTime?: [FormatFunc](#formatdatefunc),<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;formaPlural?: [FormatPluralFunc](#formatpluralfunc),<br/>&nbsp;&nbsp;&nbsp;&nbsp;}<br/>) => void | 设置语言、语言包及其他配置项<br/><br/> **locale**：指定当前语言<br/>**langs**：设置当前语言包<br/>**beginIndex**：设置 `i18n` 函数中动态参数起始下标，默认为0<br/>**formatNumber**：格式化数字类型动态参数的回调，对应的类型标记是 **n** 或 **N**，<br/>**formatCurrency**：格式化货币类型动态参数的回调，对应的类型标记是 **c** 或 **C**<br/>**formatDate**：格式化日期类型动态参数的回调，对应的类型标记是 **d** 或 **D**<br/>**formatTime**：格式化时间类型动态参数的回调，对应的类型标记是 **t** 或 **T**<br/>**formatPlural**：格式化复数类型动态参数的回调，对应的类型标记是 **p** 或 **P**<br/><br/>📢📢📢：`locale` 的值默认跟语言代码相对应，如需自定义，需参考 `codeLocaleMap` 的用法<br/>                                                                                                                                                                                                                |
| withI18N | (<br/>&nbsp;&nbsp;&nbsp;&nbsp;props:{<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;locale: string<br/>&nbsp;&nbsp;&nbsp;&nbsp;}<br/>) => ({ i18n })                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | 获取独立于主程序的i18n函数<br/><br/>适用于服务端，每个接口响应需要做国际化的处理                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
## 函数类型
### FortmatFunc
通用的格式化回调类型
```typescript
type FormatFunc = <T>(props:{
  locale: string, // 当前语言
  payload: string | number | unknow | T, // 动态参数
}) => number | string
```
### FormatDateFunc
日期（时间）的格式化回调函数类型
```typescript
type FormatPluralFunc = <T>(props:{
  locale: string, // 当前语言
  payload: string | number | Date | unknow | T, // 动态参数
}) => string
```
### FormatPluralFunc
复数的格式化回调函数类型
```typescript
type FormatPluralFunc = <T>(props:{
  locale: string, // 当前语言
  payload: string | number | unknow | T, // 动态参数
  text: string // 默认将量词和名词组合起来的字符串，不需要复数处理的语言可以直接返回该属性
  keyword: string // 复数关键词
}) => string
```

# 匹配规则
要求：
+ `i18n` 函数第一个参数只能是纯字符串，不能包含变量，或者js语句
+ 不能包含 `\n`、`\t` 等特殊字符
+ 开始和结尾不能包含空格
+ 如果用字符串模块语法不能换行

不满足上面条件，可能会导致
+ 翻译文本提取不正确
+ 翻译结果不正确

以下是可以匹配到的
```js
i18n('xxx')
i18n("xxx")
i18n(`xxx`)
```
以下是不会被匹配到的
```js
const foo = 'foo'
const fooFunc = (x:string) => x

// 不满足纯字符串
i18n(foo)
i18n('xxx'+foo)
i18n(`${foo}`)
i18n(fooFunc(foo))

// 包含 \n 或者 \t
i18n('x\nx')
i18n('x\tx')

// 前后包含空格
i18n(' xxx')
i18n('xxx  ')
i18n(' xxx ')

// 字符串模板中有换行
i18n(`
xxx
`)
```
如果需要拼接字符串，可以用动态参数
```js
i18n('我叫{0}，今年{1}岁，来自{2}，是一名{3}', '王尼玛', '22', '火星', '码农')
```

# 输出日志
为了方便追踪与定位问题，整个翻译过程中会有一些必要的日志输出，翻译命令执行完全后会在 `output.path` 目录下生成一个 `.log` 的日志目录，所有的日志是以独立文件的形式呈现，包含日志类型如下：
| 文件名                 | 描述                                                                                                           |
| ---------------------- | -------------------------------------------------------------------------------------------------------------- |
| filepaths.json         | 配到的文件路径列表                                                                                             |
| texts-error.json       | 提取到所有不符合要求的翻译文本<br/><br/> 📢📢📢：不包含使用变量、js语句等场景                                     |
| texts.json             | 提取到所有符合要求的翻译文本                                                                                   |
| translate-fail.json    | 翻译失败的文本列表                                                                                             |
| translate-error.json   | 翻译有误的文本列表<br/><br/>当前可以识别出动态参数翻译后丢失的异常                                             |
| translate-success.json | 翻译成功的文本列表<br/><br/>📢📢📢：只会包含本次翻译的文本，增量翻译模式下，原来已翻译过的文本不会包含在其中      |
| langCode.json          | 某个目标语言独立的语言包<br/><br/> 当 `output.langType == 'single'` 时，会在日志目录下生成目标语言单个的语言包 |
| langs.json             | 聚合的语言包<br/><br/> 当 `output.langType == 'multiple'` 时，会在日志目录下生成聚合的语言包                   |
# Q&A
## 1. 动态参数（插值变量）为什么不支持对象属性解析？
示例代码
```js
// 对象属性解析
i18n('我叫{name}，今年{age}岁，来自{base}，是一名{job}', {
  name: '王尼玛',
  age: 22,
  base: '火星',
  job: '码农',
})

// 当前库的下标解析
i18n('我叫{0}，今年{1}岁，来自{2}，是一名{3}',
  '王尼玛',
  '22',
  '火星',
  '码农',
)
```
主要原因是文本中包含属性名，不利于通过第三方平台翻译，上面的示例中文翻译英文还OK，如果是英文翻译到中文或其他语言，动态参数中的属性名也会被翻译，这就是问题所在

对象属性解析的示例
```js
// 待翻译文本为中文
const zh = '我叫{name}，今年{age}岁，来自{base}，是一名{job}'

// 通过百度翻译成英文，看似OK的
const zhToEn = `My name is {name}. I'm {age} years old. I'm from {base}. I'm a {job} `

// 再通过百度翻译从上面的英文翻译成中文，可以发现{job}的翻译就出问题了，而且不同的翻译平台，可能出现在的问题也不一样
const enToZh = '我的名字是｛name｝。我{age}岁。我来自{base}。我是{工作}'
```
再来看看下标解析的示例
```js
// 待翻译文本为中文
const zh = '我叫{0}，今年{1}岁，来自{2}，是一名{3}'

// 通过百度翻译成英文
const zhToEn = `My name is {0}. I'm {1} years old. I'm from {2}. I'm a {3}`

// 通过百度翻译从上面的英文翻译成中文，不会出现上面参数匹配不上的问题
const enToZh = '我的名字是｛0｝。我是｛1｝岁。我来自｛2｝。我是｛3｝'
```
虽然通过机器翻译本来就不能做到100%的准确率，但是这种方式也可以尽量不必要的错误
## 2. 动态参数类型**日期**和**时间**分开有必要吗？
个人感觉其实是没有必要的，只是设计上已经实现了，大家可以酌情灵活选择使用，当然不排除有的业务场景这样分开处理会更方便
# 更新日志

## [1.4.0] - 2022-xx-xx
### Added
- 初始化命令和翻译命令添加 `-P` | `--path` 参数，支持灵活指定配置文件路径
## [1.3.2] - 2022-09-24
### Fixed
- 修复在 Windows 系统中执行翻译命令后会意外生成类 `xxx.jso` 文件夹
## [1.3.1] - 2022-09-21
### Fixed
- 修复初始化命令在 Windows 系统中报异常
## [1.3.0] - 2022-09-13
### Added
- 添加新的日志输出类型：翻译有误的文本列表
- 添加 `withI18N` 函数API用于支持服务端场景
- 添加动态参数类型标记和类型格式化回调函数
  - 支持 数字、货币、日期、时间、复数 等类型的动态参数标记
  - `setI18N` 添加了 `formatNumber`、`formatCurrency`、`formatDate`、`formatTime`、`formatPlural` 等属性
### Changed
- `translate-error.json` 由**翻译失败**改为**翻译错误**类型，**翻译失败**由 `translate-fail.json` 来标识
### Fixed
- 修复 `baiduConfig.delay` 在多个语言切换时不生效
## [1.2.1] - 2022-07-07
### Fixed
- 修复执行命令报错：`Error: Cannot find module 'md5-node'`
## [1.2.0] - 2022-07-05
### Added
- 新增翻译命令执行的耗时统计输出
- 新增[输出日志](#输出日志)文档说明以及新的输出日志类型：配到的文件路径列表
- 新增 `增量翻译` 模式
  - 该模式默认开启，可通过命令参数 `--non-incremental` 关闭
  - 支持只翻译目标语言未翻译过的文本
  - 支持智能移除语言包中已翻译却未再使用的文本
- 新增 `setI18N` 函数参数属性 `beginIndex`，用于指定动态参数的起始下标
- 新增 `output.indentSize` 配置属性，用于指定输出文件缩进空格数
- 新增 `baiduConfig.delay` 配置属性，用于设置百度翻译的延迟时间
- 新增匹配规则约束：翻译文本中不能包含特殊字符 `\t`
### Changed
- 优化命令行不输命令只输参数 `-L` | `--locale` 也能显示对应语言的提示
  - `npx i18n -L en`
  - `npx i18n --locale en`
- 优化翻译失败的输出日志（`translate-error.json`）给出了失败具体原因
- 调整百度翻译接口批量翻译的请求字符数上限为 `3000`
### Fixed
- 修复 `setI18N` 设置单个属性会导致其他属性状态丢失
- 修复翻译文本包含 `\t` 特殊字符导致翻译异常

## [1.1.1] - 2022-06-25
### Fixed
- 修复文档中图片不显示的问题
## [1.1.0] - 2022-06-25
### Added
- 新增 `README` 说明文档
- 新增 `output.langType` 配置项支持生成不同格式的语言包
- 新增 `from`、`to`、`codeLocaleMap` 百度翻译的配置项
- 新增 `funcName` 配置项支持自定义匹配函数名
### Changed
- 配置项 `filterFile` 已废弃，由 `fileRegExp` 代替
### Removed
- 移除了 `got`，`walk`，`chalk`，`lodash` 等依赖库
### Fixed
- 修复日志文件（translate-success.json）在文本包含 `.` 的情况下格式错误

## [1.0.0] - 2022-06-13
### Added
- 新增语言切换命令行参数
- 新增 `i18n` 和 `setI18N` 函数API
- 新增 `命令行工具` 的基本实现

# License
[MIT](./LICENSE)

Copyright (c) 2022-present Eyelly Wu
