'use strict'
var test = require('tape')
var without = require('../')

var f = {
  num: [ 1, 2, 3, 4 ],
  recordset: [
    { n: 1 }, { n: 2 }, { n: 3 }, { n: 4 }
  ]
}

test('.without does not return the input array', function (t) {
  var result = f.num.reduce(without, 2)
  t.notStrictEqual(f.num, result)
  t.end()
})

test('.without(array, primitive)', function (t) {
  t.deepEqual(f.num.reduce(without(2)), [ 1, 3, 4 ])
  t.end()
})

test('.without(array, regex)', function (t) {
  t.deepEqual(f.num.reduce(without(/2/)), [ 1, 3, 4 ])
  t.end()
})

test('.without(array, function)', function (t) {
  function over1 (val) { return val > 1; }
  function under4 (val) { return val < 4; }
  t.deepEqual(f.num.reduce(without(over1)), [ 1 ])
  t.end()
})

test('.without(array, query)', function (t) {
  t.deepEqual(f.recordset.reduce(without({ n: 0 })), f.recordset)
  t.deepEqual(f.recordset.reduce(without({ n: 1 })), [
    { n: 2 }, { n: 3 }, { n: 4 }
  ])
  t.end()
})

test('.without(array, array)', function (t) {
  t.deepEqual(f.num.reduce(without([ 2, 3 ])), [ 1, 4 ])
  t.end()
})
