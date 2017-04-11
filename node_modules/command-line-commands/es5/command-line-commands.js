'use strict';

module.exports = commandLineCommands;

function commandLineCommands(commands, argv) {
  var arrayify = require('array-back');
  var option = require('./option');

  if (!commands || Array.isArray(commands) && !commands.length) {
    throw new Error('Please supply one or more commands');
  }
  if (argv) {
    argv = arrayify(argv);
  } else {
    argv = process.argv.slice(0);
    argv.splice(0, 2);
  }

  var command = option.isOption(argv[0]) || !argv.length ? null : argv.shift();

  if (arrayify(commands).indexOf(command) === -1) {
    var err = new Error('Command not recognised: ' + command);
    err.command = command;
    err.name = 'INVALID_COMMAND';
    throw err;
  }

  return { command: command, argv: argv };
}