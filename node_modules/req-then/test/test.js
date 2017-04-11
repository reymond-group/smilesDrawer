'use strict'
var TestRunner = require('test-runner')
var request = require('../')

var runner = new TestRunner()

runner.test('basic', function () {
  return request('http://www.bbc.co.uk')
    .then(function (response) {
      return require('util').inspect(response, { depth: 2, colors: true }) 
    })
})
