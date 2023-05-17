
# 更新日志

<details >
  <summary>目录</summary>

  &emsp;&emsp;[[2.0.0] - 2023-0x-xx](#200---2023-0x-xx)<br/>
  &emsp;&emsp;&emsp;&emsp;[命令行工具](#200-命令行工具)<br/>
  &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;[Changed](#200-命令行工具-changed)<br/>
  &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;[Added](#200-命令行工具-added)<br/>
  &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;[Fixed](#200-命令行工具-fixed)<br/>
  &emsp;&emsp;&emsp;&emsp;[API](#200-api)<br/>
  &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;[Changed](#200-api-changed)<br/>
  &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;[Added](#200-api-added)<br/>
  &emsp;&emsp;&emsp;&emsp;[文档](#200-文档)<br/>
  &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;[Changed](#200-文档-changed)<br/>
  &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;[Added](#200-文档-added)<br/>
  &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;[Fixed](#200-文档-fixed)<br/>
  &emsp;&emsp;[[1.3.2] - 2022-09-24](#132---2022-09-24)<br/>
  &emsp;&emsp;&emsp;&emsp;[命令行工具](#132-命令行工具)<br/>
  &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;[Fixed](#132-命令行工具-fixed)<br/>
  &emsp;&emsp;[[1.3.1] - 2022-09-21](#131---2022-09-21)<br/>
  &emsp;&emsp;&emsp;&emsp;[命令行工具](#131-命令行工具)<br/>
  &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;[Fixed](#131-命令行工具-fixed)<br/>
  &emsp;&emsp;[[1.3.0] - 2022-09-13](#130---2022-09-13)<br/>
  &emsp;&emsp;&emsp;&emsp;[命令行工具](#130-命令行工具)<br/>
  &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;[Changed](#130-命令行工具-changed)<br/>
  &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;[Added](#130-命令行工具-added)<br/>
  &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;[Fixed](#130-命令行工具-fixed)<br/>
  &emsp;&emsp;&emsp;&emsp;[API](#130-api)<br/>
  &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;[Added](#130-api-added)<br/>
  &emsp;&emsp;[[1.2.1] - 2022-07-07](#121---2022-07-07)<br/>
  &emsp;&emsp;&emsp;&emsp;[命令行工具](#121-命令行工具)<br/>
  &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;[Fixed](#121-命令行工具-fixed)<br/>
  &emsp;&emsp;[[1.2.0] - 2022-07-05](#120---2022-07-05)<br/>
  &emsp;&emsp;&emsp;&emsp;[命令行工具](#120-命令行工具)<br/>
  &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;[Changed](#120-命令行工具-changed)<br/>
  &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;[Added](#120-命令行工具-added)<br/>
  &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;[Fixed](#120-命令行工具-fixed)<br/>
  &emsp;&emsp;&emsp;&emsp;[API](#120-api)<br/>
  &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;[Added](#120-api-added)<br/>
  &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;[Fixed](#120-api-fixed)<br/>
  &emsp;&emsp;&emsp;&emsp;[文档](#120-文档)<br/>
  &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;[Added](#120-文档-added)<br/>
  &emsp;&emsp;[[1.1.1] - 2022-06-25](#111---2022-06-25)<br/>
  &emsp;&emsp;&emsp;&emsp;[文档](#111-文档)<br/>
  &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;[Fixed](#111-文档-fixed)<br/>
  &emsp;&emsp;[[1.1.0] - 2022-06-25](#110---2022-06-25)<br/>
  &emsp;&emsp;&emsp;&emsp;[命令行工具](#110-命令行工具)<br/>
  &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;[Changed](#110-命令行工具-changed)<br/>
  &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;[Added](#110-命令行工具-added)<br/>
  &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;[Fixed](#110-命令行工具-fixed)<br/>
  &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;[Removed](#110-命令行工具-removed)<br/>
  &emsp;&emsp;&emsp;&emsp;[文档](#110-文档)<br/>
  &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;[Added](#110-文档-added)<br/>
  &emsp;&emsp;[[1.0.0] - 2022-06-13](#100---2022-06-13)<br/>
  &emsp;&emsp;&emsp;&emsp;[命令行工具](#100-命令行工具)<br/>
  &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;[Added](#100-命令行工具-added)<br/>
  &emsp;&emsp;&emsp;&emsp;[API](#100-api)<br/>
  &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;[Added](#100-api-added)<br/>

</details>

## [2.0.0] - 2023-0x-xx

<h3 id="200-命令行工具">命令行工具</h3>

<h4 id="200-命令行工具-changed">Changed</h4>

* 设置命令行语言默认为英文
* 调整命令行初始化默认配置模板


<h4 id="200-命令行工具-added">Added</h4>

* 新增翻译执行后，控制台输出内容对不同日志类型的数量统计显示
* 新增如下翻译平台的支持
   * 谷歌X
   * OpenAI
   * 谷歌
   * 微软
   * 阿里云
   * 腾讯
   * 有道
* 初始化命令和翻译命令添加 `-P` | `--path` 参数，用于支持灵活指定配置文件路径


<h4 id="200-命令行工具-fixed">Fixed</h4>

* 修复当 `语言代码` 和 `locale` 不同时，识别已翻译的语言包错误，最终导致重复翻译


<h3 id="200-api">API</h3>

<h4 id="200-api-changed">Changed</h4>

* 调整API命名
   * 遵循小驼峰命名规则
      * `setI18N` → `setI18n`
      * `withI18N` → `withI18n`
   * 更简洁
      * `i18n` → `t`
* 调整 `setI18n` 用法
   *  `setI18n` 函数只能动态修改 `locale` 和 `langs` ，其他的属性均由 `initI18n` 首次调用定义，后续不可更改
   * 增加返回参数，会返回当前命名空间下的所有配置状态


<h4 id="200-api-added">Added</h4>

* 添加对命名空间的支持
   * 新增 `initI18n` 函数用于获取原有的核心的 `t` 、 `setI18n` 、 `withI18n` 函数
   * 新增 `namespace` 属性用于支持命名空间


<h3 id="200-文档">文档</h3>

<h4 id="200-文档-changed">Changed</h4>

* 更新 `Changelog` 文档格式，将独立区分 `命令行工具` 、 `API` 、 `文档` 更新的内容


<h4 id="200-文档-added">Added</h4>

* 新增英文文档，并设置为默认语言文档


<h4 id="200-文档-fixed">Fixed</h4>

* 修复 `Changelog` 文档中相同标题生成的目录锚点导航异常


## [1.3.2] - 2022-09-24

<h3 id="132-命令行工具">命令行工具</h3>

<h4 id="132-命令行工具-fixed">Fixed</h4>

* 修复在 Windows 系统中执行翻译命令后会意外生成类 `xxx.jso` 文件夹 [#2](https://github.com/eyelly-wu/i18n-pro/issues/2)


## [1.3.1] - 2022-09-21

<h3 id="131-命令行工具">命令行工具</h3>

<h4 id="131-命令行工具-fixed">Fixed</h4>

* 修复初始化命令在 Windows 系统中报异常 [#1](https://github.com/eyelly-wu/i18n-pro/issues/1)


## [1.3.0] - 2022-09-13

<h3 id="130-命令行工具">命令行工具</h3>

<h4 id="130-命令行工具-changed">Changed</h4>

* `translate-error.json` 由**翻译失败**改为**翻译错误**类型，**翻译失败**由 `translate-fail.json` 来标识


<h4 id="130-命令行工具-added">Added</h4>

* 添加新的日志输出类型：翻译有误的文案列表


<h4 id="130-命令行工具-fixed">Fixed</h4>

* 修复 `baiduConfig.delay` 在多个语言切换时不生效


<h3 id="130-api">API</h3>

<h4 id="130-api-added">Added</h4>

* 添加 `withI18N` 函数API用于支持服务端场景
* 添加动态参数类型标记和类型格式化回调函数
   * 支持 数字、货币、日期、时间、复数 等类型的动态参数标记
   * `setI18N` 添加了 `formatNumber`、`formatCurrency`、`formatDate`、`formatTime`、`formatPlural` 等属性


## [1.2.1] - 2022-07-07

<h3 id="121-命令行工具">命令行工具</h3>

<h4 id="121-命令行工具-fixed">Fixed</h4>

* 修复执行命令报错：`Error: Cannot find module 'md5-node'`


## [1.2.0] - 2022-07-05

<h3 id="120-命令行工具">命令行工具</h3>

<h4 id="120-命令行工具-changed">Changed</h4>

* 优化命令行不输命令只输参数 `-L` | `--locale` 也能显示对应语言的提示
   * npx i18n -L zh
   * npx i18n --locale zh
* 优化翻译失败的输出日志 `translate-error.json` 给出了失败具体原因
* 调整百度翻译接口批量翻译的请求字符数上限为 `3000`


<h4 id="120-命令行工具-added">Added</h4>

* 新增翻译命令执行的耗时统计输出
* 新增新的翻译日志类型 `filepaths.json` ：配到的文件路径列表
* 新增 `增量翻译` 模式
   * 该模式默认开启，可通过命令参数 `--non-incremental` 关闭
   * 支持只翻译目标语言未翻译过的文案
   * 支持智能移除语言包中已翻译却未再使用的文案
* 新增 `output.indentSize` 配置属性，用于指定输出文件缩进空格数
* 新增 `baiduConfig.delay` 配置属性，用于设置百度翻译的延迟时间
* 新增匹配规则约束： `翻译文案` 中不能包含特殊字符 `\t`


<h4 id="120-命令行工具-fixed">Fixed</h4>

* 修复 `翻译文案` 包含 `\t` 特殊字符导致翻译异常


<h3 id="120-api">API</h3>

<h4 id="120-api-added">Added</h4>

* 新增 `setI18N` 函数参数属性 `beginIndex`，用于指定动态参数的起始下标


<h4 id="120-api-fixed">Fixed</h4>

* 修复 `setI18N` 设置单个属性会导致其他属性状态丢失


<h3 id="120-文档">文档</h3>

<h4 id="120-文档-added">Added</h4>

* 新增[翻译日志](https://github.com/eyelly-wu/i18n-pro/blob/vdoc/docs/dist/OUTPUT_LOG_zh-CN.md)文档说明


## [1.1.1] - 2022-06-25

<h3 id="111-文档">文档</h3>

<h4 id="111-文档-fixed">Fixed</h4>

* 修复文档中图片不显示的问题


## [1.1.0] - 2022-06-25

<h3 id="110-命令行工具">命令行工具</h3>

<h4 id="110-命令行工具-changed">Changed</h4>

* 配置项 `filterFile` 已废弃，由 `fileRegExp` 代替


<h4 id="110-命令行工具-added">Added</h4>

* 新增 `output.langType` 配置项支持生成不同格式的语言包
* 新增 `from`、`to`、`codeLocaleMap` 百度翻译的配置项
* 新增 `funcName` 配置项支持自定义匹配函数名


<h4 id="110-命令行工具-fixed">Fixed</h4>

* 修复日志文件 `translate-success.json` 在文案包含 `.` 的情况下格式错误


<h4 id="110-命令行工具-removed">Removed</h4>

* 移除了 `got`，`walk`，`chalk`，`lodash` 等依赖库


<h3 id="110-文档">文档</h3>

<h4 id="110-文档-added">Added</h4>

* 新增 `README` 说明文档


## [1.0.0] - 2022-06-13

<h3 id="100-命令行工具">命令行工具</h3>

<h4 id="100-命令行工具-added">Added</h4>

* 新增 `命令行工具` 的基本实现
* 新增语言切换命令行参数


<h3 id="100-api">API</h3>

<h4 id="100-api-added">Added</h4>

* 新增 `i18n` 和 `setI18N` 函数API

