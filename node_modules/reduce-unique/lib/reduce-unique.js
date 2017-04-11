'use strict'

/**
 * Reduce an array to unique values, optionally into a separate array.
 *
 * @module reduce-unique
 * @example
 * > const unique = require('reduce-unique')
 *
 * > const arr = [ 1, 3, 8, 3, 1, 2, 1, 9, 3, 3 ]
 *
 * > arr.reduce(unique)
 * [ 1, 3, 8, 2, 9 ]
 *
 * > arr.reduce(unique, [ 'one', 'two' ])
 * [ 'one', 'two', 1, 3, 8, 2, 9 ]
 *
 * > arr.reduce([ 3 ])
 * 3
 */
module.exports = reduceUnique

function reduceUnique (prev, curr) {
  if (!Array.isArray(prev)) prev = [ prev ]
  if (prev.indexOf(curr) === -1) prev.push(curr)
  return prev
}
