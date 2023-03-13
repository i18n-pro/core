
# 更新日志

<details >
  <summary>目录</summary>

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
* 初始化命令和翻译命令添加 `-P` | `--path` 参数，用于支持灵活指定配置文件路径


## [1.3.2] - 2022-09-24

### Fixed

* 修复在 Windows 系统中执行翻译命令后会意外生成类 `xxx.jso` 文件夹


## [1.3.1] - 2022-09-21

### Fixed

* 修复初始化命令在 Windows 系统中报异常


## [1.3.0] - 2022-09-13

### Added

* 添加新的日志输出类型：翻译有误的文本列表
* 添加 `withI18n` 函数API用于支持服务端场景
* 添加动态参数类型标记和类型格式化回调函数
   * 支持 数字、货币、日期、时间、复数 等类型的动态参数标记
   * `setI18n` 添加了 `formatNumber`、`formatCurrency`、`formatDate`、`formatTime`、`formatPlural` 等属性


### Changed

* `translate-error.json` 由**翻译失败**改为**翻译错误**类型，**翻译失败**由 `translate-fail.json` 来标识


### Fixed

* 修复 `baiduConfig.delay` 在多个语言切换时不生效


## [1.2.1] - 2022-07-07

### Fixed

* 修复执行命令报错：`Error: Cannot find module 'md5-node'`


## [1.2.0] - 2022-07-05

### Added

* 新增翻译命令执行的耗时统计输出
* 新增[输出日志](#输出日志)文档说明以及新的输出日志类型：配到的文件路径列表
* 新增 `增量翻译` 模式
   * 该模式默认开启，可通过命令参数 `--non-incremental` 关闭
   * 支持只翻译目标语言未翻译过的文本
   * 支持智能移除语言包中已翻译却未再使用的文本
* 新增 `setI18n` 函数参数属性 `beginIndex`，用于指定动态参数的起始下标
* 新增 `output.indentSize` 配置属性，用于指定输出文件缩进空格数
* 新增 `baiduConfig.delay` 配置属性，用于设置百度翻译的延迟时间
* 新增匹配规则约束：翻译文本中不能包含特殊字符 `\t`


### Changed

* 优化命令行不输命令只输参数 `-L` | `--locale` 也能显示对应语言的提示
   * `npx i18n -L en`
   * `npx i18n --locale en`
* 优化翻译失败的输出日志（`translate-error.json`）给出了失败具体原因
* 调整百度翻译接口批量翻译的请求字符数上限为 `3000`


### Fixed

* 修复 `setI18n` 设置单个属性会导致其他属性状态丢失
* 修复翻译文本包含 `\t` 特殊字符导致翻译异常


## [1.1.1] - 2022-06-25

### Fixed

* 修复文档中图片不显示的问题


## [1.1.0] - 2022-06-25

### Added

* 新增 `README` 说明文档
* 新增 `output.langType` 配置项支持生成不同格式的语言包
* 新增 `from`、`to`、`codeLocaleMap` 百度翻译的配置项
* 新增 `funcName` 配置项支持自定义匹配函数名


### Changed

* 配置项 `filterFile` 已废弃，由 `fileRegExp` 代替


### Removed

* 移除了 `got`，`walk`，`chalk`，`lodash` 等依赖库


### Fixed

* 修复日志文件（translate-success.json）在文本包含 `.` 的情况下格式错误


## [1.0.0] - 2022-06-13

### Added

* 新增语言切换命令行参数
* 新增 `i18n` 和 `setI18n` 函数API
* 新增 `命令行工具` 的基本实现

