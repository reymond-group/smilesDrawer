'use strict'
var test = require('tape')
var ddata = require('../')

/* construct a mock handlebars helper options object */
function makeOptions (data) {
  return { data: { root: data }, hash: {}, fn: function (context) {
    return context
  }}
}

test('Array.<module:Something>', function (t) {
  var input = [
    {
      'id': 'module:cjs/human--Human',
      'longname': 'module:cjs/human',
      'name': 'Human',
      'kind': 'class'
    }
  ]

  var expected = { name: 'Array.<Human>', url: '#module_cjs/human--Human' }
  t.deepEqual(ddata._link('Array.<module:cjs/human>', makeOptions(input)), expected)
  t.end()
})

test('external:something', function (t) {
  var input = [
    {
      'id': 'external:String',
      'name': 'String',
      'kind': 'external',
      'description': 'The built in string object.',
      'see': [
        '{@link https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/String String}'
      ]
    }
  ]

  var expected = { name: 'String', url: '#external_String' }
  t.deepEqual(ddata._link('external:String', makeOptions(input)), expected)
  t.end()
})

test('external:something with no description', function (t) {
  var input = [
    {
      'id': 'external:String',
      'name': 'String',
      'kind': 'external',
      'see': [
        '{@link https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/String String}'
      ]
    }
  ]

  var expected = { name: 'String', url: 'https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/String' }
  t.deepEqual(ddata._link('external:String', makeOptions(input)), expected)
  t.end()
})
