import { binChalk } from '../utils'

const { STYLE_EOF, default: chalk } = binChalk

describe('chalk', () => {
  it('主函数', () => {
    expect(chalk()).toBe('')
    const str = ['a', 'b', 'c']
    expect(chalk(...str)).toBe(str.join(' '))
  })

  it('链式调用', () => {
    const basic8Color = [
      'black',
      'red',
      'green',
      'yellow',
      'blue',
      'magenta', // 品红|洋红
      'cyan', // 蓝绿|青色
      'white',
    ]

    const colorKeyMap = basic8Color.reduce((res, color) => {
      res[color] = chalk[color]().replace(STYLE_EOF, '')

      return res
    }, {})

    const fakeChalk = (...args: string[]) => {
      const colorStyle = basic8Color.reduce(
        (res, color, index) => {
          res.mockRes += colorKeyMap[color]
          res.chalkRes = res.chalkRes[color]
          if (index === basic8Color.length - 1) {
            res.mockRes += args.join(' ') + STYLE_EOF
            res.chalkRes = (res.chalkRes as typeof chalk)(...args)
          }
          return res
        },
        {
          mockRes: '',
          chalkRes: chalk,
        } as {
          mockRes: string
          chalkRes: typeof chalk | string
        },
      )

      return colorStyle
    }

    // 随机生成数组
    const getAnyStringArray = (generateItem?: () => string | string[]) => {
      const length = Math.round(Math.random())
      return Array(length)
        .fill('')
        .map(() => generateItem?.() || Math.random()) as string[]
    }

    // 生成多维字符串数组
    const str = getAnyStringArray(getAnyStringArray)

    str.forEach((item) => {
      const { mockRes, chalkRes } = fakeChalk(...item)
      expect(mockRes).toBe(chalkRes)
    })
  })
})
