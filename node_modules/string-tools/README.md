[![view on npm](http://img.shields.io/npm/v/string-tools.svg)](https://www.npmjs.org/package/string-tools)
[![npm module downloads per month](http://img.shields.io/npm/dm/string-tools.svg)](https://www.npmjs.org/package/string-tools)
[![Build Status](https://travis-ci.org/75lb/string-tools.svg?branch=master)](https://travis-ci.org/75lb/string-tools)
[![Dependency Status](https://david-dm.org/75lb/string-tools.svg)](https://david-dm.org/75lb/string-tools)

<a name="module_string-tools"></a>
## string-tools
**Example**  
```js
var s = require("string-tools");
```

* [string-tools](#module_string-tools)
  * [.symbol](#module_string-tools.symbol)
  * [.escapeRegExp()](#module_string-tools.escapeRegExp)
  * [.fill(fillWith, len)](#module_string-tools.fill) ⇒ <code>string</code>
  * [.padRight(input, width, [padWith])](#module_string-tools.padRight) ⇒ <code>string</code>
  * [.repeat(input, times)](#module_string-tools.repeat) ⇒ <code>string</code>
  * [.clipLeft(input, width, [prefix])](#module_string-tools.clipLeft) ⇒ <code>string</code>

<a name="module_string-tools.symbol"></a>
### s.symbol
some cross platform symbols (`tick` and `cross`)

**Kind**: static property of <code>[string-tools](#module_string-tools)</code>  
<a name="module_string-tools.escapeRegExp"></a>
### s.escapeRegExp()
escape special regular expression characters

**Kind**: static method of <code>[string-tools](#module_string-tools)</code>  
**Example**  
```js
> s.escapeRegExp("(.*)");
'\\(\\.\\*\\)'
```
<a name="module_string-tools.fill"></a>
### s.fill(fillWith, len) ⇒ <code>string</code>
Create a new string filled with the supplied character

**Kind**: static method of <code>[string-tools](#module_string-tools)</code>  

| Param | Type | Description |
| --- | --- | --- |
| fillWith | <code>string</code> | the fill character |
| len | <code>number</code> | the length of the output string |

**Example**  
```js
> s.fill("a", 10)
'aaaaaaaaaa'
> s.fill("ab", 10)
'aaaaaaaaaa'
```
<a name="module_string-tools.padRight"></a>
### s.padRight(input, width, [padWith]) ⇒ <code>string</code>
Add padding to the right of a string

**Kind**: static method of <code>[string-tools](#module_string-tools)</code>  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| input | <code>string</code> |  | the string to pad |
| width | <code>number</code> |  | the desired final width |
| [padWith] | <code>string</code> | <code>&quot;\&quot; \&quot;&quot;</code> | the padding character |

**Example**  
```js
> s.padRight("clive", 1)
'clive'
> s.padRight("clive", 1, "-")
'clive'
> s.padRight("clive", 10, "-")
'clive-----'
```
<a name="module_string-tools.repeat"></a>
### s.repeat(input, times) ⇒ <code>string</code>
returns the input string repeated the specified number of times

**Kind**: static method of <code>[string-tools](#module_string-tools)</code>  

| Param | Type | Description |
| --- | --- | --- |
| input | <code>string</code> | input string to repeat |
| times | <code>number</code> | the number of times to repeat |

<a name="module_string-tools.clipLeft"></a>
### s.clipLeft(input, width, [prefix]) ⇒ <code>string</code>
returns the input string clipped from the left side in order to meet the specified `width`

**Kind**: static method of <code>[string-tools](#module_string-tools)</code>  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| input | <code>string</code> |  | input string to repeat |
| width | <code>number</code> |  | the desired final width |
| [prefix] | <code>string</code> | <code>&quot;...&quot;</code> | the prefix to replace the clipped region |


* * *

&copy; 2015 Lloyd Brookes \<75pound@gmail.com\>. Documented by [jsdoc-to-markdown](https://github.com/jsdoc2md/jsdoc-to-markdown).
