#!/usr/bin/env node
'use strict'
const commandLineCommands = require('../../')
const commandLineArgs = require('command-line-args')
const commandLineUsage = require('command-line-usage')
const argData = require('./arg-data')

const { command, argv } = commandLineCommands([ null, 'help', 'commit' ])

/* important: pass in the argv returned by `commandLineCommands()` */
const options = commandLineArgs(argData[command].definitions, argv)
const usage = commandLineUsage(argData[command].usage)

switch (command) {
  case null:
    if (options.version) {
      console.log('version 90')
    } else {
      console.log(usage)
    }
    break

  case 'help':
    if (options.topic) {
      console.log(commandLineUsage(argData[options.topic].usage))
    } else {
      console.log(commandLineUsage(argData.help.usage))
    }
    break

  case 'commit':
    if (options.message) {
      console.log('commit: ' + options.message)
    } else {
      console.log(usage)
    }
    break
}
