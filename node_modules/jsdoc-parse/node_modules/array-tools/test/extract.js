var test = require('tape')
var a = require('../')

test('extract where test returns true', function (t) {
  var arr = [
    { result: false, number: 1 },
    { result: false, number: 2 },
    { result: true, number: 3 },
    { result: true, number: 4 }
  ]
  function isTrueResult (item) {
    return item.result === true
  }
  var result = a.extract(arr, isTrueResult)
  t.deepEqual(result, [
    { result: true, number: 3 },
    { result: true, number: 4 }
  ])
  t.deepEqual(arr, [
    { result: false, number: 1 },
    { result: false, number: 2 }
  ])
  t.end()
})

test('extract where query matches', function (t) {
  var arr = [
    { result: false, number: 1 },
    { result: false, number: 2 },
    { result: true, number: 3 },
    { result: true, number: 4 }
  ]
  var result = a.extract(arr, { result: false})
  t.deepEqual(result, [
    { result: false, number: 1 },
    { result: false, number: 2 }
  ])
  t.deepEqual(arr, [
    { result: true, number: 3 },
    { result: true, number: 4 }
  ])
  t.end()
})

test('extract where query matches, 1 item in array', function (t) {
  var arr = [
    { result: false, number: 1 }
  ]
  var result = a.extract(arr, { result: false})
  t.deepEqual(result, [
    { result: false, number: 1 }
  ])
  t.deepEqual(arr, [])
  t.end()
})

test('extract where query matches, 1 item in array', function (t) {
  var q = [ 1, 2, 3 ]
  var w = [ 4, 5, 6 ]
  var arr = [ q, w ]

  var result = a.extract(arr, q)
  t.deepEqual(result, [ q ])
  t.deepEqual(arr, [ w ])
  t.end()
})
