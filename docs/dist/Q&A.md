
# Q&A

<details >
  <summary>Table of Contents</summary>

  &emsp;&emsp;[1. 为什么要以翻译文案作为key呢？](#1-为什么要以翻译文案作为key呢)<br/>
  &emsp;&emsp;[2. Why do dynamic parameters (interpolation variables) not support object attribute resolution?](#2-why-do-dynamic-parameters-interpolation-variables-not-support-object-attribute-resolution)<br/>
  &emsp;&emsp;[3. Is it necessary to separate dynamic parameters types **Date** and **Time**?](#3-is-it-necessary-to-separate-dynamic-parameters-types-date-and-time)<br/>
  &emsp;&emsp;[4. 是否会支持富文本文案？](#4-是否会支持富文本文案)<br/>

</details>

## 1. 为什么要以翻译文案作为key呢？
**为了实现如下目标**
* 自动提取文案
* automatic-translation
* 自动生成语言包

以翻译文案作为key才能通过脚本识别出所有需要翻译的文案，从而实现 `自动提取文案` 的目标，当然 `自动提取文案` 也为后续目标的实现打下了良好的基础

通常国际化库都推荐如下形式的写法
```js
// 定义一个简单的key
const text1 = t('hello')
// 定义一个有分块的key
const text2 = t('module.hello')
```
对应语言包的形式
```js
// en.json
{
  "hello": "hello world",
  "module": {
    "hello": "hello xxx",
  }
}

// zh-CN.json
{
  "hello": "你好世界",
  "module": {
    "hello": "你好xxx",
  }
}
```

当前库的写法
```js
const text1 = t('hello world')
const text2 = t('hello xxx')
```
对应语言包的形式
```js
// zh-CN.json
{
  "hello world": "你好世界",
  "hello xxx": "你好xxx",
}
```
相对于传统的写法，以翻译文案作为key，有如下不足
* 对于一词多译不友好
* 生成的语言包较大

当然也会有如下优点
* 源码可读性强
* 源码中文案语言无需生成语言包

如果你不能接受上述的不足，那么其他国际化方案更适合你；如果你能接受上述的不足，那么我相信 `i18n-pro` 会带给你非常不错的体验
## 2. Why do dynamic parameters (interpolation variables) not support object attribute resolution?
Sample code
```js
// Object attribute resolution
i18n('我叫{name}，今年{age}岁，来自{base}，是一名{job}', {
  name: '王尼玛',
  age: 22,
  base: '火星',
  job: '码农',
})

// Resolution of subscripts in the current library
i18n('我叫{0}，今年{1}岁，来自{2}，是一名{3}',
  '王尼玛',
  '22',
  '火星',
  '码农',
)
```
主要原因是文案中包含属性名，不利于通过第三方平台翻译，上面的示例从中文翻译到英文还OK，如果是英文翻译到中文或其他语言，动态参数中的属性名也会被翻译，这就是问题所在

Example of object attribute resolution
```js
// 待翻译文案为中文
const zh = '我叫{name}，今年{age}岁，来自{base}，是一名{job}'

// Translated into English through Baidu-Translation, it seems OK
const zhToEn = `My name is {name}. I'm {age} years old. I'm from {base}. I'm a {job} `

// Then translate the above English into Chinese through Baidu-Translation, we can find that the translation of {job} has problems, and different translation platforms may have different problems
const enToZh = '我的名字是｛name｝。我{age}岁。我来自{base}。我是{工作}'
```
Let's take a look at the example of subscript parsing
```js
// 待翻译文案为中文
const zh = '我叫{0}，今年{1}岁，来自{2}，是一名{3}'

// Translated into English through Baidu-Translation
const zhToEn = `My name is {0}. I'm {1} years old. I'm from {2}. I'm a {3}`

// Translate the above English into Chinese through Baidu-Translation, and the above parameters will not be mismatched
const enToZh = '我的名字是｛0｝。我是｛1｝岁。我来自｛2｝。我是｛3｝'
```
虽然通过机器翻译本来就不能做到100%的准确率，但是这种方式可以尽量避免不必要的错误
## 3. Is it necessary to separate dynamic parameters types **Date** and **Time**?
Personally, I don't think it is necessary, but it has been implemented in the design. You can choose to use it flexibly at your discretion. Of course, it is not ruled out that some business scenarios will be more convenient to deal with separately
## 4. 是否会支持富文本文案？
不会支持，因为自动翻译是该库的核心功能，实现该功能的基本原则就是翻译文案需要为普通的纯文本，支持富文本与现有这一套实现逻辑上会存在冲突<br /><br />**某些场景下，可以利用动态参数来实现富文本的效果**<br />例如这里的文案是 `hello world` ，页面上需要将 `world` 显示为红色粗体的样式<br />**方案一**
```js
t('hello {0}world{1}', '<b style="color:red;">', '</b>')

// t 函数执行后返回结果：hello <b style="color:red;">world</b>
```
**方案二**<br />
```js
t('Hello {0}', `<b style="color:red;">${t('world')}</b>`)

// t 函数执行后返回结果：hello <b style="color:red;">world</b>
```
针对上面两种方案，可以根据实际场景酌情考虑使用