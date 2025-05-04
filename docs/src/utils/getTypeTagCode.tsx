export default function getTypeTagCode(isDot = false) {
  let prefix = 't('

  if (isDot) {
    prefix = `t.t('custom-key', `
  }

  const text = `
// ${tr('数字类型')}
${prefix}'${tr('用户数达到了{0}', '{n0}')}', 100000000)

// ${tr('货币类型')}
${prefix}'${tr('售价为{0}', '{c0}')}', 14999)

// ${tr('日期类型')}
${prefix}\`${tr('今天的日期是{0}', '{d0}')}\`, new Date())

// ${tr('时间类型')}
${prefix}'${tr('当前时间：{0}', '{t0}')}', new Date())

// ${tr('复数类型')}
${prefix}'${tr(
    '我有{0}，{1}和{2}',
    `{${tr('p0个苹果')}}`,
    `{${tr('p1个香蕉')}}`,
    `{${tr('p2个梨')}}`,
  )}', 5, 4, 3) `
  return text
}
