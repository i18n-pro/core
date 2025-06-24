
# Translation Log
After the translation command is executed, the  `.log`  log directory will be generated in the  `output.path`  directory, including the following log files:
|Filename|Description|
|:-|:-|
|filepaths.json|List of matched file paths|
|keys-error.json|Non-compliant  `Custom key`  list<br />(Not containing variable references and  `JavaScript`  expressions)|
|keys.json|Compliant  `Custom key`  list|
|texts-error.json|Non-compliant  `Case Study`  list<br />(Not containing variable references and  `JavaScript`  expressions)|
|texts.json|Compliant  `Case Study`  list|
|translate-fail.json|Translation failed  `Case Study`  list|
|translate-error.json|Translation exception  `Case Study`  list<br />(Exceptions such as  `Interpolation Variable`  loss)|
|translate-success.json|Translation successfully  `Case Study`  list<br />( Incremental mode, only this new translation is included)|
|langCode.json|Single language package file<br />Generate only at  `output.langType == 'single'` |
|langs.json|Multilingual Aggregation Package Files<br />Generate only at  `output.langType == 'multiple'` |
