'use strict'
var detect = require('feature-detect-es6')

if (detect.all('class', 'arrowFunction', 'let', 'const')) {
  module.exports = require('./lib/jsdoc2md-stats')
} else {
  module.exports = require('./es5/jsdoc2md-stats')
}
