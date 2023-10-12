const path = require('path')
const rootConfig = require('../../i18nrc.js')

module.exports = {
  ...rootConfig,
  funcName: 'tr',
  entry: path.join(__dirname, '../src/'),
  fileRegExp: /\.[jt]sx?$/,
  input: 'docs/src/**/*.{js,ts,tsx}',
  output: {
    path: path.join(__dirname, './i18n/'),
  },
}
