import { i18n } from '../../src/lib'

const foo = 'foo'
const fooFunc = (x: string) => x

// 不能记录的错误信息的错误
i18n(foo)
i18n(fooFunc(foo))
i18n('xxx' + foo)
i18n(`中间有
换行`)

// 能记录到错误信息的错误
i18n(`${foo}`)
i18n('你好\n啊')
i18n('你好\t啊')
i18n('  前面有空格')
i18n('后面空格 ')

// 正常解析的示例
i18n('中间 有空格')
i18n('普通文本')
i18n('普通文本{0}', foo)
i18n('我叫{0}，今年{1}岁，来自{2}，是一名{3}', '王尼玛', '22', '火星', '码农')
