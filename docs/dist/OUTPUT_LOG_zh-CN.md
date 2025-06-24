
# 翻译日志
翻译命令执行完成后，会在  `output.path` 目录下生成 `.log` 日志目录，包含以下日志文件：
|文件名|说明|
|:-|:-|
|filepaths.json|匹配到的文件路径列表|
|keys-error.json|不合规的 `自定义 key` 列表<br />(不包含变量引用和 `JavaScript` 表达式)|
|keys.json|合规的 `自定义 key` 列表|
|texts-error.json|不合规的 `文案` 列表<br />(不包含变量引用和 `JavaScript` 表达式)|
|texts.json|合规的 `文案` 列表|
|translate-fail.json|翻译失败 `文案` 列表|
|translate-error.json|翻译异常 `文案` 列表<br />(如 `插值变量` 丢失等异常)|
|translate-success.json|翻译成功 `文案` 列表<br />( 增量模式下仅包含本次新增翻译)|
|langCode.json|单语言包文件<br />仅在 `output.langType == 'single'` 时生成|
|langs.json|多语言聚合包文件<br />仅在 `output.langType == 'multiple'` 时生成|
