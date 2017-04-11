var test = require('tape')
var where = require('../')

var f = {
  arr: [ 1, 1, 2, 3, 4 ],
  recordset: [
    { b: false, n: 1 },
    { b: false, n: 2 }
  ]
}

test('where(query)', function (t) {
  t.deepEqual(f.recordset.filter(where({ b: true })), [])
  t.deepEqual(f.recordset.filter(where({ b: false })), [
    { b: false, n: 1 },
    { b: false, n: 2 }
  ])
  t.deepEqual(f.recordset.filter(where({ b: false, n: 3 })), [])
  t.deepEqual(f.recordset.filter(where({ b: false, n: 2 })), [
    { b: false, n: 2 }
  ])
  t.end()
})

test('where(regex)', function (t) {
  t.deepEqual(f.recordset.filter(where({ n: /1/ })), [ { b: false, n: 1 } ])
  t.deepEqual(f.recordset.filter(where({ x: undefined, n: /.+/ })), [
    { b: false, n: 1 },
    { b: false, n: 2 }
  ])
  t.end()
})

test('where(primitive)', function (t) {
  t.deepEqual(f.arr.filter(where(1)), [ 1, 1 ])
  t.deepEqual(f.arr.filter(where(2)), [ 2 ])
  t.end()
})

test('.where(regex)', function (t) {
  t.deepEqual(f.arr.filter(where(/1/)), [ 1, 1 ])
  t.deepEqual(f.arr.filter(where(/2/)), [ 2 ])
  t.end()
})

test('.where(function)', function (t) {
  function over3 (val) { return val > 3 }
  t.deepEqual(f.arr.filter(where(over3)), [ 4 ])
  t.end()
})

test('.where(array)', function (t) {
  function over3 (val) { return val > 3 }
  t.deepEqual(f.arr.filter(where([ 1, /2/, over3 ])), [ 1, 1, 2, 4 ])
  t.end()
})

test('.where(object[])', function (t) {
  t.deepEqual(f.recordset.filter(where([ { n: 1 }, { n: 2 }, { n: 3 } ])), [
    { b: false, n: 1 },
    { b: false, n: 2 }
  ])
  t.end()
})

test('.where deep query', function (t) {
  var arr = [
    { one: { number: 1, letter: 'a' } },
    { one: { number: 2, letter: 'b' } },
    { one: { number: 3, letter: 'b' } }
  ]
  t.deepEqual(arr.filter(where({ one: { letter: 'b' } })), [
    { one: { number: 2, letter: 'b' } },
    { one: { number: 3, letter: 'b' } }
  ])
  t.deepEqual(arr.filter(where({ one: { number: 2, letter: 'b' } })), [
    { one: { number: 2, letter: 'b' } }
  ])
  t.deepEqual(arr.filter(where({ one: { number: 1, letter: 'a' } })), [
    { one: { number: 1, letter: 'a' } }
  ])
  t.end()
})
