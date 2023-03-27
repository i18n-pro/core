
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
      初始化固定配置，获取核心 API<br /><br /><b>namespace</b>：指定命名空间<br /><b>locale</b>：Specify the current language<br /><b>langs</b>：Set Current Language Pack<br /><b>beginIndex</b>：设置<code> t </code>函数中动态参数起始下标，默认为 0<br /><b>formatNumber</b>：A callback to format dynamic parameters of type <b>Number</b>, with the corresponding type tag <b> n </b> or <b> N </b><br /><b>formatCurrency</b>：A callback to format dynamic parameters of type <b>Currency</b>, with the corresponding type tag <b> c </b> or <b> C </b><br /><b>formatDate</b>：A callback to format dynamic parameters of type <b>Date</b>, with the corresponding type tag <b> d </b> or <b> D </b><br /><b>formatTime</b>：A callback to format dynamic parameters of type <b>Time</b>, with the corresponding type tag <b> t </b> or <b> T </b><br /><b>formatPlural</b>：A callback to format dynamic parameters of type <b>Plural</b>, with the corresponding type tag <b> p </b> or <b> P </b><br /><br />📢📢📢：The value of <code>locale</code> corresponds to the language code by default. If you need to customize, please refer to the usage of <code>codeLocaleMap</code>
    </td>
  </tr>
</table><span>以下是核心API</span><table>
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
      Get internationalized text<br /><br />Internally, the translation text corresponding to <code> text </code> will be obtained from the language package <code> langs </code> according to the current language <code> locale </code>. If the translation content is not matched, the content of <code> text </code> will be displayed directly<br /><b>text</b>：Text to be translated<br /><b>args</b>：It represents a dynamic parameters without number limitation. The <code> text </code> text needs to be received in the form of <code> {index} </code>. The <code> index </code> represents the position of the dynamic parameters, starting from 0 (you can customize the starting value in <code> initI18n </code>). The first parameter corresponds to 0, and the second parameter corresponds to 1, and so on<br /><br />for example：<code>
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
      设置语言、语言包<br /><br /><b>locale</b>：Specify the current language<br /><b>langs</b>：设置当前语言包，支持增量添加，新增的会覆盖合并到原有的之中<br />
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
      获取独立于主程序的<code> t </code>函数<br /><br />It is applicable to the server. Each interface response needs to be internationalized
    </td>
  </tr>
</table>

## Function Type

### FormatFunc
Common format callback type
```ts
type FormatFunc = <T>(props:{
  locale: string, // Current language
  payload: string | number | unknow | T, // dynamic parameters 
}) => number | string
```

### FormatDateFunc
Format callback function type of Date(Time)
```ts
type FormatDateFunc = <T>(props:{
  locale: string, // Current language
  payload: string | number | Date | unknow | T, // dynamic parameters 
}) => string
```

### FormatPluralFunc
Format callback function type of Plural
```ts
type FormatPluralFunc = <T>(props:{
  locale: string, // Current language
  payload: string | number | unknow | T, // dynamic parameters 
  text: string // A string that combines quantifiers and nouns by default. Languages that do not require plural processing can return this property directly
  keyword: string // Plural keyword
}) => string
```
