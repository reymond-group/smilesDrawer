'use strict'
var testValue = require('test-value')

/**
 * @module reduce-extract
 */
module.exports = extract

/**
Removes items from `array` which satisfy the query. Modifies the input array, returns the extracted.

@param {Array} - the input array, modified directly
@param {any} - if an item in the input array passes this test it is removed
@alias module:reduce-extract
@example
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

*/
function extract (query) {
  var toSplice = []
  var extracted = []
  return function (prev, curr, index, array) {
    if (prev !== extracted) {
      if (testValue(prev, query)) {
        extracted.push(prev)
        toSplice.push(index - 1)
      }
    }

    if (testValue(curr, query)) {
      extracted.push(curr)
      toSplice.push(index)
    }

    if (index === array.length - 1) {
      toSplice.reverse()
      for (var i = 0; i < toSplice.length; i++) {
        array.splice(toSplice[i], 1)
      }
    }
    return extracted
  }
}
