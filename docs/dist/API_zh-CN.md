
# 函数 API

<details >
  <summary>目录</summary>

  &emsp;&emsp;[函数列表](#函数列表)<br/>
  &emsp;&emsp;&emsp;&emsp;[initI18n](#initi18n)<br/>
  &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;[类型](#3-initi18n-类型)<br/>
  &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;[参数说明](#3-initi18n-参数说明)<br/>
  &emsp;&emsp;&emsp;&emsp;[t](#t)<br/>
  &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;[类型](#3-t-类型)<br/>
  &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;[参数说明](#3-t-参数说明)<br/>
  &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;[属性](#属性)<br/>
  &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;[t](#tt)<br/>
  &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;[类型](#5-t-类型)<br/>
  &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;[参数说明](#5-t-参数说明)<br/>
  &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;[withLocale](#withlocale)<br/>
  &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;[类型](#5-withlocale-类型)<br/>
  &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;[参数说明](#5-withlocale-参数说明)<br/>
  &emsp;&emsp;&emsp;&emsp;[setI18n](#seti18n)<br/>
  &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;[类型](#3-seti18n-类型)<br/>
  &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;[参数说明](#3-seti18n-参数说明)<br/>
  &emsp;&emsp;[其他类型](#其他类型)<br/>
  &emsp;&emsp;&emsp;&emsp;[LangPack](#langpack)<br/>
  &emsp;&emsp;&emsp;&emsp;[I18nState](#i18nstate)<br/>
  &emsp;&emsp;&emsp;&emsp;[FormatFunc](#formatfunc)<br/>
  &emsp;&emsp;&emsp;&emsp;[FormatDateFunc](#formatdatefunc)<br/>
  &emsp;&emsp;&emsp;&emsp;[FormatPluralFunc](#formatpluralfunc)<br/>

</details>

## 函数列表

### initI18n
初始化固定配置，获取核心 API
<h4 id="3-initi18n-类型">类型</h4>
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

<h4 id="3-initi18n-参数说明">参数说明</h4>
<table>
  <tr>
    <th>参数名</th>
    <th>说明</th>
  </tr>
  <tr>
    <tr>
      <td>namespace</td>
      <td>指定命名空间</td>
    </tr>
    <tr>
      <td>locale</td>
      <td>
        指定当前语言<br /><br />📢📢📢： <code>locale</code> 的值默认跟语言代码相对应，如需自定义，需参考 <code>codeLocaleMap</code> 的用法
      </td>
    </tr>
    <tr>
      <td>langs</td>
      <td>设置当前语言包</td>
    </tr>
    <tr>
      <td>beginIndex</td>
      <td>
        设置 <code>t</code> 函数中 <code>插值变量</code> 起始下标，默认为 0
      </td>
    </tr>
    <tr>
      <td>formatNumber</td>
      <td>
        <b> 数字 </b>类型 <code>插值变量</code> 的 <code>格式化器</code> ，对应的类型标记是<b> n </b>或<b> N </b>
      </td>
    </tr>
    <tr>
      <td>formatCurrency</td>
      <td>
        <b> 货币 </b>类型 <code>插值变量</code> 的 <code>格式化器</code> ，对应的类型标记是<b> c </b>或<b> C </b>
      </td>
    </tr>
    <tr>
      <td>formatDate</td>
      <td>
        <b> 日期 </b>类型 <code>插值变量</code> 的 <code>格式化器</code> ，对应的类型标记是<b> d </b>或<b> D </b>
      </td>
    </tr>
    <tr>
      <td>formatTime</td>
      <td>
        <b> 时间 </b>类型 <code>插值变量</code> 的 <code>格式化器</code> ，对应的类型标记是<b> t </b>或<b> T </b>
      </td>
    </tr>
    <tr>
      <td>formatPlural</td>
      <td>
        <b> 复数 </b>类型 <code>插值变量</code> 的 <code>格式化器</code> ，对应的类型标记是<b> p </b>或<b> P </b>
      </td>
    </tr>
  </tr>
</table>

### t
获取国际化文案<br />内部会根据当前语言 <code>locale</code> 从语言包 <code>langs</code> 中获取 <code>text</code> 对应的 <code>文案</code> ，未匹配到对应翻译内容会直接显示 <code>text</code> 本身内容
<h4 id="3-t-类型">类型</h4>
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

<h4 id="3-t-参数说明">参数说明</h4>
<table>
  <tr>
    <th>参数名</th>
    <th>说明</th>
  </tr>
  <tr>
    <tr>
      <td>text</td>
      <td>
        待翻译的文案，该文案需满足特定 <a href="https://github.com/i18n-pro/core/blob/v3.0.0-alpha.2/docs/dist/MATCH_RULE_zh-CN.md">匹配规则</a> 
      </td>
    </tr>
    <tr>
      <td>args</td>
      <td>
        表示 <code>插值变量</code> ，没有个数限制， <code>text</code> 文案中需要以 <code>{index}</code> 的形式来接收， <code>index</code> 表示 <code>插值变量</code> 的位置，从 0 开始（可在 <code>initI18n</code> 中自定义起始值），第 1 个参数对应 0，对 2 个参数对应 1，以此往复
      </td>
    </tr>
  </tr>
</table>

#### 属性

<h5 id="tt">t</h5>
获取 <code>自定义 key</code> 国际化文案<br />内部会根据当前语言 <code>locale</code> 从语言包 <code>langs</code> 中获取 <code>key</code> 对应的 <code>文案</code> ，未匹配到对应翻译内容会直接显示 <code>text</code> 本身内容
<h6 id="5-t-类型">类型</h6>
<pre>
(
  key: string,
  text: string,
  ...args: Array&lt;string | number | unknown&gt;
) => string
</pre>

<h6 id="5-t-参数说明">参数说明</h6>
<table>
  <tr>
    <th>参数名</th>
    <th>说明</th>
  </tr>
  <tr>
    <tr>
      <td>key</td>
      <td>
        自定义key，需要满足特定 <a href="https://github.com/i18n-pro/core/blob/v3.0.0-alpha.2/docs/dist/MATCH_RULE_zh-CN.md">匹配规则</a> 
      </td>
    </tr>
    <tr>
      <td>text</td>
      <td>
        待翻译的文案，该文案需满足特定 <a href="https://github.com/i18n-pro/core/blob/v3.0.0-alpha.2/docs/dist/MATCH_RULE_zh-CN.md">匹配规则</a> 
      </td>
    </tr>
    <tr>
      <td>args</td>
      <td>
        表示 <code>插值变量</code> ，没有个数限制， <code>text</code> 文案中需要以 <code>{index}</code> 的形式来接收， <code>index</code> 表示 <code>插值变量</code> 的位置，从 0 开始（可在 <code>initI18n</code> 中自定义起始值），第 1 个参数对应 0，对 2 个参数对应 1，以此往复
      </td>
    </tr>
  </tr>
</table>

##### withLocale
生成新的 <a href="#t">t</a> 函数<br />适用于服务端，每个接口响应需要做国际化的处理
<h6 id="5-withlocale-类型">类型</h6>
<pre>
(
  locale?: string,
) => Translate
</pre>

<h6 id="5-withlocale-参数说明">参数说明</h6>
<table>
  <tr>
    <th>参数名</th>
    <th>说明</th>
  </tr>
  <tr>
    <tr>
      <td>locale</td>
      <td>
        指定当前语言<br />若未指定语言，则与生成前的语言保持一致
      </td>
    </tr>
  </tr>
</table>

### setI18n
设置语言、语言包
<h4 id="3-seti18n-类型">类型</h4>
<pre>
(
  props: {
    locale?: string,
    langs?: Record&lt;string, <a href="#langpack">LangPack</a>&gt;,
  }
) => Promise&lt;<a href="#i18nstate">I18nState</a>&gt;
</pre>

<h4 id="3-seti18n-参数说明">参数说明</h4>
<table>
  <tr>
    <th>参数名</th>
    <th>说明</th>
  </tr>
  <tr>
    <tr>
      <td>locale</td>
      <td>指定当前语言</td>
    </tr>
    <tr>
      <td>langs</td>
      <td>设置当前语言包，支持增量添加，新增的会覆盖合并到原有的之中</td>
    </tr>
  </tr>
</table>


## 其他类型
以下类型是为了方便文档说明，与代码中类型写法上会存在区别，需以实际代码为准
### LangPack
语言包
<pre>type LangPack = Record&lt;string, string&gt;</pre>

### I18nState
命名空间下的状态
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
通用的  `格式化器`  类型
<pre>
type FormatFunc = &lt;T&gt;(props: {
  /**
   * 当前语言
   */
  locale: string,
  /**
   * 插值变量
   */
  payload: string | number | unknown | T,
  /**
   * t 函数
   */
  t: <a href="#t">t</a>,
}) => number | string
</pre>

### FormatDateFunc
日期（时间）的  `格式化器`  类型
<pre>
type FormatDateFunc = &lt;T&gt;(props: {
  /**
   * 当前语言
   */
  locale: string,
  /**
   * 插值变量
   */
  payload: string | number | Date | unknown | T,
  /**
   * t 函数
   */
  t: <a href="#t">t</a>,
}) => string
</pre>

### FormatPluralFunc
复数的  `格式化器`  类型
<pre>
type FormatPluralFunc = &lt;T&gt;(props: {
  /**
   * 当前语言
   */
  locale: string,
  /**
   * 插值变量
   */
  payload: string | number | unknown | T,
  /**
   * 默认将量词和名词组合起来的字符串，不需要复数处理的语言可以直接返回该属性
   */
  text: string
  /**
   * 复数关键词
   */
  keyword: string
  /**
   * t 函数
   */
  t: <a href="#t">t</a>,
 }) => string
</pre>
