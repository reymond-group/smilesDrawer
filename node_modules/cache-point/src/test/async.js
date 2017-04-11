'use strict'
var TestRunner = require('test-runner')
var Cache = require('../../')
var a = require('core-assert')
var fs = require('fs-then-native')

var runner = new TestRunner()

runner.test('string key, string data', function () {
  var cache = new Cache({ dir: 'tmp/one' })
  return cache.write('one', 'test1')
    .then(function() {
      return cache.read('one')
    })
    .then(function(data) {
      a.strictEqual(data, 'test1')
    })
})

runner.test('object key, string data', function () {
  var cache = new Cache({ dir: 'tmp/two' })
  var objectKey = { one: true }
  return cache.write(objectKey, 'test1')
    .then(function () {
      return cache.read(objectKey)
    })
    .then(function (data) {
      a.strictEqual(data, 'test1')
    })
})

runner.test('object key, array data', function () {
  var cache = new Cache({ dir: 'tmp/three' })
  var objectKey = { one: true }
  return cache.write(objectKey, ['test1'])
    .then(function () {
      return cache.read(objectKey)
    })
    .then(function (data) {
      a.deepEqual(data, ['test1'])
    })
})

runner.test('.remove()', function () {
  var cache = new Cache({ dir: 'tmp/four' })
  return cache.write('one', 'test1')
    .then(function() {
      return cache.remove()
    })
    .then(function() {
      try {
        fs.statSync('tmp/four')
      } catch (err) {
        if (err.code !== 'ENOENT') throw err
      }
    })
})

runner.test('.clear()', function () {
  var cache = new Cache({ dir: 'tmp/five' })
  return cache.write('one', 'test1')
    .then(() => {
      return fs.readdir('tmp/five')
        .then(files => {
          a.strictEqual(files.length, 1)
        })
    })
    .then(() => {
      return cache.clear()
        .then(() => {
          return fs.readdir('tmp/five')
            .then(files => {
              a.strictEqual(files.length, 0)
            })
        })
    })
})
