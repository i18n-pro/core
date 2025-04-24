import { state, getCurrentState, generateTranslate } from './utils'
import { Condition, I18nState, SetI18n, Translate, WithI18n } from './type'
export { Langs, I18nState, SetI18n, Translate, WithI18n, Config } from './type'

/**
 * Sets or updates the internationalization state
 * @param namespace Current namespace
 * @param state Internationalization state
 * @returns Updated internationalization state
 */
function setI18n(namespace: string, stateProp: Parameters<SetI18n>[0]) {
  const currentState = getCurrentState(namespace)

  const newState = Object.entries(stateProp || {}).reduce(
    (res, [key, value]) => {
      switch (key) {
        case 'langs':
          {
            const currentLangs = currentState['langs'] || {}
            const mergeLangs = Object.entries(value).reduce(
              (res, [langCode, lang]) => {
                res[langCode] = {
                  ...(currentLangs[langCode] || {}),
                  ...lang,
                }
                return res
              },
              {},
            )
            res[key] = {
              ...currentLangs,
              ...mergeLangs,
            }
          }
          break
        default:
          res[key] = value
          break
      }
      return res
    },
    {},
  )

  const newCurrentState = {
    ...currentState,
    ...newState,
  }

  state[namespace] = newCurrentState

  return newCurrentState
}

/**
 * Gets the i18n function independent of the main program
 *
 * Applicable to the server side, each interface response needs to do international processing
 * @param namespace Current namespace
 * @param locale current language
 * @returns
 */
function withI18n(namespace: string, locale: string): { t: Translate } {
  const condition = {
    namespace,
    locale,
  }

  return {
    t: generateTranslate(condition),
  }
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
    t: generateTranslate(condition) as Translate,
    withI18n: withI18n.bind(null, namespace) as WithI18n,
  }
}
