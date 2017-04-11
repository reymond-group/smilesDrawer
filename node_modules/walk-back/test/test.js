var test = require('tape')
var walkBack = require('../')

test('basic', function (t) {
  t.plan(1)

  var filename = walkBack(__dirname + '/fixture/subdir', 'file.txt')
  t.ok(filename.search('walk-back/test/fixture/subdir/file.txt') > 0)
})

test('basic2', function (t) {
  t.plan(1)

  var filename = walkBack(__dirname + '/fixture', 'file.txt')
  t.ok(filename.search('walk-back/test/fixture/file.txt') > 0)
})

test('not found', function (t) {
  t.plan(1)

  var filename = walkBack(__dirname + '/fixture', 'adskjfhladfn')
  t.strictEqual(filename, null)
})

test('relative path', function (t) {
  t.plan(1)

  var filename = walkBack('.', 'test/fixture/subdir/file.txt')
  t.ok(filename && filename.search('walk-back/test/fixture/subdir/file.txt') > 0)
})

test('relative path 2', function (t) {
  t.plan(1)

  var filename = walkBack('./test/fixture/subdir', 'file.txt')
  t.ok(filename && filename.search('walk-back/test/fixture/subdir/file.txt') > 0)
})

test('startPath doesn\'t exist', function (t) {
  t.throws(function () {
    walkBack('slfnavnkln', 'file.txt')    
  })
  t.end()
})
