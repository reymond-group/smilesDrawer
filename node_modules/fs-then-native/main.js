var detect = require('feature-detect-es6')

if (detect.all('class', 'arrowFunction', 'let', 'const', 'spread')) {
  module.exports = require('./src/lib/fs-then-native')
} else {
  module.exports = require('./es5/lib/fs-then-native')
}
