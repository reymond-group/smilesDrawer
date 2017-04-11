'use strict'
var TestRunner = require('test-runner')
var stats = require('../')
var a = require('core-assert')

var runner = new TestRunner()

function JsdocToMarkdown () {}
JsdocToMarkdown.prototype.render = function () {
  return Promise.resolve('test')
}

var jsdoc2md = new (stats(JsdocToMarkdown, '0.0.0'))()

runner.test('decorated correctly', function () {
  jsdoc2md.render()
    .then(function (output) {
      a.ok(jsdoc2md._usage)
    })
})
