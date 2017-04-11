'use strict'
var test = require('test-runner')
var jsdoc = require('../')
var Fixture = require('./lib/fixture')
var path = require('path')
var fs = require('then-fs')
var a = require('core-assert')

if (require('child_process').spawnSync) {
  test('.explainSync({ files, cache: true })', function () {
    var f = new Fixture('class-all')
    jsdoc.cache.dir = 'tmp/cache-sync'
    jsdoc.cache.clear()
    var output = jsdoc.explainSync({ files: f.sourcePath, cache: true })
    var expectedOutput = f.getExpectedOutput(output)

    a.ok(typeof output === 'object')
    a.deepEqual(output, expectedOutput)
  })
}

test('.explain({ files, cache: true  })', function () {
  var f = new Fixture('class-all')
  jsdoc.cache.dir = 'tmp/cache'
  jsdoc.cache.clear()
  return jsdoc.explain({ files: f.sourcePath, cache: true })
    .then(function (output) {
      var cachedFiles = fs.readdirSync(jsdoc.cache.dir)
        .map(function (file) {
          return path.resolve(jsdoc.cache.dir, file)
        })
      a.strictEqual(cachedFiles.length, 1)
      a.deepEqual(output, f.getExpectedOutput(output))
      var cachedData = JSON.parse(fs.readFileSync(cachedFiles[0], 'utf8'))
      Fixture.removeFileSpecificData(cachedData)
      a.deepEqual(
        cachedData,
        f.getExpectedOutput(output)
      )
    })
    .catch(function (err) { console.error(err.stack) })
})
