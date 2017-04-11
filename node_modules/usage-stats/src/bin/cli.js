'use strict'
const CliCommands = require('cli-commands')

const commandDefinitions = [
  { name: null, desc: '' },
  // { name: 'start', desc: 'Explicitly start a session', command: require('./commands/start').create() },
  { name: 'screenview', desc: 'Track a screenview', command: require('./commands/screenview').create() },
  { name: 'event', desc: 'Track an event', command: require('./commands/event').create() },
  // { name: 'end', desc: 'Explicitly end a session', command: require('./commands/end').create() },
  // { name: 'send', desc: 'Send the queued hits', command: require('./commands/send').create() },
  { name: 'exception', desc: 'Track an exception', command: require('./commands/exception').create() }
]
commandDefinitions[0].command = require('./commands/no-command').create(commandDefinitions)

const cli = new CliCommands(commandDefinitions)
