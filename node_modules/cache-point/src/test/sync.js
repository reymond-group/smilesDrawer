'use strict'
var TestRunner = require('test-runner')
var Cache = require('../../')
var a = require('core-assert')

var runner = new TestRunner()

runner.test('sync: string key, string data', function () {
  var cache = new Cache({ dir: 'tmp/sync/one' })
  var objectKey = 'one'
  var data = 'test1'
  cache.writeSync(objectKey, data)
  var result = cache.readSync(objectKey)
  a.strictEqual(result, data)
})

runner.test('sync: object key, string data', function () {
  var cache = new Cache({ dir: 'tmp/sync/two' })
  var objectKey = { one: true }
  var data = 'test1'
  cache.writeSync(objectKey, data)
  var result = cache.readSync(objectKey)
  a.strictEqual(result, data)
})

runner.test('sync: object key, array data', function () {
  var cache = new Cache({ dir: 'tmp/sync/three' })
  var objectKey = { one: true }
  var data = ['test1']
  cache.writeSync(objectKey, data)
  var result = cache.readSync(objectKey)
  a.deepEqual(result, data)
})

runner.test('sync: key not found', function () {
  var cache = new Cache({ dir: 'tmp/sync/four' })
  var objectKey = 'asfrfe'
  var result = cache.readSync(objectKey)
  a.deepEqual(result, null)
})

runner.skip('sync: .remove()', function () {
  var cache = new Cache({ dir: 'four' })
  return cache.writeSync('one', 'test1')
    .then(function() {
      return cache.remove()
    })
    .then(function() {
      a.throws(function () {
        fs.statSync(tmpDir)
      })
    })
    .catch(function (err) {
      console.error(err.stack)
      a.fail(err.message)
    })
})
