
# Command Line

<details >
  <summary>Table of Contents</summary>

  &emsp;&emsp;[1.  `i18nrc.js`  configuration](#1--i18nrcjs--configuration)<br/>
  &emsp;&emsp;&emsp;&emsp;[Basic configuration](#basic-configuration)<br/>
  &emsp;&emsp;&emsp;&emsp;[Output](#output)<br/>
  &emsp;&emsp;&emsp;&emsp;[GooglexConfig](#googlexconfig)<br/>
  &emsp;&emsp;&emsp;&emsp;[OpenAIConfig](#openaiconfig)<br/>
  &emsp;&emsp;&emsp;&emsp;[GoogleConfig](#googleconfig)<br/>
  &emsp;&emsp;&emsp;&emsp;[MicrosoftConfig](#microsoftconfig)<br/>
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
|funcName|string|no|t|Command line matching function name for translating texts<br /><br />If the  `t`  function is not renamed, it does not need to be adjusted here; otherwise, it is configured as the function name after renaming|
|entry|string|yes|-|Specify the translation file directory (absolute path)|
|fileRegExp|RegExp|no| `/.[jt]s$/` |The regular expression that matching filename<br /><br />Used to filter files to be translated|
|output|[Output](#output)|yes|-|The configuration associated with the output file|
|translator| `googlex` <br/> `openai` <br/> `google` <br/> `microsoft` <br/> `aliyun` <br/> `tencent` <br/> `youdao` <br/> `baidu`|no|googlex|Specify the translation platform, default<br /><br />After specifying  `translator` , you need to cooperate with the corresponding configuration file<br />For example,  `translator`  configuration to  `googlex` , then you need to configure  `googlexConfig` |
|googlexConfig|[GooglexConfig](#googlexconfig)|no|-|Google x Translation -related configuration|
|openaiConfig|[OpenaiConfig](#openaiconfig)|no|-|OpenAI Translation -related configuration|
|googleConfig|[GoogleConfig](#googleconfig)|no|-|Google Translation -related configuration|
|microsoftConfig|[MicrosoftConfig](#microsoftconfig)|no|-|Microsoft Translation -related configuration|
|baiduConfig|[BaiduConfig](#baiduconfig)|no|-|Baidu Translation -related configuration|
|youdaoConfig|[YoudaoConfig](#youdaoconfig)|no|-|Youdao Translation -related configuration|
|tencentConfig|[TencentConfig](#tencentconfig)|no|-|Tencent Translation -related configuration|
|aliyunConfig|[AliyunConfig](#aliyunconfig)|no|-|Ali Cloud Translation -related configuration|

### Output
Configuration of output files
|Name|Type|Required|Default|Description|
|:-:|:-:|:-:|:-:|:-|
|path|string|yes|-|The directory where the language pack is generated (absolute path)|
|langType|'single' <br/> 'multiple'|no|'multiple'|Format of output language pack file<br /><br />Assume the target language is  `['en', 'jp']` <br />**single**：Only one aggregated language pack file  `langs.json` will be generated. The format is as follows:<br />`{"en":{"xxx":"xxx"},"jp":{"xxx":"xxx"}}`<br /><br />**multiple**：Each target language will generate a corresponding language pack file, which corresponds to two files:  `en.json`， `jp.json` . The format is as follows:<br />`{"xxx":"xxx"}`|
|indentSize|number|no|2|Number of indented spaces in the language pack file|

### GooglexConfig
Google X translation configuration
>Realization based on  [google-translate-api-x](https://github.com/AidanWelch/google-translate-api) , no registration, free use

|Name|Type|Required|Default|Description|
|:-:|:-:|:-:|:-:|:-|
|proxy|string|no|-|Configuration proxy service<br /><br />Some countries and regions cannot access the  `谷歌`  service normally, and need to be configured with agents<br />格式：`protocol://hostname:port`<br />例如：`http://127.0.0.1:8087`|
|from|string|yes|-|Language code of the translated text (e.g.  `zh-CN` for Chinese,  `en` for English)<br /><br />[Support language](https://github.com/AidanWelch/google-translate-api)，Need to check the corresponding documentation|
|to|string[]|yes|-|The target language code for translation, with the same format as above<br /><br />📢📢📢：If the target language is configured as  `['en']`, the generated filename (`output.langType=='multiple'`） is  `en.json`. When setting the language,  `locale`  must also be  `'en'`. If  `locale`  needs to be set as  `'en_US'` , it needs to be used in conjunction with  `codeLocaleMap` |
|codeLocaleMap|Record<string, string>|no|{}|Set the mapping relationship between language code and  `locale` <br /><br />For example, if the target language is  `['en']` and you want to set the value of  `locale`  to  `'en_US'` , you need to configure  `codeLocaleMap`  to  `{"en":"en_US"}` , and the final generated filename (`output.langType=='multiple'`） will also become  `en_US.json` |
|delay|number|no|0|The time interval (in seconds) for subsequent interface requests when a single interface is requested in batches<br /><br />It is used to solve the QPS limit of the interface. If there is a related error, you can try to configure the attribute to solve|

### OpenAIConfig
OPENAI translation configuration
|Name|Type|Required|Default|Description|
|:-:|:-:|:-:|:-:|:-|
|key|string|yes|-|Openai API Key, need [Registered account](https://chat.openai.com/auth/login) application|
|model|string|yes|gpt-3.5-turbo|Specify model version<br /><br />Use the model, the default is  `gpt-3.5-turbo` , currently only compatible  `Chart`  model|
|proxy|string|no|-|Configuration proxy service<br /><br />Some countries and regions cannot access the  `OpenAI`  service normally, and need to be configured with agents<br />格式：`protocol://hostname:port`<br />例如：`http://127.0.0.1:8087`|
|from|string|yes|-|Language of the translated text (e.g.  `Chinese` for Chinese,  `English` for English)<br /><br />Special Instructions:Since  `OpenAI`  currently does not launch a pure text translation API, it can only be executed by customized  `Prompt` . The translation language required here must be English|
|to|string[]|yes|-|The target language code for translation, with the same format as above<br /><br />📢📢📢：If the target language is configured as  `['en']`, the generated filename (`output.langType=='multiple'`） is  `en.json`. When setting the language,  `locale`  must also be  `'en'`. If  `locale`  needs to be set as  `'en_US'` , it needs to be used in conjunction with  `codeLocaleMap` |
|codeLocaleMap|Record<string, string>|no|{}|Set the mapping relationship between language code and  `locale` <br /><br />For example, if the target language is  `['en']` and you want to set the value of  `locale`  to  `'en_US'` , you need to configure  `codeLocaleMap`  to  `{"en":"en_US"}` , and the final generated filename (`output.langType=='multiple'`） will also become  `en_US.json` |
|delay|number|no|0|The time interval (in seconds) for subsequent interface requests when a single interface is requested in batches<br /><br />It is used to solve the QPS limit of the interface. If there is a related error, you can try to configure the attribute to solve|

### GoogleConfig
Google Configuration of Translation
>Note: The platform is relatively special, and additional key needs need to be provided in the local environment. For details, please refer to [Documentation](https://cloud.google.com/translate/docs/setup?hl=zh-cn#auth)

|Name|Type|Required|Default|Description|
|:-:|:-:|:-:|:-:|:-|
|projectId|string|yes|-|Project ID, need [Registered account](https://cloud.google.com/translate) application|
|location|string|no|-|area|
|from|string|yes|-|Language code of the translated text (e.g.  `zh-CN` for Chinese,  `en` for English)<br /><br />[More languages](https://cloud.google.com/translate/docs/languages )|
|to|string[]|yes|-|The target language code for translation, with the same format as above<br /><br />📢📢📢：If the target language is configured as  `['en']`, the generated filename (`output.langType=='multiple'`） is  `en.json`. When setting the language,  `locale`  must also be  `'en'`. If  `locale`  needs to be set as  `'en_US'` , it needs to be used in conjunction with  `codeLocaleMap` |
|codeLocaleMap|Record<string, string>|no|{}|Set the mapping relationship between language code and  `locale` <br /><br />For example, if the target language is  `['en']` and you want to set the value of  `locale`  to  `'en_US'` , you need to configure  `codeLocaleMap`  to  `{"en":"en_US"}` , and the final generated filename (`output.langType=='multiple'`） will also become  `en_US.json` |
|delay|number|no|0|The time interval (in seconds) for subsequent interface requests when a single interface is requested in batches<br /><br />It is used to solve the QPS limit of the interface. If there is a related error, you can try to configure the attribute to solve|

### MicrosoftConfig
Microsoft Configuration of Translation
|Name|Type|Required|Default|Description|
|:-:|:-:|:-:|:-:|:-|
|key|string|yes|-|Microsoft Translator-Key, you need [Register azure account](https://azure.microsoft.com/) to apply|
|location|string|no|-|area|
|from|string|yes|-|Language code of the translated text (e.g.  `zh-Hans` for Chinese,  `en` for English)<br /><br />[More languages](https://learn.microsoft.com/zh-cn/azure/cognitive-services/translator/language-support)|
|to|string[]|yes|-|The target language code for translation, with the same format as above<br /><br />📢📢📢：If the target language is configured as  `['en']`, the generated filename (`output.langType=='multiple'`） is  `en.json`. When setting the language,  `locale`  must also be  `'en'`. If  `locale`  needs to be set as  `'en_US'` , it needs to be used in conjunction with  `codeLocaleMap` |
|codeLocaleMap|Record<string, string>|no|{}|Set the mapping relationship between language code and  `locale` <br /><br />For example, if the target language is  `['en']` and you want to set the value of  `locale`  to  `'en_US'` , you need to configure  `codeLocaleMap`  to  `{"en":"en_US"}` , and the final generated filename (`output.langType=='multiple'`） will also become  `en_US.json` |
|delay|number|no|0|The time interval (in seconds) for subsequent interface requests when a single interface is requested in batches<br /><br />It is used to solve the QPS limit of the interface. If there is a related error, you can try to configure the attribute to solve|

### BaiduConfig
Configuration of Baidu-Translation
|Name|Type|Required|Default|Description|
|:-:|:-:|:-:|:-:|:-|
|appid|string|yes|-|APPID, [Registered account](http://api.fanyi.baidu.com/doc/21 'There are instructions in the document') application is required|
|key|string|yes|-|Key, as above|
|from|string|yes|-|Language code of the translated text (e.g.  `zh` for Chinese,  `en` for English)<br /><br />[More languages](http://api.fanyi.baidu.com/doc/21 'Search "语种列表"')，Search `语种列表`|
|to|string[]|yes|-|The target language code for translation, with the same format as above<br /><br />📢📢📢：If the target language is configured as  `['en']`, the generated filename (`output.langType=='multiple'`） is  `en.json`. When setting the language,  `locale`  must also be  `'en'`. If  `locale`  needs to be set as  `'en_US'` , it needs to be used in conjunction with  `codeLocaleMap` |
|codeLocaleMap|Record<string, string>|no|{}|Set the mapping relationship between language code and  `locale` <br /><br />For example, if the target language is  `['en']` and you want to set the value of  `locale`  to  `'en_US'` , you need to configure  `codeLocaleMap`  to  `{"en":"en_US"}` , and the final generated filename (`output.langType=='multiple'`） will also become  `en_US.json` |
|delay|number|no|0|The time interval (in seconds) for subsequent interface requests when a single interface is requested in batches<br /><br />It is used to solve the QPS limit of the interface. If there is a related error, you can try to configure the attribute to solve|

### YoudaoConfig
Configuration of Youdao Translation
|Name|Type|Required|Default|Description|
|:-:|:-:|:-:|:-:|:-|
|appKey|string|yes|-|Application ID, requiring [Registered account](https://ai.youdao.com 'There are instructions in the document') application|
|key|string|yes|-|Application key, require the same as above|
|from|string|yes|-|Language code of the translated text (e.g.  `zh-CHS` for Chinese,  `en` for English)<br /><br />[More languages](https://ai.youdao.com/DOCSIRMA/html/%E8%87%AA%E7%84%B6%E8%AF%AD%E8%A8%80%E7%BF%BB%E8%AF%91/API%E6%96%87%E6%A1%A3/%E6%96%87%E6%9C%AC%E7%BF%BB%E8%AF%91%E6%9C%8D%E5%8A%A1/%E6%96%87%E6%9C%AC%E7%BF%BB%E8%AF%91%E6%9C%8D%E5%8A%A1-API%E6%96%87%E6%A1%A3.html 'Search "支持语言"')，Search `支持语言`|
|to|string[]|yes|-|The target language code for translation, with the same format as above<br /><br />📢📢📢：If the target language is configured as  `['en']`, the generated filename (`output.langType=='multiple'`） is  `en.json`. When setting the language,  `locale`  must also be  `'en'`. If  `locale`  needs to be set as  `'en_US'` , it needs to be used in conjunction with  `codeLocaleMap` |
|codeLocaleMap|Record<string, string>|no|{}|Set the mapping relationship between language code and  `locale` <br /><br />For example, if the target language is  `['en']` and you want to set the value of  `locale`  to  `'en_US'` , you need to configure  `codeLocaleMap`  to  `{"en":"en_US"}` , and the final generated filename (`output.langType=='multiple'`） will also become  `en_US.json` |
|delay|number|no|0|The time interval (in seconds) for subsequent interface requests when a single interface is requested in batches<br /><br />It is used to solve the QPS limit of the interface. If there is a related error, you can try to configure the attribute to solve|

### TencentConfig
Configuration of Tencent Translation
|Name|Type|Required|Default|Description|
|:-:|:-:|:-:|:-:|:-|
|secretId|string|yes|-|Used to identify the identity of the API call, you can simple analogy as the user name, you need [Registered account](https://cloud.tencent.com/document/api/551/40566 'There are instructions in the document') to apply|
|secretKey|string|yes|-|It is used to verify the identity of the API caller, and the simple analogy can be the password, which requires the same as above|
|region|string|yes|-|Regional list<br /><br /> [Regional list](https://cloud.tencent.com/document/api/551/40566#2.-.E8.BE.93.E5.85.A5.E5.8F.82.E6.95.B0 'Search "地域列表"')，Search `地域列表`|
|from|string|yes|-|Language code of the translated text (e.g.  `zh` for Chinese,  `en` for English)<br /><br />[More languages](https://cloud.tencent.com/document/api/551/40566#2.-.E8.BE.93.E5.85.A5.E5.8F.82.E6.95.B0 'Search "源语言"')，Search `源语言`|
|to|string[]|yes|-|The target language code for translation, with the same format as above<br /><br />📢📢📢：If the target language is configured as  `['en']`, the generated filename (`output.langType=='multiple'`） is  `en.json`. When setting the language,  `locale`  must also be  `'en'`. If  `locale`  needs to be set as  `'en_US'` , it needs to be used in conjunction with  `codeLocaleMap` |
|codeLocaleMap|Record<string, string>|no|{}|Set the mapping relationship between language code and  `locale` <br /><br />For example, if the target language is  `['en']` and you want to set the value of  `locale`  to  `'en_US'` , you need to configure  `codeLocaleMap`  to  `{"en":"en_US"}` , and the final generated filename (`output.langType=='multiple'`） will also become  `en_US.json` |
|delay|number|no|0|The time interval (in seconds) for subsequent interface requests when a single interface is requested in batches<br /><br />It is used to solve the QPS limit of the interface. If there is a related error, you can try to configure the attribute to solve|

### AliyunConfig
Configuration of Alibaba Cloud Translation
|Name|Type|Required|Default|Description|
|:-:|:-:|:-:|:-:|:-|
|accessKeyId|string|yes|-|AccessKey ID, you need [Registered account](https://mt.console.aliyun.com/basic 'There are instructions in the document') to apply|
|accessKeySecret|string|yes|-|AccessKey Secret, requires the same as above|
|scene|string|no|general|Scenes<br /><br />The specific optional value needs to be based on the type of the current API:<br />[Ordinary version: Reference Document](https://help.aliyun.com/document_detail/158244.html 'Search "Scene"')，Search `Scene`<br />[Professional version: Reference Document](https://help.aliyun.com/document_detail/158267.html 'Search "Scene"')，Search `Scene`|
|from|string|yes|-|Language code of the translated text (e.g.  `zh` for Chinese,  `en` for English)<br /><br />[More languages](https://help.aliyun.com/document_detail/215387.html?spm=a2c4g.11186623.0.0.5d572e50TWfreB#Zcs6q 'Search "语言代码列表"')，Search `语言代码列表`|
|to|string[]|yes|-|The target language code for translation, with the same format as above<br /><br />📢📢📢：If the target language is configured as  `['en']`, the generated filename (`output.langType=='multiple'`） is  `en.json`. When setting the language,  `locale`  must also be  `'en'`. If  `locale`  needs to be set as  `'en_US'` , it needs to be used in conjunction with  `codeLocaleMap` |
|codeLocaleMap|Record<string, string>|no|{}|Set the mapping relationship between language code and  `locale` <br /><br />For example, if the target language is  `['en']` and you want to set the value of  `locale`  to  `'en_US'` , you need to configure  `codeLocaleMap`  to  `{"en":"en_US"}` , and the final generated filename (`output.langType=='multiple'`） will also become  `en_US.json` |
|delay|number|no|0|The time interval (in seconds) for subsequent interface requests when a single interface is requested in batches<br /><br />It is used to solve the QPS limit of the interface. If there is a related error, you can try to configure the attribute to solve|

## 2. Command

### Command List

|Command|Shorthand|Usage|Description|
|:-:|:-:|:-|:-|
|init|-|`npx i18n init`|Initialize the configuration file|
|translate|t|`npx i18n translate` <br /> `npx i18n t`|Extract translated texts, automatically translate and generate language pack|
|version|v|`npx i18n version`<br />`npx i18n v`|Display version information|
|help|h|`npx i18n help`<br />`npx i18n h`|Display help information|

### Command Parameters

|Parameter name|Shorthand|Parameter value|Applicable commands|Usage|Description|
|:-:|:-:|:-:|:-|:-|:-|
|--locale|-L|`en` \| `zh`|ALL|`npx i18n h -L en`<br />`npx i18n h --locale en`|Specify the command line display language<br /><br />The available languages are Chinese (zh)/English (en). The default is English (en)|
|--non-incremental|-|-|`t`<br />`translate`|`npx i18n t --non-incremental`|Turn off incremental translation mode<br /><br />⚠️⚠️⚠️: After turning off incremental translation mode, all texts will be re-translated, which may cause the loss of non-platform translated texts (**Manual translation**). Please use with caution!!!|
|--path|-P|-|`init`<br />`t`<br />`translate`|`npx i18n init -P /xxx/xxx/xxx`<br />`npx i18n t -P /xxx/xxx/xxx`|Specify the configuration file path (the parameter is an absolute path)<br /><br />You only need to specify the path name. The default configuration filename is  `i18nrc.js`|
