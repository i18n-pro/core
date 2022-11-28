const path = require('path')
const join = path.join

module.exports = {
  source: [
    {
      entry: join(__dirname, 'docs/index'),
      output: join(__dirname, 'README_zh-CN.md'),
      params: {
        locale: 'zh',
      },
    },
    {
      entry: join(__dirname, 'docs/index'),
      output: join(__dirname, 'README.MD'),
      params: {
        locale: 'en',
      },
    },
  ],
}
