
# Translation log
To facilitate tracking and locating problems, there will be some necessary log output during the whole translation process. After the translation command is executed completely, a  `.log`  log directory will be generated under the  `output.path`  directory. All logs are presented in the form of independent files, including the following log types：
|Filename|Description|
|:-|:-|
|filepaths.json|List of matched file paths|
|texts-error.json|提取到所有不符合要求的翻译文案<br /><br />📢📢📢：不包含使用变量、 `JavaScript` 语句等场景|
|texts.json|提取到所有符合要求的翻译文案|
|translate-fail.json|翻译失败的文案列表|
|translate-error.json|翻译有误的文案列表<br /><br />Currently, we can identify the exceptions lost after dynamic parameters translation|
|translate-success.json|翻译成功的文案列表<br /><br />📢📢📢：增量翻译模式下，只会包含本次翻译的文案，原来已翻译过的文案不会包含在其中|
|langCode.json|An independent language pack for a target language<br /><br />When  `output.langType == 'single'` , a single language pack of target language will be generated in the log directory|
|langs.json|Aggregated language pack<br /><br />When  `output.langType == 'multiple'` , the aggregated language pack will be generated in the log directory|
