export default function getCodeDemoPrefix(isDot = false) {
  let prefix = 't('

  if (isDot) {
    prefix = `t.t('custom-key', `
  }

  return prefix
}
