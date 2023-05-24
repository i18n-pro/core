
# Q&A

<details >
  <summary>Table of Contents</summary>

  &emsp;&emsp;[1. Why use  `Translation`  as key?](#1-why-use--translation--as-key)<br/>
  &emsp;&emsp;[2. 动态参数（变量插值）为什么不支持对象属性解析？](#2-动态参数变量插值为什么不支持对象属性解析)<br/>
  &emsp;&emsp;[3. Is it necessary to separate dynamic parameters types **Date** and **Time**?](#3-is-it-necessary-to-separate-dynamic-parameters-types-date-and-time)<br/>
  &emsp;&emsp;[4. Will rich text be supported?](#4-will-rich-text-be-supported)<br/>

</details>

## 1. Why use  `Translation`  as key?
**To achieve the following goals**
* Automatically extract texts
* automatic-translation
* Automatically generate language pack

With  `Translation`  as key can we recognize all copywriting that requires translation through the script, so as to achieve the goal of  `Automatically extract texts` . Of course,  `Automatically extract texts`  also laid a good foundation for the realization of subsequent goals

Usually, internationalization libraries recommend the following writing style
```js
// Define a simple key
const text1 = t('hello')
// Define a key with module
const text2 = t('module.hello')
```
Format of corresponding language pack
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

Current writing style of the library
```js
const text1 = t('hello world')
const text2 = t('hello xxx')
```
Format of corresponding language pack
```js
// zh-CN.json
{
  "hello world": "你好世界",
  "hello xxx": "你好xxx",
}
```
Compared to traditional writing,  `Translation`  as key, there are as follows
* Not friendly to multiple translations of a single word
* Generates larger language packages

However, it also has the following advantages:
* Strong readability of source code
*  `Translation` 本身语言无需生成语言包

如果你不能接受上述的不足，那么其他国际化方案更适合你；如果你能接受上述的不足，那么我相信 `i18n-pro` 会带给你非常不错的开发体验
## 2. 动态参数（变量插值）为什么不支持对象属性解析？
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
The main reason is that the text contains attribute names, which is not conducive to translation through third-party platforms. The example above is still okay to translate from Chinese to English, but if it is translated from English to Chinese or other languages, the attribute names in the dynamic parameters will also be translated, which is the problem

Example of object attribute resolution
```js
//  `Translation`  as Chinese
const zh = '我叫{name}，今年{age}岁，来自{base}，是一名{job}'

// Translated into English through Baidu-Translation, it seems OK
const zhToEn = `My name is {name}. I'm {age} years old. I'm from {base}. I'm a {job} `

// Then translate the above English into Chinese through Baidu-Translation, we can find that the translation of {job} has problems, and different translation platforms may have different problems
const enToZh = '我的名字是｛name｝。我{age}岁。我来自{base}。我是{工作}'
```
Let's take a look at the example of subscript parsing
```js
//  `Translation`  as Chinese
const zh = '我叫{0}，今年{1}岁，来自{2}，是一名{3}'

// Translated into English through Baidu-Translation
const zhToEn = `My name is {0}. I'm {1} years old. I'm from {2}. I'm a {3}`

// Translate the above English into Chinese through Baidu-Translation, and the above parameters will not be mismatched
const enToZh = '我的名字是｛0｝。我是｛1｝岁。我来自｛2｝。我是｛3｝'
```
Although machine translation cannot achieve 100% accuracy, this method can avoid unnecessary errors as much as possible
## 3. Is it necessary to separate dynamic parameters types **Date** and **Time**?
Personally, I don't think it is necessary, but it has been implemented in the design. You can choose to use it flexibly at your discretion. Of course, it is not ruled out that some business scenarios will be more convenient to deal with separately
## 4. Will rich text be supported?
It will not be supported, because automatic translation is the core function of the library. The basic principle of achieving this function is  `Translation`  requires ordinary pure texts. Supporting rich texts and existing realizations will be logically conflict.<br /><br />**In some scenarios, dynamic parameters can be used to achieve the effect of rich text**<br />For example, the text here is  `hello world` , and  `world`  needs to be displayed as red and bold on the page<br />**Option 1**
```js
t('hello {0}world{1}', '<b style="color:red;">', '</b>')

// The result of executing the t  function is: hello <b style="color:red;">world</b>
```
**Option 2**<br />
```js
t('Hello {0}', `<b style="color:red;">${t('world')}</b>`)

// The result of executing the t  function is: hello <b style="color:red;">world</b>
```
You can choose to use either of the above options based on the actual scenario