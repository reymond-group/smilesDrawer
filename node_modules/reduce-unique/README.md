[![view on npm](http://img.shields.io/npm/v/reduce-unique.svg)](https://www.npmjs.org/package/reduce-unique)
[![npm module downloads](http://img.shields.io/npm/dt/reduce-unique.svg)](https://www.npmjs.org/package/reduce-unique)
[![Build Status](https://travis-ci.org/75lb/reduce-unique.svg?branch=master)](https://travis-ci.org/75lb/reduce-unique)
[![Dependency Status](https://david-dm.org/75lb/reduce-unique.svg)](https://david-dm.org/75lb/reduce-unique)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](https://github.com/feross/standard)

<a name="module_reduce-unique"></a>
## reduce-unique
Reduce an array to unique values, optionally into a separate array.

**Example**  
```js
> const unique = require('reduce-unique')

> const arr = [ 1, 3, 8, 3, 1, 2, 1, 9, 3, 3 ]

> arr.reduce(unique)
[ 1, 3, 8, 2, 9 ]

> arr.reduce(unique, [ 'one', 'two' ])
[ 'one', 'two', 1, 3, 8, 2, 9 ]

> arr.reduce([ 3 ])
3
```

* * *

&copy; 2016 Lloyd Brookes \<75pound@gmail.com\>. Documented by [jsdoc-to-markdown](https://github.com/jsdoc2md/jsdoc-to-markdown).
