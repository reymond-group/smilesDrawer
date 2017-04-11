'use strict'
const JsdocCommand = require('./jsdoc-command')

/**
 * @static
 */
class ExplainSync extends JsdocCommand {
  getOutput (err) {
    if (err) throw err
    if (this.options.cache) {
      const cached = this.readCacheSync()
      if (cached === null) {
        return this._runJsdoc()
      } else {
        return cached
      }
    } else {
      return this._runJsdoc()
    }
  }

  _runJsdoc () {
    const toSpawnArgs = require('object-to-spawn-args')
    const jsdocArgs = toSpawnArgs(this.jsdocOptions)
      .concat([ '-X' ])
      .concat(this.options.source ? this.tempFile.path : this.inputFileSet.files)

    jsdocArgs.unshift(this.jsdocPath)

    const spawnSync = require('child_process').spawnSync
    const result = spawnSync('node', jsdocArgs, { encoding: 'utf-8' })
    const explainOutput = this.verifyOutput(result.status, result)
    if (this.options.cache) {
      this.cache.writeSync(this.cacheKey, explainOutput)
    }
    return explainOutput
  }
}

module.exports = ExplainSync
