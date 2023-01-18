
# Q&A

<details >
  <summary>Table of Contents</summary>

  &emsp;&emsp;[1. Why do dynamic parameters (interpolation variables) not support object attribute resolution?](#1-why-do-dynamic-parameters-(interpolation-variables)-not-support-object-attribute-resolution?)<br/>
  &emsp;&emsp;[2. Is it necessary to separate dynamic parameters types **Date** and **Time**?](#2-is-it-necessary-to-separate-dynamic-parameters-types-**date**-and-**time**?)<br/>

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
The main reason is that the text contains attribute names, which is not conducive to translation through third-party platforms. The Chinese translation of the above example is OK. If it is translated from English to Chinese or other languages, the attribute names in the dynamic parameters will also be translated, which is the problem

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
Although machine translation can not achieve 100% accuracy, it can make unnecessary mistakes as much as possible
## 2. Is it necessary to separate dynamic parameters types **Date** and **Time**?
Personally, I don't think it is necessary, but it has been implemented in the design. You can choose to use it flexibly at your discretion. Of course, it is not ruled out that some business scenarios will be more convenient to deal with separately