export default function getTypeTagCode(isDot = false) {
  let prefix = 't('

  if (isDot) {
    prefix = `t.t('custom-key', `
  }

  const text = `${prefix}'${tr(
    'i18n-pro 用户数达到了{0}',
    '{n0}',
  )}', 100000000) // ${tr('数字')}
${prefix}'${tr('售价为{0}', '{c0}')}', 14999) // ${tr('货币')}
${prefix}\`${tr('今天的日期是{0}', '{d0}')}\`, new Date()) // ${tr('日期')}
${prefix}'${tr('当前时间：{0}', '{t0}')}', new Date()) // ${tr('时间')}
${prefix}'${tr(
    '我有{0}，{1}和{2}',
    `{${tr('p0个苹果')}}`,
    `{${tr('p1个香蕉')}}`,
    `{${tr('p2个梨')}}`,
  )}', 5, 4, 3) // ${tr('复数')} `
  return text
}
