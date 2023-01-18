
# 命令行

<details >
  <summary>目录</summary>

  &emsp;&emsp;[1.  `i18nrc.js` 配置](#1-i18nrcjs-配置)<br/>
  &emsp;&emsp;&emsp;&emsp;[基础配置](#基础配置)<br/>
  &emsp;&emsp;&emsp;&emsp;[Output](#output)<br/>
  &emsp;&emsp;&emsp;&emsp;[BaiduConfig](#baiduconfig)<br/>
  &emsp;&emsp;[2. 命令](#2-命令)<br/>
  &emsp;&emsp;&emsp;&emsp;[命令列表](#命令列表)<br/>
  &emsp;&emsp;&emsp;&emsp;[命令参数](#命令参数)<br/>

</details>

## 1.  `i18nrc.js` 配置

### 基础配置

|名称|类型|是否必设|默认值|说明|
|:-:|:-:|:-:|:-:|:-|
|funcName|string|否|i18n|命令行匹配翻译文本的函数名<br /><br />如果在使用 `i18n` 函数没有重命名，这里不需要调整，否则这里配置为重命名后的函数名|
|entry|string|是|-|指定翻译文件目录（绝对路径）|
|fileRegExp|RegExp|否| `/.[jt]s$/` |匹配文件名的正则表达式<br /><br />用于筛选需要被翻译的文件|
|output|[Output](#output)|是|-|输出文件相关的配置|
|baiduConfig|[BaiduConfig](#baiduconfig)|是|-|百度翻译相关的配置|

### Output
输出文件的配置
|名称|类型|是否必设|默认值|说明|
|:-:|:-:|:-:|:-:|:-|
|path|string|是|-|语言包生成的目录（绝对路径）|
|langType|'single' \| 'multiple'|否|'multiple'|输出语言包文件的形式<br /><br />假设目标语言是 `['en', 'jp']` <br />**single**：只会生成一个聚合的语言包文件 `langs.json`，格式如下：<br />`{"en":{"xxx":"xxx"},"jp":{"xxx":"xxx"}}`<br /><br />**multiple**：每个目标语言都会生成对应的语言包文件，对应两个文件： `en.json`， `jp.json` ，格式如下：<br />`{"xxx":"xxx"}`|
|indentSize|number|否|2|语言包文件的缩进空格数|

### BaiduConfig
百度翻译的配置
|名称|类型|是否必设|默认值|说明|
|:-:|:-:|:-:|:-:|:-|
|appid|string|是|-|APPID，需要[注册账号](http://api.fanyi.baidu.com/doc/21 '文档中有指导说明')申请|
|key|string|是|-|密钥，要求同上|
|from|string|是|-|被翻译文本的语言代码（例如中文的是 `zh`，英语的是 `en`）<br /><br />[更多语言](http://api.fanyi.baidu.com/doc/21 '搜索"语种列表"')，搜索`语种列表`|
|to|string[]|是|-|翻译的目标语言代码，格式同上<br /><br />📢📢📢：如果目标语言配置为 `['en']`，那么生成的文件名(`output.langType=='multiple'`）就是 `en.json`，设置语言时的 `locale` 也必须是 `'en'`，如果需要 `locale` 设置为 `'en_US'` 这种，就需要配合 `codeLocaleMap` 来使用|
|codeLocaleMap|Record<string, string>|否|{}|设置语言代码与 `locale` 的映射关系<br /><br />例如目标语言为 `['en']`，想设置 `locale` 的值为 `'en_US'` ，那么需要配置 `codeLocaleMap` 为 `{"en":"en_US"}` ，最终生成的文件名(`output.langType=='multiple'`）也会变成 `en_US.json` |

## 2. 命令

### 命令列表

|命令|简写|用法|说明|
|:-:|:-:|:-|:-|
|init|-|`npx i18n init`|初始化配置文件|
|translate|t|`npx i18n translate` <br /> `npx i18n t`|提取翻译文本，自动翻译并生成语言包|
|version|v|`npx i18n version`<br />`npx i18n v`|显示版本信息|
|help|h|`npx i18n help`<br />`npx i18n h`|显示帮助信息|

### 命令参数

|参数名|简写|参数值|适用命令|用法|说明|
|:-:|:-:|:-:|:-|:-|:-|
|--locale|-L|`en` \| `zh`|ALL|`npx i18n h -L en`<br />`npx i18n h --locale en`|指定命令行显示语言<br /><br />可选语言有中文（zh）/ 英文（en）， 默认为英文（en）|
|--non-incremental|-|-|`t`<br />`translate`|`npx i18n t --non-incremental`|关闭增量翻译模式<br /><br />⚠️⚠️⚠️：关闭增量翻译模式后，所有的文本会重新翻译，会导致**手工翻译**（非翻译平台翻译的）的文本丢失，需慎重考虑使用！！！|
|--path|-P|-|`init`<br />`t`<br />`translate`|`npx i18n init -P /xxx/xxx/xxx`<br />`npx i18n t -P /xxx/xxx/xxx`|指定配置文件路径（参数为绝对路径）<br /><br />只需要指定路径名，配置文件名默认为 `i18nrc.js`|
