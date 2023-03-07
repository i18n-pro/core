<div align="center">
  
[![logo](https://s3.bmp.ovh/imgs/2022/06/25/3a1c742f283cf28e.png "logo")](https://github.com/eyelly-wu/i18n-pro "github")


[English](./README.md) | 简体中文


  <p style="font-size: 18px;">轻量、简单、灵活、自动翻译的国际化工具</p>

[![npm-version](https://img.shields.io/npm/v/i18n-pro.svg?style=flat-square "npm-version")](https://www.npmjs.com/package/i18n-pro "npm")
[![npm-download](https://img.shields.io/npm/dm/i18n-pro "npm-download")](https://www.npmjs.com/package/i18n-pro "npm")
[![dependenices](https://img.shields.io/librariesio/github/eyelly-wu/i18n-pro?style=plastic "dependenices")](https://www.npmjs.com/package/i18n-pro?activeTab=dependencies "dependenices")
[![github-stars](https://img.shields.io/github/stars/eyelly-wu/i18n-pro?style=social "github-stars")](https://github.com/eyelly-wu/i18n-pro/stargazers "github-stars")
[![last-commit](https://img.shields.io/github/last-commit/eyelly-wu/i18n-pro/dev "last-commit")](https://github.com/eyelly-wu/i18n-pro/commits/dev "last-commit")
[![github-issues](https://img.shields.io/github/issues-raw/eyelly-wu/i18n-pro "github-issues")](https://github.com/eyelly-wu/i18n-pro/issues "github-issues")
[![codecov](https://codecov.io/gh/eyelly-wu/i18n-pro/branch/main/graph/badge.svg?token=758C46SIE7 "codecov")](https://codecov.io/gh/eyelly-wu/i18n-pro "codecov")

</div>
<details >
  <summary>目录</summary>

  [愿景](#愿景)<br/>
  [特性](#特性)<br/>
  [Live Demo](#live-demo)<br/>
  [原理](#原理)<br/>
  [帮助文档](#帮助文档)<br/>
  [License](#license)<br/>

</details>


# 愿景
为了让接入国际化成为轻松且愉快的事😄💪🏻
# 特性

* **轻量**：[![bundlesize](https://img.shields.io/bundlephobia/minzip/i18n-pro?color=brightgreen&style=plastic "bundlesize")](https://bundlephobia.com/package/i18n-pro "bundlesize")
* **简单**：学习成本低，易上手
* **灵活**：支持动态参数、以及独特的类型标记和格式化回调（数字、货币、日期、时间、复数）
* **自动翻译**：一个命令即可自动提取文本并翻译生成语言包
* **keyless**：无需手动定义key，待翻译文本即key
* **多翻译平台支持**：谷歌、微软、腾讯、阿里、有道、百度、更多平台敬请期待


# Live Demo

* [Open in CodeSandbox](https://codesandbox.io/p/github/eyelly-wu/i18n-pro-react-demo/main)
* [![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz_small.svg "Open in StackBlitz")](https://stackblitz.com/edit/i18n-pro-react-demo)


# 原理
该库主要由两部分构成
* 命令行工具
* 函数API

**命令行工具**：根据指定规则解析出需要翻译的文本，并通过翻译平台将文本翻译到指定目标语言，最后生成语言包文件

解析文本的 [匹配规则](#匹配规则) 简易示例如下
```js
/** 普通字符串 */

i18n('xxx')
i18n("xxx")
i18n(`xxx`)


/** 支持动态参数 */

i18n('xxx{0}xxx', param1)
i18n('xxx{0}xxx{1}xxx{2}xxx', param1, param2, param3)


/** 动态参数类型标记 */

// 数字类型
i18n('用户数达到了{n0}', 100000000)

// 货币类型
i18n('售价为{c0}', 14999)

// 日期类型
i18n('今天的日期是{d0}', new Date())

// 时间类型
i18n('当前时间：{t0}', new Date())

// 复数类型
i18n('我有{p0个苹果}，{p1个香蕉}和{p2个梨}', 5, 4, 3) 
```
**函数API**：将国际化语言包接入到项目中，由 `initI18N` 、 `i18n` 、 `setI18N` 和 `withI18N` 构成
* **initI18N**：用于初始化固定配置，最后返回包含如下3个 API 的对象
* **i18n**：用于包裹被翻译文本实现国际化，也作为命令行匹配翻译文本规则的标识
* **setI18N**：设置语言、语言包
* **withI18N**：适用于服务端，每个接口响应需要做国际化的处理

所以 `命令行工具` 和 `函数API` 这两者搭配使用效果更佳，也正是由于这样的结构设计，使得 `i18n-pro` 库可以很方便集成到任何的 `JavaScript` 项目中
# 帮助文档

* [快速上手](https://github.com/eyelly-wu/i18n-pro/blob/vdoc/docs/dist/USAGE_zh-CN.md)
* [命令行](https://github.com/eyelly-wu/i18n-pro/blob/vdoc/docs/dist/COMMAND_LINE_zh-CN.md)
* [API](https://github.com/eyelly-wu/i18n-pro/blob/vdoc/docs/dist/API_zh-CN.md)
* [匹配规则](https://github.com/eyelly-wu/i18n-pro/blob/vdoc/docs/dist/MATCH_RULE_zh-CN.md)
* [输出日志](https://github.com/eyelly-wu/i18n-pro/blob/vdoc/docs/dist/OUTPUT_LOG_zh-CN.md)
* [Q&A](https://github.com/eyelly-wu/i18n-pro/blob/vdoc/docs/dist/Q&A_zh-CN.md)
* [更新日志](https://github.com/eyelly-wu/i18n-pro/blob/vdoc/docs/dist/CHANGELOG_zh-CN.md)


# License
[MIT](./LICENSE)

Copyright (c) 2022-present Eyelly Wu