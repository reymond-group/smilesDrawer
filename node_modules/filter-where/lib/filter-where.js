'use strict'
var testValue = require('test-value')

/**
 * Filter an array using any combination of scalars, object queries, functions or regular expressions.
 *
 * @module filter-where
 */
module.exports = where

/**
 * @param {any | any[]} - one or more queries
 * @returns {function}
 * @alias module:filter-where
 * @example
 * Say you have a recordset:
 * ```js
 * > data = [
 *     { name: 'Dana', age: 30 },
 *     { name: 'Yana', age: 20 },
 *     { name: 'Zhana', age: 10 }
 * ]
 * ```
 *
 * You can return records with properties matching an exact value:
 * ```js
 * > data.filter(where({ age: 10 }))
 * [ { name: 'Zhana', age: 10 } ]
 * ```
 *
 * or where NOT the value (prefix the property name with `!`)
 * ```js
 * > data.filter(where({ '!age': 10 }))
 * [ { name: 'Dana', age: 30 }, { name: 'Yana', age: 20 } ]
 * ```
 *
 * match using a function:
 * ```js
 * > function over10(age){ return age > 10; }
 * > data.filter(where({ age: over10 }))
 * [ { name: 'Dana', age: 30 }, { name: 'Yana', age: 20 } ]
 * ```
 *
 * match using a regular expression
 * ```js
 * > data.filter(where({ name: /ana/ }))
 * [ { name: 'Dana', age: 30 },
 *   { name: 'Yana', age: 20 },
 *   { name: 'Zhana', age: 10 } ]
 * ```
 *
 * You can query to any arbitrary depth. So with deeper data, like this:
 * ```js
 * > deepData = [
 *     { name: 'Dana', favourite: { colour: 'light red' } },
 *     { name: 'Yana', favourite: { colour: 'dark red' } },
 *     { name: 'Zhana', favourite: { colour: [ 'white', 'red' ] } }
 * ]
 * ```
 *
 * get records with `favourite.colour` values matching `/red/`
 * ```js
 * > deepData.filter(where({ favourite: { colour: /red/ } }))
 * [ { name: 'Dana', favourite: { colour: 'light red' } },
 *   { name: 'Yana', favourite: { colour: 'dark red' } } ]
 * ```
 *
 * if the value you're looking for _maybe_ part of an array, prefix the property name with `+`. Now Zhana is included:
 * ```js
 * > deepData.filter(where({ favourite: { '+colour': /red/ } }))
 * [ { name: 'Dana', favourite: { colour: 'light red' } },
 *   { name: 'Yana', favourite: { colour: 'dark red' } },
 *   { name: 'Zhana', favourite: { colour: [ 'white', 'red' ] } } ]
 * ```
 *
 * you can combine any of the above by supplying an array of queries. Records will be returned if _any_ of the queries match:
 * ```js
 * > var nameBeginsWithY = { name: /^Y/ }
 * > var faveColourIncludesWhite = { favourite: { '+colour': 'white' } }
 *
 * > deepData.filter(where([ nameBeginsWithY, faveColourIncludesWhite ]))
 * [ { name: 'Yana', favourite: { colour: 'dark red' } },
 *   { name: 'Zhana', favourite: { colour: [ 'white', 'red' ] } } ]
 * ```
 */
function where (query) {
  return function (element) {
    return testValue(element, query)
  }
}
