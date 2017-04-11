'use strict'

/**
 * @module object-to-spawn-args
 */
module.exports = toSpawnArgs

/**
 * @param {object} - an object specifying the command-line options to set
 * @param [options] {object}
 * @param [options.quote] {boolean} - enquote the option values
 * @param [options.optionEqualsValue] {boolean} - use `--option=value` notation
 */
function toSpawnArgs(object, options) {
  var output = []
  options = options || {}

  for (var prop in object) {
    var value = object[prop]
    if (value !== undefined) {
      var dash = prop.length === 1 ? '-' : '--'
      if (options.optionEqualsValue) {
        if (value === true) {
          output.push(dash + prop)
        } else {
          if (Array.isArray(value)) {
            output.push(dash + prop + '=' + quote(value.join(','), options.quote))
          } else {
            output.push(dash + prop + '=' + quote(value, options.quote))
          }
        }
      } else {
        output.push(dash + prop)
        if (value !== true) {
          if (Array.isArray(value)) {
            value.forEach(function (item) {
              output.push(quote(item, options.quote))
            })
          } else {
            output.push(quote(value, options.quote))
          }
        }
      }
    }
  }
  return output
}

function quote(value, toQuote) {
  return toQuote ? '"' + value + '"' : value
}
