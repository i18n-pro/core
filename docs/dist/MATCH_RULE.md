
# Matching Rules
requirement：
* The first parameter of the `i18n`  function can only be a pure string and cannot contain variables or js statements
* Cannot contain special characters such as  `\n` and `\t` 
* The beginning and end cannot contain spaces
* If you use the  `Template Strings`  syntax, you cannot wrap lines

Failure to meet the above conditions may result in
* Incorrect extraction of translated text
* Incorrect translation result

The following can be matched
```js
i18n('xxx')
i18n("xxx")
i18n(`xxx`)
```
The following will not be matched
```js
const foo = 'foo'
const fooFunc = (x:string) => x

// Does not satisfy pure string
i18n(foo)
i18n('xxx' + foo)
i18n(`${foo}`)
i18n(fooFunc(foo))

// Contains \n or \t
i18n('x\nx')
i18n('x\tx')

// Include spaces before and after
i18n(' xxx')
i18n('xxx  ')
i18n(' xxx ')

// There are line breaks in the Template Strings syntax
i18n(`
xxx
`)
```
If string splicing is required, dynamic parameters can be used
```js
i18n('My name is {0}, I am {1} years old this year, from {2}, and I am a {3}', 'Wang Nima', 35, 'Mars', 'coder')
```
