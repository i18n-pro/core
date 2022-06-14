const path = require('path')

module.exports = {
  funcName: 'i18n',
  entry: path.join(__dirname, './src/'),
  filterFile: (stat) => {
    if (stat.name.match(/.*\.[jt]?sx?$/g)) {
      return true
    }
    return false
  },
  output: {
    path: path.join(__dirname, './locale/'),
  },
  baiduConfig: {
    appid: '2015063000000001',
    key: '12345678',
    from: 'zh',
    to: ['en', 'jp'],
    codeLocaleMap: {
      jp: 'jp_JP',
    },
  },
}
