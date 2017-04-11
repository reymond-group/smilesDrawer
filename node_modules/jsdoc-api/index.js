var detect = require('feature-detect-es6')

if (detect.all('class', 'arrowFunction', 'let', 'const')) {
  module.exports = require('./lib/jsdoc-api')
} else {
  require('core-js/es6/promise')
  require('core-js/es6/object')
  module.exports = require('./es5/jsdoc-api')
}
