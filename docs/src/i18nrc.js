const path = require('path')

module.exports = {
  funcName: 'tr',
  entry: path.join(__dirname, '../src/'),
  fileRegExp: /\.[jt]sx?$/,
  output: {
    path: path.join(__dirname, './i18n/'),
  },
  translator: 'googlex',
  googlexConfig: {
    from: 'zh-CN',
    to: ['en'],
    proxy: 'http://127.0.0.1:1087',
  },
}
