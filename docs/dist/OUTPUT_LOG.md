
# Translation Log
After the translation command is executed, the  `.log`  log directory will be generated in the  `output.path`  directory, including the following log files:
|Filename|Description|
|:-|:-|
|filepaths.json|List of matched file paths|
|keys-error.json|Non-compliant  `custom-key`  list<br />(Not containing variable references and  `JavaScript`  expressions)|
|keys.json|Compliant  `custom-key`  list|
|texts-error.json|Non-compliant  `text`  list<br />(Not containing variable references and  `JavaScript`  expressions)|
|texts.json|Compliant  `text`  list|
|translate-fail.json|List of  `text`  that failed to translate|
|translate-error.json|List of  `text`  with translation errors<br />(Exceptions such as  `Interpolation Variable`  loss)|
|translate-success.json|List of successfully translated  `text` <br />( only newly translated items in incremental mode)|
|langCode.json|Single language pack file<br />Generated only when  `output.langType == 'single'` |
|langs.json|Multi-language aggregated pack file<br />Generated only when  `output.langType == 'multiple'` |
