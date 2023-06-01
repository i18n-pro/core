
# 快速上手

<details >
  <summary>目录</summary>

  &emsp;&emsp;[1. 安装](#1-安装)<br/>
  &emsp;&emsp;[2. 接入函数API](#2-接入函数api)<br/>
  &emsp;&emsp;&emsp;&emsp;[初始化](#初始化)<br/>
  &emsp;&emsp;&emsp;&emsp;[项目入口文件引入 i18n.js](#项目入口文件引入-i18njs)<br/>
  &emsp;&emsp;&emsp;&emsp;[用 `t` 包裹 `翻译文案` ](#用-t-包裹-翻译文案)<br/>
  &emsp;&emsp;[3. 初始化命令行配置文件](#3-初始化命令行配置文件)<br/>
  &emsp;&emsp;[4. 调整 `i18nrc.js` 配置](#4-调整-i18nrcjs-配置)<br/>
  &emsp;&emsp;[5. 执行翻译命令](#5-执行翻译命令)<br/>
  &emsp;&emsp;[6. 引入语言包](#6-引入语言包)<br/>
  &emsp;&emsp;[7. 切换语言](#7-切换语言)<br/>
  &emsp;&emsp;[8. DEMO](#8-demo)<br/>

</details>

## 1. 安装

```bash
npm i i18n-pro
# 或者
yarn add i18n-pro
# 或者
pnpm i i18n-pro
```

## 2. 接入函数API

### 初始化

```js
// i18n.js
import { initI18n } from 'i18n-pro'

const {
  t,
  setI18n,
  withI18n,
} = initI18n({
  // 命名空间属性是必须配置的
  namespace: 'testI18N',
})

// 这里可以挂载 API 到全局对象上，可以避免不同模块都需要通过 import 来引入 API
// 注意：如果当前你是在某个独立的第三方库或者组件中使用 i18n-pro，不推荐这样做，可能会造成你的用户 API 命名冲突
// 浏览器环境，注意：如果是 Node 环境需要将 window 替换成 global 
window.t = t
window.setI18n = setI18n
window.withI18n = withI18n

// 不挂载 API 到全局对象上的话，需要导出 API 以便于其他模块能使用对应 API
return {
  t,
  setI18n,
  withI18n,
}
```

### 项目入口文件引入 i18n.js

```js
 // App.js
 import './i18n.js'

 // 后续是应用的执行（渲染）逻辑
```

### 用 `t` 包裹 `翻译文案` 
这一步主要是用 `t` 函数包裹需要被翻译的文案
```js
/** 同目录下的 test.js */
// 如果是挂载 API 到全局对象，可以省略下行代码
import { t } from './i18n.js'

// 被翻译的文案
const text = t('hello world')
```


## 3. 初始化命令行配置文件
在命令行终端输入如下命令，[更多命令](https://github.com/eyelly-wu/i18n-pro/blob/v2.0.0-alpha.3/docs/dist/COMMAND_LINE_zh-CN.md#命令列表)
```bash
npx i18n init 
```
命令执行成功后会在当前目录下生成一个 `i18nrc.js` 的文件，默认配置如下：
```js
const { join } = require('path')

module.exports = {
  funcName: 't',
  entry: join(__dirname, './src/'),
  fileRegExp: /\.[jt]s$/,
  output: {
    path: join(__dirname, './i18n/'),
  },
  translator: 'googlex',
  googlexConfig: {
    from: 'en',
    to: ['zh-CN', 'ja'],
    codeLocaleMap: {
      'zh-CN': 'zh',
    },
    // proxy: 'http://127.0.0.1:1087',
  },
}
```


## 4. 调整 `i18nrc.js` 配置
根据需求自行调整配置文件中的配置项，配置项的[说明](https://github.com/eyelly-wu/i18n-pro/blob/v2.0.0-alpha.3/docs/dist/COMMAND_LINE_zh-CN.md#1--i18nrcjs-配置)

## 5. 执行翻译命令

```bash
npx i18n t 
```
命令执行成功的话，会在指定的目录下生成语言包文件<br /><br />默认配置下，生成的语言包是每个语言单独文件形式（`output.langType == 'multiple'`），会生成 `2` 个语言包： `zh.json` 和 `ja.json` 
```text
// zh.json
{
  "hello world": "你好世界"
}

// ja.json
{
  "hello world": "こんにちは世界"
}
```
如果生成的语言包是聚合的形式（`output.langType == 'single'`），会生成 `1` 个语言包： `langs.json` 
```text
// langs.json
{
  "zh": {
    "hello world": "你好世界"
  },
  "ja": {
    "hello world": "こんにちは世界"
  }
}
```


## 6. 引入语言包
语言包已经有了，就需要应用到项目中了

如果生成的语言包是每个语言单独文件形式（`output.langType == 'multiple'`），操作如下：
```js
import zh from './i18n/zh.json'
import ja from './i18n/ja.json'
// ... 其他更多语言

setI18n({
  locale: 'en',
  langs:{
    zh,
    ja,
    // ... 其他更多语言
  },
})
// 后续才是应用的页面渲染逻辑
```
如果生成的语言包是聚合的形式（`output.langType == 'single'`），操作如下：
```js
import langs from './i18n/langs.json'

setI18n({
  locale: 'en',
  langs,
})
// 后续才是应用的页面渲染逻辑
```
至此，项目已经完全接入了国际化，上面 `locale` 指定为目标语言中任意一个，在页面上就能看到翻译好的内容了。后续如果项目中有新增的 `翻译文案` （需要用 `t` 函数包裹哟），就仅仅需要再次执行翻译命令 `npx i18n t` 生成最新的语言包就可以了

## 7. 切换语言
正常情况下，执行如下方法就行，但是页面上已渲染的内容不会再更新，只有等对应文案的 `t` 函数重新执行，才有可能显示新语言对应的文案
```js
setI18n({
  locale: 'en', // 设置指定语言
})
```
如果是直接在前端应用中使用该库，在页面上切换语言时，只能通过**直接刷新**整个页面才能看到翻译后的效果，后续会推出 `React`、`Vue`、`SolidJS`、`Svelte` 相关UI库的版本，结合对应库的特性可以做到不刷新页面切换语言，敬请期待

## 8. DEMO
真实代码示例可参考 `README` 文档中的 [Live Demo](https://github.com/eyelly-wu/i18n-pro/blob/v2.0.0-alpha.3/README_zh-CN.md#live-demo) ，当前库 `命令行工具` 的控制台输出也接入了国际化

通过命令 `npx i18n h -L zh` 就能看中文版了
![demo](https://s3.bmp.ovh/imgs/2023/05/02/cc60f507a8f76a81.gif "demo")