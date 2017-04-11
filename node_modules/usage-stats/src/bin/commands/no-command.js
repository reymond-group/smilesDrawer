'use strict'
const Command = require('./command')
const commandLineUsage = require('command-line-usage')

class NoCommand extends Command {
  constructor (commandList) {
    super()
    this.commandList = commandList
  }
  optionDefinitions () {
    return [
      { name: 'help', type: Boolean, alias: 'h' }
    ]
  }
  usage () {
    return [
      {
        header: 'usage-stats',
        content: 'A minimal, offline-friendly Google Analytics Measurement Protocol client for tracking usage statistics in shell and javascript applications.'
      },
      {
        header: 'Synopsis',
        content: [
          '$ usage-stats <command> <command-options>',
          '$ usage-stats <command> --help'
        ]
      },
      {
        header: 'Commands',
        content: this.commandList
          .filter(c => c.name !== null)
          .map(c => ({ name: c.name, desc: c.desc }))
      }
    ]
  }
  execute (options) {
    return Promise.resolve(commandLineUsage(this.usage()))
  }
}

module.exports = NoCommand
