type Style = {
  operateType: string // 操作名称
  style: string // 样式编码
}

const styles: Style[] = [
  {
    operateType: 'red',
    style: '\u001b[31m',
  },
  {
    operateType: 'green',
    style: '\u001b[32m',
  },
  {
    operateType: 'yellow',
    style: '\u001b[33m',
  },
  {
    operateType: 'redBright',
    style: '\u001b[31;1m',
  },
  {
    operateType: 'greenBright',
    style: '\u001b[32;1m',
  },
  {
    operateType: 'yellowBright',
    style: '\u001b[33;1m',
  },
]

type OperateType = typeof styles[number]['operateType']

// 定义chalk函数的类型
interface Chalk extends Record<OperateType, Chalk> {
  (...res: string[]): string
}

/**
 * 基础的chalk函数实现
 */
const chalk = function (...res: string[]) {
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
