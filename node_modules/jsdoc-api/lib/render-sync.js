'use strict'
const JsdocCommand = require('./jsdoc-command')

/**
 * @static
 */
class RenderSync extends JsdocCommand {
  getOutput (err) {
    if (err) throw err
    const toSpawnArgs = require('object-to-spawn-args')
    const jsdocArgs = toSpawnArgs(this.jsdocOptions)
      .concat(this.options.source ? this.tempFile.path : this.options.files)

    jsdocArgs.unshift(this.jsdocPath)

    const spawnSync = require('child_process').spawnSync
    spawnSync('node', jsdocArgs)
  }
}

module.exports = RenderSync
