[![view on npm](http://img.shields.io/npm/v/defer-promise.svg)](https://www.npmjs.org/package/defer-promise)
[![npm module month](http://img.shields.io/npm/dt/defer-promise.svg)](https://www.npmjs.org/package/defer-promise)
[![Build Status](https://travis-ci.org/75lb/defer-promise.svg?branch=master)](https://travis-ci.org/75lb/defer-promise)
[![Dependency Status](https://david-dm.org/75lb/defer-promise.svg)](https://david-dm.org/75lb/defer-promise)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](https://github.com/feross/standard)

# defer-promise

Returns a deferred promise with `resolve` and `reject` methods. If the global `Promise.defer()` method exists it will use that, else polyfill.

```js
const defer = require('defer-promise')
const deferred = defer()

doSomething((result, err) => {
  if (err) {
    deferred.reject(err)
  } else {
    deferred.resolve(result)
  }
})

return deferred.promise;
```

* * *

&copy; 2015-17 Lloyd Brookes \<75pound@gmail.com\>. Documented by [jsdoc-to-markdown](https://github.com/jsdoc2md/jsdoc-to-markdown).
