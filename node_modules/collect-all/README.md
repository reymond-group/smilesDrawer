[![view on npm](http://img.shields.io/npm/v/collect-all.svg)](https://www.npmjs.org/package/collect-all)
[![npm module downloads per month](http://img.shields.io/npm/dm/collect-all.svg)](https://www.npmjs.org/package/collect-all)
[![Build Status](https://travis-ci.org/75lb/collect-all.svg?branch=master)](https://travis-ci.org/75lb/collect-all)
[![Dependency Status](https://david-dm.org/75lb/collect-all.svg)](https://david-dm.org/75lb/collect-all)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](https://github.com/feross/standard)

<a name="module_collect-all"></a>
## collect-all
Returns a stream which fires a callback and becomes readable once all input is received. Intended for buffer/string streams.

<a name="exp_module_collect-all--collect"></a>
### collect([callback], [options]) ⇒ <code>[Duplex](https://nodejs.org/api/stream.html#stream_class_stream_duplex)</code> ⏏
**Kind**: Exported function  

| Param | Type | Description |
| --- | --- | --- |
| [callback] | <code>function</code> | called with the collected json data, once available. The value returned by the callback will be passed downstream. |
| [options] | <code>object</code> | passed to through stream constructor created to house the above callback function.. If the callback function returns a non-string/buffer value, set `objectMode: true`. |

**Example**  
An example command-line client script - JSON received at stdin is stamped with `received` then written to  stdout.
```js
var collectAll = require("collect-all")

process.stdin
    .pipe(collectAll(function(input){
        input += 'received'
        return input
    }))
    .on("error", function(err){
        // input from stdin failed to parse
    })
    .pipe(process.stdout)
```

* * *

&copy; 2015 Lloyd Brookes \<75pound@gmail.com\>. Documented by [jsdoc-to-markdown](https://github.com/jsdoc2md/jsdoc-to-markdown).
