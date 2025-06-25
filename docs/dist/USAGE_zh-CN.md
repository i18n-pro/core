
# 快速上手

<details >
  <summary>目录</summary>

  &emsp;&emsp;[1. 安装](#1-安装)<br/>
  &emsp;&emsp;[2. 接入函数 API](#2-接入函数-api)<br/>
  &emsp;&emsp;&emsp;&emsp;[初始化](#初始化)<br/>
  &emsp;&emsp;&emsp;&emsp;[项目入口文件引入 i18n.js](#项目入口文件引入-i18njs)<br/>
  &emsp;&emsp;&emsp;&emsp;[用 `t` 包裹文案](#用-t-包裹文案)<br/>
  &emsp;&emsp;[3. 初始化命令行配置文件](#3-初始化命令行配置文件)<br/>
  &emsp;&emsp;[4. 调整 `i18nrc.ts` 配置](#4-调整-i18nrcts-配置)<br/>
  &emsp;&emsp;[5. 执行翻译命令](#5-执行翻译命令)<br/>
  &emsp;&emsp;[6. 引入语言包](#6-引入语言包)<br/>
  &emsp;&emsp;&emsp;&emsp;[静态导入](#静态导入)<br/>
  &emsp;&emsp;&emsp;&emsp;[异步加载回调](#异步加载回调)<br/>
  &emsp;&emsp;&emsp;&emsp;[运行时动态加载](#运行时动态加载)<br/>
  &emsp;&emsp;[7. 切换语言](#7-切换语言)<br/>
  &emsp;&emsp;[8. Demo](#8-demo)<br/>

</details>

## 1. 安装

```bash
npm i i18n-pro
# 或者
yarn add i18n-pro
# 或者
pnpm i i18n-pro
```

## 2. 接入函数 API

### 初始化

```js
// i18n.js
import { initI18n } from 'i18n-pro'

const {
  t,
  setI18n,
} = initI18n({
  // 命名空间属性是必须配置的
  namespace: 'testI18n',
})

// 可选：可将 API 挂载到全局对象，便于全局调用（Node 环境请将 window 替换为 global）
// 注意：如在第三方库或组件中使用，不建议挂载，避免命名冲突
window.t = t
window.setI18n = setI18n

// 或导出 API 供其他模块使用
export { t, setI18n }
```

### 项目入口文件引入 i18n.js

```js
// App.js
import './i18n.js'

// 后续为应用渲染逻辑
```

### 用 `t` 包裹文案
使用 `t` 函数包裹需要翻译的文案：
```js
// test.js
// 如已挂载到全局，可省略下行
import { t } from './i18n.js'

// 文案即 key
const text = t('hello world')
// 自定义 key
const keyText = t.t('custom-key', 'hello key')
```


## 3. 初始化命令行配置文件
在命令行终端输入如下命令，[更多命令](https://github.com/i18n-pro/core/blob/v3.0.0-alpha.2/docs/dist/COMMAND_LINE_zh-CN.md#命令列表)
```bash
npx i18n init 
```
命令执行成功后会在当前目录下生成一个 `i18nrc.ts` 的文件，默认配置如下：
```js
import { fileURLToPath } from 'node:url'
import { join, dirname } from 'node:path'
import { Config } from 'i18n-pro'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export default {
  funcName: 't',
  // entry: join(__dirname, './src/'),
  // fileRegExp: /\.[jt]s$/,
  input: 'src/**/*.{js,ts}',
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
    // proxy: 'http://127.0.0.1:7997',
  },
} as Config
```


## 4. 调整 `i18nrc.ts` 配置
根据需求自行调整配置文件中的配置项，配置项的[说明](https://github.com/i18n-pro/core/blob/v3.0.0-alpha.2/docs/dist/COMMAND_LINE_zh-CN.md#1--i18nrcts-配置)

## 5. 执行翻译命令

```bash
npx i18n t 
```
命令执行成功的话，会在指定的目录下生成语言包文件<br /><br />默认配置下，生成的语言包是每个语言单独文件形式（`output.langType == 'multiple'`），会生成 `2` 个语言包： `zh.json` 和 `ja.json` 
```json
// zh.json
{
  "hello world": "你好世界",
  "custom-key": "你好key"
}

// ja.json
{
  "hello world": "こんにちは世界",
  "custom-key": "こんにちはkey"
}
```
如果生成的语言包是聚合的形式（`output.langType == 'single'`），会生成 `1` 个语言包： `langs.json` 
```json
// langs.json
{
  "zh": {
    "hello world": "你好世界",
    "custom-key": "你好key"
  },
  "ja": {
    "hello world": "こんにちは世界",
    "custom-key": "こんにちはkey"
  }
}
```


## 6. 引入语言包
语言包生成后，需要将其集成到项目中

目前支持 `3` 种引入语言包的方式
* 静态导入
* 异步加载回调
* 运行时动态加载


### 静态导入

>该方式不适合纯前端项目，会导致首屏加载时间增长

如果生成的语言包是每个语言单独文件形式（`output.langType == 'multiple'`），操作如下：
```js
// i18n.js
import { initI18n } from 'i18n-pro'
import zh from './i18n/zh.json'
import ja from './i18n/ja.json'
// ... 其他更多语言

initI18n({
  namespace: 'testI18n',
  locale: 'en',
  langs:{
    zh,
    ja,
    // ... 其他更多语言
  },
})
```
如果生成的语言包是聚合的形式（`output.langType == 'single'`），操作如下：
```js
// i18n.js
import { initI18n } from 'i18n-pro'
import langs from './i18n/langs.json'

initI18n({
  namespace: 'testI18n',
  locale: 'en',
  langs,
})
```

### 异步加载回调

>推荐在每个语言单独文件形式时使用此方式，可实现按需异步加载，减少首屏体积，提升页面性能
```js
// i18n.js
import { initI18n } from 'i18n-pro'
import ja from './i18n/ja.json'

initI18n({
  namespace: 'testI18n',
  // 注意：初始 locale 为非默认语言（如 ja）时，必须静态导入该语言包
  locale: 'ja',
  langs: {
    // 其他语言可按需动态加载
    zh: () => import('./i18n/zh.json'),
    ja, // 初始语言包必须静态导入
  },
})
```

### 运行时动态加载

>适用于需要在运行时动态获取语言包的场景，例如通过远程接口拉取语言包数据，适合多端或动态语言环境


```js
// 通过接口或其他方式动态获取语言包
const zh = await fetch('/xxx/xxx/zh.json').then(res => res.json())

// 设置当前语言及语言包，支持后续动态切换
setI18n({
  locale: 'zh',
  langs: {
    zh,
  },
})
```
至此，国际化功能已集成完毕。只需将  `locale`  设置为目标语言，即可在页面上展示对应的翻译内容。后续如有新增 `文案` （需用  `t`  函数包裹），只需重新执行  `npx i18n t`  命令生成最新语言包，即可确保所有新增内容均被翻译

## 7. 切换语言
通过如下方式切换当前语言：
```js
setI18n({
  locale: 'en', // 设置指定语言
})
```

>注意：仅调用  `setI18n`  切换语言后，页面上已渲染的内容不会自动更新，只有重新执行  `t`  函数时才会显示新语言的文案<br />如需实现无刷新切换，建议结合以下主流前端框架的集成版本使用：
* [React](https://github.com/i18n-pro/react)
* Vue
   * [Vue3](https://github.com/i18n-pro/vue)
   * [Vue2](https://github.com/i18n-pro/vue2)
* [Solid](https://github.com/i18n-pro/solid)
* [Svelte](https://github.com/i18n-pro/svelte)



## 8. Demo
本节仅介绍基础用法，更多高级用法请参考后续文档
* 真实示例请参考  [Live Demo](https://github.com/i18n-pro/core/blob/v3.0.0-alpha.2/README_zh-CN.md#live-demo) 
* 本文档多语言支持基于 `i18n-pro` 和 [jsx-to-md](https://github.com/eyelly-wu/jsx-to-md) 实现
*  `命令行工具` 的控制台输出同样支持多语言
   * 通过命令  `npx i18n h -L zh`  可查看中文版的命令行交互界面![demo](https://s3.bmp.ovh/imgs/2023/05/02/cc60f507a8f76a81.gif "demo")

