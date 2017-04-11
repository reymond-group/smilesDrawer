'use strict'
const path = require('path')
const arrayify = require('array-back')
const fs = require('fs-then-native')

/**
 * A memoisation solution intended to cache the output of expensive operations, speeding up future invocations with the same input.
 * @module cache-point
 * @example
 * const Cache = require('cache-point')
 * const cache = new Cache({ dir: 'tmp/example' })
 *
 * // The first invocation will take 3s, the rest instantaneous.
 * // outputs: 'result'
 * getData('some input')
 *   .then(console.log)
 *
 * // check the cache for output generated with this input.
 * // cache.read() will resolve on hit, reject on miss.
 * function getData (input) {
 *   return cache
 *     .read(input)
 *     .catch(() => expensiveOperation(input))
 * }
 *
 * // The expensive operation we're aiming to avoid,
 * // (3 second cost per invocation)
 * function expensiveOperation (input) {
 *   return new Promise((resolve, reject) => {
 *     setTimeout(() => {
 *       const output = 'result'
 *       cache.write(input, output)
 *       resolve(output)
 *     }, 3000)
 *   })
 * }
 */

/**
 * @alias module:cache-point
 * @typicalname cache
 */
class Cache {
  /**
   * @param [options] {object}
   * @param [options.dir] {string}
   */
  constructor (options) {
    options = options || {}
    if (!options.dir) {
      var os = require('os')
      options.dir = path.resolve(os.tmpdir(), 'cachePoint')
    }
    /**
     * Current cache directory. Can be changed at any time.
     * @type {string}
     */
    this.dir = options.dir
  }

  get dir () {
    return this._dir
  }
  set dir (val) {
    this._dir = val
    const mkdirp = require('mkdirp')
    mkdirp.sync(this.dir)
  }

  /**
   * A cache hit resolves with the stored value, a miss rejects.
   * @param {*} - One or more values to uniquely identify the data. Can be any value, or an array of values of any type.
   * @returns {Promise}
   */
  read (keys) {
    const blobPath = path.resolve(this._dir, this.getChecksum(keys))
    return fs.readFile(blobPath).then(JSON.parse)
  }

  /**
   * A cache hit returns the stored value, a miss returns `null`.
   * @param {*} - One or more values to uniquely identify the data. Can be any value, or an array of values of any type.
   * @returns {string?}
   */
  readSync (keys) {
    const blobPath = path.resolve(this._dir, this.getChecksum(keys))
    try {
      const data = fs.readFileSync(blobPath, 'utf8')
      return JSON.parse(data)
    } catch (err) {
      return null
    }
  }

  /**
   * Write some data to the cache. Returns a promise which resolves when the write is complete.
   * @param {*} - One or more values to index the data, e.g. a request object or set of function args.
   * @param {*} - the data to store
   * @returns {Promise}
   */
  write (keys, content) {
    const blobPath = path.resolve(this._dir, this.getChecksum(keys))
    return fs.writeFile(blobPath, JSON.stringify(content))
  }

  /**
   * Write some data to the cache with a key.
   * @param {*} - One or more values to index the data, e.g. a request object or set of function args.
   * @param {*} - the data to store
   */
  writeSync (keys, content) {
    const blobPath = path.resolve(this._dir, this.getChecksum(keys))
    fs.writeFileSync(blobPath, JSON.stringify(content))
  }

  /**
   * Used internally to convert a key value into a hex checksum. Override if for some reason you need a different hashing strategy.
   * @param {*} - One or more values to index the data, e.g. a request object or set of function args.
   * @returns {string}
   */
  getChecksum (keys) {
    const crypto = require('crypto')
    const hash = crypto.createHash('sha1')
    arrayify(keys).forEach(key => hash.update(JSON.stringify(key)))
    return hash.digest('hex')
  }

  /**
   * Clears the cache. Returns a promise which resolves once the cache is clear.
   * @returns {Promise}
   */
  clear () {
    return fs.readdir(this._dir)
      .then(files => {
        const promises = files.map(file => fs.unlink(path.resolve(this._dir, file)))
        return Promise.all(promises)
      })
  }

  /**
   * Clears and removes the cache directory. Returns a promise which resolves once the remove is complete.
   * @returns {Promise}
   */
  remove () {
    return this.clear().then(() => {
      return fs.rmdir(this._dir)
    })
  }
}

module.exports = Cache
