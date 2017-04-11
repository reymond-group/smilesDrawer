'use strict'
const path = require('path')
const walkBack = require('walk-back')

/**
 * A convention for storing and retrieving application config. You supply a string (e.g. `'example-app'`), the libary will walk up the directory tree merging config stored for this app. The following locations are searched, with the latter taking precedence:
 *
 * - any package.json, beneath the `example-app` property
 * - any `.example-app.json` files
 *
 * @module config-master
 */
module.exports = loadConfig

/**
 * @param {string} - config name
 * @param [options] {object} - options
 * @param [options.startFrom] {string} - directory to begin looking for config
 * @returns {Object}
 * @alias module:config-master
 */
function loadConfig (configName, options) {
  options = options || {}
  const configFileName = '.' + configName + '.json'
  const startFrom = options.startFrom || process.cwd()

  const configs = Array.from(configsInTree(startFrom, configFileName)).reverse()
  const packageConfigs = Array.from(packageConfigsInTree(startFrom, configName)).reverse()
  return Object.assign.apply(null, [ {} ].concat(packageConfigs).concat(configs))
}

function * configsInTree (startFrom, fileName) {
  let file
  while ((file = walkBack(startFrom, fileName))) {
    yield require(file)
    startFrom = path.resolve(path.dirname(file), '..')
  }
}

function * packageConfigsInTree (startFrom, configName) {
  let file
  while ((file = walkBack(startFrom, 'package.json'))) {
    let config = require(file)[configName]
    if (config) yield config
    startFrom = path.resolve(path.dirname(file), '..')
  }
}
