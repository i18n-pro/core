
# 匹配规则

<details >
  <summary>目录</summary>

  &emsp;&emsp;[规则](#规则)<br/>
  &emsp;&emsp;&emsp;&emsp;[参数 `text` 规则](#参数-text-规则)<br/>
  &emsp;&emsp;&emsp;&emsp;[参数 `key` 规则](#参数-key-规则)<br/>
  &emsp;&emsp;[可被匹配示例](#可被匹配示例)<br/>
  &emsp;&emsp;[不可匹配示例](#不可匹配示例)<br/>
  &emsp;&emsp;[ `变量插值` 示例](#-变量插值-示例)<br/>

</details>

## 规则

### 参数 `text` 规则
适用于 `t` 和 `t.t` 函数：
* 必须为字符串字面量
* 不得包含 `JavaScript` 表达式或变量
* 不得包含特殊字符（如 `\n` 、 `\t` ）
* 不得包含首尾空白字符
*  `模板字符串` 必须为单行


### 参数 `key` 规则
适用于 `t.t` 函数：
* 必须为字符串字面量
* 不得包含 `JavaScript` 表达式或变量

不符合上述规则可能导致：
*  `文案` 或 `自定义 key` 提取异常
* 自动翻译结果异常


## 可被匹配示例


以下为 `文案即 key` 的示例
```js
t('hello world')
t("hello world")
t(`hello world`)
```


以下为 `自定义 key` 的示例
```js
t.t('custom-key', 'hello world')
t.t('custom-key', "hello world")
t.t('custom-key', `hello world`)
```

## 不可匹配示例


以下为 `文案即 key` 的示例
```js
const foo = 'foo'
const fooFunc = (x:string) => x

// 非字符串字面量
t(foo)
t('xxx' + foo)
t(`${foo}`)
t(fooFunc(foo))

// 包含 \n 或者 \t
t('x\nx')
t('x\tx')

// 包含首尾空白字符
t(' xxx')
t('xxx  ')
t(' xxx ')

// 模板字符串语法中有换行
t(`
x
x
x
`)
```


以下为 `自定义 key` 的示例
```js
const foo = 'foo'
const fooFunc = (x:string) => x

// 非字符串字面量
t.t('custom-key', foo)
t.t('custom-key', 'xxx' + foo)
t.t('custom-key', `${foo}`)
t.t('custom-key', fooFunc(foo))

// 包含 \n 或者 \t
t.t('custom-key', 'x\nx')
t.t('custom-key', 'x\tx')

// 包含首尾空白字符
t.t('custom-key', ' xxx')
t.t('custom-key', 'xxx  ')
t.t('custom-key', ' xxx ')

// 模板字符串语法中有换行
t.t('custom-key', `
x
x
x
`)
```

##  `变量插值` 示例
如需拼接字符串，请使用 `变量插值` 

以下为 `文案即 key` 的示例
```js
t('我叫{0}，今年{1}岁，来自{2}，是一名{3}', '王尼玛', 35, '火星', '码农')
```


以下为 `自定义 key` 的示例
```js
t.t('custom-key', '我叫{0}，今年{1}岁，来自{2}，是一名{3}', '王尼玛', 35, '火星', '码农')
```
