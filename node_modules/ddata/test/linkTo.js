'use strict'
var test = require('tape')
var ddata = require('../')

function makeOptions (data) {
  return { data: { root: data }, hash: {}, fn: function (context) {
    return context
  }}
}

var options = makeOptions([
  { id: 'module:handbrake-js~Handbrake', longname: 'module:handbrake-js~Handbrake', 'name': 'Handbrake' },
  { id: 'module:cjs/class~innerProp', longname: 'module:cjs/class~innerProp', 'name': 'innerProp' }
])

test('link', function (t) {
  var result = ddata.link('module:handbrake-js~Handbrake', options)
  t.deepEqual(result, { name: 'Handbrake', url: '#module_handbrake-js..Handbrake' })
  t.end()
})

test('link', function (t) {
  var result = ddata.link('module:cjs/class~innerProp', options)
  t.deepEqual(result, { name: 'innerProp', url: '#module_cjs/class..innerProp' })
  t.end()
})

test('url', function (t) {
  var result = ddata.link('http://example.com', options)
  t.deepEqual(result, { name: 'http://example.com', url: null })
  t.end()
})

test('link', function (t) {
  var result = ddata.link('clive', options)
  t.deepEqual(result, { name: 'clive', url: null })
  t.end()
})
