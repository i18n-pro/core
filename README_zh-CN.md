<div align="center">
  <p style="font-size: 18px;">开箱即用的轻量级 JavaScript 国际化自动翻译解决方案</p>


[English](https://github.com/i18n-pro/core/tree/v3.0.0-alpha.2#readme) | 简体中文


[![npm-version](https://img.shields.io/npm/v/i18n-pro.svg?style=flat-square "npm-version")](https://www.npmjs.com/package/i18n-pro "npm")
[![npm-download](https://img.shields.io/npm/dm/i18n-pro "npm-download")](https://www.npmjs.com/package/i18n-pro "npm")

[![github-stars](https://img.shields.io/github/stars/i18n-pro/core?style=social "github-stars")](https://github.com/i18n-pro/core/stargazers "github-stars")
[![last-commit](https://img.shields.io/github/last-commit/i18n-pro/core/dev "last-commit")](https://github.com/i18n-pro/core/commits/dev "last-commit")
[![github-issues](https://img.shields.io/github/issues-raw/i18n-pro/core "github-issues")](https://github.com/i18n-pro/core/issues "github-issues")
[![codecov](https://codecov.io/gh/i18n-pro/core/branch/main/graph/badge.svg?token=758C46SIE7 "codecov")](https://codecov.io/gh/i18n-pro/core "codecov")

<a href="https://ibb.co/hxDQ1w69">
    <img src="https://s3.bmp.ovh/imgs/2025/07/10/7340b93a468f1ebe.gif" alt="demo" />
  </a>

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
让国际化接入变得轻松愉快 😄💪🏻
# 特性

* **轻量**：[![bundlesize](https://img.shields.io/bundlephobia/minzip/i18n-pro?color=brightgreen&style=plastic "bundlesize")](https://bundlephobia.com/package/i18n-pro "bundlesize")
* **简单**：简单配置，快速启用
* **灵活**：支持变量插值、以及独特的类型标记和格式化器
* **自动翻译**：一键提取文案并生成语言包
   * **增量翻译**：只翻译新增文案，移除未使用文案
   * **多平台支持**：谷歌X、OpenAI、谷歌、微软、腾讯、阿里云、有道、百度等翻译平台
   * **翻译日志**：多种日志输出，便于追踪问题
* **keyless**：**文案即 key**，部分特殊场景需要自定义 key（例如：一词多义）


# Live Demo

* [Open in CodeSandbox](https://codesandbox.io/p/github/i18n-pro/core-demo/main?file=README_zh-CN.md)
* [![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz_small.svg "Open in StackBlitz")](https://stackblitz.com/github/i18n-pro/core-demo?file=README_zh-CN.md)


# 原理

>  `自动翻译` 是当前库的核心特性之一，[了解更多](https://github.com/i18n-pro/core/blob/v3.0.0-alpha.2/docs/dist/Q&A_zh-CN.md)<br/>

该库主要由两部分构成
* 命令行工具
* 函数 API

**命令行工具**：根据指定规则（正则匹配）解析出需要翻译的文案，并通过翻译平台将文案翻译到指定目标语言，最后生成语言包文件

解析文案的 [匹配规则](https://github.com/i18n-pro/core/blob/v3.0.0-alpha.2/docs/dist/MATCH_RULE_zh-CN.md) 简易示例如下

以下为 `文案即 key` 的示例
```js
// 普通字符串
t('你好世界')
t("你好世界")
t(`你好世界`)

// 变量插值
t('嗨，{0}', '开发者朋友们')
t('这是{0}，欢迎{1}，如果你觉得{2}，请给予{3}支持', ' `i18n-pro` ', '使用', `对你有帮助`, ' ⭐️ ')

// 类型标记
t('i18n-pro 用户数达到了{n0}', 100000000) // 数字
t('售价为{c0}', 14999) // 货币
t(`今天的日期是{d0}`, new Date()) // 日期
t('当前时间：{t0}', new Date()) // 时间
t('我有{p0个苹果}，{p1个香蕉}和{p2个梨}', 5, 4, 3) // 复数 
```

以下为 `自定义 key` 的示例
```js
// 普通字符串
t.t('custom-key', '你好世界')
t.t('custom-key', "你好世界")
t.t('custom-key', `你好世界`)

// 变量插值
t.t('custom-key', '嗨，{0}', '开发者朋友们')
t.t('custom-key', '这是{0}，欢迎{1}，如果你觉得{2}，请给予{3}支持', ' `i18n-pro` ', '使用', `对你有帮助`, ' ⭐️ ')

// 类型标记
t.t('custom-key', 'i18n-pro 用户数达到了{n0}', 100000000) // 数字
t.t('custom-key', '售价为{c0}', 14999) // 货币
t.t('custom-key', `今天的日期是{d0}`, new Date()) // 日期
t.t('custom-key', '当前时间：{t0}', new Date()) // 时间
t.t('custom-key', '我有{p0个苹果}，{p1个香蕉}和{p2个梨}', 5, 4, 3) // 复数 
```
**函数 API**：通过  `initI18n` 、 `t` 、 `setI18n`  接入多语言支持
* **initI18n**：初始化配置，返回 API 对象
* **t**：包裹 `文案` 实现国际化，也是命令行匹配标识
* **setI18n**：设置语言、语言包

 `命令行工具` 与 `函数 API` 搭配使用，轻松集成到任何 `JavaScript` 项目中
# 帮助文档

* [🚀 快速上手](https://github.com/i18n-pro/core/blob/v3.0.0-alpha.2/docs/dist/USAGE_zh-CN.md)
* [💻 命令行](https://github.com/i18n-pro/core/blob/v3.0.0-alpha.2/docs/dist/COMMAND_LINE_zh-CN.md)
* [📖 API](https://github.com/i18n-pro/core/blob/v3.0.0-alpha.2/docs/dist/API_zh-CN.md)
* [📝 匹配规则](https://github.com/i18n-pro/core/blob/v3.0.0-alpha.2/docs/dist/MATCH_RULE_zh-CN.md)
* [📊 翻译日志](https://github.com/i18n-pro/core/blob/v3.0.0-alpha.2/docs/dist/OUTPUT_LOG_zh-CN.md)
* [❓ 常见问题](https://github.com/i18n-pro/core/blob/v3.0.0-alpha.2/docs/dist/Q&A_zh-CN.md)
* [🤝 贡献指南](https://github.com/i18n-pro/core/blob/dev/docs/dist/CONTRIBUTION_GUIDELINES_zh-CN.md)
* [📋 更新日志](https://github.com/i18n-pro/core/blob/v3.0.0-alpha.2/docs/dist/CHANGELOG_zh-CN.md)


# License
[MIT](./LICENSE)

© 2022-present [Eyelly Wu](https://github.com/eyelly-wu)