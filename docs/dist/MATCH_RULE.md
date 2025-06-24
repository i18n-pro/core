
# Matching Rules

<details >
  <summary>Table of Contents</summary>

  &emsp;&emsp;[rule](#rule)<br/>
  &emsp;&emsp;&emsp;&emsp;[Parameter  `text`  rule](#parameter--text--rule)<br/>
  &emsp;&emsp;&emsp;&emsp;[Parameter  `key`  rule](#parameter--key--rule)<br/>
  &emsp;&emsp;[Can be matched examples](#can-be-matched-examples)<br/>
  &emsp;&emsp;[Unmatchable example](#unmatchable-example)<br/>
  &emsp;&emsp;[ `Variable Interpolation`  Example](#-variable-interpolation--example)<br/>

</details>

## rule

### Parameter  `text`  rule
Applicable to  `t`  and  `t.t`  functions:
* Must be a string literal
* Do not contain  `JavaScript`  expressions or variables
* Do not contain special characters (such as  `\n` ,  `\t` )
* Do not include end-to-end whitespace characters
*  `Template Strings`  Must be a single line


### Parameter  `key`  rule
Applicable to  `t.t`  functions:
* Must be a string literal
* Do not contain  `JavaScript`  expressions or variables

Failure to comply with the above rules may lead to:
*  `Case Study`  or  `Custom key`  extraction exception
* Automatic translation result is abnormal


## Can be matched examples


The following is an example of  `Copywriting is key` 
```js
t('hello world')
t("hello world")
t(`hello world`)
```


The following is an example of  `Custom key` 
```js
t.t('custom-key', 'hello world')
t.t('custom-key', "hello world")
t.t('custom-key', `hello world`)
```

## Unmatchable example


The following is an example of  `Copywriting is key` 
```js
const foo = 'foo'
const fooFunc = (x:string) => x

// Non-string literals
t(foo)
t('xxx' + foo)
t(`${foo}`)
t(fooFunc(foo))

// Contains \n or \t
t('x\nx')
t('x\tx')

// Contains the beginning and end blank characters
t(' xxx')
t('xxx  ')
t(' xxx ')

// There are line breaks in the Template Strings syntax
t(`
x
x
x
`)
```


The following is an example of  `Custom key` 
```js
const foo = 'foo'
const fooFunc = (x:string) => x

// Non-string literals
t.t('custom-key', foo)
t.t('custom-key', 'xxx' + foo)
t.t('custom-key', `${foo}`)
t.t('custom-key', fooFunc(foo))

// Contains \n or \t
t.t('custom-key', 'x\nx')
t.t('custom-key', 'x\tx')

// Contains the beginning and end blank characters
t.t('custom-key', ' xxx')
t.t('custom-key', 'xxx  ')
t.t('custom-key', ' xxx ')

// There are line breaks in the Template Strings syntax
t.t('custom-key', `
x
x
x
`)
```

##  `Variable Interpolation`  Example
To splice strings, use  `Variable Interpolation` 

The following is an example of  `Copywriting is key` 
```js
t('My name is {0}, I am {1} years old this year, from {2}, and I am a {3}', 'Wang Nima', 35, 'Mars', 'coder')
```


The following is an example of  `Custom key` 
```js
t.t('custom-key', 'My name is {0}, I am {1} years old this year, from {2}, and I am a {3}', 'Wang Nima', 35, 'Mars', 'coder')
```
