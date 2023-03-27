
# Command Line

<details >
  <summary>Table of Contents</summary>

  &emsp;&emsp;[1.  `i18nrc.js`  configuration](#1-i18nrcjs-configuration)<br/>
  &emsp;&emsp;&emsp;&emsp;[Basic configuration](#basic-configuration)<br/>
  &emsp;&emsp;&emsp;&emsp;[Output](#output)<br/>
  &emsp;&emsp;&emsp;&emsp;[BaiduConfig](#baiduconfig)<br/>
  &emsp;&emsp;&emsp;&emsp;[YoudaoConfig](#youdaoconfig)<br/>
  &emsp;&emsp;&emsp;&emsp;[TencentConfig](#tencentconfig)<br/>
  &emsp;&emsp;&emsp;&emsp;[AliyunConfig](#aliyunconfig)<br/>
  &emsp;&emsp;[2. Command](#2-command)<br/>
  &emsp;&emsp;&emsp;&emsp;[Command List](#command-list)<br/>
  &emsp;&emsp;&emsp;&emsp;[Command Parameters](#command-parameters)<br/>

</details>

## 1.  `i18nrc.js`  configuration

### Basic configuration

|Name|Type|Required|Default|Description|
|:-:|:-:|:-:|:-:|:-|
|funcName|string|no|t|Function name of command line for matching translated text<br /><br />If the  `t`  function is not renamed, it does not need to be adjusted here; otherwise, it is configured as the function name after renaming|
|entry|string|yes|-|Specify the translation file directory (absolute path)|
|fileRegExp|RegExp|no| `/.[jt]s$/` |The regular expression that matching filename<br /><br />Used to filter files to be translated|
|output|[Output](#output)|yes|-|The configuration associated with the output file|
|translator| `openai` <br/> `google` <br/> `microsoft` <br/> `aliyun` <br/> `tencent` <br/> `youdao` <br/> `baidu`|no|baidu|指定翻译平台，默认为 `baidu` <br /><br />指定好 `translator` 后，还需配合对应的配置文件<br />例如 `translator` 配置为 `baidu` , 则还需要配置 `baiduConfig` |
|baiduConfig|[BaiduConfig](#baiduconfig)|no|-|百度翻译相关的配置|
|youdaoConfig|[YoudaoConfig](#youdaoconfig)|no|-|有道翻译相关的配置|
|tencentConfig|[TencentConfig](#tencentconfig)|no|-|腾讯翻译相关的配置|
|aliyunConfig|[AliyunConfig](#aliyunconfig)|no|-|阿里云翻译相关的配置|

### Output
Configuration of output files
|Name|Type|Required|Default|Description|
|:-:|:-:|:-:|:-:|:-|
|path|string|yes|-|The directory where the language pack is generated (absolute path)|
|langType|'single' <br/> 'multiple'|no|'multiple'|Format of output language pack file<br /><br />Assume the target language is  `['en', 'jp']` <br />**single**：Only one aggregated language pack file  `langs.json` will be generated. The format is as follows:<br />`{"en":{"xxx":"xxx"},"jp":{"xxx":"xxx"}}`<br /><br />**multiple**：Each target language will generate a corresponding language pack file, which corresponds to two files:  `en.json`， `jp.json` . The format is as follows:<br />`{"xxx":"xxx"}`|
|indentSize|number|no|2|Number of indented spaces in the language pack file|

### BaiduConfig
Configuration of Baidu-Translation
|Name|Type|Required|Default|Description|
|:-:|:-:|:-:|:-:|:-|
|appid|string|yes|-|APPID, [Registered account](http://api.fanyi.baidu.com/doc/21 'There are instructions in the document') application is required|
|key|string|yes|-|Key, as above|
|from|string|yes|-|Language code of the translated text (for example,  `zh` for Chinese,  `en` for English)<br /><br />[More languages](http://api.fanyi.baidu.com/doc/21 'Search "语种列表"')，Search `语种列表`|
|to|string[]|yes|-|The target language code for translation, with the same format as above<br /><br />📢📢📢：If the target language is configured as  `['en']`, the generated filename (`output.langType=='multiple'`） is  `en.json`. When setting the language,  `locale`  must also be  `'en'`. If  `locale`  needs to be set as  `'en_US'` , it needs to be used in conjunction with  `codeLocaleMap` |
|codeLocaleMap|Record<string, string>|no|{}|Set the mapping relationship between language code and  `locale` <br /><br />For example, if the target language is  `['en']` and you want to set the value of  `locale`  to  `'en_US'` , you need to configure  `codeLocaleMap`  to  `{"en":"en_US"}` , and the final generated filename (`output.langType=='multiple'`） will also become  `en_US.json` |
|delay|number|no|0|单个接口分批次请求时，后续接口请求时间间隔<br /><br />用于解决接口有 QPS 限制，如果存在相关报错，可尝试配置该属性来解决|

### YoudaoConfig
有道翻译的配置
|Name|Type|Required|Default|Description|
|:-:|:-:|:-:|:-:|:-|
|appKey|string|yes|-|应用ID，需要[Registered account](https://ai.youdao.com 'There are instructions in the document')申请|
|key|string|yes|-|应用密钥，要求同上|
|from|string|yes|-|Language code of the translated text (for example,  `zh-CHS` for Chinese,  `en` for English)<br /><br />[More languages](https://ai.youdao.com/DOCSIRMA/html/%E8%87%AA%E7%84%B6%E8%AF%AD%E8%A8%80%E7%BF%BB%E8%AF%91/API%E6%96%87%E6%A1%A3/%E6%96%87%E6%9C%AC%E7%BF%BB%E8%AF%91%E6%9C%8D%E5%8A%A1/%E6%96%87%E6%9C%AC%E7%BF%BB%E8%AF%91%E6%9C%8D%E5%8A%A1-API%E6%96%87%E6%A1%A3.html 'Search "支持语言"')，Search `支持语言`|
|to|string[]|yes|-|The target language code for translation, with the same format as above<br /><br />📢📢📢：If the target language is configured as  `['en']`, the generated filename (`output.langType=='multiple'`） is  `en.json`. When setting the language,  `locale`  must also be  `'en'`. If  `locale`  needs to be set as  `'en_US'` , it needs to be used in conjunction with  `codeLocaleMap` |
|codeLocaleMap|Record<string, string>|no|{}|Set the mapping relationship between language code and  `locale` <br /><br />For example, if the target language is  `['en']` and you want to set the value of  `locale`  to  `'en_US'` , you need to configure  `codeLocaleMap`  to  `{"en":"en_US"}` , and the final generated filename (`output.langType=='multiple'`） will also become  `en_US.json` |
|delay|number|no|0|单个接口分批次请求时，后续接口请求时间间隔<br /><br />用于解决接口有 QPS 限制，如果存在相关报错，可尝试配置该属性来解决|

### TencentConfig
腾讯翻译的配置
|Name|Type|Required|Default|Description|
|:-:|:-:|:-:|:-:|:-|
|secretId|string|yes|-|用于标识 API 调用者身份，可以简单类比为用户名，需要[Registered account](https://cloud.tencent.com/document/api/551/40566 'There are instructions in the document')申请|
|secretKey|string|yes|-|用于验证 API 调用者的身份，可以简单类比为密码，要求同上|
|region|string|yes|-|地域列表<br /><br /> [地域列表](https://cloud.tencent.com/document/api/551/40566#2.-.E8.BE.93.E5.85.A5.E5.8F.82.E6.95.B0 'Search "地域列表"')，Search `地域列表`|
|from|string|yes|-|Language code of the translated text (for example,  `zh` for Chinese,  `en` for English)<br /><br />[More languages](https://cloud.tencent.com/document/api/551/40566#2.-.E8.BE.93.E5.85.A5.E5.8F.82.E6.95.B0 'Search "源语言"')，Search `源语言`|
|to|string[]|yes|-|The target language code for translation, with the same format as above<br /><br />📢📢📢：If the target language is configured as  `['en']`, the generated filename (`output.langType=='multiple'`） is  `en.json`. When setting the language,  `locale`  must also be  `'en'`. If  `locale`  needs to be set as  `'en_US'` , it needs to be used in conjunction with  `codeLocaleMap` |
|codeLocaleMap|Record<string, string>|no|{}|Set the mapping relationship between language code and  `locale` <br /><br />For example, if the target language is  `['en']` and you want to set the value of  `locale`  to  `'en_US'` , you need to configure  `codeLocaleMap`  to  `{"en":"en_US"}` , and the final generated filename (`output.langType=='multiple'`） will also become  `en_US.json` |
|delay|number|no|0|单个接口分批次请求时，后续接口请求时间间隔<br /><br />用于解决接口有 QPS 限制，如果存在相关报错，可尝试配置该属性来解决|

### AliyunConfig
阿里云翻译的配置
|Name|Type|Required|Default|Description|
|:-:|:-:|:-:|:-:|:-|
|accessKeyId|string|yes|-|AccessKey ID，需要[Registered account](https://mt.console.aliyun.com/basic 'There are instructions in the document')申请|
|accessKeySecret|string|yes|-|AccessKey Secret，要求同上|
|scene|string|no|general|场景<br /><br />具体可选值需要根据当前API的类型：<br />[普通版：参考文档](https://help.aliyun.com/document_detail/158244.html 'Search "Scene"')，Search `Scene`<br />[专业版：参考文档](https://help.aliyun.com/document_detail/158267.html 'Search "Scene"')，Search `Scene`|
|from|string|yes|-|Language code of the translated text (for example,  `zh` for Chinese,  `en` for English)<br /><br />[More languages](https://help.aliyun.com/document_detail/215387.html?spm=a2c4g.11186623.0.0.5d572e50TWfreB#Zcs6q 'Search "语言代码列表"')，Search `语言代码列表`|
|to|string[]|yes|-|The target language code for translation, with the same format as above<br /><br />📢📢📢：If the target language is configured as  `['en']`, the generated filename (`output.langType=='multiple'`） is  `en.json`. When setting the language,  `locale`  must also be  `'en'`. If  `locale`  needs to be set as  `'en_US'` , it needs to be used in conjunction with  `codeLocaleMap` |
|codeLocaleMap|Record<string, string>|no|{}|Set the mapping relationship between language code and  `locale` <br /><br />For example, if the target language is  `['en']` and you want to set the value of  `locale`  to  `'en_US'` , you need to configure  `codeLocaleMap`  to  `{"en":"en_US"}` , and the final generated filename (`output.langType=='multiple'`） will also become  `en_US.json` |
|delay|number|no|0|单个接口分批次请求时，后续接口请求时间间隔<br /><br />用于解决接口有 QPS 限制，如果存在相关报错，可尝试配置该属性来解决|

## 2. Command

### Command List

|Command|Shorthand|Usage|Description|
|:-:|:-:|:-|:-|
|init|-|`npx i18n init`|Initialize the configuration file|
|translate|t|`npx i18n translate` <br /> `npx i18n t`|Extract translated text, automatically translate and generate language pack|
|version|v|`npx i18n version`<br />`npx i18n v`|Display version information|
|help|h|`npx i18n help`<br />`npx i18n h`|Display help information|

### Command Parameters

|Parameter name|Shorthand|Parameter value|Applicable commands|Usage|Description|
|:-:|:-:|:-:|:-|:-|:-|
|--locale|-L|`en` \| `zh`|ALL|`npx i18n h -L en`<br />`npx i18n h --locale en`|Specify the command line display language<br /><br />The available languages are Chinese (zh)/English (en). The default is English (en)|
|--non-incremental|-|-|`t`<br />`translate`|`npx i18n t --non-incremental`|Turn off incremental translation mode<br /><br />⚠️⚠️⚠️： After the incremental translation mode is turned off, all texts will be retranslated, which will result in the loss of **Manual translation**(Not translated by a translation platform) texts. Please consider using it carefully!!!|
|--path|-P|-|`init`<br />`t`<br />`translate`|`npx i18n init -P /xxx/xxx/xxx`<br />`npx i18n t -P /xxx/xxx/xxx`|Specify the configuration file path (the parameter is an absolute path)<br /><br />You only need to specify the path name. The default configuration filename is  `i18nrc.js`|
