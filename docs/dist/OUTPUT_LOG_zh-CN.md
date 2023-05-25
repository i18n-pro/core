
# 翻译日志
为了方便追踪与定位问题，整个翻译过程中会有一些必要的日志输出，翻译命令执行完全后会在 `output.path` 目录下生成一个 `.log` 的日志目录，所有的日志是以独立文件的形式呈现，包含日志类型如下：
|文件名|说明|
|:-|:-|
|filepaths.json|匹配到的文件路径列表|
|texts-error.json|提取到所有不符合要求的 `翻译文案` <br /><br />📢📢📢：不包含使用变量、 `JavaScript` 语句等场景|
|texts.json|提取到所有符合要求的 `翻译文案` |
|translate-fail.json|翻译失败的文案列表|
|translate-error.json|翻译有误的文案列表<br /><br />当前可以识别出 `插值变量` 翻译后丢失的异常|
|translate-success.json|翻译成功的文案列表<br /><br />📢📢📢：增量翻译模式下，只会包含本次翻译的文案，原来已翻译过的文案不会包含在其中|
|langCode.json|某个目标语言独立的语言包<br /><br />当 `output.langType == 'single'` 时，会在日志目录下生成目标语言单个的语言包|
|langs.json|聚合的语言包<br /><br />当 `output.langType == 'multiple'` 时，会在日志目录下生成聚合的语言包|
