import { i18nImpl } from './utils'
import { I18NState, SetI18N, I18N, WithI18N } from './type'
export { Langs, I18NState, SetI18N, I18N, WithI18N } from './type'

let state = {} as I18NState

function getCurrentState(namespace: string) {
  return state[namespace] || {}
}

/**
 * Sets or updates the internationalization state
 * @param namespace Current namespace
 * @param state Internationalization state
 * @returns Updated internationalization state
 */
function setI18N(namespace: string, stateProp: Parameters<SetI18N>[0]) {
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

  state = {
    ...state,
    [namespace]: newCurrentState,
  }

  return newCurrentState
}

/**
 * Get the internationalized text based on the Original text
 * @param namespace Current namespace
 * @param text Original text
 * @param args Dynamic parameter
 */
function i18n(
  namespace: string,
  text: string,
  ...args: Array<string | number | unknown>
): string {
  return i18nImpl(getCurrentState(namespace), text, ...args)
}

/**
 * Gets the i18n function independent of the main program
 *
 * Applicable to the server side, each interface response needs to do international processing
 * @param namespace Current namespace
 * @param props Specify configuration attributes
 * @returns
 */
function withI18N(
  namespace: string,
  props: {
    locale: string // 独立于主程序的语言
  },
): { i18n: typeof i18n } {
  const { locale } = props

  return {
    i18n: i18nImpl.bind(null, {
      ...getCurrentState(namespace),
      locale,
    }),
  }
}

/**
 * Initialize the internationalization state
 * @param state Internationalization state
 */
export function initI18N(stateProp: I18NState) {
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

  state = {
    ...state,
    [namespace]: {
      ...(stateProp || {}),
    },
  }

  return {
    setI18N: setI18N.bind(null, namespace) as SetI18N,
    i18n: i18n.bind(null, namespace) as I18N,
    withI18N: withI18N.bind(null, namespace) as WithI18N,
  }
}
