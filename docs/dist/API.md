
# Function API

<details >
  <summary>Table of Contents</summary>

  &emsp;&emsp;[Function List](#function-list)<br/>
  &emsp;&emsp;&emsp;&emsp;[initI18n](#initi18n)<br/>
  &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;[Type](#initi18n-type)<br/>
  &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;[Parameter Description](#initi18n-parameter-description)<br/>
  &emsp;&emsp;&emsp;&emsp;[t](#t)<br/>
  &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;[Type](#t-type)<br/>
  &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;[Parameter Description](#t-parameter-description)<br/>
  &emsp;&emsp;&emsp;&emsp;[setI18n](#seti18n)<br/>
  &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;[Type](#seti18n-type)<br/>
  &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;[Parameter Description](#seti18n-parameter-description)<br/>
  &emsp;&emsp;&emsp;&emsp;[withI18n](#withi18n)<br/>
  &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;[Type](#withi18n-type)<br/>
  &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;[Parameter Description](#withi18n-parameter-description)<br/>
  &emsp;&emsp;[Other Types](#other-types)<br/>
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

<h4 id="initi18n-parameter-description">Parameter Description</h4>
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
        设置 <code>t</code> 函数中<code> 插值变量 </code>起始下标，默认为 0
      </td>
    </tr>
    <tr>
      <td>formatNumber</td>
      <td>
        格式化<b> Number </b>类型<code> 插值变量 </code>的回调，对应的类型标记是<b> n </b>or<b> N </b>
      </td>
    </tr>
    <tr>
      <td>formatCurrency</td>
      <td>
        格式化<b> Currency </b>类型<code> 插值变量 </code>的回调，对应的类型标记是<b> c </b>or<b> C </b>
      </td>
    </tr>
    <tr>
      <td>formatDate</td>
      <td>
        格式化<b> Date </b>类型<code> 插值变量 </code>的回调，对应的类型标记是<b> d </b>or<b> D </b>
      </td>
    </tr>
    <tr>
      <td>formatTime</td>
      <td>
        格式化<b> Time </b>类型<code> 插值变量 </code>的回调，对应的类型标记是<b> t </b>or<b> T </b>
      </td>
    </tr>
    <tr>
      <td>formatPlural</td>
      <td>
        格式化<b> Plural </b>类型<code> 插值变量 </code>的回调，对应的类型标记是<b> p </b>or<b> P </b>
      </td>
    </tr>
  </tr>
</table>

### t
Get Internationalization Text<br />The internal will obtain  `Translation`  corresponding to  <code>text</code>  from the current language  <code>locale</code>   <code>langs</code> , and the content of the corresponding translation will directly display  <code>text</code> 
<h4 id="t-type">Type</h4>
<pre>
(
  text: string,
  ...args: Array&lt;string|number|unknown&gt;
) =&gt; string
</pre>

<h4 id="t-parameter-description">Parameter Description</h4>
<table>
  <tr>
    <th>Parameter name</th>
    <th>Description</th>
  </tr>
  <tr>
    <tr>
      <td>text</td>
      <td>
        The text to be translated should meet specific  <a href="https://github.com/eyelly-wu/i18n-pro/blob/vdoc/docs/dist/MATCH_RULE.md">Matching Rules</a>  requirements
      </td>
    </tr>
    <tr>
      <td>args</td>
      <td>
        表示<code> 插值变量 </code>，没有个数限制， <code>text</code> 文案中需要以 <code>{index}</code> 的形式来接收， <code>index</code> 表示<code> 插值变量 </code>的位置，从 0 开始（可在 <code>initI18n</code> 中自定义起始值），第 1 个参数对应 0，对 2 个参数对应 1，以此往复
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

<h4 id="seti18n-parameter-description">Parameter Description</h4>
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

<h4 id="withi18n-parameter-description">Parameter Description</h4>
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


## Other Types
The following types are for convenience in document description, and there may be differences in the type writing in the code. Please refer to the actual code for accuracy
### I18nState
State under the namespace
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
  payload: string | number | unknown | T, // 插值变量
}) => number | string
```

### FormatDateFunc
Format callback function type of Date(Time)
```ts
type FormatDateFunc = <T>(props: {
  locale: string, // Current language
  payload: string | number | Date | unknown | T, // 插值变量
}) => string
```

### FormatPluralFunc
Format callback function type of Plural
```ts
type FormatPluralFunc = <T>(props: {
  locale: string, // Current language
  payload: string | number | unknown | T, // 插值变量
  text: string // A string that combines quantifiers and nouns by default. Languages that do not require plural processing can return this property directly
  keyword: string // Plural keyword
}) => string
```
