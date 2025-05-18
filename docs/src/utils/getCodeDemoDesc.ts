import { getCustomKey, getTranslationTextKey } from './getTranslationConstants'

export default function getCodeDemoDesc(isDot = false) {
  return tr('以下为{0}的示例', isDot ? getCustomKey() : getTranslationTextKey())
}
