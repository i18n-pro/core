import { initI18N } from '../lib'

const { i18n: _I18N, setI18N: _setI18N } = initI18N({
  namespace: 'i18n-pro-bin',
})

export const i18n = _I18N
export const setI18N = _setI18N
