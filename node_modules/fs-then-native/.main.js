'use strict'
var detect = require('feature-detect-es6')

if (detect.all('class', 'arrowFunction', 'let', 'const')) {
  module.exports = require('./src/lib/api-usage')
} else {
  module.exports = require('./es5/lib/api-usage')
}
