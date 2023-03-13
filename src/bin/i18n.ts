import { initI18n } from '../lib'

const { t: tr, setI18n: _setI18n } = initI18n({
  namespace: 't-pro-bin',
})

export const t = tr
export const setI18n = _setI18n
