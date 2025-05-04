import { initI18n as originInitI18n } from '@lib'
import en from '../i18n/en.json'

const { t, setI18n } = originInitI18n({ namespace: 'default' })

global.tr = t

export default function initI18n({ locale }) {
  setI18n({
    locale,
    langs: {
      en,
    },
  })

  global.docLocale = locale
}
