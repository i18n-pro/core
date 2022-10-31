import path from 'path'
import fs from 'fs'
import { binUtils } from '../utils'
import {
  fixErrorTranslateText,
  getParamsNotEqualMsgs,
  transferArgsToObj,
} from '../../src/bin/utils'

const { writeFilesSync } = binUtils

describe('模拟写入文件', () => {
  it('正常写入', () => {
    const spyLog = vi.spyOn(console, 'log')
    const filepath = path.join(__dirname, '../../i18n/.log/test.json')
    const fileContent = {
      a: 'a',
      b: 'b',
      c: 'c',
      d: 'd',
    }
    const showName = 'test'
    const indentSize = 10

    writeFilesSync({
      filepath,
      fileContent,
      showName,
      indentSize,
    })

    // 验证控制台日志输出
    expect(spyLog).toHaveBeenLastCalledWith(
      '✅',
      expect.stringContaining(`已将 ${showName} 写入到`),
    )

    // 验证输出内容
    expect(require(filepath)).toEqual(fileContent)

    const contentText = fs.readFileSync(filepath, { encoding: 'utf-8' })
    // 验证输出文件缩进格式正确
    expect(contentText).toMatch(
      new RegExp(/[ ]{0}"a": "a"/gm.source.replace('0', '' + indentSize)),
    )
  })

  describe('异常写入', () => {
    afterEach(() => {
      vi.resetAllMocks()
    })

    // NOTE 目前下面3个用例互相之间对于fs模拟，在顺序上有有一定的要求
    // 1. 如果将现有的第1个，放在第2个后面，那么现有的第1个测试不通过
    // 2. 如果将上面的清除模拟注释掉，现有的第3个用例测试不通过
    // 3. 这3个用例单独跑是完全没有问题的

    it('写入文件文件夹不存在时，创建文件夹异常', () => {
      console.log('写入文件文件夹不存在时，创建文件夹异常')
      const spyLog = vi.spyOn(console, 'log')
      const mkdirSync = vi.spyOn(fs, 'mkdirSync')
      const errorMsg = '模拟mkdirSync创建文件夹异常'
      mkdirSync.mockImplementation(() => {
        throw errorMsg
      })
      const filepath = path.join(__dirname, '../../i18n/.log/test/test.json')

      writeFilesSync({
        filepath,
        fileContent: {},
        showName: 'test',
        indentSize: 2,
      })

      // 验证控制台日志输出
      expect(spyLog).toHaveBeenLastCalledWith(
        '❌',
        expect.stringContaining(errorMsg),
      )
    })

    it('写入文件检查路径状态时发生未知异常', () => {
      console.log('写入文件检查路径状态时发生未知异常')
      const spyLog = vi.spyOn(console, 'log')
      const spystatSync = vi.spyOn(fs, 'statSync')
      const errorMsg = '模拟statSync未知异常'
      spystatSync.mockImplementation(() => {
        throw errorMsg
      })

      writeFilesSync({
        filepath: '',
        fileContent: {},
        showName: 'test',
        indentSize: 2,
      })

      // 验证控制台日志输出
      expect(spyLog).toHaveBeenLastCalledWith(
        '❌',
        expect.stringContaining(errorMsg),
      )
    })

    it('写入文件报错', () => {
      const spyLog = vi.spyOn(console, 'log')
      const spyWriteFileSync = vi.spyOn(fs, 'writeFileSync')
      const errorMsg = '模拟writeFileSync写入报错'
      spyWriteFileSync.mockImplementation(() => {
        throw errorMsg
      })
      const filepath = path.join(__dirname, '../../i18n/.log/test.json')

      writeFilesSync({
        filepath,
        fileContent: {},
        showName: 'test',
        indentSize: 2,
      })

      // 验证控制台日志输出
      expect(spyLog).toHaveBeenLastCalledWith(
        '❌',
        expect.stringContaining(errorMsg),
      )
    })
  })
})

