
# 命令行

<details >
  <summary>目录</summary>

  &emsp;&emsp;[1.  `i18nrc.js` 配置](#1--i18nrcjs-配置)<br/>
  &emsp;&emsp;&emsp;&emsp;[基础配置](#基础配置)<br/>
  &emsp;&emsp;&emsp;&emsp;[Output](#output)<br/>
  &emsp;&emsp;&emsp;&emsp;[GooglexConfig](#googlexconfig)<br/>
  &emsp;&emsp;&emsp;&emsp;[OpenAIConfig](#openaiconfig)<br/>
  &emsp;&emsp;&emsp;&emsp;[GoogleConfig](#googleconfig)<br/>
  &emsp;&emsp;&emsp;&emsp;[MicrosoftConfig](#microsoftconfig)<br/>
  &emsp;&emsp;&emsp;&emsp;[BaiduConfig](#baiduconfig)<br/>
  &emsp;&emsp;&emsp;&emsp;[YoudaoConfig](#youdaoconfig)<br/>
  &emsp;&emsp;&emsp;&emsp;[TencentConfig](#tencentconfig)<br/>
  &emsp;&emsp;&emsp;&emsp;[AliyunConfig](#aliyunconfig)<br/>
  &emsp;&emsp;[2. 命令](#2-命令)<br/>
  &emsp;&emsp;&emsp;&emsp;[命令列表](#命令列表)<br/>
  &emsp;&emsp;&emsp;&emsp;[命令参数](#命令参数)<br/>

</details>

## 1.  `i18nrc.js` 配置

### 基础配置

|名称|类型|是否必设|默认值|说明|
|:-:|:-:|:-:|:-:|:-|
|funcName|string|否|t|命令行匹配翻译文案的函数名<br /><br />如果在使用 `t` 函数没有重命名，这里不需要调整，否则这里配置为重命名后的函数名|
|entry|string|是|-|指定翻译文件目录（绝对路径）|
|fileRegExp|RegExp|否| `/.[jt]s$/` |匹配文件名的正则表达式<br /><br />用于筛选需要被翻译的文件|
|output|[Output](#output)|是|-|输出文件相关的配置|
|translator| `googlex` <br/> `openai` <br/> `google` <br/> `microsoft` <br/> `aliyun` <br/> `tencent` <br/> `youdao` <br/> `baidu`|否|googlex|指定翻译平台，默认为 `googlex` <br /><br />指定好 `translator` 后，还需配合对应的配置文件<br />例如 `translator` 配置为 `googlex` , 则还需要配置 `googlexConfig` |
|googlexConfig|[GooglexConfig](#googlexconfig)|否|-|谷歌X翻译相关的配置|
|openaiConfig|[OpenaiConfig](#openaiconfig)|否|-|OpenAI翻译相关的配置|
|googleConfig|[GoogleConfig](#googleconfig)|否|-|谷歌翻译相关的配置|
|microsoftConfig|[MicrosoftConfig](#microsoftconfig)|否|-|微软翻译相关的配置|
|baiduConfig|[BaiduConfig](#baiduconfig)|否|-|百度翻译相关的配置|
|youdaoConfig|[YoudaoConfig](#youdaoconfig)|否|-|有道翻译相关的配置|
|tencentConfig|[TencentConfig](#tencentconfig)|否|-|腾讯翻译相关的配置|
|aliyunConfig|[AliyunConfig](#aliyunconfig)|否|-|阿里云翻译相关的配置|

### Output
输出文件的配置
|名称|类型|是否必设|默认值|说明|
|:-:|:-:|:-:|:-:|:-|
|path|string|是|-|语言包生成的目录（绝对路径）|
|langType|'single' <br/> 'multiple'|否|'multiple'|输出语言包文件的形式<br /><br />假设目标语言是 `['en', 'jp']` <br />**single**：只会生成一个聚合的语言包文件 `langs.json`，格式如下：<br />`{"en":{"xxx":"xxx"},"jp":{"xxx":"xxx"}}`<br /><br />**multiple**：每个目标语言都会生成对应的语言包文件，对应两个文件： `en.json`， `jp.json` ，格式如下：<br />`{"xxx":"xxx"}`|
|indentSize|number|否|2|语言包文件的缩进空格数|

### GooglexConfig
谷歌X翻译的配置
>基于 [google-translate-api-x](https://github.com/AidanWelch/google-translate-api) 实现，无需注册，免费使用

|名称|类型|是否必设|默认值|说明|
|:-:|:-:|:-:|:-:|:-|
|proxy|string|否|-|配置代理服务<br /><br />部分国家和地区不能正常访问 `谷歌` 服务，需要配置代理才行<br />格式：`protocol://hostname:port`<br />例如：`http://127.0.0.1:8087`|
|from|string|是|-|被翻译文案的语言代码（例如中文的是 `zh-CN`，英文的是 `en`）<br /><br />[支持语言](https://github.com/AidanWelch/google-translate-api)，需查阅对应文档|
|to|string[]|是|-|翻译的目标语言代码，格式同上<br /><br />📢📢📢：如果目标语言配置为 `['en']`，那么生成的文件名(`output.langType=='multiple'`）就是 `en.json`，设置语言时的 `locale` 也必须是 `'en'`，如果需要 `locale` 设置为 `'en_US'` 这种，就需要配合 `codeLocaleMap` 来使用|
|codeLocaleMap|Record<string, string>|否|{}|设置语言代码与 `locale` 的映射关系<br /><br />例如目标语言为 `['en']`，想设置 `locale` 的值为 `'en_US'` ，那么需要配置 `codeLocaleMap` 为 `{"en":"en_US"}` ，最终生成的文件名(`output.langType=='multiple'`）也会变成 `en_US.json` |
|delay|number|否|0|单个接口分批次请求时，后续接口请求时间间隔(单位：秒)<br /><br />用于解决接口有 QPS 限制，如果存在相关报错，可尝试配置该属性来解决|

### OpenAIConfig
OpenAI翻译的配置
|名称|类型|是否必设|默认值|说明|
|:-:|:-:|:-:|:-:|:-|
|key|string|是|-|OpenAI API Key，需要[注册账号](https://chat.openai.com/auth/login)申请|
|model|string|是|gpt-3.5-turbo|指定模型版本<br /><br />使用模型，默认为 `gpt-3.5-turbo` ，当前只兼容 `Chart` 模型|
|proxy|string|否|-|配置代理服务<br /><br />部分国家和地区不能正常访问 `OpenAI` 服务，需要配置代理才行<br />格式：`protocol://hostname:port`<br />例如：`http://127.0.0.1:8087`|
|from|string|是|-|被翻译文案的语言（例如中文是 `Chinese`，英文是 `English`）<br /><br />特殊说明：由于 `OpenAI` 目前没有推出纯文本的翻译API，因此只能通过自定义的 `Prompt` 来执行翻译，这里要求提供的翻译语言必须是英文|
|to|string[]|是|-|翻译的目标语言代码，格式同上<br /><br />📢📢📢：如果目标语言配置为 `['en']`，那么生成的文件名(`output.langType=='multiple'`）就是 `en.json`，设置语言时的 `locale` 也必须是 `'en'`，如果需要 `locale` 设置为 `'en_US'` 这种，就需要配合 `codeLocaleMap` 来使用|
|codeLocaleMap|Record<string, string>|否|{}|设置语言代码与 `locale` 的映射关系<br /><br />例如目标语言为 `['en']`，想设置 `locale` 的值为 `'en_US'` ，那么需要配置 `codeLocaleMap` 为 `{"en":"en_US"}` ，最终生成的文件名(`output.langType=='multiple'`）也会变成 `en_US.json` |
|delay|number|否|0|单个接口分批次请求时，后续接口请求时间间隔(单位：秒)<br /><br />用于解决接口有 QPS 限制，如果存在相关报错，可尝试配置该属性来解决|

### GoogleConfig
谷歌翻译的配置
>注意：该平台比较特殊，需要在本地环境提供额外的密匙，具体请参考[文档](https://cloud.google.com/translate/docs/setup?hl=zh-cn#auth)

|名称|类型|是否必设|默认值|说明|
|:-:|:-:|:-:|:-:|:-|
|projectId|string|是|-|项目ID，需要[注册账号](https://cloud.google.com/translate)申请|
|location|string|否|-|区域|
|from|string|是|-|被翻译文案的语言代码（例如中文的是 `zh-CN`，英语的是 `en`）<br /><br />[更多语言](https://cloud.google.com/translate/docs/languages )|
|to|string[]|是|-|翻译的目标语言代码，格式同上<br /><br />📢📢📢：如果目标语言配置为 `['en']`，那么生成的文件名(`output.langType=='multiple'`）就是 `en.json`，设置语言时的 `locale` 也必须是 `'en'`，如果需要 `locale` 设置为 `'en_US'` 这种，就需要配合 `codeLocaleMap` 来使用|
|codeLocaleMap|Record<string, string>|否|{}|设置语言代码与 `locale` 的映射关系<br /><br />例如目标语言为 `['en']`，想设置 `locale` 的值为 `'en_US'` ，那么需要配置 `codeLocaleMap` 为 `{"en":"en_US"}` ，最终生成的文件名(`output.langType=='multiple'`）也会变成 `en_US.json` |
|delay|number|否|0|单个接口分批次请求时，后续接口请求时间间隔(单位：秒)<br /><br />用于解决接口有 QPS 限制，如果存在相关报错，可尝试配置该属性来解决|

### MicrosoftConfig
微软翻译的配置
|名称|类型|是否必设|默认值|说明|
|:-:|:-:|:-:|:-:|:-|
|key|string|是|-|Microsoft translator-key，需要[注册 Azure 账号](https://azure.microsoft.com/)申请|
|location|string|否|-|区域|
|from|string|是|-|被翻译文案的语言代码（例如中文的是 `zh-Hans`，英语的是 `en`）<br /><br />[更多语言](https://learn.microsoft.com/zh-cn/azure/cognitive-services/translator/language-support)|
|to|string[]|是|-|翻译的目标语言代码，格式同上<br /><br />📢📢📢：如果目标语言配置为 `['en']`，那么生成的文件名(`output.langType=='multiple'`）就是 `en.json`，设置语言时的 `locale` 也必须是 `'en'`，如果需要 `locale` 设置为 `'en_US'` 这种，就需要配合 `codeLocaleMap` 来使用|
|codeLocaleMap|Record<string, string>|否|{}|设置语言代码与 `locale` 的映射关系<br /><br />例如目标语言为 `['en']`，想设置 `locale` 的值为 `'en_US'` ，那么需要配置 `codeLocaleMap` 为 `{"en":"en_US"}` ，最终生成的文件名(`output.langType=='multiple'`）也会变成 `en_US.json` |
|delay|number|否|0|单个接口分批次请求时，后续接口请求时间间隔(单位：秒)<br /><br />用于解决接口有 QPS 限制，如果存在相关报错，可尝试配置该属性来解决|

### BaiduConfig
百度翻译的配置
|名称|类型|是否必设|默认值|说明|
|:-:|:-:|:-:|:-:|:-|
|appid|string|是|-|APPID，需要[注册账号](http://api.fanyi.baidu.com/doc/21 '文档中有指导说明')申请|
|key|string|是|-|密钥，要求同上|
|from|string|是|-|被翻译文案的语言代码（例如中文的是 `zh`，英语的是 `en`）<br /><br />[更多语言](http://api.fanyi.baidu.com/doc/21 '搜索"语种列表"')，搜索`语种列表`|
|to|string[]|是|-|翻译的目标语言代码，格式同上<br /><br />📢📢📢：如果目标语言配置为 `['en']`，那么生成的文件名(`output.langType=='multiple'`）就是 `en.json`，设置语言时的 `locale` 也必须是 `'en'`，如果需要 `locale` 设置为 `'en_US'` 这种，就需要配合 `codeLocaleMap` 来使用|
|codeLocaleMap|Record<string, string>|否|{}|设置语言代码与 `locale` 的映射关系<br /><br />例如目标语言为 `['en']`，想设置 `locale` 的值为 `'en_US'` ，那么需要配置 `codeLocaleMap` 为 `{"en":"en_US"}` ，最终生成的文件名(`output.langType=='multiple'`）也会变成 `en_US.json` |
|delay|number|否|0|单个接口分批次请求时，后续接口请求时间间隔(单位：秒)<br /><br />用于解决接口有 QPS 限制，如果存在相关报错，可尝试配置该属性来解决|

### YoudaoConfig
有道翻译的配置
|名称|类型|是否必设|默认值|说明|
|:-:|:-:|:-:|:-:|:-|
|appKey|string|是|-|应用ID，需要[注册账号](https://ai.youdao.com '文档中有指导说明')申请|
|key|string|是|-|应用密钥，要求同上|
|from|string|是|-|被翻译文案的语言代码（例如中文的是 `zh-CHS`，英语的是 `en`）<br /><br />[更多语言](https://ai.youdao.com/DOCSIRMA/html/%E8%87%AA%E7%84%B6%E8%AF%AD%E8%A8%80%E7%BF%BB%E8%AF%91/API%E6%96%87%E6%A1%A3/%E6%96%87%E6%9C%AC%E7%BF%BB%E8%AF%91%E6%9C%8D%E5%8A%A1/%E6%96%87%E6%9C%AC%E7%BF%BB%E8%AF%91%E6%9C%8D%E5%8A%A1-API%E6%96%87%E6%A1%A3.html '搜索"支持语言"')，搜索`支持语言`|
|to|string[]|是|-|翻译的目标语言代码，格式同上<br /><br />📢📢📢：如果目标语言配置为 `['en']`，那么生成的文件名(`output.langType=='multiple'`）就是 `en.json`，设置语言时的 `locale` 也必须是 `'en'`，如果需要 `locale` 设置为 `'en_US'` 这种，就需要配合 `codeLocaleMap` 来使用|
|codeLocaleMap|Record<string, string>|否|{}|设置语言代码与 `locale` 的映射关系<br /><br />例如目标语言为 `['en']`，想设置 `locale` 的值为 `'en_US'` ，那么需要配置 `codeLocaleMap` 为 `{"en":"en_US"}` ，最终生成的文件名(`output.langType=='multiple'`）也会变成 `en_US.json` |
|delay|number|否|0|单个接口分批次请求时，后续接口请求时间间隔(单位：秒)<br /><br />用于解决接口有 QPS 限制，如果存在相关报错，可尝试配置该属性来解决|

### TencentConfig
腾讯翻译的配置
|名称|类型|是否必设|默认值|说明|
|:-:|:-:|:-:|:-:|:-|
|secretId|string|是|-|用于标识 API 调用者身份，可以简单类比为用户名，需要[注册账号](https://cloud.tencent.com/document/api/551/40566 '文档中有指导说明')申请|
|secretKey|string|是|-|用于验证 API 调用者的身份，可以简单类比为密码，要求同上|
|region|string|是|-|地域列表<br /><br /> [地域列表](https://cloud.tencent.com/document/api/551/40566#2.-.E8.BE.93.E5.85.A5.E5.8F.82.E6.95.B0 '搜索"地域列表"')，搜索`地域列表`|
|from|string|是|-|被翻译文案的语言代码（例如中文的是 `zh`，英语的是 `en`）<br /><br />[更多语言](https://cloud.tencent.com/document/api/551/40566#2.-.E8.BE.93.E5.85.A5.E5.8F.82.E6.95.B0 '搜索"源语言"')，搜索`源语言`|
|to|string[]|是|-|翻译的目标语言代码，格式同上<br /><br />📢📢📢：如果目标语言配置为 `['en']`，那么生成的文件名(`output.langType=='multiple'`）就是 `en.json`，设置语言时的 `locale` 也必须是 `'en'`，如果需要 `locale` 设置为 `'en_US'` 这种，就需要配合 `codeLocaleMap` 来使用|
|codeLocaleMap|Record<string, string>|否|{}|设置语言代码与 `locale` 的映射关系<br /><br />例如目标语言为 `['en']`，想设置 `locale` 的值为 `'en_US'` ，那么需要配置 `codeLocaleMap` 为 `{"en":"en_US"}` ，最终生成的文件名(`output.langType=='multiple'`）也会变成 `en_US.json` |
|delay|number|否|0|单个接口分批次请求时，后续接口请求时间间隔(单位：秒)<br /><br />用于解决接口有 QPS 限制，如果存在相关报错，可尝试配置该属性来解决|

### AliyunConfig
阿里云翻译的配置
|名称|类型|是否必设|默认值|说明|
|:-:|:-:|:-:|:-:|:-|
|accessKeyId|string|是|-|AccessKey ID，需要[注册账号](https://mt.console.aliyun.com/basic '文档中有指导说明')申请|
|accessKeySecret|string|是|-|AccessKey Secret，要求同上|
|scene|string|否|general|场景<br /><br />具体可选值需要根据当前API的类型：<br />[普通版：参考文档](https://help.aliyun.com/document_detail/158244.html '搜索"Scene"')，搜索`Scene`<br />[专业版：参考文档](https://help.aliyun.com/document_detail/158267.html '搜索"Scene"')，搜索`Scene`|
|from|string|是|-|被翻译文案的语言代码（例如中文的是 `zh`，英语的是 `en`）<br /><br />[更多语言](https://help.aliyun.com/document_detail/215387.html?spm=a2c4g.11186623.0.0.5d572e50TWfreB#Zcs6q '搜索"语言代码列表"')，搜索`语言代码列表`|
|to|string[]|是|-|翻译的目标语言代码，格式同上<br /><br />📢📢📢：如果目标语言配置为 `['en']`，那么生成的文件名(`output.langType=='multiple'`）就是 `en.json`，设置语言时的 `locale` 也必须是 `'en'`，如果需要 `locale` 设置为 `'en_US'` 这种，就需要配合 `codeLocaleMap` 来使用|
|codeLocaleMap|Record<string, string>|否|{}|设置语言代码与 `locale` 的映射关系<br /><br />例如目标语言为 `['en']`，想设置 `locale` 的值为 `'en_US'` ，那么需要配置 `codeLocaleMap` 为 `{"en":"en_US"}` ，最终生成的文件名(`output.langType=='multiple'`）也会变成 `en_US.json` |
|delay|number|否|0|单个接口分批次请求时，后续接口请求时间间隔(单位：秒)<br /><br />用于解决接口有 QPS 限制，如果存在相关报错，可尝试配置该属性来解决|

## 2. 命令

### 命令列表

|命令|简写|用法|说明|
|:-:|:-:|:-|:-|
|init|-|`npx i18n init`|初始化配置文件|
|translate|t|`npx i18n translate` <br /> `npx i18n t`|提取翻译文案，自动翻译并生成语言包|
|version|v|`npx i18n version`<br />`npx i18n v`|显示版本信息|
|help|h|`npx i18n help`<br />`npx i18n h`|显示帮助信息|

### 命令参数

|参数名|简写|参数值|适用命令|用法|说明|
|:-:|:-:|:-:|:-|:-|:-|
|--locale|-L|`en` \| `zh`|ALL|`npx i18n h -L en`<br />`npx i18n h --locale en`|指定命令行显示语言<br /><br />可选语言有中文（zh）/ 英文（en）， 默认为英文（en）|
|--non-incremental|-|-|`t`<br />`translate`|`npx i18n t --non-incremental`|关闭增量翻译模式<br /><br />⚠️⚠️⚠️：关闭增量翻译模式后，所有的文案会重新翻译，会导致**手工翻译**（非翻译平台翻译的）的文案丢失，需慎重考虑使用！！！|
|--path|-P|-|`init`<br />`t`<br />`translate`|`npx i18n init -P /xxx/xxx/xxx`<br />`npx i18n t -P /xxx/xxx/xxx`|指定配置文件路径（参数为绝对路径）<br /><br />只需要指定路径名，配置文件名默认为 `i18nrc.js`|
