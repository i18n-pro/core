
# Q&A

<details >
  <summary>Table of Contents</summary>

  &emsp;&emsp;[1. Why do dynamic parameters (interpolation variables) not support object attribute resolution?](#1-why-do-dynamic-parameters-interpolation-variables-not-support-object-attribute-resolution)<br/>
  &emsp;&emsp;[2. Is it necessary to separate dynamic parameters types **Date** and **Time**?](#2-is-it-necessary-to-separate-dynamic-parameters-types-date-and-time)<br/>
  &emsp;&emsp;[3. 是否会支持富文本文案？](#3-是否会支持富文本文案)<br/>

</details>

## 1. Why do dynamic parameters (interpolation variables) not support object attribute resolution?
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
主要原因是文本中包含属性名，不利于通过第三方平台翻译，上面的示例从中文翻译到英文还OK，如果是英文翻译到中文或其他语言，动态参数中的属性名也会被翻译，这就是问题所在

Example of object attribute resolution
```js
// The text to be translated is in Chinese
const zh = '我叫{name}，今年{age}岁，来自{base}，是一名{job}'

// Translated into English through Baidu-Translation, it seems OK
const zhToEn = `My name is {name}. I'm {age} years old. I'm from {base}. I'm a {job} `

// Then translate the above English into Chinese through Baidu-Translation, we can find that the translation of {job} has problems, and different translation platforms may have different problems
const enToZh = '我的名字是｛name｝。我{age}岁。我来自{base}。我是{工作}'
```
Let's take a look at the example of subscript parsing
```js
// The text to be translated is in Chinese
const zh = '我叫{0}，今年{1}岁，来自{2}，是一名{3}'

// Translated into English through Baidu-Translation
const zhToEn = `My name is {0}. I'm {1} years old. I'm from {2}. I'm a {3}`

// Translate the above English into Chinese through Baidu-Translation, and the above parameters will not be mismatched
const enToZh = '我的名字是｛0｝。我是｛1｝岁。我来自｛2｝。我是｛3｝'
```
虽然通过机器翻译本来就不能做到100%的准确率，但是这种方式可以尽量避免不必要的错误
## 2. Is it necessary to separate dynamic parameters types **Date** and **Time**?
Personally, I don't think it is necessary, but it has been implemented in the design. You can choose to use it flexibly at your discretion. Of course, it is not ruled out that some business scenarios will be more convenient to deal with separately
## 3. 是否会支持富文本文案？
不会支持，因为自动翻译是该库的核心功能，实现该功能的基本原则就是翻译文案需要为普通的纯文本，支持富文本与现有这一套实现逻辑上会存在冲突<br /><br />**某些场景下，可以利用动态参数来实现富文本的效果**<br />例如这里的文案是 `hello world` ，页面上需要将 `world` 显示为红色粗体的样式<br />**方案一**
```js
t('hello {0}world{1}', '<b style="color:red;">', '</b>')

// t 函数执行后返回结果：hello <b style="color:red;">world</b>
```
渲染效果是：<br />hello <b style="color:red;">world</b><br /><br />**方案二**<br />
```js
t('Hello {0}', `<b style="color:red;">${t('world')}</b>`)

// t 函数执行后返回结果：hello <b style="color:red;">world</b>
```
渲染效果是：<br />hello <b style="color:red;">world</b><br /><br />针对上面两种方案，可以根据实际场景酌情考虑使用