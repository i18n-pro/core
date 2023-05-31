<div align="center">
  
[![logo](https://s3.bmp.ovh/imgs/2022/06/25/3a1c742f283cf28e.png "logo")](https://github.com/eyelly-wu/i18n-pro "github")


[English](https://github.com/eyelly-wu/i18n-pro/tree/v2.0.0-alpha.2#readme) | 简体中文


  <p style="font-size: 18px;">适用于 JavaScript 的轻量、简单、灵活、自动翻译的国际化工具</p>

[![npm-version](https://img.shields.io/npm/v/i18n-pro.svg?style=flat-square "npm-version")](https://www.npmjs.com/package/i18n-pro "npm")
[![npm-download](https://img.shields.io/npm/dm/i18n-pro "npm-download")](https://www.npmjs.com/package/i18n-pro "npm")

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
* **灵活**：支持 `变量插值` 、以及独特的类型标记和格式化回调（数字、货币、日期、时间、复数）
* **自动翻译**：一个命令即可自动提取文案并翻译生成语言包
   * **支持增量翻译模式**：只翻译新增文案，智能移除未使用文案
   * **支持多翻译平台**：谷歌X、OpenAI、谷歌、微软、腾讯、阿里云、有道、百度（除谷歌X外，其他平台需自行注册账号）
   * **支持多种翻译日志**：多种类型翻译日志的输出，便于追踪与定位翻译问题
* **keyless**：无需手动定义key， `翻译文案` 即key


# Live Demo

* [Open in CodeSandbox](https://codesandbox.io/p/github/eyelly-wu/i18n-pro-react-demo/main)
* [![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz_small.svg "Open in StackBlitz")](https://stackblitz.com/edit/i18n-pro-react-demo)


# 原理

>以 `翻译文案` 作为key是该库所有功能实现的关键，如果对此有任何疑问，[请查看](https://github.com/eyelly-wu/i18n-pro/blob/v2.0.0-alpha.2/docs/dist/Q&A_zh-CN.md)

该库主要由两部分构成
* 命令行工具
* 函数API

**命令行工具**：根据指定规则（正则匹配）解析出需要翻译的文案，并通过翻译平台将文案翻译到指定目标语言，最后生成语言包文件

解析文案的 [匹配规则](https://github.com/eyelly-wu/i18n-pro/blob/v2.0.0-alpha.2/docs/dist/MATCH_RULE_zh-CN.md) 简易示例如下
```js
/** 普通字符串 */

t('hello world')
t("hello world")
t(`hello world`)


/** 支持变量插值 */

t('hello {0}', '开发者朋友们'),
t('这是{0}，欢迎{1}，如果你觉得{2}，请给予{3}支持', ' `i18n-pro` ', '使用', `不错`, ' ⭐️ ')


/** 插值变量类型标记，需配合对应的格式化回调 */

// 数字类型
t('用户数达到了{n0}', 100000000)

// 货币类型
t('售价为{c0}', 14999)

// 日期类型
t(`今天的日期是{d0}`, new Date())

// 时间类型
t('当前时间：{t0}', new Date())

// 复数类型
t('我有{p0个苹果}，{p1个香蕉}和{p2个梨}', 5, 4, 3) 
```
**函数API**：将国际化语言包接入到项目中，由 `initI18n` 、 `t` 、 `setI18n` 和 `withI18n` 构成
* **initI18n**：用于初始化固定配置，最后返回包含如下 3 个 API 的对象
* **t**：用于包裹 `翻译文案` 实现国际化，也作为命令行匹配 `翻译文案` 规则的标识
* **setI18n**：设置语言、语言包
* **withI18n**：适用于服务端，每个接口响应需要做国际化的处理

所以 `命令行工具` 和 `函数API` 这两者搭配使用效果更佳，也正是由于这样的结构设计，使得 `i18n-pro` 库可以很方便集成到任何的 `JavaScript` 项目中
# 帮助文档

* [快速上手](https://github.com/eyelly-wu/i18n-pro/blob/v2.0.0-alpha.2/docs/dist/USAGE_zh-CN.md)
* [命令行](https://github.com/eyelly-wu/i18n-pro/blob/v2.0.0-alpha.2/docs/dist/COMMAND_LINE_zh-CN.md)
* [API](https://github.com/eyelly-wu/i18n-pro/blob/v2.0.0-alpha.2/docs/dist/API_zh-CN.md)
* [匹配规则](https://github.com/eyelly-wu/i18n-pro/blob/v2.0.0-alpha.2/docs/dist/MATCH_RULE_zh-CN.md)
* [翻译日志](https://github.com/eyelly-wu/i18n-pro/blob/v2.0.0-alpha.2/docs/dist/OUTPUT_LOG_zh-CN.md)
* [Q&A](https://github.com/eyelly-wu/i18n-pro/blob/v2.0.0-alpha.2/docs/dist/Q&A_zh-CN.md)
* [更新日志](https://github.com/eyelly-wu/i18n-pro/blob/v2.0.0-alpha.2/docs/dist/CHANGELOG_zh-CN.md)


# License
[MIT](./LICENSE)

Copyright (c) 2022-present Eyelly Wu