describe('修复翻译异常的文案', () => {
  it('修复标记动态参数标记和下标间出现空格', () => {
    const text =
      'GitHub用户数达到了{n 0}，这个的售价是{c 1}, 今天的日期是{d       2}, 现在的时间是{t           3},我有{p    4个苹果}'
    const target =
      'GitHub用户数达到了{n0}，这个的售价是{c1}, 今天的日期是{d2}, 现在的时间是{t3},我有{p4个苹果}'

    const fixText = fixErrorTranslateText(text)
    expect(fixText).toBe(target)
  })
})

describe('找出动态参数翻译结果不正确', () => {
  it('丢失动态参数', () => {
    const text =
      'GitHub用户数达到了{n0}，这个的售价是{c1}, 今天的日期是{d2}, 现在的时间是{t3},我有{p4个苹果}'
    let trText =
      'GitHub用户数达到了，这个的售价是{c1}, 今天的日期是{d2}, 现在的时间是{t3},我有{p4个苹果}'

    let msg = getParamsNotEqualMsgs(text, trText)
    expect(msg).toEqual(['已翻译文案中缺少动态参数标识：{n0}'])

    trText =
      'GitHub用户数达到了，这个的售价是, 今天的日期是{d2}, 现在的时间是{t3},我有{p4个苹果}'
    msg = getParamsNotEqualMsgs(text, trText)
    expect(msg).toEqual([
      '已翻译文案中缺少动态参数标识：{n0}',
      '已翻译文案中缺少动态参数标识：{c1}',
    ])

    trText =
      'GitHub用户数达到了，这个的售价是, 今天的日期是, 现在的时间是{t3},我有{p4个苹果}'
    msg = getParamsNotEqualMsgs(text, trText)
    expect(msg).toEqual([
      '已翻译文案中缺少动态参数标识：{n0}',
      '已翻译文案中缺少动态参数标识：{c1}',
      '已翻译文案中缺少动态参数标识：{d2}',
    ])

    trText =
      'GitHub用户数达到了，这个的售价是, 今天的日期是, 现在的时间是,我有{p4个苹果}'
    msg = getParamsNotEqualMsgs(text, trText)
    expect(msg).toEqual([
      '已翻译文案中缺少动态参数标识：{n0}',
      '已翻译文案中缺少动态参数标识：{c1}',
      '已翻译文案中缺少动态参数标识：{d2}',
      '已翻译文案中缺少动态参数标识：{t3}',
    ])

    trText = 'GitHub用户数达到了，这个的售价是, 今天的日期是, 现在的时间是,我有'
    msg = getParamsNotEqualMsgs(text, trText)
    expect(msg).toEqual([
      '已翻译文案中缺少动态参数标识：{n0}',
      '已翻译文案中缺少动态参数标识：{c1}',
      '已翻译文案中缺少动态参数标识：{d2}',
      '已翻译文案中缺少动态参数标识：{t3}',
      '已翻译文案中缺少动态参数标识：{p4个苹果}',
    ])
    trText =
      'GitHub用户数达到了{n0}，这个的售价是{c1}, 今天的日期是{d2}, 现在的时间是{t3},我有{个苹果}'
    msg = getParamsNotEqualMsgs(text, trText)
    expect(msg).toEqual(['已翻译文案中缺少动态参数标识：{p4个苹果}'])
  })
})

it('模拟参数转换成对象', () => {
  expect(transferArgsToObj([])).toMatchObject({})

  expect(transferArgsToObj(['-p'])).toMatchObject({
    '-p': true,
  })

  expect(transferArgsToObj(['-p', 'a'])).toMatchObject({
    '-p': 'a',
  })

  expect(transferArgsToObj(['-p', '--path'])).toMatchObject({
    '-p': true,
    '--path': true,
  })

  expect(transferArgsToObj(['-p', 'a', '--path'])).toMatchObject({
    '-p': 'a',
    '--path': true,
  })

  expect(transferArgsToObj(['-p', 'a', '--path', 'b'])).toMatchObject({
    '-p': 'a',
    '--path': 'b',
  })
})
