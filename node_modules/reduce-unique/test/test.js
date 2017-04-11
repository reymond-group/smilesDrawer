var test = require('tape')
var unique = require('../')

test('unique', function (t) {
  var arr = [ 1, 3, 8, 3, 1, 2, 1, 9, 3, 3 ]
  t.deepEqual(arr.reduce(unique), [ 1, 3, 8, 2, 9 ])
  t.end()
})

test('unique, default', function (t) {
  var arr = [ 1, 3, 8, 3, 1, 2, 1, 9, 3, 3 ]
  t.deepEqual(arr.reduce(unique, []), [ 1, 3, 8, 2, 9 ])
  t.end()
})

test('unique, single value', function (t) {
  var arr = [ 3 ]
  t.deepEqual(arr.reduce(unique), 3)
  t.end()
})

test('unique, single value into an array', function (t) {
  var arr = [ 3 ]
  t.deepEqual(arr.reduce(unique, []), [ 3 ])
  t.end()
})

test('unique, single value into an array 2', function (t) {
  var arr = [ 3, 3 ]
  t.deepEqual(arr.reduce(unique, [ 'one', 'two' ]), [ 'one', 'two', 3 ])
  t.end()
})
