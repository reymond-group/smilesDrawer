"use strict";

/**
@module
@typicalname s
@example
```js
var s = require("string-tools");
```
*/

/** some cross platform symbols (`tick` and `cross`) */
exports.symbol = symbol();
exports.fill = fill;
exports.padRight = padRight;
exports.escapeRegExp = escapeRegExp;
exports.repeat = repeat;
exports.clipLeft = clipLeft;

/**
escape special regular expression characters
@example
```js
> s.escapeRegExp("(.*)");
'\\(\\.\\*\\)'
```
@alias module:string-tools.escapeRegExp
*/
function escapeRegExp(string){
    return string
        ? string.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1")
        : "";
}

/**
Create a new string filled with the supplied character
@param {string} - the fill character
@param {number} - the length of the output string
@returns {string}
@example
```js
> s.fill("a", 10)
'aaaaaaaaaa'
> s.fill("ab", 10)
'aaaaaaaaaa'
```
@alias module:string-tools.fill
*/
function fill(fillWith, len){
    var buffer = new Buffer(len);
    buffer.fill(fillWith);
    return buffer.toString();
}

/**
Add padding to the right of a string
@param {string} - the string to pad
@param {number} - the desired final width
@param {string} [padWith=" "] - the padding character
@returns {string}
@example
```js
> s.padRight("clive", 1)
'clive'
> s.padRight("clive", 1, "-")
'clive'
> s.padRight("clive", 10, "-")
'clive-----'
```
@alias module:string-tools.padRight
*/
function padRight(input, width, padWith){
    padWith = padWith || " ";
    input = String(input);
    if (input.length < width){
        return input + fill(padWith, width - input.length);
    } else {
        return input;
    }
}

function symbol(){
    return {
        tick: process.platform === "win32" ? "√" : "✔︎",
        cross: process.platform === "win32" ? "×": "✖"
    };
}

/**
returns the input string repeated the specified number of times
@param {string} - input string to repeat
@param {number} - the number of times to repeat
@returns {string}
@alias module:string-tools.repeat
*/
function repeat(input, times){
    var output = "";
    for (var i = 0; i < times; i++){
        output += input;
    }
    return output;
}

/**
returns the input string clipped from the left side in order to meet the specified `width`
@param {string} - input string to repeat
@param {number} - the desired final width
@param [prefix=...] {string} - the prefix to replace the clipped region
@returns {string}
@alias module:string-tools.clipLeft
*/
function clipLeft(input, width, prefix){
    prefix = prefix || "...";
    if (input.length > width){
        return prefix + input.slice(-(width - prefix.length));
    } else {
        return input;
    }
}
