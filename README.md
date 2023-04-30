<div align="center">
  
[![logo](https://s3.bmp.ovh/imgs/2022/06/25/3a1c742f283cf28e.png "logo")](https://github.com/eyelly-wu/i18n-pro "github")


English | [简体中文](./README_zh-CN.md)


  <p style="font-size: 18px;">A lightweight, simple, flexible, automatic translation tool for JavaScript</p>

[![npm-version](https://img.shields.io/npm/v/i18n-pro.svg?style=flat-square "npm-version")](https://www.npmjs.com/package/i18n-pro "npm")
[![npm-download](https://img.shields.io/npm/dm/i18n-pro "npm-download")](https://www.npmjs.com/package/i18n-pro "npm")

[![github-stars](https://img.shields.io/github/stars/eyelly-wu/i18n-pro?style=social "github-stars")](https://github.com/eyelly-wu/i18n-pro/stargazers "github-stars")
[![last-commit](https://img.shields.io/github/last-commit/eyelly-wu/i18n-pro/dev "last-commit")](https://github.com/eyelly-wu/i18n-pro/commits/dev "last-commit")
[![github-issues](https://img.shields.io/github/issues-raw/eyelly-wu/i18n-pro "github-issues")](https://github.com/eyelly-wu/i18n-pro/issues "github-issues")
[![codecov](https://codecov.io/gh/eyelly-wu/i18n-pro/branch/main/graph/badge.svg?token=758C46SIE7 "codecov")](https://codecov.io/gh/eyelly-wu/i18n-pro "codecov")

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
* **flexible**：Support dynamic parameters, unique type tags and formatted callbacks (Number, Currency, Date, Time, Plural)
* **automatic-translation**：One command can automatically extract the text and translate it into a language pack
   * **Support incremental translation mode**：Only translate the new text, intelligently remove unused text
   * **Support multi -translation platform**：Google x、OpenAI、Google、Microsoft、Tencent、Ali Cloud、Youdao、Baidu（In addition to Google x, other platforms need to register an account by themselves）
* **keyless**：There is no need to define the key manually, the text to be translated is the key


# Live Demo

* [Open in CodeSandbox](https://codesandbox.io/p/github/eyelly-wu/i18n-pro-react-demo/main)
* [![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz_small.svg "Open in StackBlitz")](https://stackblitz.com/edit/i18n-pro-react-demo)


# Principle
The library is mainly composed of two parts
* Command Line Tool
* Function API

**Command Line Tool**：Any text that needs to be translated based on the specified rules (regular match), and translates the text to the specified target language through the translation platform, and finally generates a language package file

A simple example of  [Matching Rules](#matching-rules)  for parsing text is as follows
```js
/** Normal string */

t('xxx')
t("xxx")
t(`xxx`)


/** Support dynamic parameters */

t('xxx{0}xxx', param1)
t('xxx{0}xxx{1}xxx{2}xxx', param1, param2, param3)


/** Dynamic parameters type marker */

// Number Type
t('The number of users has reached {n0}', 100000000)

// Currency Type
t('The selling price is {c0}', 14999)

// Date Type
t('Today's date is {d0}', new Date())

// Time Type
t('Current time: {t0}', new Date())

// Plural Type
t('I have {p0 apple}, {p1 banana} and {p2 pear}', 5, 4, 3) 
```
**Function API**：Connect the international language package into the project, consisting of  `initI18n` ,  `t` ,  `setI18n`  and  `withI18n` 
* **initI18n**：Used to initialize the fixed configuration, and finally return the objects containing the following 3 APIs
* **t**：It is used to wrap the translated text to achieve internationalization, and also serves as an identifier for the command line to match the rules of translated text
* **setI18n**：Set language and language package
* **withI18n**：It is applicable to the server. Each interface response needs to be internationalized

Therefore,  `Command Line Tool`  and  `Function API`  work better together. It is precisely because of this structural design that  `i18n-pro`  library can be easily integrated into any  `JavaScript`  project
# Help Document

* [Quick Start](https://github.com/eyelly-wu/i18n-pro/blob/vdoc/docs/dist/USAGE.md)
* [Command Line](https://github.com/eyelly-wu/i18n-pro/blob/vdoc/docs/dist/COMMAND_LINE.md)
* [API](https://github.com/eyelly-wu/i18n-pro/blob/vdoc/docs/dist/API.md)
* [Matching Rules](https://github.com/eyelly-wu/i18n-pro/blob/vdoc/docs/dist/MATCH_RULE.md)
* [Output Log](https://github.com/eyelly-wu/i18n-pro/blob/vdoc/docs/dist/OUTPUT_LOG.md)
* [Q&A](https://github.com/eyelly-wu/i18n-pro/blob/vdoc/docs/dist/Q&A.md)
* [Changelog](https://github.com/eyelly-wu/i18n-pro/blob/vdoc/docs/dist/CHANGELOG.md)


# License
[MIT](./LICENSE)

Copyright (c) 2022-present Eyelly Wu