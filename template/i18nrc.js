const { join } = require('path')

module.exports = {
  funcName: 't',
  entry: join(__dirname, './src/'),
  fileRegExp: /\.[jt]s$/,
  output: {
    path: join(__dirname, './i18n/'),
  },
  translator: 'googlex',
  googlexConfig: {
    from: 'en',
    to: ['zh-CN', 'ja'],
    codeLocaleMap: {
      ja: 'jp',
    },
    // proxy: 'http://127.0.0.1:1087',
  },
}
