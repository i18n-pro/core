import { initI18n } from '../../src/lib'
const { t } = initI18n({ namespace: 'text' })
const foo = 'foo'
const key = 'key'
const fooFunc = (x: string) => x
const keyFunc = (x: string) => x

// 不能记录的错误信息的错误
t.t(key, foo)
t.t(keyFunc(key), fooFunc(foo))
t.t('xxx' + key, 'xxx' + foo)
t.t(
  `中间有
换行`,
  `中间有
换行`,
)

// 能记录到错误信息的错误
t.t(`${key}`, `${foo}`)
t.t('key\n中间', '你好\n啊')
t.t('key\t中间', '你好\t啊')
t.t('  key前面有空格', '  前面有空格')
t.t('key后面空格 ', '后面空格 ')

// 正常解析的示例
t.t('中间 有空格的key', '中间 有空格')
t.t('普通文本key', '普通文本')
t.t('普通文本', '普通文本{0}', foo)
t.t('test', '普通文案')
t.t('test', 'a', t('b'))
t.t('key2', '自定义key')
t.t('key3', '自定义key')
