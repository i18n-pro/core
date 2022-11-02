const path = require('path')
const join = path.join

module.exports = [
  {
    entry: join(__dirname, 'docs/index'),
    output: join(__dirname, 'readme_zh-CN.md'),
    params: {
      locale: 'zh',
    },
  },
  {
    entry: join(__dirname, 'docs/index'),
    output: join(__dirname, 'readme_en-US.md'),
    params: {
      locale: 'en',
    },
  },
]
