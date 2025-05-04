import { getCustomKey, getTranslationText } from './getTranslationConstants'

export default function getCodeDemoDesc(isDot = false) {
  return isDot
    ? tr('{0}的示例', getCustomKey())
    : tr('{0}即{1}的示例', getTranslationText(), ' `key` ')
}
