[![view on npm](http://img.shields.io/npm/v/collect-all.svg)](https://www.npmjs.org/package/collect-all)
[![npm module downloads](http://img.shields.io/npm/dt/collect-all.svg)](https://www.npmjs.org/package/collect-all)
[![Build Status](https://travis-ci.org/75lb/collect-all.svg?branch=master)](https://travis-ci.org/75lb/collect-all)
[![Dependency Status](https://david-dm.org/75lb/collect-all.svg)](https://david-dm.org/75lb/collect-all)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](https://github.com/feross/standard)

<a name="module_collect-all"></a>
## collect-all
Returns a stream which fires a callback and becomes readable once all input is received.

By default the callback is invoked with a Buffer instance containing all concatenated input. If you set the option `{ objectMode: true }` the callback is invoked with an array containing all objects received.

<a name="exp_module_collect-all--collectAll"></a>
### collectAll([callback], [options]) ⇒ <code>[Duplex](https://nodejs.org/api/stream.html#stream_class_stream_duplex)</code> ⏏
**Kind**: Exported function  

| Param | Type | Description |
| --- | --- | --- |
| [callback] | <code>function</code> | Called once with the collected input data (by default a `Buffer` instance, or array in `objectMode`.). The value returned by this callback function will be passed downstream. |
| [options] | <code>object</code> | [Stream options](https://nodejs.org/dist/latest-v5.x/docs/api/stream.html#stream_new_stream_readable_options) object, passed to the constructor for the stream returned by `collect-all`. If the callback function supplied returns a non-string/buffer value, set `options.objectMode` to `true`. |

**Example**  
An example command-line client script - string input received at stdin is stamped with `received` then written to  stdout.
```js
var collectAll = require('collect-all')
process.stdin
  .pipe(collectAll(function (input) {
    input = 'received: ' + input
    return input
  }))
  .pipe(process.stdout)
```

An object-mode example:
```js
var collectAll = require('collect-all')

function onAllCollected (collected) {
  console.log('Objects collected: ' + collected.length)
}

var stream = collectAll(onAllCollected, { objectMode: true })
stream.write({})
stream.write({})
stream.end({}) // outputs 'Objects collected: 3'
```

* * *

&copy; 2015-16 Lloyd Brookes \<75pound@gmail.com\>. Documented by [jsdoc-to-markdown](https://github.com/jsdoc2md/jsdoc-to-markdown).
