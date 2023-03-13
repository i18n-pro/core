
# Changelog

<details >
  <summary>Table of Contents</summary>

  &emsp;&emsp;[[2.0.0] - 2023-0x-xx](#[200]---2023-0x-xx)<br/>
  &emsp;&emsp;&emsp;&emsp;[Changed](#changed)<br/>
  &emsp;&emsp;&emsp;&emsp;[Added](#added)<br/>
  &emsp;&emsp;[[1.3.2] - 2022-09-24](#[132]---2022-09-24)<br/>
  &emsp;&emsp;&emsp;&emsp;[Fixed](#fixed)<br/>
  &emsp;&emsp;[[1.3.1] - 2022-09-21](#[131]---2022-09-21)<br/>
  &emsp;&emsp;&emsp;&emsp;[Fixed](#fixed)<br/>
  &emsp;&emsp;[[1.3.0] - 2022-09-13](#[130]---2022-09-13)<br/>
  &emsp;&emsp;&emsp;&emsp;[Added](#added)<br/>
  &emsp;&emsp;&emsp;&emsp;[Changed](#changed)<br/>
  &emsp;&emsp;&emsp;&emsp;[Fixed](#fixed)<br/>
  &emsp;&emsp;[[1.2.1] - 2022-07-07](#[121]---2022-07-07)<br/>
  &emsp;&emsp;&emsp;&emsp;[Fixed](#fixed)<br/>
  &emsp;&emsp;[[1.2.0] - 2022-07-05](#[120]---2022-07-05)<br/>
  &emsp;&emsp;&emsp;&emsp;[Added](#added)<br/>
  &emsp;&emsp;&emsp;&emsp;[Changed](#changed)<br/>
  &emsp;&emsp;&emsp;&emsp;[Fixed](#fixed)<br/>
  &emsp;&emsp;[[1.1.1] - 2022-06-25](#[111]---2022-06-25)<br/>
  &emsp;&emsp;&emsp;&emsp;[Fixed](#fixed)<br/>
  &emsp;&emsp;[[1.1.0] - 2022-06-25](#[110]---2022-06-25)<br/>
  &emsp;&emsp;&emsp;&emsp;[Added](#added)<br/>
  &emsp;&emsp;&emsp;&emsp;[Changed](#changed)<br/>
  &emsp;&emsp;&emsp;&emsp;[Removed](#removed)<br/>
  &emsp;&emsp;&emsp;&emsp;[Fixed](#fixed)<br/>
  &emsp;&emsp;[[1.0.0] - 2022-06-13](#[100]---2022-06-13)<br/>
  &emsp;&emsp;&emsp;&emsp;[Added](#added)<br/>

</details>

## [2.0.0] - 2023-0x-xx

### Changed

* 调整API命名
   * 遵循小驼峰命名规则
      * `setI18N` → `setI18n`
      * `withI18N` → `withI18n`
   * 更简洁
      * `i18n` → `t`
* 调整 `setI18n` 用法
   *  `setI18n` 函数只能动态修改 `locale` 和 `langs` ，其他的属性均由 `initI18n` 首次调用定义，后续不可更改
   * 增加返回参数，会返回当前命名空间下的所有配置状态
* 设置命令行语言默认为英文


### Added

* 添加对命名空间的支持（非兼容更新）
   * 新增 `initI18n` 函数用于获取原有的核心的 `t` 、 `setI18n` 、 `withI18n` 函数
   * 新增 `namespace` 属性用于支持命名空间
* 新增翻译执行后，控制台输出内容对不同日志类型的数量统计显示
* 新增如下翻译平台的支持
   * 谷歌
   * 微软
   * 阿里
   * 腾讯
   * 有道
* 新增英文文档，并设置为默认语言文档
* Add  `-P` | `--path`  parameter to initialization command and translation command to support flexible specification of configuration file path


## [1.3.2] - 2022-09-24

### Fixed

* Fix unexpected generation of similar to  `xxx.jso`  folder after executing translation command in Windows system


## [1.3.1] - 2022-09-21

### Fixed

* Fix initialization command reporting an exception in Windows system


## [1.3.0] - 2022-09-13

### Added

* Add a new log output type: List of incorrectly translated texts
* Add  `withI18n`  function API to support server scenarios
* Add dynamic parameters type tags and type formatting callback functions
   * Support dynamic parameters markers of Number, Currency, Date, Time, Plural, etc
   * `setI18n`  added  `formatNumber`, `formatCurrency`, `formatDate`, `formatTime`, `formatPlural`  and other attributes


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
* Add the  `setI18n`  function parameters attribute  `beginIndex` to specify the starting subscript of the dynamic parameters
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

* Fix  `setI18n`  setting a single attribute will cause other attribute states to be lost
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
* New  `i18n`  and  `setI18n`  function API
* Add the basic implementation of  `Command Line Tool` 

