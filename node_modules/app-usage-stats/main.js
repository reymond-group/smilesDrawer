'use strict'
var detect = require('feature-detect-es6')

if (!Array.prototype.includes) require('core-js/es7/array')

if (!detect.promises()) require('core-js/es6/promise')

if (detect.all('class', 'arrowFunction', 'let', 'const', 'destructuring')) {
  module.exports = require('./src/lib/app-usage-stats')
} else {
  module.exports = require('./es5/lib/app-usage-stats')
}
