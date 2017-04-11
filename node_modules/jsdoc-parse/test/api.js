'use strict'
var test = require('tape')
var parse = require('../')
var fs = require('fs')

test('api: valid json out', function (t) {
  t.plan(1)
  var stream = parse({ src: 'node_modules/jsdoc2md-testbed/input/global/chainable.js' })
  stream.on('readable', function () {
    var chunk = this.read()
    if (chunk) {
      var data = JSON.parse(chunk)
      t.equal(data[0].name, 'Chainable')
    }
  })
})

test('api: glob expression', function (t) {
  t.plan(2)
  var stream = parse({ src: 'lib/*.js' })
  stream.on('readable', function () {
    var chunk = this.read()
    if (chunk) {
      var data = JSON.parse(chunk)
      t.ok(data[0].name)
      t.ok(data[2].longname)
    }
  })
})

test('api: conf', function (t) {
  t.plan(1)
  var stream = parse({ src: 'test/fixture/simple.js', conf: 'test/fixture/conf.json' })
  stream.on('readable', function () {
    var chunk = this.read()
    if (chunk) {
      var data = JSON.parse(chunk)
      t.strictEqual(data[0].description, 'A VARIABLE')
    }
  })
})
