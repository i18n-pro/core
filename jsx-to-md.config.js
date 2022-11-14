const path = require('path')
const join = path.join

module.exports = [
  {
    entry: join(__dirname, 'docs/index'),
    output: join(__dirname, 'README_ZH-CN.md'),
    params: {
      locale: 'zh',
    },
  },
  {
    entry: join(__dirname, 'docs/index'),
    output: join(__dirname, 'README.md'),
    params: {
      locale: 'en',
    },
  },
]
