[![view on npm](http://img.shields.io/npm/v/collect-json.svg)](https://www.npmjs.org/package/collect-json)
[![npm module downloads](http://img.shields.io/npm/dt/collect-json.svg)](https://www.npmjs.org/package/collect-json)
[![Build Status](https://travis-ci.org/75lb/collect-json.svg?branch=master)](https://travis-ci.org/75lb/collect-json)
[![Dependency Status](https://david-dm.org/75lb/collect-json.svg)](https://david-dm.org/75lb/collect-json)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](https://github.com/feross/standard)

<a name="module_collect-json"></a>

## collect-json
Returns a stream which becomes readable with a single value once all (valid) JSON is received.

<a name="exp_module_collect-json--collectJson"></a>

### collectJson([callback]) ⇒ <code>[Duplex](https://nodejs.org/api/stream.html#stream_class_stream_duplex)</code> ⏏
**Kind**: Exported function  

| Param | Type | Description |
| --- | --- | --- |
| [callback] | <code>function</code> | called with the collected json data, once available. The value returned by the callback will be passed downstream. |

**Example**  
An example command-line client script - JSON received at stdin is stamped with `received` then written to stdout.
```js
var collectJson = require("collect-json")

process.stdin
    .pipe(collectJson(function(json){
        json.received = true
        return JSON.stringify(json)
    }))
    .on("error", function(err){
        // input from stdin failed to parse
    })
    .pipe(process.stdout)
```

* * *

&copy; 2015-16 Lloyd Brookes \<75pound@gmail.com\>. Documented by [jsdoc-to-markdown](https://github.com/jsdoc2md/jsdoc-to-markdown).
