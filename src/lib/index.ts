import { state, getCurrentState, generateTranslate, isObject } from './utils'
import { Condition, I18nState, SetI18n } from './type'
export { LangPack, Langs, I18nState, SetI18n, Translate, Config } from './type'

/**
 * Sets or updates the internationalization state
 * @param namespace Current namespace
 * @param state Internationalization state
 * @returns Updated internationalization state
 */
async function setI18n(
  namespace: string,
  stateProp: Parameters<SetI18n>[0] = {},
) {
  const currentState = getCurrentState(namespace)
  const { locale, langs } = stateProp
  const newState: Partial<I18nState> = { ...currentState }

  if (locale) {
    newState.locale = locale
    const currentLangs = currentState?.langs || {}
    const currentLang = currentLangs?.[locale]

    if (typeof currentLang === 'function') {
      const loadedLang = await currentLang()
      if (isObject(loadedLang)) {
        newState.langs = { ...currentLangs, [locale]: loadedLang }
      } else {
        console.warn(`Failed to load language pack for '${locale}'`, loadedLang)
      }
    }
  }

  if (langs) {
    newState.langs = {
      ...(newState.langs || {}),
      ...Object.entries(langs).reduce((res, [langCode, lang]) => {
        res[langCode] = { ...(newState.langs?.[langCode] || {}), ...lang }
        return res
      }, {}),
    }
  }

  state[namespace] = Object.freeze(newState)
  return newState
}

/**
 * Initialize the internationalization state
 * @param state Internationalization state
 */
export function initI18n(stateProp: I18nState) {
  const namespace = stateProp.namespace || 'default'

  if (state[namespace]) {
    console.error(`Namespace '${namespace}' already exists.`)
  }

  if (
    typeof stateProp.beginIndex != 'undefined' &&
    typeof stateProp.beginIndex !== 'number'
  ) {
    console.error('beginIndex must be a number.')
    delete stateProp.beginIndex
  }

  state[namespace] = { ...stateProp }
  const condition: Condition = { namespace, locale: null }

  return {
    setI18n: setI18n.bind(null, namespace) as SetI18n,
    t: generateTranslate(condition),
  }
}
