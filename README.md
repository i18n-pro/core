<div align="center">
  <p style="font-size: 18px;">An out-of-the-box, lightweight JavaScript i18n auto-translation solution</p>


English | [简体中文](https://github.com/i18n-pro/core/blob/v3.0.0-alpha.2/README_zh-CN.md)


[![npm-version](https://img.shields.io/npm/v/i18n-pro.svg?style=flat-square "npm-version")](https://www.npmjs.com/package/i18n-pro "npm")
[![npm-download](https://img.shields.io/npm/dm/i18n-pro "npm-download")](https://www.npmjs.com/package/i18n-pro "npm")

[![github-stars](https://img.shields.io/github/stars/i18n-pro/core?style=social "github-stars")](https://github.com/i18n-pro/core/stargazers "github-stars")
[![last-commit](https://img.shields.io/github/last-commit/i18n-pro/core/dev "last-commit")](https://github.com/i18n-pro/core/commits/dev "last-commit")
[![github-issues](https://img.shields.io/github/issues-raw/i18n-pro/core "github-issues")](https://github.com/i18n-pro/core/issues "github-issues")
[![codecov](https://codecov.io/gh/i18n-pro/core/branch/main/graph/badge.svg?token=758C46SIE7 "codecov")](https://codecov.io/gh/i18n-pro/core "codecov")

<img src="https://s3.bmp.ovh/imgs/2025/07/11/2218a41614fad2d4.gif" alt="demo" />

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
Make internationalization easy and enjoyable 😄💪🏻
# Features

* **lightweight**：[![bundlesize](https://img.shields.io/bundlephobia/minzip/i18n-pro?color=brightgreen&style=plastic "bundlesize")](https://bundlephobia.com/package/i18n-pro "bundlesize")
* **simple**：Simple configuration, quick activation
* **flexible**：Supports Variable Interpolation, and unique Type Tag and Formatter
* **automatic-translation**：Extract text and generate language pack in one click
   * **incremental translation**：Only translate new text and remove unused text
   * **multi-platform support**：For example, translation platforms such as Google x、OpenAI、Google、Microsoft、Tencent、Alibaba Cloud、Youdao、Baidu
   * **translation log**：Various log outputs make it easy to track issues
* **keyless**：**text-as-key**, custom-key is required in specific scenarios (e.g., polysemy)


# Live Demo

* [Open in CodeSandbox](https://codesandbox.io/p/github/i18n-pro/core-demo/main?file=README.md)
* [![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz_small.svg "Open in StackBlitz")](https://stackblitz.com/github/i18n-pro/core-demo?file=README.md)


# Principle

>  `automatic-translation`  is one of the core features of this library, [learn more](https://github.com/i18n-pro/core/blob/v3.0.0-alpha.2/docs/dist/Q&A.md)<br/>

The library consists of two main parts
* Command Line Tool
* Function API

**Command Line Tool**：Parse texts requiring translation based on specified rules (regular expressions), translate them using supported platforms, and finally generate language pack files

An example of parsing text using  [Match Rules](https://github.com/i18n-pro/core/blob/v3.0.0-alpha.2/docs/dist/MATCH_RULE.md)  is as follows:

The following is an example of  `text-as-key` 
```js
// Normal string
t('Hello World')
t("Hello World")
t(`Hello World`)

// Variable Interpolation
t('Hi, {0}', 'developer friends')
t('This is {0}, welcome to {1}. If you think {2}, please give your {3} support', ' `i18n-pro` ', 'use', `it's helpful for you`, ' ⭐️ ')

// Type Tag
t('i18n-pro has reached {n0} users', 100000000) // Number
t('The selling price is {c0}', 14999) // Currency
t(`Today's date is {d0}`, new Date()) // Date
t('Current time: {t0}', new Date()) // Time
t('I have {p0 apple}, {p1 banana} and {p2 pear}', 5, 4, 3) // Plural 
```

The following is an example of  `custom-key` 
```js
// Normal string
t.t('custom-key', 'Hello World')
t.t('custom-key', "Hello World")
t.t('custom-key', `Hello World`)

// Variable Interpolation
t.t('custom-key', 'Hi, {0}', 'developer friends')
t.t('custom-key', 'This is {0}, welcome to {1}. If you think {2}, please give your {3} support', ' `i18n-pro` ', 'use', `it's helpful for you`, ' ⭐️ ')

// Type Tag
t.t('custom-key', 'i18n-pro has reached {n0} users', 100000000) // Number
t.t('custom-key', 'The selling price is {c0}', 14999) // Currency
t.t('custom-key', `Today's date is {d0}`, new Date()) // Date
t.t('custom-key', 'Current time: {t0}', new Date()) // Time
t.t('custom-key', 'I have {p0 apple}, {p1 banana} and {p2 pear}', 5, 4, 3) // Plural 
```
**Function API**：Provide multilingual support via  `initI18n` ,  `t` ,  `setI18n` 
* **initI18n**：Initialize the configuration and return the API object
* **t**：Wrap  `text`  to implement internationalization, also serves as command line matching identifier
* **setI18n**：Set the language and language pack

 `Command Line Tool`  works with  `Function API`  and easily integrate into any  `JavaScript`  project
# Help Document

* [🚀 Quick Start](https://github.com/i18n-pro/core/blob/v3.0.0-alpha.2/docs/dist/USAGE.md)
* [💻 Command Line](https://github.com/i18n-pro/core/blob/v3.0.0-alpha.2/docs/dist/COMMAND_LINE.md)
* [📖 API](https://github.com/i18n-pro/core/blob/v3.0.0-alpha.2/docs/dist/API.md)
* [📝 Match Rules](https://github.com/i18n-pro/core/blob/v3.0.0-alpha.2/docs/dist/MATCH_RULE.md)
* [📊 Translation Log](https://github.com/i18n-pro/core/blob/v3.0.0-alpha.2/docs/dist/OUTPUT_LOG.md)
* [❓ Questions and Answers](https://github.com/i18n-pro/core/blob/v3.0.0-alpha.2/docs/dist/Q&A.md)
* [🤝 Contribution Guidelines](https://github.com/i18n-pro/core/blob/dev/docs/dist/CONTRIBUTION_GUIDELINES.md)
* [📋 Changelog](https://github.com/i18n-pro/core/blob/v3.0.0-alpha.2/docs/dist/CHANGELOG.md)


# License
[MIT](./LICENSE)

© 2022-present [Eyelly Wu](https://github.com/eyelly-wu)