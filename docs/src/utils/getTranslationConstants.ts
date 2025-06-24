export function getText(text: string, normal = false) {
  if (normal) return text
  return ` \`${text}\` `
}

export function getTranslationText(normal = false) {
  const text = tr('文案')
  return getText(text, normal)
}

export function getTranslationTextKey(normal = false) {
  const text = tr('文案即 key')
  return getText(text, normal)
}

export function getCustomKey(normal = false) {
  const text = tr('自定义 key')
  return getText(text, normal)
}

export function getVariableInterpolation(normal = false) {
  const text = tr('变量插值')
  return getText(text, normal)
}

export function getInterpolationVariable(normal = false) {
  const text = tr('插值变量')
  return getText(text, normal)
}

export function getConfigName(normal = false) {
  const text = tr('i18nrc.ts')
  return getText(text, normal)
}

export function getFormatterText(normal = false) {
  const text = tr('格式化器')
  return getText(text, normal)
}

export function getTypeTag(normal = false) {
  const text = tr('类型标记')
  return getText(text, normal)
}

export function getPolysemyText(normal = false) {
  const text = tr('一词多义')
  return getText(text, normal)
}

export function getAutoTranslateText(normal = false) {
  const text = tr('自动翻译')
  return getText(text, normal)
}
