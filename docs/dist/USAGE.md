
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
// Note: If you are currently using  i18n-pro in a independent third -party library or component, it is not recommended to do this, which may cause your user API naming conflict
// Browser environment, note: if it is  Node  environment, you need to replace  window  with  global 
window.t = t
window.setI18n = setI18n
window.withI18n = withI18n


// The export API here is convenient for other modules to use the corresponding API
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
/** 同目录下的 test.js */
// 如果是挂载全局对象，可以省略下行代码
import { t } from './i18n.js'

// Translated text
const text = t('Hello World')
```


## 3. Initialize command line configuration file
Enter the following command at the command line terminal, [more commands](https://github.com/eyelly-wu/i18n-pro/blob/vdoc/docs/dist/COMMAND_LINE.md#command-list)
```bash
npx i18n init 
```
Then a  `i18nrc.js`  file will be generated in the current directory

## 4. Adjust  `i18nrc.js`  configuration
Adjust the configuration items in the configuration file according to the requirements, [Description](https://github.com/eyelly-wu/i18n-pro/blob/vdoc/docs/dist/COMMAND_LINE.md#1--i18nrcjs--configuration) of configuration items

## 5. Execute translation command

```bash
npx i18n t 
```
If the command is executed successfully, the language pack file will be generated in the specified directory

## 6. Importing language pack files
The language pack already exists, so it needs to be applied to the project

If the generated language pack is a separate file form （`output.langType == 'multiple'`） for each language, the operation is as follows:
```js
import en from './i18n/en.json'
import jp from './i18n/jp.json'
// ... More languages

setI18n({
  locale: 'en',
  langs:{
    en,
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
Therefore, for most scenarios, when switching languages on the page, it is recommended to **refresh directly** the whole page (if there is a good solution, please inform 🤔）

## 8. DEMO
Hahaha, in addition to the  [Live Demo](#live-demo) above, the console output of the current library  `Command Line Tool`  is also connected to internationalization

You can read the English version through the command  `npx i18n h -L en` 
![demo](https://s3.bmp.ovh/imgs/2022/06/25/4412a87c79ba36a8.gif "demo")
If you are interested, you can look at the source code