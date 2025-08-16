
# Changelog


English | [简体中文](https://github.com/i18n-pro/core/blob/v3.0.0-alpha.3/docs/dist/CHANGELOG_zh-CN.md)


<details >
  <summary>Table of Contents</summary>

  &emsp;&emsp;[[3.0.0] - 2025-05-xx](#300---2025-05-xx)<br/>
  &emsp;&emsp;&emsp;&emsp;[Command Line Tool](#300-command-line-tool)<br/>
  &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;[Added](#300-command-line-tool-added)<br/>
  &emsp;&emsp;&emsp;&emsp;[API](#300-api)<br/>
  &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;[Changed](#300-api-changed)<br/>
  &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;[Added](#300-api-added)<br/>
  &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;[Removed](#300-api-removed)<br/>
  &emsp;&emsp;[[2.1.1] - 2024-08-01](#211---2024-08-01)<br/>
  &emsp;&emsp;&emsp;&emsp;[API](#211-api)<br/>
  &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;[Fixed](#211-api-fixed)<br/>
  &emsp;&emsp;[[2.1.0] - 2023-10-12](#210---2023-10-12)<br/>
  &emsp;&emsp;&emsp;&emsp;[Command Line Tool](#210-command-line-tool)<br/>
  &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;[Added](#210-command-line-tool-added)<br/>
  &emsp;&emsp;[[2.0.0] - 2023-06-07](#200---2023-06-07)<br/>
  &emsp;&emsp;&emsp;&emsp;[Command Line Tool](#200-command-line-tool)<br/>
  &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;[Changed](#200-command-line-tool-changed)<br/>
  &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;[Added](#200-command-line-tool-added)<br/>
  &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;[Fixed](#200-command-line-tool-fixed)<br/>
  &emsp;&emsp;&emsp;&emsp;[API](#200-api)<br/>
  &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;[Changed](#200-api-changed)<br/>
  &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;[Added](#200-api-added)<br/>
  &emsp;&emsp;&emsp;&emsp;[Documentation](#200-documentation)<br/>
  &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;[Changed](#200-documentation-changed)<br/>
  &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;[Added](#200-documentation-added)<br/>
  &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;[Fixed](#200-documentation-fixed)<br/>
  &emsp;&emsp;[[1.3.2] - 2022-09-24](#132---2022-09-24)<br/>
  &emsp;&emsp;&emsp;&emsp;[Command Line Tool](#132-command-line-tool)<br/>
  &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;[Fixed](#132-command-line-tool-fixed)<br/>
  &emsp;&emsp;[[1.3.1] - 2022-09-21](#131---2022-09-21)<br/>
  &emsp;&emsp;&emsp;&emsp;[Command Line Tool](#131-command-line-tool)<br/>
  &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;[Fixed](#131-command-line-tool-fixed)<br/>
  &emsp;&emsp;[[1.3.0] - 2022-09-13](#130---2022-09-13)<br/>
  &emsp;&emsp;&emsp;&emsp;[Command Line Tool](#130-command-line-tool)<br/>
  &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;[Changed](#130-command-line-tool-changed)<br/>
  &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;[Added](#130-command-line-tool-added)<br/>
  &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;[Fixed](#130-command-line-tool-fixed)<br/>
  &emsp;&emsp;&emsp;&emsp;[API](#130-api)<br/>
  &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;[Added](#130-api-added)<br/>
  &emsp;&emsp;[[1.2.1] - 2022-07-07](#121---2022-07-07)<br/>
  &emsp;&emsp;&emsp;&emsp;[Command Line Tool](#121-command-line-tool)<br/>
  &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;[Fixed](#121-command-line-tool-fixed)<br/>
  &emsp;&emsp;[[1.2.0] - 2022-07-05](#120---2022-07-05)<br/>
  &emsp;&emsp;&emsp;&emsp;[Command Line Tool](#120-command-line-tool)<br/>
  &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;[Changed](#120-command-line-tool-changed)<br/>
  &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;[Added](#120-command-line-tool-added)<br/>
  &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;[Fixed](#120-command-line-tool-fixed)<br/>
  &emsp;&emsp;&emsp;&emsp;[API](#120-api)<br/>
  &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;[Added](#120-api-added)<br/>
  &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;[Fixed](#120-api-fixed)<br/>
  &emsp;&emsp;&emsp;&emsp;[Documentation](#120-documentation)<br/>
  &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;[Added](#120-documentation-added)<br/>
  &emsp;&emsp;[[1.1.1] - 2022-06-25](#111---2022-06-25)<br/>
  &emsp;&emsp;&emsp;&emsp;[Documentation](#111-documentation)<br/>
  &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;[Fixed](#111-documentation-fixed)<br/>
  &emsp;&emsp;[[1.1.0] - 2022-06-25](#110---2022-06-25)<br/>
  &emsp;&emsp;&emsp;&emsp;[Command Line Tool](#110-command-line-tool)<br/>
  &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;[Changed](#110-command-line-tool-changed)<br/>
  &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;[Added](#110-command-line-tool-added)<br/>
  &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;[Fixed](#110-command-line-tool-fixed)<br/>
  &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;[Removed](#110-command-line-tool-removed)<br/>
  &emsp;&emsp;&emsp;&emsp;[Documentation](#110-documentation)<br/>
  &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;[Added](#110-documentation-added)<br/>
  &emsp;&emsp;[[1.0.0] - 2022-06-13](#100---2022-06-13)<br/>
  &emsp;&emsp;&emsp;&emsp;[Command Line Tool](#100-command-line-tool)<br/>
  &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;[Added](#100-command-line-tool-added)<br/>
  &emsp;&emsp;&emsp;&emsp;[API](#100-api)<br/>
  &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;[Added](#100-api-added)<br/>

</details>

## [3.0.0] - 2025-05-xx

<h3 id="300-command-line-tool">Command Line Tool</h3>

<h4 id="300-command-line-tool-added">Added</h4>

* The command line configuration file supports writing in  `TypeScript` . Starting from version  `v3.0.0` , the configuration file generated by the initialization command execution is  `i18nrc.ts`  by default, but the old version of  `i18nrc.js`  is still compatible.


<h3 id="300-api">API</h3>

<h4 id="300-api-changed">Changed</h4>

*  `setI18n` 
   * Support dynamic loading of language pack when switching languages
   * Adjusted from synchronous execution to asynchronous execution


<h4 id="300-api-added">Added</h4>

* The  `langs`  parameter of  `initI18n`  supports dynamic loading of language pack in the form of callback functions.
*  `t` Add new attributes
   * **<code>t</code>**：Support  `custom-key`  scenarios
   * **<code>withLocale</code>**：Alternative  `withI18n` 


<h4 id="300-api-removed">Removed</h4>

* Remove  `withI18n` 


## [2.1.1] - 2024-08-01

<h3 id="211-api">API</h3>

<h4 id="211-api-fixed">Fixed</h4>

* Fix the issue where  `Interpolation Variable`  are incorrectly parsed when there are spaces in keywords of the  `Plural`  type
```js
 // Similar to the following
 t('there have {p0 Country or Region} in the list', 100)
```



## [2.1.0] - 2023-10-12

<h3 id="210-command-line-tool">Command Line Tool</h3>

<h4 id="210-command-line-tool-added">Added</h4>

* The command line configuration adds  `input`  config, which supports filtering files using  `glob`  syntax [#4](https://github.com/i18n-pro/core/issues/4)


## [2.0.0] - 2023-06-07

<h3 id="200-command-line-tool">Command Line Tool</h3>

<h4 id="200-command-line-tool-changed">Changed</h4>

* Set the command line language defaults to English
* Adjust the command line to initialize the default configuration template


<h4 id="200-command-line-tool-added">Added</h4>

* After the execution of the new translation, the output content of the console is displayed on the number of different log types
* Added the following support of the following translation platform
   * Google x
   * OpenAI
   * Google
   * Microsoft
   * Alibaba Cloud
   * Tencent
   * Youdao
* Add  `-P` | `--path`  parameter to initialization command and translation command to support flexible specification of configuration file path


<h4 id="200-command-line-tool-fixed">Fixed</h4>

* Fix when the difference between  `Language code`  and  `locale` , identify the error of the translated language pack, and eventually lead to repeated translation
* Fix as the following scene extraction  `text`  abnormal
 
```js
    // Can't extract 'b'
    const text = t('a', t('b'))
```



<h3 id="200-api">API</h3>

<h4 id="200-api-changed">Changed</h4>

* Adjust the API naming
   * Follow the naming rules of the small hump
      * `setI18N` → `setI18n`
      * `withI18N` → `withI18n`
   * More concise
      * `i18n` → `t`
* Adjust  `setI18n`  usage
   *  `setI18n`  Function can only modify  `locale`  and  `langs`  dynamically. The other attributes are first called and defined by  `initI18n` 
   * Increase the return parameters, and will return all the configuration status in the current name space


<h4 id="200-api-added">Added</h4>

* Added support for namespaces
   * New  `initI18n`  function is used to obtain the original core  `t` ,  `setI18n` ,  `withI18n`  function
   * New  `namespace`  attribute is used to support namespace
   * Add  `t`  parameter to  `Formatter`  of  `Variable Interpolation` 


<h3 id="200-documentation">Documentation</h3>

<h4 id="200-documentation-changed">Changed</h4>

* Updated the format of the  `Changelog`  documentation, distinguishing the contents updated independently in  `Command Line Tool` ,  `API` , and  `Documentation` 


<h4 id="200-documentation-added">Added</h4>

* Added English documents and set it to the default language documentation


<h4 id="200-documentation-fixed">Fixed</h4>

* Fixed the navigation error caused by generating the same anchor point in the  `Changelog`  documentation


## [1.3.2] - 2022-09-24

<h3 id="132-command-line-tool">Command Line Tool</h3>

<h4 id="132-command-line-tool-fixed">Fixed</h4>

* Fix unexpected generation of similar to  `xxx.jso`  folder after executing translation command in Windows system [#2](https://github.com/i18n-pro/core/issues/2)


## [1.3.1] - 2022-09-21

<h3 id="131-command-line-tool">Command Line Tool</h3>

<h4 id="131-command-line-tool-fixed">Fixed</h4>

* Fix initialization command reporting an exception in Windows system [#1](https://github.com/i18n-pro/core/issues/1)


## [1.3.0] - 2022-09-13

<h3 id="130-command-line-tool">Command Line Tool</h3>

<h4 id="130-command-line-tool-changed">Changed</h4>

* `translate-error.json`  is changed from **Translation failed** to **translation error** type, and **Translation failed** is identified by  `translate-fail.json` 


<h4 id="130-command-line-tool-added">Added</h4>

* Added a new log output type: the list of incorrectly translated text


<h4 id="130-command-line-tool-fixed">Fixed</h4>

* Fix  `baiduConfig.delay`  does not take effect when multiple languages are switched


<h3 id="130-api">API</h3>

<h4 id="130-api-added">Added</h4>

* Add  `withI18N`  function API to support server scenarios
* Add  `Interpolation Variable`  type tag and type  `Formatter` 
   * Supports number, currency, date, time, plural, and other types of  `Interpolation Variable`  tags
   * `setI18N`  added  `formatNumber`, `formatCurrency`, `formatDate`, `formatTime`, `formatPlural`  and other attributes


## [1.2.1] - 2022-07-07

<h3 id="121-command-line-tool">Command Line Tool</h3>

<h4 id="121-command-line-tool-fixed">Fixed</h4>

* Fix execute command error: `Error: Cannot find module 'md5-node'`


## [1.2.0] - 2022-07-05

<h3 id="120-command-line-tool">Command Line Tool</h3>

<h4 id="120-command-line-tool-changed">Changed</h4>

* Optimize the command line not input command only input parameter  `-L` | `--locale`  can also display the corresponding language prompts
   * npx i18n -L zh
   * npx i18n --locale zh
* Optimize the translation failure output log `translate-error.json` given specific cause failure
* Adjust the maximum number of characters requested for batch translation of Baidu-Translation interface to  `3000`


<h4 id="120-command-line-tool-added">Added</h4>

* Add time consuming statistics output of translation command execution
* Added a new translation log type  `filepaths.json` : the list of file paths that are matched
* Add  `incremental translation`  mode
   * This mode is enabled by default and can be closed through the command parameter  `--non-incremental` 
   * Supports translating only the text that has not been translated in the target language
   * Supports intelligently removing the translated text that has not been used in the language pack
* Add  `output.indentSize`  configuration attribute to specify the number of indented spaces in the output file
* Add  `baiduConfig.delay`  configuration attribute to set the delay time of Baidu-Translation
* Newly added rules constraints:  `text`  cannot include special characters  `\t`


<h4 id="120-command-line-tool-fixed">Fixed</h4>

* Fix  `text`  contains  `\t`  special characters lead to abnormal translation


<h3 id="120-api">API</h3>

<h4 id="120-api-added">Added</h4>

* Add the  `beginIndex` function parameter attribute  `setI18N`  to specify the starting index of  `Interpolation Variable` 


<h4 id="120-api-fixed">Fixed</h4>

* Fix  `setI18N`  setting a single attribute will cause other attribute states to be lost


<h3 id="120-documentation">Documentation</h3>

<h4 id="120-documentation-added">Added</h4>

* Added documentation for [Translation Log](https://github.com/i18n-pro/core/blob/v3.0.0-alpha.3/docs/dist/OUTPUT_LOG.md)


## [1.1.1] - 2022-06-25

<h3 id="111-documentation">Documentation</h3>

<h4 id="111-documentation-fixed">Fixed</h4>

* Fix the problem that the picture does not appear in the document


## [1.1.0] - 2022-06-25

<h3 id="110-command-line-tool">Command Line Tool</h3>

<h4 id="110-command-line-tool-changed">Changed</h4>

* Configuration item  `filterFile`  has been deprecated and replaced by  `fileRegExp` 


<h4 id="110-command-line-tool-added">Added</h4>

* The new  `output.langType`  configuration item supports generating language pack in different formats
* Add  `from`, `to`, `codeLocaleMap`  Baidu-Translation configuration items
* New  `funcName`  configuration item supports user-defined matching function name


<h4 id="110-command-line-tool-fixed">Fixed</h4>

* Fixed the formatting error in the translation log file  `translate-success.json`  when the text contains  `.` 


<h4 id="110-command-line-tool-removed">Removed</h4>

* Remove  `got`, `walk`, `chalk`, `lodash`  and other dependencies


<h3 id="110-documentation">Documentation</h3>

<h4 id="110-documentation-added">Added</h4>

* Add  `README`  description document


## [1.0.0] - 2022-06-13

<h3 id="100-command-line-tool">Command Line Tool</h3>

<h4 id="100-command-line-tool-added">Added</h4>

* Add the basic implementation of  `Command Line Tool` 
* Add command line parameters for language switching


<h3 id="100-api">API</h3>

<h4 id="100-api-added">Added</h4>

* New  `i18n`  and  `setI18N`  function API

