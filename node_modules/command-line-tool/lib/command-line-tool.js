'use strict'
const arrayify = require('array-back')
const ansi = require('ansi-escape-sequences')
const t = require('typical')

/**
 * Some conventional operations used in command-line tools.
 *
 * @module command-line-tool
 */

/**
 * @alias module:command-line-tool
 * @typicalname tool
 * @example
 * const tool = require('command-line-tool')
 */
class CommandLineTool {

  /**
   * Print the supplied messages then stop the process (no exit code).
   *
   * @param [message] {string|string[]} - One or more messages to be written to stderr before exiting. May contain `ansi.format` markup.
   */
  stop (message) {
    arrayify(message).forEach(function (msg) {
      console.error(ansi.format(msg))
    })
    process.exit(0)
  }

  /**
   * Prints one or more strings in red to stderr.
   *
   * @param {string | string[]} - input message(s)
   */
  printError (message) {
    arrayify(message).forEach(function (msg) {
      console.error(ansi.format(msg, 'red'))
    })
  }

  /**
   * Stop the process with an error message.
   *
   * @param [err] {Error} - the error instance
   * @param [options] {object}
   * @param [options.exitCode] {number} - defaults to 1
   * @param [options.stack] {boolean} - defaults to false
   */
  halt (err, options) {
    options = Object.assign({ exitCode: 1 }, options)
    if (err) {
      if (err.code === 'EPIPE') {
        process.exit(0) /* no big deal */
      } else {
        this.printError(t.isString(err) ? err : options.stack ? err.stack : err.message, options)
      }
    }
    process.exit(options.exitCode)
  }

  /**
   * Parse the command-line options.
   * @param definitions {OptionDefinitions[]} - to be passed to command-line-args
   * @param [usageSections] {section[]} - to be passed to command-line-usage
   * @param [argv] {string[]} - If supplied, this `argv` array is parsed instead of `process.argv`.
   * @returns {object}
   */
  getCli (definitions, usageSections, argv) {
    const commandLineArgs = require('command-line-args')
    const commandLineUsage = require('command-line-usage')
    const usage = usageSections ? commandLineUsage(usageSections) : ''
    const options = commandLineArgs(definitions, argv)
    return { options, usage }
  }
}

module.exports = CommandLineTool
