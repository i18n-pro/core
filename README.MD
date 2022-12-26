<div align="center">
  
[![logo](https://s3.bmp.ovh/imgs/2022/06/25/3a1c742f283cf28e.png "logo")](https://github.com/eyelly-wu/i18n-pro "github")


English | [简体中文](./README_zh-CN.md)


  <p style="font-size: 18px;">Lightweight, simple, flexible and automatic-translation tools for internationalization</p>

[![npm-version](https://img.shields.io/npm/v/i18n-pro.svg?style=flat-square "npm-version")](https://www.npmjs.com/package/i18n-pro "npm")
[![npm-download](https://img.shields.io/npm/dm/i18n-pro "npm-download")](https://www.npmjs.com/package/i18n-pro "npm") 
[![npm-quality-score](https://img.shields.io/npms-io/quality-score/i18n-pro "npm-quality-score")](https://www.npmjs.com/package/i18n-pro "npm") 
[![bundlesize](https://img.shields.io/bundlephobia/minzip/i18n-pro?color=brightgreen&style=plastic "bundlesize")](https://bundlephobia.com/package/i18n-pro "bundlesize") 
[![dependenices](https://img.shields.io/librariesio/github/eyelly-wu/i18n-pro?style=plastic "dependenices")](https://www.npmjs.com/package/i18n-pro?activeTab=dependencies "dependenices") 
[![github-stars](https://img.shields.io/github/stars/eyelly-wu/i18n-pro?style=social "github-stars")](https://github.com/eyelly-wu/i18n-pro/stargazers "github-stars") 
[![last-commit](https://img.shields.io/github/last-commit/eyelly-wu/i18n-pro "last-commit")](https://github.com/eyelly-wu/i18n-pro/commits/main "last-commit") 
[![github-issues](https://img.shields.io/github/issues-raw/eyelly-wu/i18n-pro "github-issues")](https://github.com/eyelly-wu/i18n-pro/issues "github-issues") 
[![codecov](https://codecov.io/gh/eyelly-wu/i18n-pro/branch/main/graph/badge.svg?token=758C46SIE7 "codecov")](https://codecov.io/gh/eyelly-wu/i18n-pro "codecov") 
[![lgtm-alerts](https://img.shields.io/lgtm/alerts/g/eyelly-wu/i18n-pro.svg?logo=lgtm&logoWidth=18 "lgtm-alerts")](https://lgtm.com/projects/g/eyelly-wu/i18n-pro/alerts/ "lgtm-alerts") 
[![lgtm-quality](https://img.shields.io/lgtm/grade/javascript/g/eyelly-wu/i18n-pro.svg?logo=lgtm&logoWidth=18 "lgtm-quality")](https://lgtm.com/projects/g/eyelly-wu/i18n-pro/context:javascript "lgtm-quality") 

</div>

# Vision
To make internationalization easy and enjoyable 😄💪🏻
# Features

* **lightweight**：[![bundlesize](https://img.shields.io/bundlephobia/minzip/i18n-pro?color=brightgreen&style=plastic "bundlesize")](https://bundlephobia.com/package/i18n-pro "bundlesize")
* **simple**：Low learning cost and easy to use
* **flexible**：Support dynamic parameters, unique type tags and formatted callbacks (Number, Currency, Date, Time, Plural)
* **automatic-translation**：One command can automatically extract the text and translate it into a language pack
* **keyless**：There is no need to define the key manually, the text to be translated is the key


# Live Demo

* [Open in CodeSandbox](https://codesandbox.io/p/github/eyelly-wu/i18n-pro-react-demo/main)
* [![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz_small.svg "Open in StackBlitz")](https://stackblitz.com/edit/i18n-pro-react-demo)


# Principle
The library is mainly composed of two parts
* Command Line Tool
* Function API

**Command Line Tool**：Parse the text to be translated according to the specified rules, translate the text to the specified target language through the translation platform, and finally generate the language package file

A simple example of  [Matching Rules](#matching-rules)  for parsing text is as follows
```js
// Normal string
i18n('xxx')
i18n("xxx")
i18n(`xxx`)

// Support dynamic parameters
i18n('xxx{0}xxx', param1)
i18n('xxx{0}xxx{1}xxx{2}xxx', param1, param2, param3)

// Dynamic parameters type marker
i18n('The number of users has reached {n0}', 100000000) // Number Type
i18n('The selling price is {c0}', 14999) // Currency type
i18n('Today's date is {d0}', new Date()) // Date Type
i18n('Current time: {t0}', new Date()) // Time Type
i18n('I have {p0 apple}, {p1 banana} and {p2 pear}', 5, 4, 3) // Plural type
```
**Function API**：Connect the internationalization language pack into the project, which is composed of  `i18n`, `setI18N`  and  `withI18N` 
* **i18n**：It is used to wrap the translated text to achieve internationalization, and also serves as an identifier for the command line to match the rules of translated text
* **setI18N**：Set language, language pack and other configuration items
* **withI18N**：It is applicable to the server. Each interface response needs to be internationalized

Therefore,  `Command Line Tool`  and  `Function API`  work better together. It is precisely because of this structural design that  `i18n-pro`  library can be easily integrated into any  `JavaScript`  project

# Usage

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
import { setI18N, i18n } from 'i18n-pro'

// Before application page rendering logic
// Browser environment, note: if it is Node environment, you need to replace window with global
window.setI18N = setI18N
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
import { setI18N, i18n } from 'i18n-pro'
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

setI18N({
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

setI18N({
  locale: 'en',
  langs,
})
// The application page rendering logic is later
```
So far, the project has been fully internationalized. The  `locale`  above is designated as any of the target languages, and the translated content can be seen on the page. Later, if there is new translation text in the project (you need to wrap it with  `i18n`  function), you just need to execute the translation command  `npx i18n t`  again to generate the latest language package

## 7. Switch language
Under normal circumstances, it is OK to execute the following methods, but the rendered content on the page will not be updated. The text in the new language can be displayed only if the  `i18n`  function for the corresponding text is reexecuted
```js
setI18N({
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
# Command Line

## 1.  `i18nrc.js`  configuration

### Basic configuration

|Name|Type|Required|Default|Description|
|:-:|:-:|:-:|:-:|:-|
|funcName|string|no|i18n|Function name of command line for matching translated text<br /><br />If the  `i18n`  function is not renamed, it does not need to be adjusted here; otherwise, it is configured as the function name after renaming|
|entry|string|yes|-|Specify the translation file directory (absolute path)|
|fileRegExp|RegExp|no| `/.[jt]s$/` |The regular expression that matching filename<br /><br />Used to filter files to be translated|
|output|[Output](#output)|yes|-|The configuration associated with the output file|
|baiduConfig|[BaiduConfig](#baiduconfig)|yes|-|The configuration associated with the Baidu-Translation|

### Output
Configuration of output files
|Name|Type|Required|Default|Description|
|:-:|:-:|:-:|:-:|:-|
|path|string|yes|-|The directory where the language pack is generated (absolute path)|
|langType|'single' \| 'multiple'|no|'multiple'|Format of output language pack file<br /><br />Assume the target language is  `['en', 'jp']` <br />**single**：Only one aggregated language pack file  `langs.json` will be generated. The format is as follows:<br />`{"en":{"xxx":"xxx"},"jp":{"xxx":"xxx"}}`<br /><br />**multiple**：Each target language will generate a corresponding language pack file, which corresponds to two files:  `en.json`， `jp.json` . The format is as follows:<br />`{"xxx":"xxx"}`|
|indentSize|number|no|2|Number of indented spaces in the language pack file|

### BaiduConfig
Configuration of Baidu-Translation
|Name|Type|Required|Default|Description|
|:-:|:-:|:-:|:-:|:-|
|appid|string|yes|-|APPID, [Registered account](http://api.fanyi.baidu.com/doc/21 'There are instructions in the document') application is required|
|key|string|yes|-|Key, as above|
|from|string|yes|-|Language code of the translated text (for example,  `zh` for Chinese,  `en` for English)<br /><br />[More languages](http://api.fanyi.baidu.com/doc/21 'Search "语种列表"')，Search `语种列表`|
|to|string[]|yes|-|The target language code for translation, with the same format as above<br /><br />📢📢📢：If the target language is configured as  `['en']`, the generated filename (`output.langType=='multiple'`） is  `en.json`. When setting the language,  `locale`  must also be  `'en'`. If  `locale`  needs to be set as  `'en_US'` , it needs to be used in conjunction with  `codeLocaleMap` |
|codeLocaleMap|Record<string, string>|no|{}|Set the mapping relationship between language code and  `locale` <br /><br />For example, if the target language is  `['en']` and you want to set the value of  `locale`  to  `'en_US'` , you need to configure  `codeLocaleMap`  to  `{"en":"en_US"}` , and the final generated filename (`output.langType=='multiple'`） will also become  `en_US.json` |

## 2. Command

### Command List

|Command|Shorthand|Usage|Description|
|:-:|:-:|:-|:-|
|init|-|`npx i18n init`|Initialize the configuration file|
|translate|t|`npx i18n translate` <br /> `npx i18n t`|Extract translated text, automatically translate and generate language pack|
|version|v|`npx i18n version`<br />`npx i18n v`|Display version information|
|help|h|`npx i18n help`<br />`npx i18n h`|Display help information|

### Command Parameters

|Parameter name|Shorthand|Parameter value|Applicable commands|Usage|Description|
|:-:|:-:|:-:|:-|:-|:-|
|--locale|-L|`en` \| `zh`|ALL|`npx i18n h -L en`<br />`npx i18n h --locale en`|Specify the command line display language<br /><br />The available languages are Chinese (zh)/English (en). The default is English (en)|
|--non-incremental|-|-|`t`<br />`translate`|`npx i18n t --non-incremental`|Turn off incremental translation mode<br /><br />⚠️⚠️⚠️： After the incremental translation mode is turned off, all texts will be retranslated, which will result in the loss of **Manual translation**(Not translated by a translation platform) texts. Please consider using it carefully!!!|
|--path|-P|-|`init`<br />`t`<br />`translate`|`npx i18n init -P /xxx/xxx/xxx`<br />`npx i18n t -P /xxx/xxx/xxx`|Specify the configuration file path (the parameter is an absolute path)<br /><br />You only need to specify the path name. The default configuration filename is  `i18nrc.js`|

# Function API

## Function List
The following types are expressed in  `TypeScript`  syntax<table>
  <tr>
    <th>Function Name</th>
    <th>Type</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>i18n</td>
    <td>
      <pre>
(
  text: string,
  ...args: Array&lt;string|number|unknow&gt;
) =&gt; string
      </pre>
    </td>
    <td>
      Get internationalized text<br /><br />Internally, the translation text corresponding to <code>text</code> will be obtained from the language package <code>(langs)</code> according to the current language <code>(locale)</code>. If the translation content is not matched, the content of <code>text</code> will be displayed directly<br /><b>text</b>：Text to be translated<br /><b>args</b>：It represents a dynamic parameters without number limitation. The <code>text</code> text needs to be received in the form of <code>{index}</code>. The <code>index</code> represents the position of the dynamic parameters, starting from 0 (you can customize the starting value in <code>setI18N</code>). The first parameter corresponds to 0, and the second parameter corresponds to 1, and so on<br /><br />for example：<code>
  i18n('这个男人叫{0}，意外获得了超能力，这个女人叫{1}，意外被{2}追杀，这个小孩叫{3}，意外遭遇了意外', '小帅', '小美', 'FBI',
                '小白')
</code><br />The execution result of the current language (Chinese: zh) is： 这个男人叫小帅，意外获得了超能力，这个女人叫小美，意外被FBI追杀，这个小孩叫小白，意外遭遇了意外<br />The result of Baidu's translation into English is：The man's name is 小帅, and he accidentally obtained super power. The woman's name is 小美, and she was accidentally chased by FBI. The child's name is 小白, and she was accidentally hit by an accident
    </td>
  </tr>
  <tr>
    <td>setI18N</td>
    <td>
      <pre>
(
    props: {
        locale?: string,
        langs?: Record<strng, Record<string, string>>,
        beginIndex?: number,
        formatNumber?: <a href="#formatfunc">FormatFunc</a>,
        formatCurrency?: <a href="#formatfunc">FormatFunc</a>,
        formatDate?: <a href="#formatdatefunc">FormatDateFunc</a>,
        formatTime?: <a href="#formatdatefunc">FormatDateFunc</a>,
        formatPlural?: <a href="#formatpluralfunc">FormatPluralFunc</a>,
    }
) => void
      </pre>
    </td>
    <td>
      Set language, language pack and other configuration items<br /><br /><b>locale</b>：Specify the current language<br /><b>langs</b>：Set Current Language Pack<br /><b>beginIndex</b>：Set the starting subscript of the dynamic parameters in the <code>i18n</code> function. The default is 0<br /><b>formatNumber</b>：A callback to format dynamic parameters of type <b>Number</b>, with the corresponding type tag <b>n</b> or <b>N</b><br /><b>formatCurrency</b>：A callback to format dynamic parameters of type <b>Currency</b>, with the corresponding type tag <b>c</b> or <b>C</b><br /><b>formatDate</b>：A callback to format dynamic parameters of type <b>Date</b>, with the corresponding type tag <b>d</b> or <b>D</b><br /><b>formatTime</b>：A callback to format dynamic parameters of type <b>Time</b>, with the corresponding type tag <b>t</b> or <b>T</b><br /><b>formatPlural</b>：A callback to format dynamic parameters of type <b>Plural</b>, with the corresponding type tag <b>p</b> or <b>P</b><br /><br />📢📢📢：The value of <code>locale</code> corresponds to the language code by default. If you need to customize, please refer to the usage of <code>codeLocaleMap</code>
    </td>
  </tr>
  <tr>
    <td>withI18N</td>
    <td>
      <pre>
(
    props:{
          locale: string
    }
) => ({ i18n })
      </pre>
    </td>
    <td>
      Get i18n functions independent of the main program<br /><br />It is applicable to the server. Each interface response needs to be internationalized
    </td>
  </tr>
</table>

## Function Type

### FormatFunc
Common format callback type
```ts
type FormatFunc = <T>(props:{
  locale: string, // Current language
  payload: string | number | unknow | T, // dynamic parameters 
}) => number | string
```

### FormatDateFunc
Format callback function type of Date(Time)
```ts
type FormatDateFunc = <T>(props:{
  locale: string, // Current language
  payload: string | number | Date | unknow | T, // dynamic parameters 
}) => string
```

### FormatPluralFunc
Format callback function type of Plural
```ts
type FormatPluralFunc = <T>(props:{
  locale: string, // Current language
  payload: string | number | unknow | T, // dynamic parameters 
  text: string // A string that combines quantifiers and nouns by default. Languages that do not require plural processing can return this property directly
  keyword: string // Plural keyword
}) => string
```

# Matching Rules
requirement：
* The first parameter of the `i18n`  function can only be a pure string and cannot contain variables or js statements
* Cannot contain special characters such as  `\n` and `\t` 
* The beginning and end cannot contain spaces
* If you use the  `Template Strings`  syntax, you cannot wrap lines

Failure to meet the above conditions may result in
* Incorrect extraction of translated text
* Incorrect translation result

The following can be matched
```js
i18n('xxx')
i18n("xxx")
i18n(`xxx`)
```
The following will not be matched
```js
const foo = 'foo'
const fooFunc = (x:string) => x

// Does not satisfy pure string
i18n(foo)
i18n('xxx' + foo)
i18n(`${foo}`)
i18n(fooFunc(foo))

// Contains \n or \t
i18n('x\nx')
i18n('x\tx')

// Include spaces before and after
i18n(' xxx')
i18n('xxx  ')
i18n(' xxx ')

// There are line breaks in the Template Strings syntax
i18n(`
xxx
`)
```
If string splicing is required, dynamic parameters can be used
```js
i18n('My name is {0}, I am {1} years old this year, from {2}, and I am a {3}', 'Wang Nima', 35, 'Mars', 'coder')
```

# Output Log
To facilitate tracking and locating problems, there will be some necessary log output during the whole translation process. After the translation command is executed completely, a  `.log`  log directory will be generated under the  `output.path`  directory. All logs are presented in the form of independent files, including the following log types：
|Filename|Description|
|:-|:-|
|filepaths.json|List of matched file paths|
|texts-error.json|Extract all unqualified translated texts<br /><br />📢📢📢：Scenarios such as using variables and js statements are not included|
|texts.json|Extract all qualified translated texts|
|translate-fail.json|List of failed translations|
|translate-error.json|List of incorrectly translated texts<br /><br />Currently, we can identify the exceptions lost after dynamic parameters translation|
|translate-success.json|List of successfully translated texts<br /><br />📢📢📢：In incremental translation mode, only the untranslated text will be included, and the text which has been translated will not be included|
|langCode.json|An independent language pack for a target language<br /><br />When  `output.langType == 'single'` , a single language pack of target language will be generated in the log directory|
|langs.json|Aggregated language pack<br /><br />When  `output.langType == 'multiple'` , the aggregated language pack will be generated in the log directory|

# Q&A

## 1. Why do dynamic parameters (interpolation variables) not support object attribute resolution?
Sample code
```js
// Object attribute resolution
i18n('我叫{name}，今年{age}岁，来自{base}，是一名{job}', {
  name: '王尼玛',
  age: 22,
  base: '火星',
  job: '码农',
})

// Resolution of subscripts in the current library
i18n('我叫{0}，今年{1}岁，来自{2}，是一名{3}',
  '王尼玛',
  '22',
  '火星',
  '码农',
)
```
The main reason is that the text contains attribute names, which is not conducive to translation through third-party platforms. The Chinese translation of the above example is OK. If it is translated from English to Chinese or other languages, the attribute names in the dynamic parameters will also be translated, which is the problem

Example of object attribute resolution
```js
// The text to be translated is in Chinese
const zh = '我叫{name}，今年{age}岁，来自{base}，是一名{job}'

// Translated into English through Baidu-Translation, it seems OK
const zhToEn = `My name is {name}. I'm {age} years old. I'm from {base}. I'm a {job} `

// Then translate the above English into Chinese through Baidu-Translation, we can find that the translation of {job} has problems, and different translation platforms may have different problems
const enToZh = '我的名字是｛name｝。我{age}岁。我来自{base}。我是{工作}'
```
Let's take a look at the example of subscript parsing
```js
// The text to be translated is in Chinese
const zh = '我叫{0}，今年{1}岁，来自{2}，是一名{3}'

// Translated into English through Baidu-Translation
const zhToEn = `My name is {0}. I'm {1} years old. I'm from {2}. I'm a {3}`

// Translate the above English into Chinese through Baidu-Translation, and the above parameters will not be mismatched
const enToZh = '我的名字是｛0｝。我是｛1｝岁。我来自｛2｝。我是｛3｝'
```
Although machine translation can not achieve 100% accuracy, it can make unnecessary mistakes as much as possible
## 2. Is it necessary to separate dynamic parameters types **Date** and **Time**?
Personally, I don't think it is necessary, but it has been implemented in the design. You can choose to use it flexibly at your discretion. Of course, it is not ruled out that some business scenarios will be more convenient to deal with separately
# Changelog

## [1.4.0] - 2022-xx-xx

### Added

* Add English document and set it as default document
* Add  `-P` | `--path`  parameter to initialization command and translation command to support flexible specification of configuration file path


### Changed

## [1.3.2] - 2022-09-24

### Fixed

* Fix unexpected generation of similar to  `xxx.jso`  folder after executing translation command in Windows system


## [1.3.1] - 2022-09-21

### Fixed

* Fix initialization command reporting an exception in Windows system


## [1.3.0] - 2022-09-13

### Added

* Add a new log output type: List of incorrectly translated texts
* Add  `withI18N`  function API to support server scenarios
* Add dynamic parameters type tags and type formatting callback functions
   * Support dynamic parameters markers of Number, Currency, Date, Time, Plural, etc
   * `setI18N`  added  `formatNumber`, `formatCurrency`, `formatDate`, `formatTime`, `formatPlural`  and other attributes


### Changed

* `translate-error.json`  is changed from **Translation failed** to **translation error** type, and **Translation failed** is identified by  `translate-fail.json` 


### Fixed

* Fix  `baiduConfig.delay`  does not take effect when multiple languages are switched


## [1.2.1] - 2022-07-07

### Fixed

* Fix execute command error: `Error: Cannot find module 'md5-node'`


## [1.2.0] - 2022-07-05

### Added

* Add time consuming statistics output of translation command execution
* New [Output Log](#output-log) document description and new output log type: List of matched file paths
* Add  `incremental translation`  mode
   * This mode is enabled by default and can be closed through the command parameter  `--non-incremental` 
   * Support for translating only untranslated text in the target language
   * Support intelligent removal of translated but unused text in language pack
* Add the  `setI18N`  function parameters attribute  `beginIndex` to specify the starting subscript of the dynamic parameters
* Add  `output.indentSize`  configuration attribute to specify the number of indented spaces in the output file
* Add  `baiduConfig.delay`  configuration attribute to set the delay time of Baidu-Translation
* New matching rule constraint: the translated text cannot contain the special character  `\t`


### Changed

* Optimize the command line not input command only input parameter  `-L` | `--locale`  can also display the corresponding language prompts
   * `npx i18n -L en`
   * `npx i18n --locale en`
* Optimize the translation failure output log（`translate-error.json`）given specific cause failure
* Adjust the maximum number of characters requested for batch translation of Baidu-Translation interface to  `3000`


### Fixed

* Fix  `setI18N`  setting a single attribute will cause other attribute states to be lost
* Fix translation exceptions caused by translation text containing  `\t`  special characters


## [1.1.1] - 2022-06-25

### Fixed

* Fix the problem that the picture does not appear in the document


## [1.1.0] - 2022-06-25

### Added

* Add  `README`  description document
* The new  `output.langType`  configuration item supports generating language pack in different formats
* Add  `from`, `to`, `codeLocaleMap`  Baidu-Translation configuration items
* New  `funcName`  configuration item supports user-defined matching function name


### Changed

* Configuration item  `filterFile`  has been deprecated and replaced by  `fileRegExp` 


### Removed

* Remove  `got`, `walk`, `chalk`, `lodash`  and other dependencies


### Fixed

* Fix the format error of the log file （translate-success.json） when the text contains  `.` 


## [1.0.0] - 2022-06-13

### Added

* Add command line parameters for language switching
* New  `i18n`  and  `setI18N`  function API
* Add the basic implementation of  `Command Line Tool` 


# LICENSE
[MIT](./LICENSE)

Copyright (c) 2022-present Eyelly Wu