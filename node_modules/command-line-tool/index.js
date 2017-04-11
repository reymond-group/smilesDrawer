'use strict'
var detect = require('feature-detect-es6')

if (detect.all('let', 'const', 'class', 'arrowFunction')) {
  module.exports = require('./lib/command-line-tool')
} else {
  module.exports = require('./es5/command-line-tool')
}
