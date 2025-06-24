
# Function API

<details >
  <summary>Table of Contents</summary>

  &emsp;&emsp;[Function List](#function-list)<br/>
  &emsp;&emsp;&emsp;&emsp;[initI18n](#initi18n)<br/>
  &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;[Type](#3-initi18n-type)<br/>
  &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;[Parameter Description](#3-initi18n-parameter-description)<br/>
  &emsp;&emsp;&emsp;&emsp;[t](#t)<br/>
  &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;[Type](#3-t-type)<br/>
  &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;[Parameter Description](#3-t-parameter-description)<br/>
  &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;[property](#property)<br/>
  &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;[t](#tt)<br/>
  &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;[Type](#5-t-type)<br/>
  &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;[Parameter Description](#5-t-parameter-description)<br/>
  &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;[withLocale](#withlocale)<br/>
  &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;[Type](#5-withlocale-type)<br/>
  &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;[Parameter Description](#5-withlocale-parameter-description)<br/>
  &emsp;&emsp;&emsp;&emsp;[setI18n](#seti18n)<br/>
  &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;[Type](#3-seti18n-type)<br/>
  &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;[Parameter Description](#3-seti18n-parameter-description)<br/>
  &emsp;&emsp;[Other Types](#other-types)<br/>
  &emsp;&emsp;&emsp;&emsp;[LangPack](#langpack)<br/>
  &emsp;&emsp;&emsp;&emsp;[I18nState](#i18nstate)<br/>
  &emsp;&emsp;&emsp;&emsp;[FormatFunc](#formatfunc)<br/>
  &emsp;&emsp;&emsp;&emsp;[FormatDateFunc](#formatdatefunc)<br/>
  &emsp;&emsp;&emsp;&emsp;[FormatPluralFunc](#formatpluralfunc)<br/>

</details>

## Function List

### initI18n
Initialize a fixed configuration to get the core API
<h4 id="3-initi18n-type">Type</h4>
<pre>
(
  props: {
    namespace: string,
    locale?: string,
    langs?: Record&lt;string, (() => Promise&lt;<a href="#langpack">LangPack</a>&gt;) | <a href="#langpack">LangPack</a>&gt;,
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
})
</pre>

<h4 id="3-initi18n-parameter-description">Parameter Description</h4>
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
        Set the starting index of  <code>Interpolation Variable</code>  in the  <code>t</code>  function, default is 0
      </td>
    </tr>
    <tr>
      <td>formatNumber</td>
      <td>
         <code>Formatizer</code>  of <b> Number </b> type  <code>Interpolation Variable</code> , the corresponding type tag is <b> n </b>or<b> N </b>
      </td>
    </tr>
    <tr>
      <td>formatCurrency</td>
      <td>
         <code>Formatizer</code>  of <b> Currency </b> type  <code>Interpolation Variable</code> , the corresponding type tag is <b> c </b>or<b> C </b>
      </td>
    </tr>
    <tr>
      <td>formatDate</td>
      <td>
         <code>Formatizer</code>  of <b> Date </b> type  <code>Interpolation Variable</code> , the corresponding type tag is <b> d </b>or<b> D </b>
      </td>
    </tr>
    <tr>
      <td>formatTime</td>
      <td>
         <code>Formatizer</code>  of <b> Time </b> type  <code>Interpolation Variable</code> , the corresponding type tag is <b> t </b>or<b> T </b>
      </td>
    </tr>
    <tr>
      <td>formatPlural</td>
      <td>
         <code>Formatizer</code>  of <b> Plural </b> type  <code>Interpolation Variable</code> , the corresponding type tag is <b> p </b>or<b> P </b>
      </td>
    </tr>
  </tr>
</table>

### t
Get Internationalization Text<br />The internal will obtain  <code>Case Study</code>  corresponding to  <code>text</code>  from the current language  <code>locale</code>   <code>langs</code> , and the content of the corresponding translation will directly display  <code>text</code> 
<h4 id="3-t-type">Type</h4>
<pre>
interface Translate {
  (text: string, ...args: Array&lt;string | number | unknown&gt;): string
  t: (
    key: string,
    text: string,
    ...args: Array&lt;string | number | unknown&gt;
  ) => string
  withLocale: (locale?: string) => Translate
}
</pre>

<h4 id="3-t-parameter-description">Parameter Description</h4>
<table>
  <tr>
    <th>Parameter name</th>
    <th>Description</th>
  </tr>
  <tr>
    <tr>
      <td>text</td>
      <td>
        The text to be translated should meet specific  <a href="https://github.com/i18n-pro/core/blob/v3.0.0-alpha.1/docs/dist/MATCH_RULE.md">Matching Rules</a>  requirements
      </td>
    </tr>
    <tr>
      <td>args</td>
      <td>
        Represents  <code>Interpolation Variable</code> , with no limit on the number.  <code>text</code>  needs to be received in the form of  <code>{index}</code>  in the text,  <code>index</code>  represents the position of  <code>Interpolation Variable</code> , starting from 0 (can be customized in  <code>initI18n</code> ). The first parameter corresponds to 0, and 2 parameters correspond to 1, and so on
      </td>
    </tr>
  </tr>
</table>

#### property

<h5 id="tt">t</h5>
Get  <code>Custom key</code>  internationalized documentary<br />The internal will obtain  <code>Case Study</code>  corresponding to  <code>key</code>  from the current language  <code>locale</code>   <code>langs</code> , and the content of the corresponding translation will directly display  <code>text</code> 
<h6 id="5-t-type">Type</h6>
<pre>
(
  key: string,
  text: string,
  ...args: Array&lt;string | number | unknown&gt;
) => string
</pre>

<h6 id="5-t-parameter-description">Parameter Description</h6>
<table>
  <tr>
    <th>Parameter name</th>
    <th>Description</th>
  </tr>
  <tr>
    <tr>
      <td>key</td>
      <td>Custom key</td>
    </tr>
    <tr>
      <td>text</td>
      <td>
        The text to be translated should meet specific  <a href="https://github.com/i18n-pro/core/blob/v3.0.0-alpha.1/docs/dist/MATCH_RULE.md">Matching Rules</a>  requirements
      </td>
    </tr>
    <tr>
      <td>args</td>
      <td>
        Represents  <code>Interpolation Variable</code> , with no limit on the number.  <code>text</code>  needs to be received in the form of  <code>{index}</code>  in the text,  <code>index</code>  represents the position of  <code>Interpolation Variable</code> , starting from 0 (can be customized in  <code>initI18n</code> ). The first parameter corresponds to 0, and 2 parameters correspond to 1, and so on
      </td>
    </tr>
  </tr>
</table>

##### withLocale
Generate a new  <a href="#t">t</a>  function<br />It is applicable to the server. Each interface response needs to be internationalized
<h6 id="5-withlocale-type">Type</h6>
<pre>
(
  locale?: string,
) => Translate
</pre>

<h6 id="5-withlocale-parameter-description">Parameter Description</h6>
<table>
  <tr>
    <th>Parameter name</th>
    <th>Description</th>
  </tr>
  <tr>
    <tr>
      <td>locale</td>
      <td>
        Specify the current language<br />If no language is specified, it will be consistent with the language before generation
      </td>
    </tr>
  </tr>
</table>

### setI18n
Set language and language package
<h4 id="3-seti18n-type">Type</h4>
<pre>
(
  props: {
    locale?: string,
    langs?: Record&lt;string, <a href="#langpack">LangPack</a>&gt;,
  }
) => Promise&lt;<a href="#i18nstate">I18nState</a>&gt;
</pre>

<h4 id="3-seti18n-parameter-description">Parameter Description</h4>
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


## Other Types
The following types are for convenience in document description, and there may be differences in the type writing in the code. Please refer to the actual code for accuracy
### LangPack
Language Pack
<pre>type LangPack = Record&lt;string, string&gt;</pre>

### I18nState
State under the namespace
<pre>
type I18nState = {
  namespace: string
  locale?: string
  langs?: Record&lt;string, (() => Promise&lt;<a href="#langpack">LangPack</a>&gt;) | <a href="#langpack">LangPack</a>&gt;
  beginIndex?: number
  formatNumber?: <a href="#formatfunc">FormatFunc</a>,
  formatCurrency?: <a href="#formatfunc">FormatFunc</a>,
  formatDate?: <a href="#formatdatefunc">FormatDateFunc</a>,
  formatTime?: <a href="#formatdatefunc">FormatDateFunc</a>,
  formatPlural?: <a href="#formatpluralfunc">FormatPluralFunc</a>,
}
</pre>

### FormatFunc
Common   `Formatizer`   type
<pre>
type FormatFunc = &lt;T&gt;(props: {
  /**
   * Current language
   */
  locale: string,
  /**
   * Interpolation Variable
   */
  payload: string | number | unknown | T,
  /**
   * t  function
   */
  t: <a href="#t">t</a>,
}) => number | string
</pre>

### FormatDateFunc
  `Formatizer`   type of date (time)
<pre>
type FormatDateFunc = &lt;T&gt;(props: {
  /**
   * Current language
   */
  locale: string,
  /**
   * Interpolation Variable
   */
  payload: string | number | Date | unknown | T,
  /**
   * t  function
   */
  t: <a href="#t">t</a>,
}) => string
</pre>

### FormatPluralFunc
  `Formatizer`   type of plural
<pre>
type FormatPluralFunc = &lt;T&gt;(props: {
  /**
   * Current language
   */
  locale: string,
  /**
   * Interpolation Variable
   */
  payload: string | number | unknown | T,
  /**
   * A string that combines quantifiers and nouns by default. Languages that do not require plural processing can return this property directly
   */
  text: string
  /**
   * Plural keyword
   */
  keyword: string
  /**
   * t  function
   */
  t: <a href="#t">t</a>,
 }) => string
</pre>
