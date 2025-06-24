export default function getCodeDemoPrefix(
  isDot = false,
  quotationType: '"' | "'" | '`' = "'",
) {
  let prefix = 't('

  if (isDot) {
    prefix = `t.t(${quotationType}custom-key${quotationType}, `
  }

  return prefix
}
