
# 函数API

<details >
  <summary>目录</summary>

  &emsp;&emsp;[函数列表](#函数列表)<br/>
  &emsp;&emsp;&emsp;&emsp;[initI18n](#initi18n)<br/>
  &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;[类型](#initi18n-类型)<br/>
  &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;[参数说明](#initi18n-参数说明)<br/>
  &emsp;&emsp;&emsp;&emsp;[t](#t)<br/>
  &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;[类型](#t-类型)<br/>
  &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;[参数说明](#t-参数说明)<br/>
  &emsp;&emsp;&emsp;&emsp;[setI18n](#seti18n)<br/>
  &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;[类型](#seti18n-类型)<br/>
  &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;[参数说明](#seti18n-参数说明)<br/>
  &emsp;&emsp;&emsp;&emsp;[withI18n](#withi18n)<br/>
  &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;[类型](#withi18n-类型)<br/>
  &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;[参数说明](#withi18n-参数说明)<br/>
  &emsp;&emsp;[函数类型](#函数类型)<br/>
  &emsp;&emsp;&emsp;&emsp;[I18nState](#i18nstate)<br/>
  &emsp;&emsp;&emsp;&emsp;[FormatFunc](#formatfunc)<br/>
  &emsp;&emsp;&emsp;&emsp;[FormatDateFunc](#formatdatefunc)<br/>
  &emsp;&emsp;&emsp;&emsp;[FormatPluralFunc](#formatpluralfunc)<br/>

</details>

## 函数列表

### initI18n
初始化固定配置，获取核心 API
<h4 id="initi18n-类型">类型</h4>
<code>
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
</code>

<h4 id="initi18n-参数说明">参数说明</h4>
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
        设置 <code>t</code> 函数中动态参数起始下标，默认为 0
      </td>
    </tr>
    <tr>
      <td>formatNumber</td>
      <td>
        格式化<b>数字</b>类型动态参数的回调，对应的类型标记是<b> n </b>或<b> N </b>
      </td>
    </tr>
    <tr>
      <td>formatCurrency</td>
      <td>
        格式化<b>货币</b>类型动态参数的回调，对应的类型标记是<b> c </b>或<b> C </b>
      </td>
    </tr>
    <tr>
      <td>formatDate</td>
      <td>
        格式化<b>日期</b>类型动态参数的回调，对应的类型标记是<b> d </b>或<b> D </b>
      </td>
    </tr>
    <tr>
      <td>formatTime</td>
      <td>
        格式化<b>时间</b>类型动态参数的回调，对应的类型标记是<b> t </b>或<b> T </b>
      </td>
    </tr>
    <tr>
      <td>formatPlural</td>
      <td>
        格式化<b>复数</b>类型动态参数的回调，对应的类型标记是<b> p </b>或<b> P </b>
      </td>
    </tr>
  </tr>
</table>

### t
获取国际化文案<br />内部会根据当前语言 <code>locale</code> 从语言包 <code>langs</code> 中获取 <code>text</code> 对应的翻译文案，未匹配到对应翻译内容会直接显示 <code>text</code> 本身内容
<h4 id="t-类型">类型</h4>
<code>
  <pre>
(
  text: string,
  ...args: Array&lt;string|number|unknown&gt;
) =&gt; string
  </pre>
</code>

<h4 id="t-参数说明">参数说明</h4>
<table>
  <tr>
    <th>参数名</th>
    <th>说明</th>
  </tr>
  <tr>
    <tr>
      <td>text</td>
      <td>
        待翻译的文案，该文案需满足特定 <a href="https://github.com/eyelly-wu/i18n-pro/blob/vdoc/docs/dist/MATCH_RULE_zh-CN.md">匹配规则</a> 
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
设置语言、语言包
<h4 id="seti18n-类型">类型</h4>
<code>
  <pre>
(
  props: {
    locale?: string,
    langs?: Record&lt;string, Record&lt;string, string&gt;&gt;,
  }
) => <a href="#i18nstate">I18nState</a>
  </pre>
</code>

<h4 id="seti18n-参数说明">参数说明</h4>
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

### withI18n
获取独立于主程序的 <code>t</code> 函数<br />适用于服务端，每个接口响应需要做国际化的处理
<h4 id="withi18n-类型">类型</h4>
<code>
  <pre>
(
  props:{
    locale: string
  }
) => ({ <a href="#t">t</a> })
  </pre>
</code>

<h4 id="withi18n-参数说明">参数说明</h4>
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
  </tr>
</table>


## 函数类型

### I18nState
命名空间下的状态<code>
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
</code>

### FormatFunc
通用的格式化回调类型
```ts
type FormatFunc = <T>(props:{
  locale: string, // 当前语言
  payload: string | number | unknown | T, // 动态参数
}) => number | string
```

### FormatDateFunc
日期（时间）的格式化回调函数类型
```ts
type FormatDateFunc = <T>(props:{
  locale: string, // 当前语言
  payload: string | number | Date | unknown | T, // 动态参数
}) => string
```

### FormatPluralFunc
复数的格式化回调函数类型
```ts
type FormatPluralFunc = <T>(props:{
  locale: string, // 当前语言
  payload: string | number | unknown | T, // 动态参数
  text: string // 默认将量词和名词组合起来的字符串，不需要复数处理的语言可以直接返回该属性
  keyword: string // 复数关键词
}) => string
```
