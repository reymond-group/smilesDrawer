'use strict'
var testValue = require('test-value')

/**
 * @module reduce-without
 * @example
 * const without = require('reduce-without')
 */
 module.exports = without

/**
 * Returns a new array with the same content as the input minus the specified values.
 *
 * @param {any | any[]} - one, or more [test-value](https://github.com/75lb/test-value) queries
 * @returns {Array}
 * @example
 * > [ 1, 2, 3 ].reduce(without(2))
 * [ 1, 3 ]
 *
 * > [ 1, 2, 3 ].reduce(without([ 2, 3 ]))
 * [ 1 ]
 *
 * > data = [
 *     { name: "Dana", age: 30 },
 *     { name: "Yana", age: 20 },
 *     { name: "Zhana", age: 10 }
 * ]
 * > data.reduce(without({ name: /ana/ }))
 * []
 *
 * @alias module:reduce-without
 */
function without (toRemove) {
  return function (prev, curr) {
    if (!Array.isArray(prev)) {
      prev = !testValue(prev, toRemove)
        ? [ prev ]
        : []
    }
    if (!testValue(curr, toRemove)) prev.push(curr)
    return prev
  }
}
