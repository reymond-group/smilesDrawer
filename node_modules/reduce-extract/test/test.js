var test = require('tape')
var extract = require('../')

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
  var result = arr.reduce(extract(isTrueResult))
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
  var result = arr.reduce(extract({ result: false}))
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

test('extract where query matches, 1 item in array, inital array', function (t) {
  var arr = [
    { result: false, number: 1 }
  ]
  var result = arr.reduce(extract({ result: false}), [])
  t.deepEqual(result, [
    { result: false, number: 1 }
  ])
  t.deepEqual(arr, [])
  t.end()
})

test('extract where query matches, 1 item in array', function (t) {
  var arr = [
    { result: false, number: 1 }
  ]
  var result = arr.reduce(extract({ result: false}))
  t.deepEqual(result, { result: false, number: 1 })
  t.deepEqual(arr, arr)
  t.end()
})

test('extract where query contains arrays', function (t) {
  var q = [ 1, 2, 3 ]
  var w = [ 4, 5, 6 ]
  var arr = [ q, w ]

  var result = arr.reduce(extract(q))
  t.deepEqual(result, [ q ])
  t.deepEqual(arr, [ w ])
  t.end()
})

test('extract where query contains arrays, initial val', function (t) {
  var q = [ 1, 2, 3 ]
  var w = [ 4, 5, 6 ]
  var arr = [ q, w ]

  var result = arr.reduce(extract(q), [])
  t.deepEqual(result, [ q ])
  t.deepEqual(arr, [ w ])
  t.end()
})
