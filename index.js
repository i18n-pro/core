'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./dist/src/lib/index.min.js')
} else {
  module.exports = require('./dist/src/lib/index.js')
}
