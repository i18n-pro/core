
# 函数API

<details >
  <summary>目录</summary>

  &emsp;&emsp;[函数列表](#函数列表)<br/>
  &emsp;&emsp;[函数类型](#函数类型)<br/>
  &emsp;&emsp;&emsp;&emsp;[FormatFunc](#formatfunc)<br/>
  &emsp;&emsp;&emsp;&emsp;[FormatDateFunc](#formatdatefunc)<br/>
  &emsp;&emsp;&emsp;&emsp;[FormatPluralFunc](#formatpluralfunc)<br/>

</details>

## 函数列表
下面的类型是以 `TypeScript` 语法来表示的<table>
  <tr>
    <th>函数名</th>
    <th>类型</th>
    <th>说明</th>
  </tr>
  <tr>
    <td>t</td>
    <td>
      <pre>
(
  text: string,
  ...args: Array&lt;string|number|unknow&gt;
) =&gt; string
      </pre>
    </td>
    <td>
      获取国际化文本<br /><br />内部会根据当前语言<code>(locale)</code>从语言包<code>(langs)</code>中获取<code>text</code>对应的翻译文本，未匹配到对应翻译内容会直接显示<code>text</code>本身内容<br /><b>text</b>：待翻译的文本<br /><b>args</b>：表示动态参数，没有个数限制，<code>text</code>文本中需要以<code>{index}</code>的形式来接收，<code>index</code>表示动态参数的位置，从 0 开始（可在<code>setI18n</code>中自定义起始值），第1个参数对应 0，对2个参数对应1，以此往复<br /><br />例如：<code>
  t('这个男人叫{0}，意外获得了超能力，这个女人叫{1}，意外被{2}追杀，这个小孩叫{3}，意外遭遇了意外', '小帅', '小美', 'FBI',
                '小白')
</code><br />当前语言（中文:zh）的执行结果是： 这个男人叫小帅，意外获得了超能力，这个女人叫小美，意外被FBI追杀，这个小孩叫小白，意外遭遇了意外<br />百度翻译成英语的结果是：The man's name is 小帅, and he accidentally obtained super power. The woman's name is 小美, and she was accidentally chased by FBI. The child's name is 小白, and she was accidentally hit by an accident
    </td>
  </tr>
  <tr>
    <td>setI18n</td>
    <td>
      <pre>
(
    props: {
        locale?: string,
        langs?: Record<strng, Record<string, string>>,
        beginIndex?: number,
        formatNumber?: <a href="#formatfunc">FormatFunc</a>,
        formatCurrency?: <a href="#formatfunc">FormatFunc</a>,
        formatDate?: <a href="#formatdatefunc">FormatDateFunc</a>,
        formatTime?: <a href="#formatdatefunc">FormatDateFunc</a>,
        formatPlural?: <a href="#formatpluralfunc">FormatPluralFunc</a>,
    }
) => void
      </pre>
    </td>
    <td>
      设置语言、语言包及其他配置项<br /><br /><b>locale</b>：指定当前语言<br /><b>langs</b>：设置当前语言包<br /><b>beginIndex</b>：设置<code>t</code>函数中动态参数起始下标，默认为0<br /><b>formatNumber</b>：格式化<b>数字</b>类型动态参数的回调，对应的类型标记是<b>n</b>或<b>N</b><br /><b>formatCurrency</b>：格式化<b>货币</b>类型动态参数的回调，对应的类型标记是<b>c</b>或<b>C</b><br /><b>formatDate</b>：格式化<b>日期</b>类型动态参数的回调，对应的类型标记是<b>d</b>或<b>D</b><br /><b>formatTime</b>：格式化<b>时间</b>类型动态参数的回调，对应的类型标记是<b>t</b>或<b>T</b><br /><b>formatPlural</b>：格式化<b>复数</b>类型动态参数的回调，对应的类型标记是<b>p</b>或<b>P</b><br /><br />📢📢📢：<code>locale</code>的值默认跟语言代码相对应，如需自定义，需参考<code>codeLocaleMap</code>的用法
    </td>
  </tr>
  <tr>
    <td>withI18n</td>
    <td>
      <pre>
(
    props:{
          locale: string
    }
) => ({ t })
      </pre>
    </td>
    <td>
      获取独立于主程序的i18n函数<br /><br />适用于服务端，每个接口响应需要做国际化的处理
    </td>
  </tr>
</table>

## 函数类型

### FormatFunc
通用的格式化回调类型
```ts
type FormatFunc = <T>(props:{
  locale: string, // 当前语言
  payload: string | number | unknow | T, // 动态参数
}) => number | string
```

### FormatDateFunc
日期（时间）的格式化回调函数类型
```ts
type FormatDateFunc = <T>(props:{
  locale: string, // 当前语言
  payload: string | number | Date | unknow | T, // 动态参数
}) => string
```

### FormatPluralFunc
复数的格式化回调函数类型
```ts
type FormatPluralFunc = <T>(props:{
  locale: string, // 当前语言
  payload: string | number | unknow | T, // 动态参数
  text: string // 默认将量词和名词组合起来的字符串，不需要复数处理的语言可以直接返回该属性
  keyword: string // 复数关键词
}) => string
```
