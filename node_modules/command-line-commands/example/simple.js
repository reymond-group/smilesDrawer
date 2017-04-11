'use strict'
const commandLineCommands = require('../')
const commandLineArgs = require('command-line-args')

const validCommands = [ 'load', 'print' ]
const { command, argv } = commandLineCommands(validCommands)

const optionDefinitions = {
  load: [
    { name: 'file', type: String }
  ],
  print: [
    { name: 'colour', type: Boolean }
  ]
}

/* important: pass in the argv returned by `commandLineCommands()` */
const options = commandLineArgs(optionDefinitions[command], argv)

switch (command) {
  case 'load':
    if (options.file) {
      console.log(`Loading: ${options.file}`)
    } else {
      console.log('please supply a filename')
    }
    break

  case 'print':
    console.log('Printing %s', options.colour ? 'in colour' : 'in B&W' )
    break
}
