'use strict'
var test = require('test-runner')
var wrap = require('../')
var a = require('core-assert')

test('non-string input', function () {
  a.strictEqual(wrap(undefined), '')
  a.strictEqual(wrap(function () {}), 'function () {}')
  a.strictEqual(wrap({}), '[object Object]')
  a.strictEqual(wrap(null), 'null')
  a.strictEqual(wrap(true), 'true')
  a.strictEqual(wrap(0), '0')
  a.strictEqual(wrap(NaN), 'NaN')
  a.strictEqual(wrap(Infinity), 'Infinity')
})
