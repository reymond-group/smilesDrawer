'use strict'
const commandLineCommands = require('../')
const minimist = require('minimist')

const validCommands = [ 'load', 'print' ]
const { command, argv } = commandLineCommands(validCommands)

/* pass in the argv returned by `commandLineCommands()` */
const options = minimist(argv)

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
