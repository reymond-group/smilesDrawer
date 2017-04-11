'use strict'
const arrayify = require('array-back')
const path = require('path')

/**
 * @module jsdoc-command
 */

/**
 * Command base class. The command `receiver` being the `child_process` module.
 * @abstract
 */
class JsdocCommand {
  constructor (options, cache) {
    require('promise.prototype.finally')
    options = options || {}
    options.files = arrayify(options.files)

    this.cache = cache
    this.tempFile = null
    const TempFile = require('./temp-file')
    if (options.source) this.tempFile = new TempFile(options.source)

    const jsdocOptions = Object.assign({}, options)
    delete jsdocOptions.files
    delete jsdocOptions.source
    delete jsdocOptions.cache

    this.options = options
    this.jsdocOptions = jsdocOptions

    const walkBack = require('walk-back')
    this.jsdocPath = walkBack(
      path.join(__dirname, '..'),
      path.join('node_modules', 'jsdoc-75lb', 'jsdoc.js')
    )
  }

  /**
   * Template method returning the jsdoc output. Invoke later (for example via a command-queuing system) or immediately as required.
   *
   * 1. preExecute
   * 2. validate
   * 3. getOutput
   * 4. postExecute
   *
   */
  execute () {
    this.preExecute()
    const err = this.validate()
    this.output = this.getOutput(err)
    if (this.output instanceof Promise) {
      this.output.finally(() => {
        this.postExecute()
      })
    } else {
      this.postExecute()
    }
    return this.output
  }

  /**
   * Perform pre-execution processing here, e.g. expand input glob patterns.
   */
  preExecute () {
    const FileSet = require('file-set')
    this.inputFileSet = new FileSet(this.options.files)
  }

  /**
   * Return an Error instance if execution should not proceed.
   * @returns {null|Error}
   */
  validate () {
    const assert = require('assert')
    assert.ok(
      this.options.files.length || this.options.source,
      'Must set either .files or .source'
    )

    if (this.inputFileSet.notExisting.length) {
      const err = new Error('These files do not exist: ' + this.inputFileSet.notExisting)
      err.name = 'JSDOC_ERROR'
      return err
    }
  }

  /**
   * perform post-execution cleanup
   */
  postExecute () {
    if (this.tempFile) {
      this.tempFile.delete()
    }
  }

  verifyOutput (code, output) {
    let parseFailed = false
    let parsedOutput
    try {
      parsedOutput = JSON.parse(output.stdout)
    } catch (err) {
      parseFailed = true
    }

    if (code > 0 || parseFailed) {
      const firstLineOfStdout = output.stdout.split(/\r?\n/)[0]
      const err = new Error(output.stderr.trim() || firstLineOfStdout || 'Jsdoc failed.')
      err.name = 'JSDOC_ERROR'
      throw err
    } else {
      return parsedOutput
    }
  }

  /**
   * Returns a cached recordset
   * @returns {Promise}
   * @fulfil {object[]}
   */
  readCache () {
    if (this.cache) {
      const fs = require('then-fs')
      const promises = this.inputFileSet.files.map(file => fs.readFile(file, 'utf8'))
      return Promise.all(promises)
        .then(contents => {
          this.cacheKey = contents.concat(this.inputFileSet.files)
          return this.cache.read(this.cacheKey)
        })
    } else {
      return Promise.reject()
    }
  }

  readCacheSync () {
    if (this.cache) {
      const fs = require('fs')
      const contents = this.inputFileSet.files.map(file => fs.readFileSync(file, 'utf8'))
      this.cacheKey = contents.concat(this.inputFileSet.files)
      return this.cache.readSync(this.cacheKey)
    }
  }
}

module.exports = JsdocCommand
