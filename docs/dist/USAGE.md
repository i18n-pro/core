
# Quick Start

<details >
  <summary>Table of Contents</summary>

  &emsp;&emsp;[1. Install](#1-install)<br/>
  &emsp;&emsp;[2. Access Function API](#2-access-function-api)<br/>
  &emsp;&emsp;&emsp;&emsp;[The form of mounting global objects](#the-form-of-mounting-global-objects)<br/>
  &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;[Reference function](#reference-function)<br/>
  &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;[Wrap the text to be translated with  `i18n` ](#wrap-the-text-to-be-translated-with-i18n)<br/>
  &emsp;&emsp;&emsp;&emsp;[Form of module introduction](#form-of-module-introduction)<br/>
  &emsp;&emsp;[3. Initialize command line configuration file](#3-initialize-command-line-configuration-file)<br/>
  &emsp;&emsp;[4. Adjust  `i18nrc.js`  configuration](#4-adjust-i18nrcjs-configuration)<br/>
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
📢📢📢：This step mainly uses  `i18n`  function to wrap the text to be translated
> `Function API`  is constructed in the form of  `UMD` , and can be introduced through  `import`  or  `require` . This document mainly uses  `import`  as an example
### The form of mounting global objects

#### Reference function

```js
import { setI18n, i18n } from 'i18n-pro'

// Before application page rendering logic
// Browser environment, note: if it is Node environment, you need to replace window with global
window.setI18n = setI18n
window.i18n = i18n
// The application page rendering logic is later
```

#### Wrap the text to be translated with  `i18n` 

```js
// Translated text
const text = i18n('Hello World')
```

### Form of module introduction
The only difference from mounting global objects is that each module needs to be introduced separately, and there is no difference in other uses
```js
import { setI18n, i18n } from 'i18n-pro'
// Each module needs to be introduced as above

// Translated text
const text = i18n('Hello World')
```


## 3. Initialize command line configuration file
Enter the following command at the command line terminal, [more commands](#command-list)
```bash
npx i18n init 
```
Then a  `i18nrc.js`  file will be generated in the current directory

## 4. Adjust  `i18nrc.js`  configuration
Adjust the configuration items in the configuration file according to the requirements, [Description](#command-line) of configuration items

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
So far, the project has been fully internationalized. The  `locale`  above is designated as any of the target languages, and the translated content can be seen on the page. Later, if there is new translation text in the project (you need to wrap it with  `i18n`  function), you just need to execute the translation command  `npx i18n t`  again to generate the latest language package

## 7. Switch language
Under normal circumstances, it is OK to execute the following methods, but the rendered content on the page will not be updated. The text in the new language can be displayed only if the  `i18n`  function for the corresponding text is reexecuted
```js
setI18n({
  locale: 'en', // Set the specified language
})
```
Although some UI libraries (such as  `React`) can use its  `context`  feature to statically update page content, for translated text content that is not in the component, there will be additional processing costs to statically update it. For example, in the following scenario, the component uses attributes that contain translated content externally
```js
// To achieve static update of this attribute, additional processing is required
// Here is just to show that this situation exists, not to give a clear solution
const FOO_TEXT = i18n('Static Text Attribute')

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