
# Function API

<details >
  <summary>Table of Contents</summary>

  &emsp;&emsp;[Function List](#function-list)<br/>
  &emsp;&emsp;&emsp;&emsp;[initI18n](#initi18n)<br/>
  &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;[Type](#initi18n-type)<br/>
  &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;[参数说明](#initi18n-参数说明)<br/>
  &emsp;&emsp;&emsp;&emsp;[t](#t)<br/>
  &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;[Type](#t-type)<br/>
  &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;[参数说明](#t-参数说明)<br/>
  &emsp;&emsp;&emsp;&emsp;[setI18n](#seti18n)<br/>
  &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;[Type](#seti18n-type)<br/>
  &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;[参数说明](#seti18n-参数说明)<br/>
  &emsp;&emsp;&emsp;&emsp;[withI18n](#withi18n)<br/>
  &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;[Type](#withi18n-type)<br/>
  &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;[参数说明](#withi18n-参数说明)<br/>
  &emsp;&emsp;[其他类型](#其他类型)<br/>
  &emsp;&emsp;&emsp;&emsp;[I18nState](#i18nstate)<br/>
  &emsp;&emsp;&emsp;&emsp;[FormatFunc](#formatfunc)<br/>
  &emsp;&emsp;&emsp;&emsp;[FormatDateFunc](#formatdatefunc)<br/>
  &emsp;&emsp;&emsp;&emsp;[FormatPluralFunc](#formatpluralfunc)<br/>

</details>

## Function List

### initI18n
Initialize a fixed configuration to get the core API
<h4 id="initi18n-type">Type</h4>
<pre>
(
  props: {
    namespace: string,
    locale?: string,
    langs?: Record&lt;string, Record&lt;string, string&gt;&gt;,
    beginIndex?: number,
    formatNumber?: <a href="#formatfunc">FormatFunc</a>,
    formatCurrency?: <a href="#formatfunc">FormatFunc</a>,
    formatDate?: <a href="#formatdatefunc">FormatDateFunc</a>,
    formatTime?: <a href="#formatdatefunc">FormatDateFunc</a>,
    formatPlural?: <a href="#formatpluralfunc">FormatPluralFunc</a>,
  }
) => ({
  <a href="#t">t</a>,
  <a href="#seti18n">setI18n</a>,
  <a href="#withi18n">withI18n</a>,
})
</pre>

<h4 id="initi18n-参数说明">参数说明</h4>
<table>
  <tr>
    <th>Parameter name</th>
    <th>Description</th>
  </tr>
  <tr>
    <tr>
      <td>namespace</td>
      <td>Specify the naming space</td>
    </tr>
    <tr>
      <td>locale</td>
      <td>
        Specify the current language<br /><br />📢📢📢：The value of  <code>locale</code>  corresponds to the language code by default. If you need to customize, please refer to the usage of  <code>codeLocaleMap</code> 
      </td>
    </tr>
    <tr>
      <td>langs</td>
      <td>Set Current Language Pack</td>
    </tr>
    <tr>
      <td>beginIndex</td>
      <td>
        Set the dynamic parameters in the  <code>t</code>  function to start the bidding, the default is 0
      </td>
    </tr>
    <tr>
      <td>formatNumber</td>
      <td>
        A callback to format dynamic parameters of type <b>Number</b>, with the corresponding type tag <b> n </b> or <b> N </b>
      </td>
    </tr>
    <tr>
      <td>formatCurrency</td>
      <td>
        A callback to format dynamic parameters of type <b>Currency</b>, with the corresponding type tag <b> c </b> or <b> C </b>
      </td>
    </tr>
    <tr>
      <td>formatDate</td>
      <td>
        A callback to format dynamic parameters of type <b>Date</b>, with the corresponding type tag <b> d </b> or <b> D </b>
      </td>
    </tr>
    <tr>
      <td>formatTime</td>
      <td>
        A callback to format dynamic parameters of type <b>Time</b>, with the corresponding type tag <b> t </b> or <b> T </b>
      </td>
    </tr>
    <tr>
      <td>formatPlural</td>
      <td>
        A callback to format dynamic parameters of type <b>Plural</b>, with the corresponding type tag <b> p </b> or <b> P </b>
      </td>
    </tr>
  </tr>
</table>

### t
获取国际化文案<br />内部会根据当前语言 <code>locale</code> 从语言包 <code>langs</code> 中获取 <code>text</code> 对应的翻译文案，未匹配到对应翻译内容会直接显示 <code>text</code> 本身内容
<h4 id="t-type">Type</h4>
<pre>
(
  text: string,
  ...args: Array&lt;string|number|unknown&gt;
) =&gt; string
</pre>

<h4 id="t-参数说明">参数说明</h4>
<table>
  <tr>
    <th>Parameter name</th>
    <th>Description</th>
  </tr>
  <tr>
    <tr>
      <td>text</td>
      <td>
        待翻译的文案，该文案需满足特定 <a href="https://github.com/eyelly-wu/i18n-pro/blob/vdoc/docs/dist/MATCH_RULE.md">Matching Rules</a> 
      </td>
    </tr>
    <tr>
      <td>args</td>
      <td>
        表示动态参数，没有个数限制， <code>text</code> 文案中需要以 <code>{index}</code> 的形式来接收， <code>index</code> 表示动态参数的位置，从 0 开始（可在 <code>initI18n</code> 中自定义起始值），第 1 个参数对应 0，对 2 个参数对应 1，以此往复
      </td>
    </tr>
  </tr>
</table>

### setI18n
Set language and language package
<h4 id="seti18n-type">Type</h4>
<pre>
(
  props: {
    locale?: string,
    langs?: Record&lt;string, Record&lt;string, string&gt;&gt;,
  }
) => <a href="#i18nstate">I18nState</a>
</pre>

<h4 id="seti18n-参数说明">参数说明</h4>
<table>
  <tr>
    <th>Parameter name</th>
    <th>Description</th>
  </tr>
  <tr>
    <tr>
      <td>locale</td>
      <td>Specify the current language</td>
    </tr>
    <tr>
      <td>langs</td>
      <td>Set the current language package to support incremental addition, and the new one will cover the merger to the original</td>
    </tr>
  </tr>
</table>

### withI18n
Get the  <code>t</code>  function independent of the main program order<br />It is applicable to the server. Each interface response needs to be internationalized
<h4 id="withi18n-type">Type</h4>
<pre>
(
  props:{
    locale: string
  }
) => ({ <a href="#t">t</a> })
</pre>

<h4 id="withi18n-参数说明">参数说明</h4>
<table>
  <tr>
    <th>Parameter name</th>
    <th>Description</th>
  </tr>
  <tr>
    <tr>
      <td>locale</td>
      <td>Specify the current language</td>
    </tr>
  </tr>
</table>


## 其他类型
以下类型是为了方便文档说明，与代码中类型写法上会存在区别，需以实际代码为准
### I18nState
命名空间下的状态
<pre>
type I18nState = {
  namespace: string
  locale?: string
  langs?: Record&lt;string, Record&lt;string, string&gt;&gt;
  beginIndex?: number
  formatNumber?: <a href="#formatfunc">FormatFunc</a>,
  formatCurrency?: <a href="#formatfunc">FormatFunc</a>,
  formatDate?: <a href="#formatdatefunc">FormatDateFunc</a>,
  formatTime?: <a href="#formatdatefunc">FormatDateFunc</a>,
  formatPlural?: <a href="#formatpluralfunc">FormatPluralFunc</a>,
}
</pre>

### FormatFunc
Common format callback type
```ts
type FormatFunc = <T>(props: {
  locale: string, // Current language
  payload: string | number | unknown | T, // dynamic parameters 
}) => number | string
```

### FormatDateFunc
Format callback function type of Date(Time)
```ts
type FormatDateFunc = <T>(props: {
  locale: string, // Current language
  payload: string | number | Date | unknown | T, // dynamic parameters 
}) => string
```

### FormatPluralFunc
Format callback function type of Plural
```ts
type FormatPluralFunc = <T>(props: {
  locale: string, // Current language
  payload: string | number | unknown | T, // dynamic parameters 
  text: string // A string that combines quantifiers and nouns by default. Languages that do not require plural processing can return this property directly
  keyword: string // Plural keyword
}) => string
```
