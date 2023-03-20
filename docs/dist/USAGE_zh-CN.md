
# 快速上手

<details >
  <summary>目录</summary>

  &emsp;&emsp;[1. 安装](#1-安装)<br/>
  &emsp;&emsp;[2. 接入函数API](#2-接入函数api)<br/>
  &emsp;&emsp;&emsp;&emsp;[初始化](#初始化)<br/>
  &emsp;&emsp;&emsp;&emsp;[项目入口文件引入 i18n.js](#项目入口文件引入-i18njs)<br/>
  &emsp;&emsp;&emsp;&emsp;[用 `t` 包裹翻译文本](#用-t-包裹翻译文本)<br/>
  &emsp;&emsp;[3. 初始化命令行配置文件](#3-初始化命令行配置文件)<br/>
  &emsp;&emsp;[4. 调整 `i18nrc.js` 配置](#4-调整-i18nrcjs-配置)<br/>
  &emsp;&emsp;[5. 执行翻译命令](#5-执行翻译命令)<br/>
  &emsp;&emsp;[6. 引入语言包文件](#6-引入语言包文件)<br/>
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

// 这里可以挂载 API 到全局对象上，好处出可以避免不同模块都需要通过 import 来引入 API
// 注意：如果当前你是在某个独立的第三方库或者组件中使用 i18n-pro，不推荐这样做，可能会造成你的用户API命名冲突
// 浏览器环境，注意：如果是 Node 环境需要将 window 替换成 global 
window.t = t
window.setI18n = setI18n
window.withI18n = withI18n


// 这里导出API是便于其他模块能使用对应API
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

### 用 `t` 包裹翻译文本
这一步主要是用 `t` 函数包裹需要被翻译的文本
```js
/** 同目录下的 test.js */
// 如果是挂载全局对象，可以省略下行代码
import { t } from './i18n.js'

// 被翻译的文本
const text = t('你好世界')
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
// ... 其他更多语言

setI18n({
  locale: 'en',
  langs:{
    en,
    jp,
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
至此，项目已经完全接入了国际化，上面 `locale` 指定为目标语言中任意一个，在页面上就能看到翻译好的内容了。后续如果项目中有新增的翻译文本（需要用 `t` 函数包裹哟），就仅仅需要再次执行翻译命令 `npx i18n t` 生成最新的语言包就可以了

## 7. 切换语言
正常情况下，执行如下方法就行，但是页面上已渲染的内容不会再更新，只有等对应文本的 `t` 函数重新执行，才有可能显示新语言对应的文本
```js
setI18n({
  locale: 'en', // 设置指定语言
})
```
尽管有的 UI库（例如 `React`）可以利用它的 `context` 特性做到静态更新页面内容，但是对于不在组件内部的翻译文本内容，要做到静态更新也会有额外的处理成本，例如下面的这种场景，组件内使用了外部包含翻译内容的属性
```js
// 这个属性要做到静态更新，需要额外处理
// 这里只是说明存在这种情况，不给出明确解决方案
const FOO_TEXT = t('静态文本属性')

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
哈哈哈，除了上面的 [Live Demo](#live-demo)，当前库 `命令行工具` 的控制台输出也接入了国际化

通过命令 `npx i18n h -L en` 就能看英文版了
![demo](https://s3.bmp.ovh/imgs/2022/06/25/4412a87c79ba36a8.gif "demo")
感兴趣的同学，可以看看源码