const path = require('path')

module.exports = {
  funcName: 't',
  entry: path.join(__dirname, './src/bin/'),
  fileRegExp: /.*\.[jt]s$/,
  output: {
    path: path.join(__dirname, './i18n/'),
    langType: 'single',
  },
  translator: 'googlex',
  googlexConfig: {
    from: 'zh-CN',
    to: ['en'],
    proxy: 'http://127.0.0.1:1087',
  },
}
