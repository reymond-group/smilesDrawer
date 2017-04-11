'use strict'
var detect = require('feature-detect-es6')

if (!detect.collections()) {
  require('core-js/es6/map')
}

if (!detect.newArrayFeatures()) {
  require('core-js/es6/array')
}

if (!detect.promises()) {
  require('core-js/es6/promise')
}

if (detect.all('class', 'arrowFunction', 'let', 'const', 'spread', 'destructuring')) {
  module.exports = require('./src/lib/usage-stats')
} else {
  require('core-js/es6/object')
  module.exports = require('./es5/lib/usage-stats')
}
