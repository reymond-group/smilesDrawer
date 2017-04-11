'use strict'
var test = require('test-runner')
var jsdoc = require('../')
var Fixture = require('./lib/fixture')
var collectJson = require('collect-json')
var a = require('core-assert')

test('.explain({ files, html: true })', function () {
  var f = new Fixture('html', '0-src.html')
  return jsdoc.explain({ files: f.sourcePath, html: true })
    .then(function (output) {
      a.deepEqual(output, f.getExpectedOutput(output))
    })
})

test('.createExplainStream({ files, html: true })', function () {
  var f = new Fixture('html', '0-src.html')
  return new Promise(function (resolve, reject) {
    jsdoc.createExplainStream({ files: f.sourcePath, html: true })
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
