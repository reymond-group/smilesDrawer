'use strict'
var test = require('test-runner')
var wrap = require('../')
var a = require('core-assert')

var bars = "I'm rapping. I'm rapping. I'm rap rap rapping. I'm rap rap rap rap rappity rapping."

test('simple', function () {
  a.strictEqual(
    wrap(bars),
    "I'm rapping. I'm rapping. I'm\nrap rap rapping. I'm rap rap\nrap rap rappity rapping."
  )
})

test('width', function () {
  a.strictEqual(
    wrap(bars, { width: 3 }),
    "I'm\nrapping.\nI'm\nrapping.\nI'm\nrap\nrap\nrapping.\nI'm\nrap\nrap\nrap\nrap\nrappity\nrapping."
  )
})

test('ignore', function () {
  a.strictEqual(
    wrap(bars, { ignore: "I'm" }),
    "I'm rapping. I'm rapping. I'm rap rap\nrapping. I'm rap rap rap rap\nrappity rapping."
  )
})

test('wrap.lines', function () {
  a.deepEqual(
    wrap.lines(bars),
    [ "I'm rapping. I'm rapping. I'm",
      "rap rap rapping. I'm rap rap",
      'rap rap rappity rapping.' ]
  )
})

test('wrap.lines, width', function () {
  a.deepEqual(
    wrap.lines(bars, { width: 3 }),
    [ "I'm",
      'rapping.',
      "I'm",
      'rapping.',
      "I'm",
      'rap',
      'rap',
      'rapping.',
      "I'm",
      'rap',
      'rap',
      'rap',
      'rap',
      'rappity',
      'rapping.' ]
  )
})

test('wrap.lines, width smaller than content width', function () {
  a.deepEqual(
    wrap.lines('4444', { width: 3 }),
    [ '4444' ]
  )
  a.deepEqual(
    wrap.lines('onetwothreefour fivesixseveneight', { width: 7 }),
    [ 'onetwothreefour', 'fivesixseveneight' ]
  )

})

test('wrap.lines, break', function () {
  a.deepEqual(
    wrap.lines('onetwothreefour', { width: 7, break: true }),
    [ 'onetwot', 'hreefou', 'r' ]
  )
  a.deepEqual(
    wrap.lines('\u001b[4m--------\u001b[0m', { width: 10, break: true, ignore: /\u001b.*?m/g }),
    [ '\u001b[4m--------\u001b[0m' ]
  )
  a.deepEqual(
    wrap.lines(
      'onetwothreefour fivesixseveneight',
      { width: 7, break: true }
    ),
    [ 'onetwot', 'hreefou', 'r', 'fivesix', 'sevenei', 'ght' ]
  )

})

test('wrap.lines(text): respect existing linebreaks', function () {
  a.deepEqual(
    wrap.lines('one\ntwo three four', { width: 8 }),
    [ 'one', 'two', 'three', 'four' ]
  )

  a.deepEqual(
    wrap.lines('one \n \n two three four', { width: 8 }),
    [ 'one', '', 'two', 'three', 'four' ]
  )

  a.deepEqual(
    wrap.lines('one\rtwo three four', { width: 8 }),
    [ 'one', 'two', 'three', 'four' ]
  )

  a.deepEqual(
    wrap.lines('one\r\ntwo three four', { width: 8 }),
    [ 'one', 'two', 'three', 'four' ]
  )

})

test('wrap.lines(text): multilingual', function () {
  a.deepEqual(
    wrap.lines('Può parlare più lentamente?', { width: 10 }),
    [ 'Può', 'parlare', 'più', 'lentamente?' ]
  )

  a.deepEqual(
    wrap.lines('один два три', { width: 4 }),
    [ 'один', 'два', 'три' ]
  )

})

test('wrap hyphenated words', function () {
  a.deepEqual(
    wrap.lines('ones-and-twos', { width: 5 }),
    [ 'ones-', 'and-', 'twos' ]
  )

  a.deepEqual(
    wrap.lines('ones-and-twos', { width: 10 }),
    [ 'ones-and-', 'twos' ]
  )

  a.deepEqual(
    wrap.lines('--------', { width: 5 }),
    [ '--------' ]
  )

  a.deepEqual(
    wrap.lines('--one --fifteen', { width: 5 }),
    [ '--one', '--fifteen' ]
  )

  a.deepEqual(
    wrap.lines('one-two', { width: 10 }),
    [ 'one-two' ]
  )

  a.deepEqual(
    wrap.lines('ansi-escape-sequences', { width: 22 }),
    [ 'ansi-escape-sequences' ]
  )

})

test('isWrappable(input)', function(t){
  a.strictEqual(wrap.isWrappable('one two'), true)
  a.strictEqual(wrap.isWrappable('one-two'), true)
  a.strictEqual(wrap.isWrappable('one\ntwo'), true)
})
