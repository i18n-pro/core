import { initI18n } from '../../src/lib'
const { t } = initI18n({ namespace: 'text' })
const foo = 'foo'
const fooFunc = (x: string) => x

// 不能记录的错误信息的错误
t(foo)
t(fooFunc(foo))
t('xxx' + foo)
t(`中间有
换行`)

// 能记录到错误信息的错误
t(`${foo}`)
t('你好\n啊')
t('你好\t啊')
t('  前面有空格')
t('后面空格 ')

// 正常解析的示例
t('中间 有空格')
t('普通文本')
t('普通文本{0}', foo)
t('我叫{0}，今年{1}岁，来自{2}，是一名{3}', '王尼玛', '22', '火星', '码农')
t('a', t('b'))
t.t('自定义key', t.t('自定义key2', t('文案')))
