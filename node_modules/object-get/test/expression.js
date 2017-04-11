'use strict'
var test = require('tape')
var objectGet = require('../')

test('.get(object, expression)', function (t) {
  var fixture = {
    one: 1,
    two: {
      three: 3,
      four: {
        five: 5
      }
    }
  }
  t.strictEqual(objectGet(fixture, 'one'), 1)
  t.strictEqual(objectGet(fixture, 'two.three'), 3)
  t.strictEqual(objectGet(fixture, 'two.four.five'), 5)
  t.deepEqual(objectGet(fixture, 'two'), {
    three: 3,
    four: {
      five: 5
    }
  })
  t.deepEqual(objectGet(fixture, 'two.four'), {
    five: 5
  })
  t.strictEqual(objectGet(fixture, 'ksfjglfshg'), undefined)
  t.end()
})

test('arrays in expression', function (t) {
  var element = {
    children: [
      { one : 1 },
      { two: 2, children: [
        { three: 3 }
      ]}
    ]
  }
  t.strictEqual(objectGet(element, 'children[0].one'), 1)
  t.strictEqual(objectGet(element, 'children[1].children[0].three'), 3)
  t.end()
})

test('bad args', function (t) {
  t.throws(function () {
    objectGet({ one: 1 })
  })
  t.throws(function () {
    objectGet(null, 'one')
  })
  t.end()
})
