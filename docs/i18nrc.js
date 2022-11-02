const path = require('path')

module.exports = {
  funcName: 'tr',
  entry: path.join(__dirname, '../docs/'),
  fileRegExp: /\.[jt]sx?$/,
  output: {
    path: path.join(__dirname, './i18n/'),
  },
  baiduConfig: {
    appid: '20220530001234107',
    key: '4DsAkNxFeKPg5wMLrrVG',
    from: 'zh',
    to: ['en'],
  },
}
