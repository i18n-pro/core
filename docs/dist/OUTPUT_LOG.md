
# Translation log
To facilitate tracking and locating problems, there will be some necessary log output during the whole translation process. After the translation command is executed completely, a  `.log`  log directory will be generated under the  `output.path`  directory. All logs are presented in the form of independent files, including the following log types：
|Filename|Description|
|:-|:-|
|filepaths.json|List of matched file paths|
|texts-error.json|Extract all unqualified translated texts<br /><br />📢📢📢：不包含使用变量、 `JavaScript` 语句等场景|
|texts.json|Extract all qualified translated texts|
|translate-fail.json|List of failed translations|
|translate-error.json|List of incorrectly translated texts<br /><br />Currently, we can identify the exceptions lost after dynamic parameters translation|
|translate-success.json|List of successfully translated texts<br /><br />📢📢📢：In incremental translation mode, only the untranslated text will be included, and the text which has been translated will not be included|
|langCode.json|An independent language pack for a target language<br /><br />When  `output.langType == 'single'` , a single language pack of target language will be generated in the log directory|
|langs.json|Aggregated language pack<br /><br />When  `output.langType == 'multiple'` , the aggregated language pack will be generated in the log directory|
