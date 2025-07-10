
# Translation Log
After the translation command is executed, the  `.log`  log directory will be generated in the  `output.path`  directory, including the following log files:
|Filename|Description|
|:-|:-|
|filepaths.json|List of matched file paths|
|keys-error.json|Non-compliant  `custom-key`  list<br />(Not containing variable references and  `JavaScript`  expressions)|
|keys.json|Compliant  `custom-key`  list|
|texts-error.json|Non-compliant  `text`  list<br />(Not containing variable references and  `JavaScript`  expressions)|
|texts.json|Compliant  `text`  list|
|translate-fail.json|Translation failed  `text`  list|
|translate-error.json|Translation exception  `text`  list<br />(Exceptions such as  `Interpolation Variable`  loss)|
|translate-success.json|Translation successfully  `text`  list<br />( Incremental mode, only this new translation is included)|
|langCode.json|Single language package file<br />Generate only at  `output.langType == 'single'` |
|langs.json|Multilingual Aggregation Package Files<br />Generate only at  `output.langType == 'multiple'` |
