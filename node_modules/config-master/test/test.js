'use strict'
var test = require('test-runner')
var loadConfig = require('../')
var a = require('core-assert')

test('new API', function () {
  var config = loadConfig('test-app', { startFrom: __dirname + '/fixture/one/two' })
  a.deepEqual(config, {
    one: 1,
    two: 2,
    three: 3,
    four: 'package'
  })
})
