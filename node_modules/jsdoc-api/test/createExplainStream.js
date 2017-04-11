'use strict'
var test = require('test-runner')
var jsdoc = require('../')
var Fixture = require('./lib/fixture')
var collectJson = require('collect-json')
var a = require('core-assert')

test('.createExplainStream({ files })', function () {
  var f = new Fixture('class-all')
  return new Promise(function (resolve, reject) {
    jsdoc.createExplainStream({ files: f.sourcePath })
      .pipe(collectJson(function (output) {
        var expectedOutput = f.getExpectedOutput(output)
        try {
          a.deepEqual(output, expectedOutput)
          resolve()
        } catch (err) {
          reject(err)
        }
      }))
      .on('error', reject)
  })
})

test('.createExplainStream({ source })', function () {
  var f = new Fixture('class-all')
  return new Promise(function (resolve, reject) {
    jsdoc.createExplainStream({ source: f.getSource() })
      .pipe(collectJson(function (output) {
        var expectedOutput = f.getExpectedOutput(output)
        try {
          a.deepEqual(output, expectedOutput)
          resolve()
        } catch (err) {
          reject(err)
        }
      }))
      .on('error', reject)
  })
})

test('.createExplainStream() stream input - pipe', function () {
  var f = new Fixture('class-all')
  return new Promise(function (resolve, reject) {
    f.createReadStream().pipe(jsdoc.createExplainStream())
      .pipe(collectJson(function (output) {
        var expectedOutput = f.getExpectedOutput()
        Fixture.removeFileSpecificData(output, expectedOutput)
        try {
          a.deepEqual(output, expectedOutput)
          resolve()
        } catch (err) {
          reject(err)
        }
      }))
      .on('error', reject)
  })
})

test('.createExplainStream() stream input - write', function () {
  var f = new Fixture('class-all')
  var explainStream = jsdoc.createExplainStream()
  return new Promise(function (resolve, reject) {
    explainStream.pipe(collectJson(function (output) {
      if (output) {
        var expectedOutput = f.getExpectedOutput(output)
        try {
          a.deepEqual(output, expectedOutput)
          resolve()
        } catch (err) {
          reject(err)
        }
      }
    }))
    explainStream.on('error', reject)
    explainStream.end(f.getSource())
  })
})

test('.createExplainStream: no valid files', function () {
  return new Promise(function (resolve, reject) {
    jsdoc.createExplainStream({ files: 'package.json' })
      .on('error', function (err) {
        if (err.name === 'JSDOC_ERROR') resolve()
        else reject('incorrect error: ' + err.name)
      })
      .pipe(collectJson(function (output) {
        reject('should not reach here')
      }))
  })
})

test('.createExplainStream: missing files', function () {
  return new Promise(function (resolve, reject) {
    jsdoc.createExplainStream({ files: 'asljkdhfkljads' })
      .on('error', function (err) {
        try {
          a.strictEqual(err.name, 'JSDOC_ERROR')
          resolve()
        } catch (err) {
          reject(err)
        }
      })
      .pipe(collectJson(function (output) {
        reject('should not reach here')
      }))
  })
})

/* bad-doclet-syntax.js no exist */
test('.createExplainStream: invalid doclet syntax', function () {
  var f = new Fixture('buggy', 'bad-doclet-syntax.js')
  return new Promise(function (resolve, reject) {
    jsdoc.createExplainStream({ files: f.sourcePath })
      .on('error', function (err) {
        try {
          a.strictEqual(err.name, 'JSDOC_ERROR')
          resolve()
        } catch (err) {
          reject(err)
        }
      })
      .pipe(collectJson(function (output) {
        reject('should not reach here')
      }))
  })
})

test('.createExplainStream: handles jsdoc crash', function () {
  var f = new Fixture('buggy', 'broken-javascript.js')
  return new Promise(function (resolve, reject) {
    jsdoc.createExplainStream({ files: f.sourcePath })
      .on('error', function (err) {
        try {
          a.strictEqual(err.name, 'JSDOC_ERROR')
          resolve()
        } catch (err) {
          reject(err)
        }
      })
      .pipe(collectJson(function (output) {
        reject('should not reach here')
      }))
  })
})
