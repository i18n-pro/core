
# Matching Rules
Requirements for the first parameter of  `t`  function：
* It can only be a pure string, cannot contain variables or  `JavaScript`  statements
* Cannot contain special characters such as  `\n` and `\t` 
* The beginning and end cannot contain spaces
* If you use the  `Template Strings`  syntax, you cannot wrap lines

Failure to meet the above conditions may result in
* Incorrect extraction of translated texts
* Incorrect translation result

The following can be matched
```js
t('xxx')
t("xxx")
t(`xxx`)
```
The following will not be matched
```js
const foo = 'foo'
const fooFunc = (x:string) => x

// Does not satisfy pure string
t(foo)
t('xxx' + foo)
t(`${foo}`)
t(fooFunc(foo))

// Contains \n or \t
t('x\nx')
t('x\tx')

// Include spaces before and after
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
If string splicing is required, dynamic parameters can be used
```js
t('My name is {0}, I am {1} years old this year, from {2}, and I am a {3}', 'Wang Nima', 35, 'Mars', 'coder')
```
