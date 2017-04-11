var test = require('tape')
var sortBy = require('../')

test('sortBy', function (t) {
  var fixture = [
    { a: 4, b: 1, c: 1 },
    { a: 4, b: 3, c: 1 },
    { a: 2, b: 2, c: 3 },
    { a: 2, b: 2, c: 2 },
    { a: 1, b: 3, c: 4 },
    { a: 1, b: 1, c: 4 },
    { a: 1, b: 2, c: 4 },
    { a: 3, b: 3, c: 3 },
    { a: 4, b: 3, c: 1 }
  ]
  var expected = [
    { a: 1, b: 1, c: 4 },
    { a: 1, b: 2, c: 4 },
    { a: 1, b: 3, c: 4 },
    { a: 2, b: 2, c: 2 },
    { a: 2, b: 2, c: 3 },
    { a: 3, b: 3, c: 3 },
    { a: 4, b: 1, c: 1 },
    { a: 4, b: 3, c: 1 },
    { a: 4, b: 3, c: 1 }
  ]
  t.deepEqual(sortBy(fixture, ['a', 'b', 'c']), expected)
  t.end()
})

test('sortBy, with undefined vals', function (t) {
  var fixture = [ { a: 1 }, { }, { a: 0 } ]
  var expected = [ { }, { a: 0 }, { a: 1 } ]
  t.deepEqual(sortBy(fixture, 'a'), expected)
  t.end()
})

test('sortBy, with undefined vals 2', function (t) {
  var fixture = [ { a: 'yeah' }, { }, { a: 'what' } ]
  var expected = [ { }, { a: 'what' }, { a: 'yeah' } ]
  t.deepEqual(sortBy(fixture, 'a'), expected)
  t.end()
})

test('custom order', function (t) {
  var fixture = [{ fruit: 'apple' }, { fruit: 'orange' }, { fruit: 'banana' }, { fruit: 'pear' }]
  var expected = [{ fruit: 'banana' }, { fruit: 'pear' }, { fruit: 'apple' }, { fruit: 'orange' }]
  var fruitOrder = [ 'banana', 'pear', 'apple', 'orange' ]
  t.deepEqual(sortBy(fixture, 'fruit', { fruit: fruitOrder }), expected)
  t.end()
})

test('sort by two columns, both custom', function (t) {
  var expected = [
    { importance: 'speed', weight: 'low' },
    { importance: 'speed', weight: 'medium' },
    { importance: 'speed', weight: 'high' },
    { importance: 'strength', weight: 'low' },
    { importance: 'strength', weight: 'medium' },
    { importance: 'strength', weight: 'high' },
    { importance: 'intelligence', weight: 'low' },
    { importance: 'intelligence', weight: 'medium' },
    { importance: 'intelligence', weight: 'high' }
  ]
  var fixture = [
    { importance: 'intelligence', weight: 'medium' },
    { importance: 'strength', weight: 'high' },
    { importance: 'speed', weight: 'low' },
    { importance: 'strength', weight: 'low' },
    { importance: 'speed', weight: 'high' },
    { importance: 'intelligence', weight: 'low' },
    { importance: 'speed', weight: 'medium' },
    { importance: 'intelligence', weight: 'high' },
    { importance: 'strength', weight: 'medium' }
  ]
  var customOrder = {
    importance: [ 'speed', 'strength', 'intelligence' ],
    weight: [ 'low', 'medium', 'high' ]
  }

  var result = sortBy(fixture, [ 'importance', 'weight' ], customOrder)
  t.deepEqual(result, expected)
  t.end()
})

test('jsdoc-parse', function (t) {
  var fixture = require('./fixture/jsdoc-parse')
  var expected = require('./expected/jsdoc-parse')
  var customOrder = {
    kind: [ 'class', 'constructor', 'mixin', 'member', 'namespace', 'enum',
      'constant', 'function', 'event', 'typedef', 'external' ],
    scope: [ 'global', 'instance', 'static', 'inner' ]
  }
  var result = sortBy(fixture, ['kind', 'scope'], customOrder)
  t.deepEqual(result, expected)
  t.end()
})

test('sort by deep value', function (t) {
  var fixture = [
    { inner: { number: 5 } },
    { inner: { number: 2 } },
    { inner: { number: 3 } },
    { inner: { number: 1 } },
    { inner: { number: 4 } }
  ]
  var expected = [
    { inner: { number: 1 } },
    { inner: { number: 2 } },
    { inner: { number: 3 } },
    { inner: { number: 4 } },
    { inner: { number: 5 } }
  ]
  var result = sortBy(fixture, 'inner.number')
  t.deepEqual(result, expected)
  t.end()
})

test('sort by deep value, custom order', function (t) {
  var fixture = [
    { inner: { number: 5 } },
    { inner: { number: 2 } },
    { inner: { number: 3 } },
    { inner: { number: 1 } },
    { inner: { number: 4 } }
  ]
  var expected = [
    { inner: { number: 1 } },
    { inner: { number: 2 } },
    { inner: { number: 4 } },
    { inner: { number: 3 } },
    { inner: { number: 5 } }
  ]
  var customOrder = {
    'inner.number': [ 1, 2, 4, 3, 5 ]
  }
  var result = sortBy(fixture, 'inner.number', customOrder)
  t.deepEqual(result, expected)
  t.end()
})
