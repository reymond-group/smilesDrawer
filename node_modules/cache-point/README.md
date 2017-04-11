[![view on npm](http://img.shields.io/npm/v/cache-point.svg)](https://www.npmjs.org/package/cache-point)
[![npm module downloads](http://img.shields.io/npm/dt/cache-point.svg)](https://www.npmjs.org/package/cache-point)
[![Build Status](https://travis-ci.org/75lb/cache-point.svg?branch=master)](https://travis-ci.org/75lb/cache-point)
[![Dependency Status](https://david-dm.org/75lb/cache-point.svg)](https://david-dm.org/75lb/cache-point)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](https://github.com/feross/standard)

<a name="module_cache-point"></a>

## cache-point
A memoisation solution intended to cache the output of expensive operations, speeding up future invocations with the same input.

**Example**  
```js
const Cache = require('cache-point')
const cache = new Cache({ dir: 'tmp/example' })

// The first invocation will take 3s, the rest instantaneous.
// outputs: 'result'
getData('some input')
  .then(console.log)

// check the cache for output generated with this input.
// cache.read() will resolve on hit, reject on miss.
function getData (input) {
  return cache
    .read(input)
    .catch(() => expensiveOperation(input))
}

// The expensive operation we're aiming to avoid,
// (3 second cost per invocation)
function expensiveOperation (input) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const output = 'result'
      cache.write(input, output)
      resolve(output)
    }, 3000)
  })
}
```

* [cache-point](#module_cache-point)
    * [Cache](#exp_module_cache-point--Cache) ⏏
        * [new Cache([options])](#new_module_cache-point--Cache_new)
        * [.dir](#module_cache-point--Cache.Cache+dir) : <code>string</code>
        * [.read(keys)](#module_cache-point--Cache+read) ⇒ <code>Promise</code>
        * [.readSync(keys)](#module_cache-point--Cache+readSync) ⇒ <code>string</code>
        * [.write(keys, content)](#module_cache-point--Cache+write) ⇒ <code>Promise</code>
        * [.writeSync(keys, content)](#module_cache-point--Cache+writeSync)
        * [.getChecksum(keys)](#module_cache-point--Cache+getChecksum) ⇒ <code>string</code>
        * [.clear()](#module_cache-point--Cache+clear) ⇒ <code>Promise</code>
        * [.remove()](#module_cache-point--Cache+remove) ⇒ <code>Promise</code>

<a name="exp_module_cache-point--Cache"></a>

### Cache ⏏
**Kind**: Exported class  
<a name="new_module_cache-point--Cache_new"></a>

#### new Cache([options])

| Param | Type |
| --- | --- |
| [options] | <code>object</code> | 
| [options.dir] | <code>string</code> | 

<a name="module_cache-point--Cache.Cache+dir"></a>

#### cache.dir : <code>string</code>
Current cache directory. Can be changed at any time.

**Kind**: instance property of <code>[Cache](#exp_module_cache-point--Cache)</code>  
<a name="module_cache-point--Cache+read"></a>

#### cache.read(keys) ⇒ <code>Promise</code>
A cache hit resolves with the stored value, a miss rejects.

**Kind**: instance method of <code>[Cache](#exp_module_cache-point--Cache)</code>  

| Param | Type | Description |
| --- | --- | --- |
| keys | <code>\*</code> | One or more values to uniquely identify the data. Can be any value, or an array of values of any type. |

<a name="module_cache-point--Cache+readSync"></a>

#### cache.readSync(keys) ⇒ <code>string</code>
A cache hit returns the stored value, a miss returns `null`.

**Kind**: instance method of <code>[Cache](#exp_module_cache-point--Cache)</code>  

| Param | Type | Description |
| --- | --- | --- |
| keys | <code>\*</code> | One or more values to uniquely identify the data. Can be any value, or an array of values of any type. |

<a name="module_cache-point--Cache+write"></a>

#### cache.write(keys, content) ⇒ <code>Promise</code>
Write some data to the cache. Returns a promise which resolves when the write is complete.

**Kind**: instance method of <code>[Cache](#exp_module_cache-point--Cache)</code>  

| Param | Type | Description |
| --- | --- | --- |
| keys | <code>\*</code> | One or more values to index the data, e.g. a request object or set of function args. |
| content | <code>\*</code> | the data to store |

<a name="module_cache-point--Cache+writeSync"></a>

#### cache.writeSync(keys, content)
Write some data to the cache with a key.

**Kind**: instance method of <code>[Cache](#exp_module_cache-point--Cache)</code>  

| Param | Type | Description |
| --- | --- | --- |
| keys | <code>\*</code> | One or more values to index the data, e.g. a request object or set of function args. |
| content | <code>\*</code> | the data to store |

<a name="module_cache-point--Cache+getChecksum"></a>

#### cache.getChecksum(keys) ⇒ <code>string</code>
Used internally to convert a key value into a hex checksum. Override if for some reason you need a different hashing strategy.

**Kind**: instance method of <code>[Cache](#exp_module_cache-point--Cache)</code>  

| Param | Type | Description |
| --- | --- | --- |
| keys | <code>\*</code> | One or more values to index the data, e.g. a request object or set of function args. |

<a name="module_cache-point--Cache+clear"></a>

#### cache.clear() ⇒ <code>Promise</code>
Clears the cache. Returns a promise which resolves once the cache is clear.

**Kind**: instance method of <code>[Cache](#exp_module_cache-point--Cache)</code>  
<a name="module_cache-point--Cache+remove"></a>

#### cache.remove() ⇒ <code>Promise</code>
Clears and removes the cache directory. Returns a promise which resolves once the remove is complete.

**Kind**: instance method of <code>[Cache](#exp_module_cache-point--Cache)</code>  

* * *

&copy; 2016 Lloyd Brookes \<75pound@gmail.com\>. Documented by [jsdoc-to-markdown](https://github.com/jsdoc2md/jsdoc-to-markdown).
