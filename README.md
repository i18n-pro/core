<div align="center">
  <p style="font-size: 18px;">An out-of-the-box, lightweight JavaScript i18n auto-translation solution</p>


English | [简体中文](https://github.com/i18n-pro/core/blob/v3.0.0-alpha.2/README_zh-CN.md)


[![npm-version](https://img.shields.io/npm/v/i18n-pro.svg?style=flat-square "npm-version")](https://www.npmjs.com/package/i18n-pro "npm")
[![npm-download](https://img.shields.io/npm/dm/i18n-pro "npm-download")](https://www.npmjs.com/package/i18n-pro "npm")

[![github-stars](https://img.shields.io/github/stars/i18n-pro/core?style=social "github-stars")](https://github.com/i18n-pro/core/stargazers "github-stars")
[![last-commit](https://img.shields.io/github/last-commit/i18n-pro/core/dev "last-commit")](https://github.com/i18n-pro/core/commits/dev "last-commit")
[![github-issues](https://img.shields.io/github/issues-raw/i18n-pro/core "github-issues")](https://github.com/i18n-pro/core/issues "github-issues")
[![codecov](https://codecov.io/gh/i18n-pro/core/branch/main/graph/badge.svg?token=758C46SIE7 "codecov")](https://codecov.io/gh/i18n-pro/core "codecov")

<a href="https://ibb.co/hxDQ1w69">
    <img src="https://i.ibb.co/JW56Fg1t/2025-05-18-175603.gif"alt="2025-05-18-175603" />
  </a>

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
Make international access easy and enjoyable 😄💪🏻
# Features

* **lightweight**：[![bundlesize](https://img.shields.io/bundlephobia/minzip/i18n-pro?color=brightgreen&style=plastic "bundlesize")](https://bundlephobia.com/package/i18n-pro "bundlesize")
* **simple**：Simple configuration, quick activation
* **flexible**：Supports Variable Interpolation, and unique Type tags and Formatizer
* **automatic-translation**：Extract copy and generate language packages in one click
   * **incremental translation**：Only translate new copy and remove unused copy
   * **Multi-platform support**：Google x、OpenAI、Google、Microsoft、Tencent、Alibaba Cloud、Youdao、BaiduFor translation platforms
   * **Translation Log**：Various log outputs are easy to track problems
* **keyless**：**Copywriting is key**, only Custom key is required for A word with multiple meanings


# Live Demo

* [Open in CodeSandbox](https://codesandbox.io/p/github/i18n-pro/core-demo/v3?file=README.md)
* [![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz_small.svg "Open in StackBlitz")](https://stackblitz.com/github/i18n-pro/core-demo/tree/v3?file=README.md)


# Principle

> `automatic-translation`  is one of the core features of the current library, [learn more](https://github.com/i18n-pro/core/blob/v3.0.0-alpha.2/docs/dist/Q&A.md)

The library is mainly composed of two parts
* Command Line Tool
* Function API

**Command Line Tool**：Parse the text that needs to be translated based on specified rules (regular expressions), translate the text to the specified target language through a translation platform, and finally generate language pack files

An example of parsing text using  [Matching Rules](https://github.com/i18n-pro/core/blob/v3.0.0-alpha.2/docs/dist/MATCH_RULE.md)  is as follows:

The following is an example of  `Copywriting is key` 
```js
// Normal string
t('Hello World')
t("Hello World")
t(`Hello World`)

// Variable Interpolation
t('Hi,{0}', 'developer friends')
t('This is {0}, welcome to {1}. If you think {2}, please give {3} your support', ' `i18n-pro` ', 'use', `it's helpful for you`, ' ⭐️ ')

// Type tags
t('i18n-pro users reached {n0}', 100000000) // Number
t('The selling price is {c0}', 14999) // Currency
t(`Today's date is {d0}`, new Date()) // Date
t('Current time: {t0}', new Date()) // Time
t('I have {p0 apple}, {p1 banana} and {p2 pear}', 5, 4, 3) // Plural 
```

The following is an example of  `Custom key` 
```js
// Normal string
t.t('custom-key', 'Hello World')
t.t('custom-key', "Hello World")
t.t('custom-key', `Hello World`)

// Variable Interpolation
t.t('custom-key', 'Hi,{0}', 'developer friends')
t.t('custom-key', 'This is {0}, welcome to {1}. If you think {2}, please give {3} your support', ' `i18n-pro` ', 'use', `it's helpful for you`, ' ⭐️ ')

// Type tags
t.t('custom-key', 'i18n-pro users reached {n0}', 100000000) // Number
t.t('custom-key', 'The selling price is {c0}', 14999) // Currency
t.t('custom-key', `Today's date is {d0}`, new Date()) // Date
t.t('custom-key', 'Current time: {t0}', new Date()) // Time
t.t('custom-key', 'I have {p0 apple}, {p1 banana} and {p2 pear}', 5, 4, 3) // Plural 
```
**Function API**：Access to multilingual support through  `initI18n` ,  `t` ,  `setI18n` 
* **initI18n**：Initialize the configuration and return the API object
* **t**：The package  `Case Study`  is internationalized, and it is also a command line matching identifier.
* **setI18n**：Set language and language package

 `Command Line Tool`  works with  `Function API`  and easily integrate into any  `JavaScript`  project
# Help Document

* [🚀 Quick Start](https://github.com/i18n-pro/core/blob/v3.0.0-alpha.2/docs/dist/USAGE.md)
* [💻 Command Line](https://github.com/i18n-pro/core/blob/v3.0.0-alpha.2/docs/dist/COMMAND_LINE.md)
* [📖 API](https://github.com/i18n-pro/core/blob/v3.0.0-alpha.2/docs/dist/API.md)
* [📝 Matching Rules](https://github.com/i18n-pro/core/blob/v3.0.0-alpha.2/docs/dist/MATCH_RULE.md)
* [📊 Translation Log](https://github.com/i18n-pro/core/blob/v3.0.0-alpha.2/docs/dist/OUTPUT_LOG.md)
* [❓ Frequently Asked Questions](https://github.com/i18n-pro/core/blob/v3.0.0-alpha.2/docs/dist/Q&A.md)
* [🤝 Contribution Guidelines](https://github.com/i18n-pro/core/blob/dev/docs/dist/CONTRIBUTION_GUIDELINES.md)
* [📋 Changelog](https://github.com/i18n-pro/core/blob/v3.0.0-alpha.2/docs/dist/CHANGELOG.md)


# License
[MIT](./LICENSE)

© 2022-present [Eyelly Wu](https://github.com/eyelly-wu)