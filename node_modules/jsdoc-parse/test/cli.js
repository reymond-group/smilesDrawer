'use strict'
var test = require('tape')
var parse = require('../')
var spawn = require('child_process').spawn
var fs = require('fs')

/* Test the CLI API functions as expected, not interested in correct output here */

try {
  fs.mkdirSync('tmp')
} catch(err) {
  // dir exists
}

test('cli with stdin input', function (t) {
  t.plan(1)
  var inputFile = fs.openSync('node_modules/jsdoc2md-testbed/input/global/chainable.js', 'r')
  var outputFile = fs.openSync('tmp/cli-stdin.json', 'w')
  var handle = spawn('node', [ 'bin/cli.js'], { stdio: [ inputFile, outputFile, process.stderr ]})
  handle.on('close', function () {
    var data = require('../tmp/cli-stdin.json')
    t.equal(data[0].name, 'Chainable')
  })
})

test('cli with --src input', function (t) {
  t.plan(1)
  var outputFile = fs.openSync('tmp/cli-src.json', 'w')
  var handle = spawn(
    'node',
    [ 'bin/cli.js', '--src', 'node_modules/jsdoc2md-testbed/input/global/chainable.js'],
    { stdio: [ 'ignore', outputFile, process.stderr ] }
  )
  handle.on('close', function () {
    var data = require('../tmp/cli-src.json')
    t.equal(data[0].name, 'Chainable')
  })
})
