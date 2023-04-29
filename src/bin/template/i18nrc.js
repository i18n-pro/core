const path = require('path')

module.exports = {
  funcName: 't',
  entry: path.join(__dirname, './src/'),
  fileRegExp: /\.[jt]s$/,
  output: {
    path: path.join(__dirname, './i18n/'),
  },
  translator: 'googlex',
  googlexConfig: {
    from: 'zh-CN',
    to: ['en', 'ja'],
    codeLocaleMap: {
      ja: 'jp',
    },
    // proxy: 'http://127.0.0.1:1087',
  },
}
