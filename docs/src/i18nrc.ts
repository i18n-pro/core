import { join } from 'path'
import { Config } from '../../src/type'
import rootConfig from '../../i18nrc.js'

export default {
  ...rootConfig,
  funcName: 'tr',
  entry: join(__dirname, '../src/'),
  fileRegExp: /\.[jt]sx?$/,
  input: 'docs/src/**/*.{js,ts,tsx}',
  output: {
    path: join(__dirname, './i18n/'),
  },
} as Config
