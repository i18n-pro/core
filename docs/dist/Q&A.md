
# Q&A

<details >
  <summary>Table of Contents</summary>

  &emsp;&emsp;[1. automatic-translationPrinciples and Process](#1-automatic-translationprinciples-and-process)<br/>
  &emsp;&emsp;[2. What is the difference between  `Variable Interpolation`  and  `Interpolation Variable` ?](#2-what-is-the-difference-between--variable-interpolation--and--interpolation-variable-)<br/>
  &emsp;&emsp;[3. Why doesn't  `Variable Interpolation`  support object property parsing?](#3-why-doesnt--variable-interpolation--support-object-property-parsing)<br/>
  &emsp;&emsp;[4. Is it necessary to separate **Date** and **Time** for  `Interpolation Variable`  type?](#4-is-it-necessary-to-separate-date-and-time-for--interpolation-variable--type)<br/>
  &emsp;&emsp;[5. Will rich text be supported?](#5-will-rich-text-be-supported)<br/>

</details>

## 1. automatic-translationPrinciples and Process
**process:**
1. Extract the document
2. Calling the translation platform API
3. Generate language packs

In the entire process,  `Extract the document`  is the most critical link. Adopting the  `Copywriting is key`  method is both intuitive and easy to write, and also facilitates the automatic identification and processing of the script.



The following is an example of  `Copywriting is key` 
```js
const text = t('hello world')
```
 `automatic-translation` The effect of generating language packs
```json
// zh.json
{
  "hello world": "你好世界"
}

// jp.json
{
  "hello world": "こんにちは世界"
}
```
However, there are certain limitations when using the  `Copywriting is key`  method only:



* Not applicable to multiple translation scenarios of one word



 `Not applicable to multiple translation scenarios of one word`  can be optimized by implementing  `Custom key`  of  `t.t` 



The following is an example of  `Custom key` 
```js
const text = t.t('custom-key', 'hello world')
```
 `automatic-translation` The effect of generating language packs
```json
// zh.json
{
  "custom-key": "你好世界"
}

// jp.json
{
  "custom-key": "こんにちは世界"
}
```


Using  `Custom key`  generated language packs, even if  `Case Study`  changes, the generated language packs are not affected.

**The order in which language pack copy is generated each time  `automatic-translation` **
1.  `Custom key` Translated
2.  `Custom key`  translated, generated based on  `Copywriting is key` 
3.  `Custom key` Newly translated
4.  `Copywriting is key` Translated
5.  `Copywriting is key` Newly translated


## 2. What is the difference between  `Variable Interpolation`  and  `Interpolation Variable` ?

```js
t('i18n-pro users reached {n0}', 100000000) // Number
t('The selling price is {c0}', 14999) // Currency
t(`Today's date is {d0}`, new Date()) // Date
t('Current time: {t0}', new Date()) // Time
t('I have {p0 apple}, {p1 banana} and {p2 pear}', 5, 4, 3) // Plural 
```
**Variable Interpolation**：Refers to the realization of  `t('hello {0}', 'world')` → `'hello world'`  this feature<br />**Interpolation Variable**：Refers to the variable inserted into the text<br />For example,  `100000000` ,  `14999` , and  `newDate()`  in the sample code above
* Insertion position of  `Interpolation Variable` 
   * Similar to {0}、{1}、{2}, etc
*  `Interpolation Variable`  type tag
   * Similar to {n0}、{c1}、{t2}、{d3}、{p4{0} apples}, etc


## 3. Why doesn't  `Variable Interpolation`  support object property parsing?
Sample code
```js
// Object attribute resolution
t('我叫{name}，今年{age}岁，来自{base}，是一名{job}', {
  name: '王尼玛',
  age: 22,
  base: '火星',
  job: '码农',
})

// Resolution of subscripts in the current library
t('我叫{0}，今年{1}岁，来自{2}，是一名{3}',
  '王尼玛',
  '22',
  '火星',
  '码农',
)
```
The main reason is that the copy contains attribute names, which is not conducive to translation through third-party platforms. The example above is still okay when translating from Chinese to English. However, if translating from English to Chinese or other languages, the attribute names in  `Interpolation Variable`  will also be translated, which is the problem

Example of object attribute resolution
```js
// Case Study as Chinese
const zh = '我叫{name}，今年{age}岁，来自{base}，是一名{job}'

// Translated into English through Baidu-Translation, it seems OK
const zhToEn = `My name is {name}. I'm {age} years old. I'm from {base}. I'm a {job} `

// Then translate the above English into Chinese through Baidu-Translation, we can find that the translation of {job} has problems, and different translation platforms may have different problems
const enToZh = '我的名字是｛name｝。我{age}岁。我来自{base}。我是{工作}'
```
Let's take a look at the example of subscript parsing
```js
// Case Study as Chinese
const zh = '我叫{0}，今年{1}岁，来自{2}，是一名{3}'

// Translated into English through Baidu-Translation
const zhToEn = `My name is {0}. I'm {1} years old. I'm from {2}. I'm a {3}`

// Translate the above English into Chinese through Baidu-Translation, and the above parameters will not be mismatched
const enToZh = '我的名字是｛0｝。我是｛1｝岁。我来自｛2｝。我是｛3｝'
```
Although machine translation cannot achieve 100% accuracy, this method can avoid unnecessary errors as much as possible
## 4. Is it necessary to separate **Date** and **Time** for  `Interpolation Variable`  type?
Personally, I don't think it is necessary, but it has been implemented in the design. You can choose to use it flexibly at your discretion. Of course, it is not ruled out that some business scenarios will be more convenient to deal with separately
## 5. Will rich text be supported?
Rich text copy is not supported. Automatic translation requirements  `Case Study`  are plain text, rich text conflicts with existing implementation logic<br /><br />**If you need rich text effects, you can achieve it through  `Variable Interpolation` **<br />For example, the text here is  `hello world` , and  `world`  needs to be displayed as red and bold on the page<br />**Option 1**
```js
t('hello {0}world{1}', '<b style="color:red;">', '</b>')

// The result of executing the t  function is: hello <b style="color:red;">world</b>
```
**Option 2**<br />
```js
t('Hello {0}', `<b style="color:red;">${t('world')}</b>`)

// The result of executing the t  function is: hello <b style="color:red;">world</b>
```
The above solution can be selected according to actual needs