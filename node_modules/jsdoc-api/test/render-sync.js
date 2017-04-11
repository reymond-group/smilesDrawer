'use strict'
var test = require('test-runner')
var jsdoc = require('../')
var Fixture = require('./lib/fixture')
var fs = require('fs')
var spawnSync = require('child_process').spawnSync
var a = require('core-assert')

/* only test on a node version with spawnSync */
if (spawnSync) {
  test('.renderSync({ files })', function () {
    Fixture.createTmpFolder('tmp')
    var f = new Fixture('class-all')
    jsdoc.renderSync({ files: f.sourcePath, destination: 'tmp/out' })
    a.doesNotThrow(function () {
      fs.statSync('./tmp/out/index.html')
    })
  })

  test('.renderSync({ source, destination })', function () {
    Fixture.createTmpFolder('tmp')
    var f = new Fixture('class-all')
    jsdoc.renderSync({ source: f.getSource(), destination: 'tmp/out' })
    a.doesNotThrow(function () {
      fs.statSync('./tmp/out/index.html')
    })
  })
}
