
# Quick Start

<details >
  <summary>Table of Contents</summary>

  &emsp;&emsp;[1. Install](#1-install)<br/>
  &emsp;&emsp;[2. Access Function API](#2-access-function-api)<br/>
  &emsp;&emsp;&emsp;&emsp;[Initialization](#initialization)<br/>
  &emsp;&emsp;&emsp;&emsp;[Importing i18n.js in the Project Entry File](#importing-i18njs-in-the-project-entry-file)<br/>
  &emsp;&emsp;&emsp;&emsp;[Wrap with  `t`  Case Study](#wrap-with--t--case-study)<br/>
  &emsp;&emsp;[3. Initialize Command Line Configuration File](#3-initialize-command-line-configuration-file)<br/>
  &emsp;&emsp;[4. Adjust  `i18nrc.ts`  Configuration](#4-adjust--i18nrcts--configuration)<br/>
  &emsp;&emsp;[5. Execute Translation Command](#5-execute-translation-command)<br/>
  &emsp;&emsp;[6. Importing Language Pack](#6-importing-language-pack)<br/>
  &emsp;&emsp;&emsp;&emsp;[Static import](#static-import)<br/>
  &emsp;&emsp;&emsp;&emsp;[Asynchronous loading callbacks](#asynchronous-loading-callbacks)<br/>
  &emsp;&emsp;&emsp;&emsp;[Dynamic loading at runtime](#dynamic-loading-at-runtime)<br/>
  &emsp;&emsp;[7. Switch Language](#7-switch-language)<br/>
  &emsp;&emsp;[8. Demo](#8-demo)<br/>

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

### Initialization

```js
// i18n.js
import { initI18n } from 'i18n-pro'

const {
  t,
  setI18n,
} = initI18n({
  // The namespace attribute must be configured
  namespace: 'testI18n',
})

// Optional: The API can be mounted to a global object to facilitate global calls (for Node environment, please replace window with global)
// Note: If used in third-party libraries or components, mounting is not recommended to avoid naming conflicts.
window.t = t
window.setI18n = setI18n

// Or export the API for other modules
export { t, setI18n }
```

### Importing i18n.js in the Project Entry File

```js
// App.js
import './i18n.js'

// Subsequently, the application rendering logic
```

### Wrap with  `t`  Case Study
Use the `t` function to wrap the copy that needs to be translated:
```js
// test.js
// If it has been mounted globally, the downlink can be omitted
import { t } from './i18n.js'

// Copywriting is key
const text = t('hello world')
// Custom key
const keyText = t.t('custom-key', 'hello key')
```


## 3. Initialize Command Line Configuration File
Enter the following command at the command line terminal, [more commands](https://github.com/i18n-pro/core/blob/v3.0.0-alpha.0/docs/dist/COMMAND_LINE.md#command-list)
```bash
npx i18n init 
```
After the command execution is successful, a  `i18nrc.ts`  file will be generated in the current directory. The default configuration will be as follows:
```js
import { fileURLToPath } from 'url'
import { join, dirname } from 'path'
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
    // proxy: 'http://127.0.0.1:1087',
  },
} as Config
```


## 4. Adjust  `i18nrc.ts`  Configuration
Adjust the configuration items in the configuration file according to the requirements, [Description](https://github.com/i18n-pro/core/blob/v3.0.0-alpha.0/docs/dist/COMMAND_LINE.md#1--i18nrcts--configuration) of configuration items

## 5. Execute Translation Command

```bash
npx i18n t 
```
If the command is executed successfully, the language pack file will be generated in the specified directory<br /><br />Under the default configuration, the generated language package is the form of each language separate document （`output.langType == 'multiple'`）, which will generate  `2`  language pack:  `zh.json`  and  `ja.json` 
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
If the generated language pack is a polymerization form （`output.langType == 'single'`）, it will generate  `1`  language package:  `langs.json` 
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


## 6. Importing Language Pack
After the language package is generated, it needs to be integrated into the project

Currently supports  `3`  ways to introduce language packs
* Static import
* Asynchronous loading callbacks
* Dynamic loading at runtime


### Static import

>This method is not suitable for pure front-end projects, which will lead to an increase in the loading time of the first screen.

If the generated language pack is a separate file form （`output.langType == 'multiple'`） for each language, the operation is as follows:
```js
// i18n.js
import { initI18n } from 'i18n-pro'
import zh from './i18n/zh.json'
import ja from './i18n/ja.json'
// ... More languages

initI18n({
  namespace: 'testI18n',
  locale: 'en',
  langs:{
    zh,
    ja,
    // ... More languages
  },
})
```
If the generated language pack is in the form of aggregation （`output.langType == 'single'`）, the operation is as follows:
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

### Asynchronous loading callbacks

>It is recommended to use this method when a separate file form per language, which can achieve asynchronous loading on demand, reduce the size of the first screen and improve the page performance.
```js
// i18n.js
import { initI18n } from 'i18n-pro'
import ja from './i18n/ja.json'

initI18n({
  namespace: 'testI18n',
  // Note: When the initial locale is a non-default language (such as ja), the language package must be imported statically.
  locale: 'ja',
  langs: {
    // Other languages ​​can be loaded dynamically on demand
    zh: () => import('./i18n/zh.json'),
    ja, // 初始语言包必须静态导入
  },
})
```

### Dynamic loading at runtime

>Suitable for scenarios where language packs need to be dynamically obtained at runtime, such as pulling language pack data through remote interfaces, suitable for multi-terminal or dynamic locale environments


```js
// Dynamically obtaining language packages through interfaces or other means
const zh = await fetch('/xxx/xxx/zh.json').then(res => res.json())

// Set the current language and language pack, support subsequent dynamic switching
setI18n({
  locale: 'zh',
  langs: {
    zh,
  },
})
```
At this point, the internationalization function has been integrated. Simply set  `locale`  as the target language to display the corresponding translated content on the page. If there is a new  `Case Study`  (requires a  `t`  function package), just re-execute the  `npx i18n t`  command to generate the latest language package to ensure that all new content is translated.

## 7. Switch Language
Switch the current language by:
```js
setI18n({
  locale: 'en', // Set the specified language
})
```

>Note: Only after  `setI18n`  is called to switch languages, the rendered content on the page will not be automatically updated. The text of the new language will be displayed only when the  `t`  function is re-executed.<br />If you need to achieve refresh-free switching, it is recommended to use it in combination with the integrated version of the following mainstream front-end frameworks:
* [React](https://github.com/i18n-pro/react)
* Vue
   * [Vue3](https://github.com/i18n-pro/vue)
   * [Vue2](https://github.com/i18n-pro/vue2)
* [Solid](https://github.com/i18n-pro/solid)
* [Svelte](https://github.com/i18n-pro/svelte)



## 8. Demo
This section only introduces basic usage. For more advanced usage, please refer to the subsequent documentation
* Please refer to  [Live Demo](https://github.com/i18n-pro/core/tree/v3.0.0-alpha.0#live-demo)  for real examples
* This document supports multilingual implementations based on  `i18n-pro`  and  [jsx-to-md](https://github.com/eyelly-wu/jsx-to-md) 
* The console output of  `Command Line Tool`  also supports multilingual
   * The command line interactive interface of the Chinese version can be viewed through the command  `npx i18n h -L zh` ![demo](https://s3.bmp.ovh/imgs/2023/05/02/cc60f507a8f76a81.gif "demo")

