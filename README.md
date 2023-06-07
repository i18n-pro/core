<div align="center">
  
[![logo](https://s3.bmp.ovh/imgs/2022/06/25/3a1c742f283cf28e.png "logo")](https://github.com/i18n-pro/core "github")


English | [简体中文](https://github.com/i18n-pro/core/blob/v2.0.0-alpha.8/README_zh-CN.md)


  <p style="font-size: 18px;">Lightweight, simple, flexible, automatic translation internationalization tool for JavaScript</p>

[![npm-version](https://img.shields.io/npm/v/i18n-pro.svg?style=flat-square "npm-version")](https://www.npmjs.com/package/i18n-pro "npm")
[![npm-download](https://img.shields.io/npm/dm/i18n-pro "npm-download")](https://www.npmjs.com/package/i18n-pro "npm")

[![github-stars](https://img.shields.io/github/stars/i18n-pro/core?style=social "github-stars")](https://github.com/i18n-pro/core/stargazers "github-stars")
[![last-commit](https://img.shields.io/github/last-commit/i18n-pro/core/dev "last-commit")](https://github.com/i18n-pro/core/commits/dev "last-commit")
[![github-issues](https://img.shields.io/github/issues-raw/i18n-pro/core "github-issues")](https://github.com/i18n-pro/core/issues "github-issues")
[![codecov](https://codecov.io/gh/i18n-pro/core/branch/main/graph/badge.svg?token=758C46SIE7 "codecov")](https://codecov.io/gh/i18n-pro/core "codecov")

![demo](https://s3.bmp.ovh/imgs/2023/06/06/c3261b545825fc71.gif)

</div>
<details >
  <summary>Table of Contents</summary>

  [Vision](#vision)<br/>
  [Features](#features)<br/>
  [Live Demo](#live-demo)<br/>
  [Principle](#principle)<br/>
  [Help Document](#help-document)<br/>
  [License](#license)<br/>

</details>


# Vision
To make internationalization easy and enjoyable 😄💪🏻
# Features

* **lightweight**：[![bundlesize](https://img.shields.io/bundlephobia/minzip/i18n-pro?color=brightgreen&style=plastic "bundlesize")](https://bundlephobia.com/package/i18n-pro "bundlesize")
* **simple**：Low learning cost and easy to use
* **flexible**：Support  `Variable Interpolation` , as well as unique type tag and formatting callbacks (numbers, currency, dates, times, plurals)
* **automatic-translation**：One command can automatically extract text and translate it to generate language packs
   * **Support incremental translation mode**：Only translate new text and intelligently remove unused text
   * **Support multi -translation platform**：Google x、OpenAI、Google、Microsoft、Tencent、Alibaba Cloud、Youdao、Baidu（In addition to Google x, other platforms need to register an account by themselves）
   * **Support multiple translation logs**：The output of a variety of types of translation logs, which is convenient for tracking and positioning translation issues
* **keyless**：No need to manually define key,  `Translation Text`  is key


# Live Demo

* [Open in CodeSandbox](https://codesandbox.io/p/github/i18n-pro/core-demo/main?file=README.md)
* [![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz_small.svg "Open in StackBlitz")](https://stackblitz.com/github/i18n-pro/core-demo?file=README.md)


# Principle

>Taking  `Translation Text`  as key is the key to all the functions of the library. If you have any questions about this, [Please see](https://github.com/i18n-pro/core/blob/v2.0.0-alpha.8/docs/dist/Q&A.md)

The library is mainly composed of two parts
* Command Line Tool
* Function API

**Command Line Tool**：Parse the text that needs to be translated based on specified rules (regular expressions), translate the text to the specified target language through a translation platform, and finally generate language pack files

An example of parsing text using  [Matching Rules](https://github.com/i18n-pro/core/blob/v2.0.0-alpha.8/docs/dist/MATCH_RULE.md)  is as follows:
```js
/** Normal string */

t('hello world')
t("hello world")
t(`hello world`)


/** Support Variable Interpolation */

t('hello {0}', 'developer friends'),
t('This is {0}, welcome to {1}. If you think {2}, please give {3} your support', ' `i18n-pro` ', 'use', `it's helpful for you`, ' ⭐️ ')


/** Interpolation Variable type tag need to be used with corresponding formatting callbacks */

// Number Type
t('The number of users has reached {n0}', 100000000)

// Currency Type
t('The selling price is {c0}', 14999)

// Date Type
t(`Today's date is {d0}`, new Date())

// Time Type
t('Current time: {t0}', new Date())

// Plural Type
t('I have {p0 apple}, {p1 banana} and {p2 pear}', 5, 4, 3) 
```
**Function API**：Connect the international language package into the project, consisting of  `initI18n` ,  `t` ,  `setI18n`  and  `withI18n` 
* **initI18n**：Used to initialize the fixed configuration, and finally return the objects containing the following 3 APIs
* **t**：It is used for wrapping  `Translation Text`  to achieve internationalization, and it is also used as a logo of the command line to match  `Translation Text`  rules
* **setI18n**：Set language and language package
* **withI18n**：It is applicable to the server. Each interface response needs to be internationalized

Therefore,  `Command Line Tool`  and  `Function API`  work better together. It is precisely because of this structural design that  `i18n-pro`  library can be easily integrated into any  `JavaScript`  project
# Help Document

* [Quick Start](https://github.com/i18n-pro/core/blob/v2.0.0-alpha.8/docs/dist/USAGE.md)
* [Command Line](https://github.com/i18n-pro/core/blob/v2.0.0-alpha.8/docs/dist/COMMAND_LINE.md)
* [API](https://github.com/i18n-pro/core/blob/v2.0.0-alpha.8/docs/dist/API.md)
* [Matching Rules](https://github.com/i18n-pro/core/blob/v2.0.0-alpha.8/docs/dist/MATCH_RULE.md)
* [Translation log](https://github.com/i18n-pro/core/blob/v2.0.0-alpha.8/docs/dist/OUTPUT_LOG.md)
* [Q&A](https://github.com/i18n-pro/core/blob/v2.0.0-alpha.8/docs/dist/Q&A.md)
* [Contribution Guidelines](https://github.com/i18n-pro/core/blob/dev/docs/dist/CONTRIBUTION_GUIDELINES.md)
* [Changelog](https://github.com/i18n-pro/core/blob/v2.0.0-alpha.8/docs/dist/CHANGELOG.md)


# License
[MIT](./LICENSE)

Copyright (c) 2022-present Eyelly Wu