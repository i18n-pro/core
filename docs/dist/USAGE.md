
# Quick Start

<details >
  <summary>Table of Contents</summary>

  &emsp;&emsp;[1. Install](#1-install)<br/>
  &emsp;&emsp;[2. Access Function API](#2-access-function-api)<br/>
  &emsp;&emsp;&emsp;&emsp;[initialization](#initialization)<br/>
  &emsp;&emsp;&emsp;&emsp;[Project entrance file introduces i18n.js](#project-entrance-file-introduces-i18njs)<br/>
  &emsp;&emsp;&emsp;&emsp;[Use  `t`  package to translate text](#use--t--package-to-translate-text)<br/>
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

### Use  `t`  package to translate text
This step mainly uses  `t`  function to wrap the text to be translated
```js
/** test.js in the same directory */
// If it is mount API to the global object, you can omit the downward code
import { t } from './i18n.js'

// Translated text
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
So far, the project has been fully internationalized. The  `locale`  above is designated as any of the target languages, and the translated content can be seen on the page. Later, if there is new translation text in the project (you need to wrap it with  `t`  function), you just need to execute the translation command  `npx i18n t`  again to generate the latest language package

## 7. Switch language
Under normal circumstances, it is OK to execute the following methods, but the rendered content on the page will not be updated. The text in the new language can be displayed only if the  `t`  function for the corresponding text is reexecuted
```js
setI18n({
  locale: 'en', // Set the specified language
})
```
Although some UI libraries (such as  `React`) can use its  `context`  feature to statically update page content, for translated text content that is not in the component, there will be additional processing costs to statically update it. For example, in the following scenario, the component uses attributes that contain translated content externally
```js
// To achieve static update of this attribute, additional processing is required
// Here is just to show that this situation exists, not to give a clear solution
const FOO_TEXT = t('Static Text Attribute')

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