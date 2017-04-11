'use strict'
var test = require('tape')
var ddata = require('../')

test('{@link someSymbol}', function (t) {
  var text = 'blah {@link someSymbol}'
  var result = [ { original: '{@link someSymbol}', caption: 'someSymbol', url: 'someSymbol' } ]
  t.deepEqual(ddata.parseLink(text), result)
  t.end()
})

test('{@link http://some.url.com}', function (t) {
  var text = 'blah {@link http://some.url.com} blah'
  var result = [{
    original: '{@link http://some.url.com}',
    caption: 'http://some.url.com',
    url: 'http://some.url.com'
  }]
  t.deepEqual(ddata.parseLink(text), result)
  t.end()
})

test('multiple {@link http://some.url.com}', function (t) {
  var text = 'blah {@link http://one.url.com} blah {@link http://two.url.com} whatever'
  var result = [
    {
      original: '{@link http://one.url.com}',
      caption: 'http://one.url.com',
      url: 'http://one.url.com'
    },
    {
      original: '{@link http://two.url.com}',
      caption: 'http://two.url.com',
      url: 'http://two.url.com'
    }
  ]
  t.deepEqual(ddata.parseLink(text), result)
  t.end()
})

test('[caption here]{@link someSymbol}', function (t) {
  var text = 'blah [caption here]{@link someSymbol} blah'
  var result = [{
    original: '[caption here]{@link someSymbol}',
    caption: 'caption here',
    url: 'someSymbol'
  }]
  t.deepEqual(ddata.parseLink(text), result)
  t.end()
})

test('multiple [caption here]{@link someSymbol}', function (t) {
  var text = 'blah [caption one]{@link thingOne} blah [caption two]{@link thingTwo} whatever'
  var result = [
    {
      original: '[caption one]{@link thingOne}',
      caption: 'caption one',
      url: 'thingOne'
    },
    {
      original: '[caption two]{@link thingTwo}',
      caption: 'caption two',
      url: 'thingTwo'
    }
  ]
  t.deepEqual(ddata.parseLink(text), result)
  t.end()
})

test('[caption here]{@link http://some.url.com}', function (t) {
  var text = 'blah [caption here]{@link http://some.url.com} blah'
  var result = [{
    original: '[caption here]{@link http://some.url.com}',
    caption: 'caption here',
    url: 'http://some.url.com'
  }]
  t.deepEqual(ddata.parseLink(text), result)
  t.end()
})

test('multiple {@link someSymbol|caption here}', function (t) {
  var text = 'blah {@link thingOne|caption one} blah {@link thingTwo|caption two} whatever'
  var result = [
    {
      original: '{@link thingOne|caption one}',
      caption: 'caption one',
      url: 'thingOne'
    },
    {
      original: '{@link thingTwo|caption two}',
      caption: 'caption two',
      url: 'thingTwo'
    }
  ]
  t.deepEqual(ddata.parseLink(text), result)
  t.end()
})

test('multiple {@link someSymbol Caption here}', function (t) {
  var text = 'blah {@link thingOne Caption one} blah {@link thingTwo Caption two} whatever'
  var result = [
    {
      original: '{@link thingOne Caption one}',
      caption: 'Caption one',
      url: 'thingOne'
    },
    {
      original: '{@link thingTwo Caption two}',
      caption: 'Caption two',
      url: 'thingTwo'
    }
  ]
  t.deepEqual(ddata.parseLink(text), result)
  t.end()
})
