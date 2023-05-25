
# Translation log
To facilitate tracking and locating problems, there will be some necessary log output during the whole translation process. After the translation command is executed completely, a  `.log`  log directory will be generated under the  `output.path`  directory. All logs are presented in the form of independent files, including the following log types：
|Filename|Description|
|:-|:-|
|filepaths.json|List of matched file paths|
|texts-error.json|Extracted all  `Translation Text`  that does not meet the requirements<br /><br />📢📢📢：Does not include scenarios using variables,  `JavaScript`  statements, etc|
|texts.json|Extracted all the requirements  `Translation Text` |
|translate-fail.json|List of texts that failed to be translated|
|translate-error.json|List of texts that were translated incorrectly<br /><br />Currently,  `Interpolation Variable`  can recognize the exceptions lost after translation|
|translate-success.json|List of texts that were translated successfully<br /><br />📢📢📢：In incremental translation mode, only the texts translated in this session will be included, and the previously translated texts will not be included|
|langCode.json|An independent language pack for a target language<br /><br />When  `output.langType == 'single'` , a single language pack of target language will be generated in the log directory|
|langs.json|Aggregated language pack<br /><br />When  `output.langType == 'multiple'` , the aggregated language pack will be generated in the log directory|
