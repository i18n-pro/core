
# Quick Start

<details >
  <summary>Table of Contents</summary>

  &emsp;&emsp;[1. Install](#1-install)<br/>
  &emsp;&emsp;[2. Access Function API](#2-access-function-api)<br/>
  &emsp;&emsp;&emsp;&emsp;[Initialization](#initialization)<br/>
  &emsp;&emsp;&emsp;&emsp;[Importing i18n.js in the Project Entry File](#importing-i18njs-in-the-project-entry-file)<br/>
  &emsp;&emsp;&emsp;&emsp;[Wrap with  `t`   `Translation Text` ](#wrap-with--t---translation-text)<br/>
  &emsp;&emsp;[3. Initialize Command Line Configuration File](#3-initialize-command-line-configuration-file)<br/>
  &emsp;&emsp;[4. Adjust  `i18nrc.ts`  Configuration](#4-adjust--i18nrcts--configuration)<br/>
  &emsp;&emsp;[5. Execute Translation Command](#5-execute-translation-command)<br/>
  &emsp;&emsp;[6. Importing Language Pack](#6-importing-language-pack)<br/>
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
  withI18n,
} = initI18n({
  // The namespace attribute must be configured
  namespace: 'testI18N',
})

// Here, API can be mounted on the global object to avoid the need for different modules to import API
// Note: If you are currently using  i18n-pro in a standalone third-party library or component, it is not recommended to do so as it may cause naming conflicts with your users' API
// Browser environment, note: if it is  Node  environment, you need to replace  window  with  global 
window.t = t
window.setI18n = setI18n
window.withI18n = withI18n

// If API is not mounted on the global object, it needs to be exported so that other modules can use the corresponding API
return {
  t,
  setI18n,
  withI18n,
}
```

### Importing i18n.js in the Project Entry File

```js
 // App.js
 import './i18n.js'

 // The subsequent execution (rendering) logic of the application
```

### Wrap with  `t`   `Translation Text` 
This step mainly wraps the text to be translated with the  `t`  function
```js
/** test.js in the same directory */
// If it is mount API to the global object, you can omit the downward code
import { t } from './i18n.js'

// The text to be translated
const text = t('hello world')
```


## 3. Initialize Command Line Configuration File
Enter the following command at the command line terminal, [more commands](https://github.com/i18n-pro/core/blob/v2.1.0/docs/dist/COMMAND_LINE.md#command-list)
```bash
npx i18n init 
```
After the command execution is successful, a  `i18nrc.ts`  file will be generated in the current directory. The default configuration will be as follows:
```js
import { join } from 'path'
import { Config } from 'i18n-pro'

export default {
  funcName: 't',
  entry: join(__dirname, './src/'),
  fileRegExp: /\.[jt]s$/,
  // input: 'src/**/*.{js,ts}',
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
Adjust the configuration items in the configuration file according to the requirements, [Description](https://github.com/i18n-pro/core/blob/v2.1.0/docs/dist/COMMAND_LINE.md#1--i18nrcts--configuration) of configuration items

## 5. Execute Translation Command

```bash
npx i18n t 
```
If the command is executed successfully, the language pack file will be generated in the specified directory<br /><br />Under the default configuration, the generated language package is the form of each language separate document （`output.langType == 'multiple'`）, which will generate  `2`  language pack:  `zh.json`  and  `ja.json` 
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
If the generated language pack is a polymerization form （`output.langType == 'single'`）, it will generate  `1`  language package:  `langs.json` 
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


## 6. Importing Language Pack
The language pack already exists, so it needs to be applied to the project

If the generated language pack is a separate file form （`output.langType == 'multiple'`） for each language, the operation is as follows:
```js
import zh from './i18n/zh.json'
import ja from './i18n/ja.json'
// ... More languages

setI18n({
  locale: 'en',
  langs:{
    zh,
    ja,
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
At this point, the project has been completely connected to internationalization. The above  `locale`  specifies any of the target language, and the translated content can be seen on the page. If there are new  `Translation Text`  (need to be wrapped with  `t`  function) in the subsequent project, you only need to execute the translation command  `npx i18n t`  again to generate the latest language package

## 7. Switch Language
Normally, just execute the following method, but the content already rendered on the page will not be updated until the  `t`  function corresponding to the text is executed again, which may display the text corresponding to the new language
```js
setI18n({
  locale: 'en', // Set the specified language
})
```
If this library is used directly in a frontend application, when switching languages on the page, only the entire page can see the translated effect through **refresh directly**. A version of  `React`、`Vue`、`SolidJS`、`Svelte`  related UI library will be released later, which can achieve switching languages without refreshing the page by combining with the characteristics of the corresponding library. Stay tuned

## 8. Demo
Real code examples can be found in the  [Live Demo](https://github.com/i18n-pro/core/tree/v2.1.0#live-demo)  section of the  `README`  documentation, and the console output of the current library  `Command Line Tool`  has also been internationalized

You can see the Chinese version by executing the command  `npx i18n h -L zh` 
![demo](https://s3.bmp.ovh/imgs/2023/05/02/cc60f507a8f76a81.gif "demo")