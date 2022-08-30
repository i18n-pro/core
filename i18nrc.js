const path = require('path')

module.exports = {
  funcName: 'i18n',
  entry: path.join(__dirname, './src/bin/'),
  fileRegExp: /.*\.[jt]s$/,
  output: {
    path: path.join(__dirname, './i18n/'),
    langType: 'single',
  },
  baiduConfig: {
    appid: '20220530001234107',
    key: '4DsAkNxFeKPg5wMLrrVG',
    from: 'zh',
    to: ['en'],
  },
}
