<div style="text-align: center;">
  
[![logo](https://s3.bmp.ovh/imgs/2022/06/25/3a1c742f283cf28e.png 'logo')](https://github.com/eyelly-wu/i18n-pro)


English | [简体中文](./readme_zh-CN)


  <p style="font-size: 18px;">Lightweight, simple and flexible automatic translation tool</p>

[![npm-version](https://img.shields.io/npm/v/i18n-pro.svg?style=flat-square 'npm-version')](https://www.npmjs.com/package/i18n-pro)
[![npm-download](https://img.shields.io/npm/dm/i18n-pro 'npm-download')](https://www.npmjs.com/package/i18n-pro) 
[![npm-quality-score](https://img.shields.io/npms-io/quality-score/i18n-pro 'npm-quality-score')](https://www.npmjs.com/package/i18n-pro) 
[![bundlesize](https://img.shields.io/bundlephobia/minzip/i18n-pro?color=brightgreen&style=plastic 'bundlesize')](https://bundlephobia.com/package/i18n-pro) 
[![dependenices](https://img.shields.io/librariesio/github/eyelly-wu/i18n-pro?style=plastic 'dependenices')](https://www.npmjs.com/package/i18n-pro?activeTab=dependencies) 
[![github-stars](https://img.shields.io/github/stars/eyelly-wu/i18n-pro?style=social 'github-stars')](https://github.com/eyelly-wu/i18n-pro/stargazers) 
[![last-commit](https://img.shields.io/github/last-commit/eyelly-wu/i18n-pro 'last-commit')](https://github.com/eyelly-wu/i18n-pro/commits/main) 
[![github-issues](https://img.shields.io/github/issues-raw/eyelly-wu/i18n-pro 'github-issues')](https://github.com/eyelly-wu/i18n-pro/issues) 
[![codecov](https://codecov.io/gh/eyelly-wu/i18n-pro/branch/main/graph/badge.svg?token=758C46SIE7 'codecov')](https://codecov.io/gh/eyelly-wu/i18n-pro) 
[![lgtm-alerts](https://img.shields.io/lgtm/alerts/g/eyelly-wu/i18n-pro.svg?logo=lgtm&logoWidth=18 'lgtm-alerts')](https://lgtm.com/projects/g/eyelly-wu/i18n-pro/alerts/) 
[![lgtm-quality](https://img.shields.io/lgtm/grade/javascript/g/eyelly-wu/i18n-pro.svg?logo=lgtm&logoWidth=18 'lgtm-quality')](https://lgtm.com/projects/g/eyelly-wu/i18n-pro/context:javascript) 

</div>

# vision
In order to make access internationalization easy and pleasant 😄💪🏻

# characteristic
* Light weight:[![bundlesize](https://img.shields.io/bundlephobia/minzip/i18n-pro?color=brightgreen&style=plastic 'bundlesize')](https://bundlephobia.com/package/i18n-pro)
* Simple: low learning cost, easy to use
* Flexible: support dynamic parameters, unique type tags and formatting callbacks (number, currency, date, time, plural)
* Automatic translation: one command can automatically extract the text and translate it into a language package
* Keyless: No need to manually define the key. The text to be translated is the key


# Live Demo
* [Open in CodeSandbox](https://codesandbox.io/p/github/eyelly-wu/i18n-pro-react-demo/main)
* [![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz_small.svg 'Open in StackBlitz')](https://stackblitz.com/edit/i18n-pro-react-demo)


# principle
The library is mainly composed of two parts
* Command Line Tools
* Function API

**Command Line Tools**：Parse the text to be translated according to the specified rules, translate the text to the specified target language through the translation platform, and finally generate the language package file

A simple example of parsing [](#匹配规则) text is as follows

```js
// Normal string
i18n('xxx')
i18n("xxx")
i18n(`xxx`)

// Support dynamic parameters
i18n('xxx{0}xxx', param1)
i18n('xxx{0}xxx{1}xxx{2}xxx', param1, param2, param3)

// Dynamic parameter type marker
i18n('The number of users has reached {n0}', 100000000) // Number Type
i18n('The selling price is {c0}', 14999) // Currency type
i18n('Today's date is {d0}', new Date()) // Date Type
i18n('Current time: {t0}', new Date()) // Time Type
i18n('I have {P0 apples}, {P1 banana} and {P2 pears}', 5, 4, 3) // Plural type
```

**Function API**：Connect the internationalization language pack into the project, which is composed of  `i18n`, `setI18N`  and  `withI18N` 
* **i18n**：It is used to package the translated text to achieve internationalization, and also serves as an identifier for the command line to match the rules of translated text
* **setI18N**：Set language, language pack and other configuration items
* **withI18N**：It is applicable to the server. Each interface response needs to be internationalized

Therefore,  `Command Line Tools`  and  `Function API`  work better together. It is precisely because of this structural design that  `i18n-pro`  libraries can be easily integrated into any  `JavaScript`  project

# usage

## 1. install

```bash
npm i i18n-pro
# perhaps
yarn add i18n-pro
# perhaps
pnpm i i18n-pro
```

## 2. Access function API
📢📢📢：This step mainly uses  `i18n`  function to wrap the text to be translated
> `Function API`  is constructed in the form of  `UMD` , and can be introduced through  `import`  or  `require` . This document mainly uses  `import`  as an example
### The form of mounting global objects

#### Reference function

```js
import { setI18N, i18n } from 'i18n-pro'

// Before applying page rendering logic
// Browser environment, note: if it is Node environment, you need to replace window with global
window.setI18N = setI18N
window.i18n = i18n
// The page rendering logic is applied later
```

#### Wrap the text to be translated with  `i18n` 

```js
// Translated text
const text = i18n('Hello World')
```

### Form of modular introduction
The only difference from mounting global objects is that each module needs to be introduced separately, and there is no difference in other uses
```js
import { setI18N, i18n } from 'i18n-pro'
// Each module needs to be introduced as above

// Translated text
const text = i18n('你好世界')
```


## 3. Initialize command line configuration file
Enter the following command at the command line terminal,[](#命令列表)
```bash
npx i18n init 
```
Then a  `i18nrc.js`  file will be generated in the current directory

## 4. Adjust  `i18nrc.js`  configuration
Adjust the configuration items in the configuration file according to the requirements[](#命令列表)

## 5. Execute translation command

```bash
npx i18n t 
```
If the command is executed successfully, the language pack file will be generated in the specified directory

## 6. Importing Language Pack Files
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
    // ...More languages
  },
})
// The next step is to apply page rendering logic
```
If the generated language pack is in the form of aggregation （`output.langType == 'single'`）, the operation is as follows:
```js
import langs from './i18n/langs.json'

setI18N({
  locale: 'en',
  langs,
})
// The next step is to apply page rendering logic
```
So far, the project has been fully internationalized. The  `locale`  above is designated as any of the target languages, and the translated content can be seen on the page. Later, if there is new translation text in the project (you need to wrap it with  `i18n`  function), you just need to execute the translation command  `npx i18n t`  again to generate the latest language package

## 7. switch language
Under normal circumstances, it is OK to execute the following methods, but the rendered content on the page will not be updated. Only when the  `i18n`  function of the corresponding text is re executed can the text corresponding to the new language be displayed
```js
setI18N({
  locale: 'en', // Set the specified language
})
```
Although some UI libraries (such as  `React`) can use its  `context`  feature to statically update page content, for translated text content that is not in the component, there will be additional processing costs to statically update it. For example, in the following scenario, the component uses attributes that contain translated content externally
```js
// To achieve static update of this attribute, additional processing is required
// This is just a description of this situation, not a clear solution
const FOO_TEXT = i18n('Static Text Properties')

function App(){
  return (
    <>
      {FOO_TEXT}
    </>
  )
}
```
Therefore, for most scenarios, when switching languages on the page, it is recommended to **Refresh Directly** the whole page (if there is a good solution, please inform 🤔）

## 8. DEMO
Hahaha, in addition to the  [Live Demo](#live-demo) above, the console output of the current library  `Command Line Tools`  is also connected to internationalization

You can read the English version through the command  `npx i18n h -L en` 
![demo](https://s3.bmp.ovh/imgs/2022/06/25/4412a87c79ba36a8.gif 'demo')
If you are interested, you can look at the source code
# command line

## 1.  `i18nrc.js`  configuration

### Basic configuration

|name|type|Required|Default|explain|
|-|-|:-|:-|:-|
|funcName|string|no|i18n|The command line matches the function name dx of the translated text<br /><br />If the  `i18n`  function is not renamed, it does not need to be adjusted here; otherwise, it is configured as the function name after renaming|
|entry|string|yes|-|Specify the translation file directory (absolute path)|
|fileRegExp|RegExp|no| `/.[jt]s$/` |Regular expressions matching file names<br /><br />Used to filter files to be translated|
|output|[Output](#output)|yes|-|Output file related configuration|
|baiduConfig|[BaiduConfig](#baiduconfig)|yes|-|Baidu Translation related configuration|

### Output

|name|type|Required|Default|explain|
|-|-|:-|:-|:-|
|path|string|yes|-|Directory generated by the language pack (absolute path)|
|langType|'single' \| 'multiple'|no|multiple|Format of output language pack file<br /><br />Assume the target language is  `['en', 'jp']` <br />**single**：Only one aggregated language pack file  `langs.json` will be generated. The format is as follows:<br />`{"en":{"xxx":"xxx"},"jp":{"xxx":"xxx"}}`<br /><br />**multiple**：Each target language will generate a corresponding language pack file, which corresponds to two files:  `en.json`， `jp.json` . The format is as follows:<br />`{"xxx":"xxx"}`|
|indentSize|number|no|2|Number of indented spaces in the language pack file|

### BaiduConfig

|name|type|Required|Default|explain|
|-|-|:-|:-|:-|
|appid|string|yes|-|APPID, [Registered account](http://api.fanyi.baidu.com/doc/21 'There are instructions in the document') application is required|
|key|string|yes|-|Key, as above|
|from|string|yes|-|Language code of the translated text (for example,  `zh` for Chinese,  `en` for English)<br /><br />[More languages](http://api.fanyi.baidu.com/doc/21 'Search "Language List"')，Search **List of languages**|
|to|string[]|yes|-|The target language code for translation, with the same format as above<br /><br />📢📢📢：If the target language is configured as  `['en']`, the generated file name (`output.langType=='multiple'`） is  `en.json`. When setting the language,  `locale`  must also be  `'en'`. If  `locale`  needs to be set as  `'en_US'` , it needs to be used in conjunction with  `codeLocaleMap` |
|codeLocaleMap|Record<string, string>|no|{}|Set the mapping relationship between language code and 'locale'<br /><br />For example, if the target language is  `['en']` and you want to set the value of 'locale' to  `'en_US'` , you need to configure  `codeLocaleMap`  to  `{"en":"en_US"}` , and the final generated file name (`output.langType=='multiple'`） will also become  `en_US.json` |

## 2.command

### Command List

|command|Abbreviation|usage|explain|
|-|-|:-|:-|
|init|-|`npx i18n init`|Initialize Profile|
|translate|t|`npx i18n translate` <br /> `npx i18n t`|Extract translated text, automatically translate and generate language packs|
|version|v|`npx i18n version`<br />`npx i18n v`|display version information|
|help|h|`npx i18n help`<br />`npx i18n h`|display help information|

### Command parameters

|Parameter name|Abbreviation|Parameter value|Applicable order|usage|explain|
|-|-|-|:-|:-|:-|
|--locale|-L|en \| zh|ALL|`npx i18n h -L en`<br />`npx i18n h --locale en`|Specify the command line display language<br /><br />The available languages are Chinese (zh)/English (en). The default is Chinese (zh)|
|--non-incremental|-|-|`t`<br />`translate`|`npx i18n t --non-incremental`|Turn off incremental translation mode<br /><br />⚠️⚠️⚠️： After the incremental translation mode is turned off, all texts will be retranslated, which will result in the loss of **Manual translation** (non translation platform translation) texts. Please consider using it carefully!!!|
|--path|-P|-|`init`<br />`t`<br />`translate`|`npx i18n init -P /xxx/xxx/xxx`<br />`npx i18n t -P /xxx/xxx/xxx`|Specify the configuration file path (the parameter is an absolute path)<br /><br />You only need to specify the path name. The default configuration file name is  `i18nrc.js`|

# Function API

## Function List
The following types are expressed in  `TypeScript`  syntax<table>
  <tr>
    <th>Function Name</th>
    <th>type</th>
    <th>explain</th>
  </tr>
  <tr>
    <td>i18n</td>
    <td>
      <code>
        <pre>
(
  text: string,
  ...args: Array&lt;string|number|unknow&gt;
) =&gt; string
        </pre>
      </code>
    </td>
    <td>
      Get internationalized text<br /><br />Internally, the translation text corresponding to <code>text</code> will be obtained from the language pack <code>(langs)</code> according to the current language <code>(locale)</code>, and the content of <code>text</code> itself will be directly displayed if the corresponding translation content is not matched<br /><b>text</b>：Text to be translated<br /><b>args</b>：It represents a dynamic parameter without number limitation. The <code>text</code> text needs to be received in the form of <code>{index}</code>. The <code>index</code> represents the position of the dynamic parameter, starting from 0 (you can customize the starting value in <code>setI18N</code>). The first parameter corresponds to 0, and the second parameter corresponds to 1, and so on<br /><br />for example：<code>
  i18n('这个男人叫{0}，意外获得了超能力，这个女人叫{1}，意外被{2}追杀，这个小孩叫{3}，意外遭遇了意外', '小帅', '小美', 'FBI',
                '小白')
</code><br />The execution result of the current language is： 这个男人叫小帅，意外获得了超能力，这个女人叫小美，意外被FBI追杀，这个小孩叫小白，意外遭遇了意外<br />The result of Baidu's translation into English is：The man's name is 小帅, and he accidentally obtained super power. The woman's name is 小美, and she was accidentally chased by FBI. The child's name is 小白, and she was accidentally hit by an accident
    </td>
  </tr>
  <tr>
    <td>setI18N</td>
    <td>
      <code>
        <pre>
(
    props: {
        locale?: string,
        langs?: Record<strng, Record<string, string>>,
        beginIndex?: number,
        formatNumber?: <a href="#FormatFunc">FormatFunc</a>,
        formatCurrency?: <a href="#FormatFunc">FormatFunc</a>,
        formatDate?: <a href="#FormatDateFunc">FormatDateFunc</a>,
        formatTime?: <a href="#FormatDateFunc">FormatDateFunc</a>,
        formaPlural?: <a href="#FormatPluralFunc">FormatPluralFunc</a>,
    }
) => void
        </pre>
      </code>
    </td>
    <td>
      Set language, language pack and other configuration items<br /><br /><b>locale</b>：Specify the current language<br /><b>langs</b>：Set Current Language Pack<br /><b>beginIndex</b>：Set the starting subscript of the dynamic parameter in the <code>i18n</code> function. The default is 0<br /><b>formatNumber</b>：Format the callback of dynamic parameter of type number, and the corresponding type tag is <b>n</b> or <b>N</b><br /><b>formatCurrency</b>：Format the callback of dynamic parameter of type amount of money, and the corresponding type tag is <b>c</b> or <b>C</b><br /><b>formatDate</b>：Format the callback of dynamic parameter of type date, and the corresponding type tag is <b>d</b> or <b>D</b><br /><b>formatTime</b>：Format the callback of dynamic parameter of type time, and the corresponding type tag is <b>t</b> or <b>T</b><br /><b>formaPlural</b>：Format the callback of dynamic parameter of type complex, and the corresponding type tag is <b>p</b> or <b>P</b><br /><br />📢📢📢：The value of <code>locale</code> corresponds to the language code by default. If you need to customize, please refer to the usage of <code>codeLocaleMap</code>
    </td>
  </tr>
  <tr>
    <td>withI18N</td>
    <td>
      <code>
        <pre>
(
    props:{
          locale: string
    }
) => ({ i18n })
        </pre>
      </code>
    </td>
    <td>
      Get i18n functions independent of the main program<br /><br />It is applicable to the server. Each interface response needs to be internationalized
    </td>
  </tr>
</table>

## Function Type

### FortmatFunc
Common format callback type
```ts
type FormatFunc = <T>(props:{
  locale: string, // Current language
  payload: string | number | unknow | T, // dynamic parameter 
}) => number | string
```

### FormatDateFunc
Format callback function type of date (time)
```ts
type FormatPluralFunc = <T>(props:{
  locale: string, // Current language
  payload: string | number | Date | unknow | T, // dynamic parameter 
}) => string
```

### FormatPluralFunc
Formatting callback function type of complex number
```ts
type FormatPluralFunc = <T>(props:{
  locale: string, // Current language
  payload: string | number | unknow | T, // dynamic parameter 
  text: string // A string that combines quantifiers and nouns by default. Languages that do not need plural processing can directly return this property
  keyword: string // Plural keyword
}) => string
```

# Matching Rules
requirement：
* The first parameter of the `i18n`  function can only be a pure string and cannot contain variables or js statements
* Cannot contain special characters such as  `\n` and `\t` 
* The beginning and end cannot contain spaces
* If string module syntax cannot be used

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

// Contains  \n  or  \t
i18n('x\nx')
i18n('x\tx')

// Include spaces before and after
i18n(' xxx')
i18n('xxx  ')
i18n(' xxx ')

// There are line breaks in the string template
i18n(`
xxx
`)
```
If string splicing is required, dynamic parameters can be used

```js
i18n('我叫{0}，今年{1}岁，来自{2}，是一名{3}', '王尼玛', '22', '火星', '码农')
```

# Output Log
To facilitate tracking and locating problems, there will be some necessary log output during the whole translation process. After the translation command is executed completely, a  `.log`  log directory will be generated under the  `output.path`  directory. All logs are presented in the form of independent files, including the following log types：
|文件名|说明|
|:-|:-|
|filepaths.json|List of matched file paths|
|texts-error.json|Extract all unqualified translated texts<br /><br />📢📢📢：Scenarios such as using variables and js statements are not included|
|texts.json|Extract all qualified translated texts|
|translate-fail.json|List of texts that failed to translate|
|translate-error.json|List of Text with Translation Errors<br /><br />Currently, we can identify the exceptions lost after dynamic parameter translation|
|translate-success.json|List of successfully translated texts<br /><br />📢📢📢：Only the translated text will be included. In incremental translation mode, the original translated text will not be included|
|langCode.json|An independent language pack for a target language<br /><br />When  `output.langType == 'single'` , a single language pack of target language will be generated in the log directory|
|langs.json|Aggregated Language Packs<br /><br />When  `output.langType == 'multiple'` , the aggregated language pack will be generated in the log directory|

# Q&A

## 1. Why do dynamic parameters (interpolation variables) not support object attribute resolution?
Sample code
```js
// Object Attribute Resolution
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

Example of Object Property Resolution
```js
// The text to be translated is in Chinese
const zh = '我叫{name}，今年{age}岁，来自{base}，是一名{job}'

// Translated into English through Baidu, it seems OK
const zhToEn = `My name is {name}. I'm {age} years old. I'm from {base}. I'm a {job} `

// Then through Baidu Translate, we can translate the above English into Chinese, and we can find that the translation of {job} has problems, and different translation platforms may have different problems
const enToZh = '我的名字是｛name｝。我{age}岁。我来自{base}。我是{工作}'
```
Let's take a look at the example of subscript parsing
```js
// The text to be translated is in Chinese
const zh = '我叫{0}，今年{1}岁，来自{2}，是一名{3}'

// Translated into English through Baidu
const zhToEn = `My name is {0}. I'm {1} years old. I'm from {2}. I'm a {3}`

// Translate the above parameters from English to Chinese through Baidu Translation
const enToZh = '我的名字是｛0｝。我是｛1｝岁。我来自｛2｝。我是｛3｝'
```
Although machine translation can not achieve 100% accuracy, it can also make unnecessary mistakes
## 2. Is it necessary to separate dynamic parameter types **date** from **time**?
Personally, I don't think it is necessary, but it has been implemented in the design. You can choose to use it flexibly at your discretion. Of course, it is not ruled out that some business scenarios will be more convenient to deal with separately
# Update Log

## [1.4.2] - 2022-xx-xx

### Added
* Add  `-P` | `--path`  parameter to initialization command and translation command, and support flexible specification of configuration file path

## [1.3.2] - 2022-09-24

### Fixed
* Fixed unexpected generation of class  `xxx.jso`  folder after executing translation command in Windows system

## [1.3.1] - 2022-09-21

### Fixed
* The repair initialization command reported an exception in the Windows system

## [1.3.0] - 2022-09-13

### Added
* Add a new log output type: list of text with incorrect translation
* Add  `withI18N`  function API to support server scenarios
* Add dynamic parameter type tags and type formatting callback functions

   * Support dynamic parameter markers of number, currency, date, time, plural, etc
   * `setI18N`  added  `formatNumber`, `formatCurrency`, `formatDate`, `formatTime`, `formatPlural`  and other attributes


### Changed
* `translate-error.json`  is changed from **Translation failed** to **translation error** type, and **Translation failed** is identified by  `translate-fail.json` 

### Fixed
* Fix  `baiduConfig.delay`  does not take effect when multiple languages are switched

## [1.2.1] - 2022-07-07

### Fixed
* The repair execution command reported an error: `Error: Cannot find module 'md5-node'`

## [1.2.0] - 2022-07-05

### Added
* Add time consuming statistics output of translation command execution
* New [Output Log](#Output Log) document description and new output log type: list of allocated file paths
* Add  `增量翻译`  mode

   * This mode is enabled by default and can be closed through the command parameter  `--non-incremental` 
   * Only untranslated texts in the target language are supported
   * Support intelligent removal of translated but unused text in language packs

* Add the  `setI18N`  function parameter attribute  `beginIndex` to specify the starting subscript of the dynamic parameter
* Added  `output.indentSize`  configuration attribute to specify the number of indented spaces in the output file
* Add  `baiduConfig.delay`  configuration attribute to set the delay time of Baidu Translation
* New matching rule constraint: the translated text cannot contain the special character  `\t`

### Changed
* The optimization command line can also display prompts in the corresponding language by entering only the parameter  `-L` | `--locale`  without entering the command

   * `npx i18n -L en`
   * `npx i18n --locale en`

* The output log （`translate-error.json`） of optimization translation failure gives the specific reason for the failure
* Adjust the maximum number of characters requested for batch translation of Baidu Translation Interface to  `3000`

### Fixed
* Fixing  `setI18N`  setting a single attribute will cause other attribute states to be lost
* Fix translation exceptions caused by translation text containing  `\t`  special characters

## [1.1.1] - 2022-06-25

### Fixed
* Fix the problem that the picture does not appear in the document

## [1.1.0] - 2022-06-25

### Added
* Add  `README`  description document
* The new  `output.langType`  configuration item supports generating language packs in different formats
* Add configuration items of  `from`, `to`, `codeLocaleMap`  Baidu Translation
* New  `funcName`  configuration item supports user-defined matching function name

### Changed
* Configuration item  `filterFile`  is obsolete and replaced by  `fileRegExp` 

### Removed
* Removed  `got`, `walk`, `chalk`, `lodash`  and other dependent libraries

### Fixed
* Fix the format error of the log file （translate-success.json） when the text contains  `.` 

## [1.0.0] - 2022-06-13

### Added
* Add command line parameters for language switching
* New  `i18n`  and  `setI18N`  function API
* Add the basic implementation of  `Command Line Tools` 

# LICENSE
[MIT](./LICENSE)

Copyright (c) 2022-present Eyelly Wu