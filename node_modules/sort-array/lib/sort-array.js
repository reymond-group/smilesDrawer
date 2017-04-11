'use strict'
var arrayify = require('array-back')
var t = require('typical')
var objectGet = require('object-get')

/**
 * Sort an array of objects by any property value, at any depth, in any custom order.
 *
 * @module sort-array
 * @typicalname sortBy
 * @example
 * var sortBy = require('sort-array')
 */
module.exports = sortBy

/**
 * @param {object[]} - Input array of objects
 * @param {string|string[]} - One or more property expressions to sort by,  e.g. `'name'` or `'name.first'`.
 * @param [customOrder] {object} - Custom sort order definitions. An object where each key is the property expression and the value is an array specifying the sort order. Example: <br>
 * `{ importance: [ 'speed', 'strength', 'intelligence' ]}`
 * @returns {Array}
 * @alias module:sort-array
 * @example
 * with this data
 * ```js
 * > DJs = [
 *   { name: 'Trevor', slot: 'twilight' },
 *   { name: 'Chris', slot: 'twilight' },
 *   { name: 'Mike', slot: 'afternoon' },
 *   { name: 'Rodney', slot: 'morning' },
 *   { name: 'Chris', slot: 'morning' },
 *   { name: 'Zane', slot: 'evening' }
 * ]
 * ```
 *
 * sort by `slot` using the default sort order (alphabetical)
 * ```js
 * > sortBy(DJs, 'slot')
 * [ { name: 'Mike', slot: 'afternoon' },
 *   { name: 'Zane', slot: 'evening' },
 *   { name: 'Chris', slot: 'morning' },
 *   { name: 'Rodney', slot: 'morning' },
 *   { name: 'Chris', slot: 'twilight' },
 *   { name: 'Trevor', slot: 'twilight' } ]
 * ```
 *
 * specify a custom sort order for `slot`
 * ```js
 * > var slotOrder = [ 'morning', 'afternoon', 'evening', 'twilight' ]
 * > sortBy(DJs, 'slot', { slot: slotOrder })
 * [ { name: 'Rodney', slot: 'morning' },
 *   { name: 'Chris', slot: 'morning' },
 *   { name: 'Mike', slot: 'afternoon' },
 *   { name: 'Zane', slot: 'evening' },
 *   { name: 'Trevor', slot: 'twilight' },
 *   { name: 'Chris', slot: 'twilight' } ]
 * ```
 *
 * sort by `slot` then `name`
 * ```js
 * > sortBy(DJs, ['slot', 'name'], { slot: slotOrder })
 * [ { name: 'Chris', slot: 'morning' },
 *   { name: 'Rodney', slot: 'morning' },
 *   { name: 'Mike', slot: 'afternoon' },
 *   { name: 'Zane', slot: 'evening' },
 *   { name: 'Chris', slot: 'twilight' },
 *   { name: 'Trevor', slot: 'twilight' } ]
 * ```
 *
 * sort by nested property values (at any depth) using dot notation (e.g. `'inner.number'`)
 * ```js
 * > input = [
 *   { inner: { number: 5 } },
 *   { inner: { number: 2 } },
 *   { inner: { number: 3 } },
 *   { inner: { number: 1 } },
 *   { inner: { number: 4 } }
 * ]
 *
 * > sortBy(input, 'inner.number')
 * [ { inner: { number: 1 } },
 *   { inner: { number: 2 } },
 *   { inner: { number: 3 } },
 *   { inner: { number: 4 } },
 *   { inner: { number: 5 } } ]
 * ```
 *
 * a custom order for a nested property looks like this:
 * ```js
 * var customOrder = {
 *   'inner.number': [ 1, 2, 4, 3, 5 ]
 * }
 * ```
 */
function sortBy (recordset, columnNames, customOrder) {
  return recordset.sort(sortByFunc(arrayify(columnNames), customOrder))
}

function sortByFunc (properties, customOrder) {
  var props = properties.slice(0)
  var property = props.shift()
  return function sorter (a, b) {
    var result
    var x = objectGet(a, property)
    var y = objectGet(b, property)

    if (!t.isDefined(x) && t.isDefined(y)) {
      result = -1
    } else if (t.isDefined(x) && !t.isDefined(y)) {
      result = 1
    } else if (!t.isDefined(x) && !t.isDefined(y)) {
      result = 0
    } else if (customOrder && customOrder[property]) {
      result = customOrder[property].indexOf(x) - customOrder[property].indexOf(y)
    } else {
      result = x < y ? -1 : x > y ? 1 : 0
    }

    if (result === 0) {
      if (props.length) {
        property = props.shift()
        return sorter(a, b)
      } else {
        props = properties.slice(0)
        property = props.shift()
        return 0
      }
    } else {
      props = properties.slice(0)
      property = props.shift()
      return result
    }
  }
}
