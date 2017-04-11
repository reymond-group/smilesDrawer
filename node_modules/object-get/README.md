[![view on npm](http://img.shields.io/npm/v/object-get.svg)](https://www.npmjs.org/package/object-get)
[![npm module downloads](http://img.shields.io/npm/dt/object-get.svg)](https://www.npmjs.org/package/object-get)
[![Build Status](https://travis-ci.org/75lb/object-get.svg?branch=master)](https://travis-ci.org/75lb/object-get)
[![Dependency Status](https://david-dm.org/75lb/object-get.svg)](https://david-dm.org/75lb/object-get)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](https://github.com/feross/standard)

<a name="module_object-get"></a>

# object-get
Access nested property values at any depth with a simple expression.

**Example**  
```js
const objectGet = require('object-get')

const colour = objectGet(mammal, 'fur.appearance.colour')
const text = objectGet(el, 'children[2].children[1].children[1].textContent')
```

Helps avoid long logical expressions like:

```js
const colour = mammal && mammal.fur && mammal.fur.appearance && mammal.fur.appearance.colour
```
<a name="exp_module_object-get--objectGet"></a>

## objectGet(object, expression) ⇒ <code>\*</code> ⏏
Returns the value at the given property.

**Kind**: Exported function  

| Param | Type | Description |
| --- | --- | --- |
| object | <code>object</code> | the input object |
| expression | <code>string</code> | the property accessor expression. |

**Example**  
```js
> objectGet({ animal: 'cow' }, 'animal')
'cow'

> objectGet({ animal: { mood: 'lazy' } }, 'animal')
{ mood: 'lazy' }

> objectGet({ animal: { mood: 'lazy' } }, 'animal.mood')
'lazy'

> objectGet({ animal: { mood: 'lazy' } }, 'animal.email')
undefined
```

* * *

&copy; 2015-16 Lloyd Brookes \<75pound@gmail.com\>. Documented by [jsdoc-to-markdown](https://github.com/jsdoc2md/jsdoc-to-markdown).
