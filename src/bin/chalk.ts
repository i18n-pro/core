type Style = {
  operateType: string // 操作名称
  style: string // 样式编码
}

const basic8Color = [
  'black',
  'red',
  'green',
  'yellow',
  'blue',
  'magenta', // 品红|洋红
  'cyan', // 蓝绿|青色
  'white',
] as const

const modifier = {
  bold: '\u001b[1m',
  italic: '\u001b[3m',
  underline: '\u001b[4m',
}

// 泛型工具
type UnionType<T extends string, R extends typeof modifier> =
  | T
  | `${T}Bright`
  // 的亏这里支持字符类型的拼接，及 Capitalize 泛型工具的支持
  // 不然操作类型得写很多多余的东西
  | `bg${Capitalize<T>}`
  | `bg${Capitalize<T>}Bright`
  | keyof R

// 操作类型
type OperateType = UnionType<typeof basic8Color[number], typeof modifier>

const baseci8ColorWithBgAndBright = basic8Color.reduce((res, color, index) => {
  const preffix = '\u001b[3' + index
  const bgPreffix = '\u001b[4' + index
  const suffix = 'm'
  const brightKey = ';1'
  const baseBg =
    'bg' + color.replace(/^(\w)(.+)/, (str, p, s) => p.toUpperCase() + s)

  res.push(
    {
      operateType: color,
      style: `${preffix}${suffix}`,
    },
    {
      operateType: color + 'Bright',
      style: `${preffix}${brightKey}${suffix}`,
    },
    {
      operateType: baseBg,
      style: `${bgPreffix}${suffix}`,
    },
    {
      operateType: baseBg + 'Bright',
      style: `${bgPreffix}${brightKey}${suffix}`,
    },
  )
  return res
}, [])

const modifierStyle = Object.entries(modifier).reduce((res, [key, value]) => {
  res.push({
    operateType: key,
    style: value,
  })
  return res
}, [])

const styles: Style[] = [...baseci8ColorWithBgAndBright, ...modifierStyle]

// 定义chalk函数的类型
interface Chalk extends Record<OperateType, Chalk> {
  (...res: Array<string | number>): string
}

/**
 * 基础的chalk函数实现
 */
const chalk = function (...res: Array<string | number>) {
  return res.join(' ')
} as Chalk

/**
 * 让类chalk函数拥有相关操作属性
 * 并且是以getter的形式设置
 * 在获取属性时，又能返回一个类chalk的函数，以递归的形式
 * @param func
 * @param styleProp
 */
function definedProperties(func: typeof chalk, styleProp = '') {
  styles.forEach(({ operateType, style }) => {
    Object.defineProperty(func, operateType, {
      get() {
        return createNewChalk(styleProp + style)
      },
    })
  })
}

/**
 * 创建一个新的chalk函数
 * 需要将前面操作的样式拼接到新的样式中
 * 以便于在最后一次执行所有的样式都生效
 * @param style
 * @returns
 */
function createNewChalk(style: string) {
  const func = (...res: string[]): string => {
    return `${style}${res.join(' ')}\u001b[0m`
  }

  definedProperties(func as Chalk, style)
  return func
}

// 给chalk函数添加相关操作属性
definedProperties(chalk)

export default chalk
