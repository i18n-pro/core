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
  const newState: Pick<I18nState, 'langs' | 'locale'> = {}
  const { locale, langs } = stateProp

  if (typeof locale === 'string') {
    newState.locale = locale
    const currentLangs = currentState['langs']
    let currentLang = currentLangs?.[locale]

    if (typeof currentLang === 'function') {
      currentLang = await currentLang()

      if (isObject(currentLang)) {
        newState.langs = {
          ...(currentLangs || {}),
          [locale]: currentLang,
        }
      } else {
        console.warn(
          `Failed to load language pack asynchronously for ${locale}`,
          currentLang,
        )
      }
    }
  }

  if (typeof langs !== 'undefined') {
    const currentLangs = newState.langs || currentState.langs || {}
    const mergeLangs = Object.entries(langs).reduce((res, [langCode, lang]) => {
      res[langCode] = {
        ...(currentLangs[langCode] || {}),
        ...lang,
      }
      return res
    }, {})
    newState.langs = {
      ...currentLangs,
      ...mergeLangs,
    }
  }

  const newCurrentState = {
    ...currentState,
    ...newState,
  }

  state[namespace] = newCurrentState

  return Object.freeze(newCurrentState)
}

/**
 * Initialize the internationalization state
 * @param state Internationalization state
 */
export function initI18n(stateProp: I18nState) {
  const { namespace = 'default' } = stateProp

  if (typeof stateProp.namespace == 'undefined') {
    console.warn(
      'No namespace is set, and using with other libraries can cause bugs',
    )
  }

  if (typeof state[namespace] != 'undefined') {
    console.error(
      `A configuration with the same namespace '${namespace}' already exists, so you may need to redefine one`,
    )
  }

  if (stateProp?.beginIndex && typeof stateProp.beginIndex !== 'number') {
    console.error('beginIndex must be a number')
    delete stateProp.beginIndex
  }

  state[namespace] = {
    ...(stateProp || {}),
  }

  const condition: Condition = {
    namespace,
    locale: null,
  }

  return {
    setI18n: setI18n.bind(null, namespace) as SetI18n,
    t: generateTranslate(condition),
  }
}
