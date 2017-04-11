[![view on npm](http://img.shields.io/npm/v/walk-back.svg)](https://www.npmjs.org/package/walk-back)
[![npm module downloads](http://img.shields.io/npm/dt/walk-back.svg)](https://www.npmjs.org/package/walk-back)
[![Build Status](https://travis-ci.org/75lb/walk-back.svg?branch=master)](https://travis-ci.org/75lb/walk-back)
[![Dependency Status](https://david-dm.org/75lb/walk-back.svg)](https://david-dm.org/75lb/walk-back)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](https://github.com/feross/standard)

<a name="module_walk-back"></a>

## walk-back
Walk up the directory tree until the specified path is found.

**Example**  
```js
const walkBack = require('walk-back')
```
<a name="exp_module_walk-back--walkBack"></a>

### walkBack(startAt, lookingFor) ⇒ <code>string</code> ⏏
Returns an absolute file path (if found) else `null`.

**Kind**: Exported function  

| Param | Type | Description |
| --- | --- | --- |
| startAt | <code>string</code> | the directory to start in |
| lookingFor | <code>string</code> | the path we're looking for |

**Example**  
```js
> walkBack('/Users/lloyd/Documents/75lb/walk-back', 'package.json')
'/Users/lloyd/Documents/75lb/walk-back/package.json'

> walkBack('/Users/lloyd/Documents/75lb/walk-back', '75lb')
'/Users/lloyd/Documents/75lb'

> walkBack('/Users/lloyd/Documents/75lb/walk-back', '.bash_profile')
'/Users/lloyd/.bash_profile'

> walkBack('.', '.bash_profile')
'/Users/lloyd/.bash_profile'

> walkBack('/Users/lloyd/Documents/75lb/walk-back', 'non-existent.file')
null
```

* * *

&copy; 2015-16 Lloyd Brookes \<75pound@gmail.com\>. Documented by [jsdoc-to-markdown](https://github.com/jsdoc2md/jsdoc-to-markdown).
