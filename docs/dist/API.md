
# Function API

<details >
  <summary>Table of Contents</summary>

  &emsp;&emsp;[Function List](#function-list)<br/>
  &emsp;&emsp;[Function Type](#function-type)<br/>
  &emsp;&emsp;&emsp;&emsp;[FormatFunc](#formatfunc)<br/>
  &emsp;&emsp;&emsp;&emsp;[FormatDateFunc](#formatdatefunc)<br/>
  &emsp;&emsp;&emsp;&emsp;[FormatPluralFunc](#formatpluralfunc)<br/>

</details>

## Function List
The following types are expressed in  `TypeScript`  syntax<table>
  <tr>
    <th>Function Name</th>
    <th>Type</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>initI18n</td>
    <td>
      <pre>
(
    props: {
        namespace: string,
        locale?: string,
        langs?: Record<strng, Record<string, string>>,
        beginIndex?: number,
        formatNumber?: <a href="#formatfunc">FormatFunc</a>,
        formatCurrency?: <a href="#formatfunc">FormatFunc</a>,
        formatDate?: <a href="#formatdatefunc">FormatDateFunc</a>,
        formatTime?: <a href="#formatdatefunc">FormatDateFunc</a>,
        formatPlural?: <a href="#formatpluralfunc">FormatPluralFunc</a>,
    }
) => ({
  setI18n,
  t,
  withI18n,
})
      </pre>
    </td>
    <td>
      Initialize a fixed configuration to get the core API<br /><br /><b>namespace</b>：Specify the naming space<br /><b>locale</b>：Specify the current language<br /><b>langs</b>：Set Current Language Pack<br /><b>beginIndex</b>：Set the dynamic parameters in the  <code>t</code>  function to start the bidding, the default is 0<br /><b>formatNumber</b>：A callback to format dynamic parameters of type <b>Number</b>, with the corresponding type tag <b> n </b> or <b> N </b><br /><b>formatCurrency</b>：A callback to format dynamic parameters of type <b>Currency</b>, with the corresponding type tag <b> c </b> or <b> C </b><br /><b>formatDate</b>：A callback to format dynamic parameters of type <b>Date</b>, with the corresponding type tag <b> d </b> or <b> D </b><br /><b>formatTime</b>：A callback to format dynamic parameters of type <b>Time</b>, with the corresponding type tag <b> t </b> or <b> T </b><br /><b>formatPlural</b>：A callback to format dynamic parameters of type <b>Plural</b>, with the corresponding type tag <b> p </b> or <b> P </b><br /><br />📢📢📢：The value of  <code>locale</code>  corresponds to the language code by default. If you need to customize, please refer to the usage of  <code>codeLocaleMap</code> 
    </td>
  </tr>
</table><span>以下是核心 API</span><table>
  <tr>
    <th>Function Name</th>
    <th>Type</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>t</td>
    <td>
      <pre>
(
  text: string,
  ...args: Array&lt;string|number|unknown&gt;
) =&gt; string
      </pre>
    </td>
    <td>
      获取国际化文案<br /><br />内部会根据当前语言 <code>locale</code> 从语言包 <code>langs</code> 中获取 <code>text</code> 对应的翻译文案，未匹配到对应翻译内容会直接显示 <code>text</code> 本身内容<br /><br /><b>text</b>：待翻译的文案，该文案需满足特定 <a href="https://github.com/eyelly-wu/i18n-pro/blob/vdoc/docs/dist/MATCH_RULE.md">Matching Rules</a> <br /><b>args</b>：表示动态参数，没有个数限制， <code>text</code> 文案中需要以 <code>{index}</code> 的形式来接收， <code>index</code> 表示动态参数的位置，从 0 开始（可在 <code>initI18n</code> 中自定义起始值），第 1 个参数对应 0，对 2 个参数对应 1，以此往复<br /><br />for example：<code>
  t('这个男人叫{0}，意外获得了超能力，这个女人叫{1}，意外被{2}追杀，这个小孩叫{3}，意外遭遇了意外', '小帅', '小美', 'FBI',
                '小白')
</code><br />The execution result of the current language (Chinese: zh) is： 这个男人叫小帅，意外获得了超能力，这个女人叫小美，意外被FBI追杀，这个小孩叫小白，意外遭遇了意外<br />The result of Baidu's translation into English is：The man's name is 小帅, and he accidentally obtained super power. The woman's name is 小美, and she was accidentally chased by FBI. The child's name is 小白, and she was accidentally hit by an accident
    </td>
  </tr>
  <tr>
    <td>setI18n</td>
    <td>
      <pre>
(
    props: {
        locale?: string,
        langs?: Record<string, Record<string, string>>,
    }
) => void
      </pre>
    </td>
    <td>
      Set language and language package<br /><br /><b>locale</b>：Specify the current language<br /><b>langs</b>：Set the current language package to support incremental addition, and the new one will cover the merger to the original<br />
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
      Get the  <code>t</code>  function independent of the main program order<br /><br />It is applicable to the server. Each interface response needs to be internationalized
    </td>
  </tr>
</table>

## Function Type

### FormatFunc
Common format callback type
```ts
type FormatFunc = <T>(props:{
  locale: string, // Current language
  payload: string | number | unknown | T, // dynamic parameters 
}) => number | string
```

### FormatDateFunc
Format callback function type of Date(Time)
```ts
type FormatDateFunc = <T>(props:{
  locale: string, // Current language
  payload: string | number | Date | unknown | T, // dynamic parameters 
}) => string
```

### FormatPluralFunc
Format callback function type of Plural
```ts
type FormatPluralFunc = <T>(props:{
  locale: string, // Current language
  payload: string | number | unknown | T, // dynamic parameters 
  text: string // A string that combines quantifiers and nouns by default. Languages that do not require plural processing can return this property directly
  keyword: string // Plural keyword
}) => string
```
