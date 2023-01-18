
# Command Line

<details >
  <summary>Table of Contents</summary>

  &emsp;&emsp;[1.  `i18nrc.js`  configuration](#1-i18nrcjs-configuration)<br/>
  &emsp;&emsp;&emsp;&emsp;[Basic configuration](#basic-configuration)<br/>
  &emsp;&emsp;&emsp;&emsp;[Output](#output)<br/>
  &emsp;&emsp;&emsp;&emsp;[BaiduConfig](#baiduconfig)<br/>
  &emsp;&emsp;[2. Command](#2-command)<br/>
  &emsp;&emsp;&emsp;&emsp;[Command List](#command-list)<br/>
  &emsp;&emsp;&emsp;&emsp;[Command Parameters](#command-parameters)<br/>

</details>

## 1.  `i18nrc.js`  configuration

### Basic configuration

|Name|Type|Required|Default|Description|
|:-:|:-:|:-:|:-:|:-|
|funcName|string|no|i18n|Function name of command line for matching translated text<br /><br />If the  `i18n`  function is not renamed, it does not need to be adjusted here; otherwise, it is configured as the function name after renaming|
|entry|string|yes|-|Specify the translation file directory (absolute path)|
|fileRegExp|RegExp|no| `/.[jt]s$/` |The regular expression that matching filename<br /><br />Used to filter files to be translated|
|output|[Output](#output)|yes|-|The configuration associated with the output file|
|baiduConfig|[BaiduConfig](#baiduconfig)|yes|-|The configuration associated with the Baidu-Translation|

### Output
Configuration of output files
|Name|Type|Required|Default|Description|
|:-:|:-:|:-:|:-:|:-|
|path|string|yes|-|The directory where the language pack is generated (absolute path)|
|langType|'single' \| 'multiple'|no|'multiple'|Format of output language pack file<br /><br />Assume the target language is  `['en', 'jp']` <br />**single**：Only one aggregated language pack file  `langs.json` will be generated. The format is as follows:<br />`{"en":{"xxx":"xxx"},"jp":{"xxx":"xxx"}}`<br /><br />**multiple**：Each target language will generate a corresponding language pack file, which corresponds to two files:  `en.json`， `jp.json` . The format is as follows:<br />`{"xxx":"xxx"}`|
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
