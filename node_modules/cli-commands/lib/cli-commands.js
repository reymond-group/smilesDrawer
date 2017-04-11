'use strict'
const commandLineCommands = require('command-line-commands')
const commandLineArgs = require('command-line-args')
const commandLineUsage = require('command-line-usage')

/**
 * A convention for building command-driven CLI apps.
 * @module cli-commands
 * @example
 * const cliCommands = new CliCommmands([
 *  { name: 'send', description: 'Send something', command: require('send-command').create() },
 *  { name: 'logs', description: 'View the logs', command: require('logs-command').create() },
 * ])
 */

/**
 * @alias module:cli-commands
 */
class CliCommmands {
  /**
   * @param {object[]} - One or more command definitions.
   */
  constructor (commandDefinitions) {
    if (!commandDefinitions || (commandDefinitions && !commandDefinitions.length)) throw new Error('Command definitions required')
    // validate: every definition must have a command

    let commandName, argv
    try {
      ({ command: commandName, argv } = commandLineCommands(commandDefinitions.map(c => c.name)))
    } catch (err) {
      halt(err)
    }

    const cmd = commandDefinitions.find(c => c.name === commandName).command
    const command = typeof cmd === 'string' ? require(cmd).create() : cmd

    let options = {}
    if (cmd.optionDefinitions) {
      options = commandLineArgs(cmd.optionDefinitions(), argv)
    }
    if (options.help) {
      console.error(commandLineUsage(cmd.usage()))
    } else {
      let result
      try {
        Promise.resolve(cmd.execute(options))
          .then(output => cmd.cliView ? cmd.cliView(output, options) : output)
          .then(output => typeof output !== 'undefined' && console.log(output))
          .catch(halt)
      } catch (err) {
        halt(err)
      }
    }
  }
}

function halt (err) {
  const ansi = require('ansi-escape-sequences')
  console.error(ansi.format('Error: ' + err.message, 'red'))
  process.exit(1)
}

module.exports = CliCommmands
