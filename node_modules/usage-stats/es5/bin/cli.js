'use strict';

var CliCommands = require('cli-commands');

var commandDefinitions = [{ name: null, desc: '' }, { name: 'screenview', desc: 'Track a screenview', command: require('./commands/screenview').create() }, { name: 'event', desc: 'Track an event', command: require('./commands/event').create() }, { name: 'exception', desc: 'Track an exception', command: require('./commands/exception').create() }];
commandDefinitions[0].command = require('./commands/no-command').create(commandDefinitions);

var cli = new CliCommands(commandDefinitions);