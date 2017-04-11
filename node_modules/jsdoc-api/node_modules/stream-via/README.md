[![view on npm](http://img.shields.io/npm/v/stream-via.svg)](https://www.npmjs.org/package/stream-via)
[![npm module downloads](http://img.shields.io/npm/dt/stream-via.svg)](https://www.npmjs.org/package/stream-via)
[![Build Status](https://travis-ci.org/75lb/stream-via.svg?branch=master)](https://travis-ci.org/75lb/stream-via)
[![Dependency Status](https://david-dm.org/75lb/stream-via.svg)](https://david-dm.org/75lb/stream-via)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](https://github.com/feross/standard)

# stream-via
Process each chunk of a stream via the supplied function. Useful for meddling inside a stream pipeline. Works in both string/Buffer and object modes.

## Synopsis

Replace all instances of the `a` character with `4`.

```js
const via = require('stream-via')
const fs = require('fs')

process.stdin
  .pipe(via(function (chunk) {
    return chunk.toString().replace(/a/g, '4')
  }))
  .pipe(process.stdout)
```

Output:
```
$ echo 'twat' | node example/simple.js
tw4t
```

# API

<a name="module_stream-via"></a>

## stream-via

* [stream-via](#module_stream-via)
    * [via(throughFunction, [options])](#exp_module_stream-via--via) ⇒ <code>[Duplex](https://nodejs.org/api/stream.html#stream_class_stream_duplex)</code> ⏏
        * [.async(throughFunction, [options])](#module_stream-via--via.async) ⇒ <code>[Duplex](https://nodejs.org/api/stream.html#stream_class_stream_duplex)</code>
        * [~throughFunction](#module_stream-via--via..throughFunction) : <code>function</code>

<a name="exp_module_stream-via--via"></a>

### via(throughFunction, [options]) ⇒ <code>[Duplex](https://nodejs.org/api/stream.html#stream_class_stream_duplex)</code> ⏏
**Kind**: Exported function  
**Params**

- throughFunction <code>[throughFunction](#module_stream-via--via..throughFunction)</code> - a function to process each chunk
- [options] <code>object</code> - passed to the returned stream constructor

<a name="module_stream-via--via.async"></a>

#### via.async(throughFunction, [options]) ⇒ <code>[Duplex](https://nodejs.org/api/stream.html#stream_class_stream_duplex)</code>
**Kind**: static method of <code>[via](#exp_module_stream-via--via)</code>  
**Params**

- throughFunction <code>[throughFunction](#module_stream-via--via..throughFunction)</code> - a function to process each chunk
- [options] <code>object</code> - passed to the returned stream constructor

<a name="module_stream-via--via..throughFunction"></a>

#### via~throughFunction : <code>function</code>
**Kind**: inner typedef of <code>[via](#exp_module_stream-via--via)</code>  
**Params**

- chunk <code>buffer</code> | <code>string</code>
- enc <code>string</code>
- done <code>function</code> - only used in `via.async`, call it like so: `done(err, returnValue)`.



* * *

&copy; 2015-16 Lloyd Brookes \<75pound@gmail.com\>. Documented by [jsdoc-to-markdown](https://github.com/jsdoc2md/jsdoc-to-markdown).
