declare function i18n(text: string, ...args: Array<string | number>): string
declare function tr(text: string, ...args: Array<string | number>): string
declare type global = {
  docLocale: string
}
declare module '*.json'
