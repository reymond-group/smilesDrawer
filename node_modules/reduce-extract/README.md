[![view on npm](http://img.shields.io/npm/v/reduce-extract.svg)](https://www.npmjs.org/package/reduce-extract)
[![npm module downloads](http://img.shields.io/npm/dt/reduce-extract.svg)](https://www.npmjs.org/package/reduce-extract)
[![Build Status](https://travis-ci.org/75lb/reduce-extract.svg?branch=master)](https://travis-ci.org/75lb/reduce-extract)
[![Dependency Status](https://david-dm.org/75lb/reduce-extract.svg)](https://david-dm.org/75lb/reduce-extract)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](https://github.com/feross/standard)

<a name="module_reduce-extract"></a>
## reduce-extract


<a name="exp_module_reduce-extract--extract"></a>
### extract(query) ⏏
Removes items from `array` which satisfy the query. Modifies the input array, returns the extracted.

**Kind**: Exported function  

| Param | Type    | Description                                                  |
| ----- | ------- | ------------------------------------------------------------ |
| query | `Array` | the input array, modified directly                           |
|       | `any`   | if an item in the input array passes this test it is removed |


**Example**
```js
> DJs = [
    { name: "Trevor", sacked: true },
    { name: "Mike", sacked: true },
    { name: "Chris", sacked: false },
    { name: "Alan", sacked: false }
]

> a.extract(DJs, { sacked: true })
[ { name: 'Trevor', sacked: true },
  { name: 'Mike', sacked: true } ]

> DJs
[ { name: 'Chris', sacked: false },
  { name: 'Alan', sacked: false } ]
```




* * *

&copy; 2016 Lloyd Brookes <75pound@gmail.com>. Documented by [jsdoc-to-markdown](https://github.com/jsdoc2md/jsdoc-to-markdown).
