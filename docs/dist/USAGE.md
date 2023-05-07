
# Quick Start

<details >
  <summary>Table of Contents</summary>

  &emsp;&emsp;[1. Install](#1-install)<br/>
  &emsp;&emsp;[2. Access Function API](#2-access-function-api)<br/>
  &emsp;&emsp;&emsp;&emsp;[initialization](#initialization)<br/>
  &emsp;&emsp;&emsp;&emsp;[Project entrance file introduces i18n.js](#project-entrance-file-introduces-i18njs)<br/>
  &emsp;&emsp;&emsp;&emsp;[用 `t` 包裹翻译文案](#用-t-包裹翻译文案)<br/>
  &emsp;&emsp;[3. Initialize command line configuration file](#3-initialize-command-line-configuration-file)<br/>
  &emsp;&emsp;[4. Adjust  `i18nrc.js`  configuration](#4-adjust--i18nrcjs--configuration)<br/>
  &emsp;&emsp;[5. Execute translation command](#5-execute-translation-command)<br/>
  &emsp;&emsp;[6. Importing language pack files](#6-importing-language-pack-files)<br/>
  &emsp;&emsp;[7. Switch language](#7-switch-language)<br/>
  &emsp;&emsp;[8. DEMO](#8-demo)<br/>

</details>

## 1. Install

```bash
npm i i18n-pro
# or
yarn add i18n-pro
# or
pnpm i i18n-pro
```

## 2. Access Function API

### initialization

```js
// i18n.js
import { initI18n } from 'i18n-pro'

const {
  t,
  setI18n,
  withI18n,
} = initI18n({
  // The namespace attribute must be configured
  namespace: 'testI18N',
})

// Here you can mount the API to the global object.
// 注意：如果当前你是在某个独立的第三方库或者组件中使用 i18n-pro，不推荐这样做，可能会造成你的用户 API 命名冲突
// Browser environment, note: if it is  Node  environment, you need to replace  window  with  global 
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

### Project entrance file introduces i18n.js

```js
 // App.js
 import './i18n.js'

 // The follow -up (rendering) logic of application (rendering)
```

### 用 `t` 包裹翻译文案
这一步主要是用 `t` 函数包裹需要被翻译的文案
```js
/** test.js in the same directory */
// If it is mount API to the global object, you can omit the downward code
import { t } from './i18n.js'

// 被翻译的文案
const text = t('hello world')
```


## 3. Initialize command line configuration file
Enter the following command at the command line terminal, [more commands](https://github.com/eyelly-wu/i18n-pro/blob/vdoc/docs/dist/COMMAND_LINE.md#command-list)
```bash
npx i18n init 
```
After the command execution is successful, a  `i18nrc.js`  file will be generated in the current directory. The default configuration will be as follows:
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
      ja: 'jp',
    },
    // proxy: 'http://127.0.0.1:1087',
  },
}
```


## 4. Adjust  `i18nrc.js`  configuration
Adjust the configuration items in the configuration file according to the requirements, [Description](https://github.com/eyelly-wu/i18n-pro/blob/vdoc/docs/dist/COMMAND_LINE.md#1--i18nrcjs--configuration) of configuration items

## 5. Execute translation command

```bash
npx i18n t 
```
If the command is executed successfully, the language pack file will be generated in the specified directory<br /><br />Under the default configuration, the generated language package is the form of each language separate document （`output.langType == 'multiple'`）, which will generate  `2`  language pack:  `zh-CN.json`  and  `jp.json` 
```text
// zh-CN.json
{
  "hello world": "你好世界"
}

// jp.json
{
  "hello world": "こんにちは世界"
}
```
If the generated language pack is a polymerization form （`output.langType == 'single'`）, it will generate  `1`  language package:  `langs.json` 
```text
// langs.json
{
  "zh-CN": {
    "hello world": "你好世界"
  },
  "jp": {
    "hello world": "こんにちは世界"
  }
}
```


## 6. Importing language pack files
The language pack already exists, so it needs to be applied to the project

If the generated language pack is a separate file form （`output.langType == 'multiple'`） for each language, the operation is as follows:
```js
import zh from './i18n/zh-CN.json'
import jp from './i18n/jp.json'
// ... More languages

setI18n({
  locale: 'en',
  langs:{
    'zh-CN': zh,
    jp,
    // ... More languages
  },
})
// The application page rendering logic is later
```
If the generated language pack is in the form of aggregation （`output.langType == 'single'`）, the operation is as follows:
```js
import langs from './i18n/langs.json'

setI18n({
  locale: 'en',
  langs,
})
// The application page rendering logic is later
```
至此，项目已经完全接入了国际化，上面 `locale` 指定为目标语言中任意一个，在页面上就能看到翻译好的内容了。后续如果项目中有新增的翻译文案（需要用 `t` 函数包裹哟），就仅仅需要再次执行翻译命令 `npx i18n t` 生成最新的语言包就可以了

## 7. Switch language
正常情况下，执行如下方法就行，但是页面上已渲染的内容不会再更新，只有等对应文案的 `t` 函数重新执行，才有可能显示新语言对应的文案
```js
setI18n({
  locale: 'en', // Set the specified language
})
```
尽管有的 UI库（例如 `React`）可以利用它的 `context` 特性做到静态更新页面内容，但是对于不在组件内部的翻译文案内容，要做到静态更新也会有额外的处理成本，例如下面的这种场景，组件内使用了外部包含翻译内容的属性
```js
// To achieve static update of this attribute, additional processing is required
// Here is just to show that this situation exists, not to give a clear solution
const FOO_TEXT = t('静态文案属性')

function App(){
  return (
    <>
      {FOO_TEXT}
    </>
  )
}
```
如果是直接在前端应用中使用该库，在页面上切换语言时，只能通过**refresh directly**整个页面才能看到翻译后的效果

## 8. DEMO
真实代码示例可参考 `README` 文档中的 [Live Demo](https://github.com/eyelly-wu/i18n-pro/tree/vdoc#live-demo) ，当前库 `Command Line Tool` 的控制台输出也接入了国际化

通过命令 `npx i18n h -L zh` 就能看中文版了
![demo](https://s3.bmp.ovh/imgs/2023/05/02/cc60f507a8f76a81.gif "demo")<br />If you are interested, you can look at the source code