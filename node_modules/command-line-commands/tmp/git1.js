#!/usr/bin/env node
'use strict'
const commandLineCommands = require('../')

const commands = [
  {
    name: null,
    definitions: [
      { name: 'version', alias: 'v', type: Boolean, description: 'Print the version number.' }
    ],
    usage: {
      title: 'git',
      description: 'Git is a free and open source distributed version control system designed to handle everything from small to very large projects with speed and efficiency.'
    }
  },
  {
    name: 'help',
    usage: {
      title: 'git help',
      description: 'Show a list of available commands.'
    },
    definitions: [
      { name: 'topic', type: String, description: 'the topic to display help on', defaultOption: true }
    ]
  },
  {
    name: 'log',
    usage: {
      title: 'git log',
      description: 'Print a log of something.'
    },
    definitions: [
      { name: 'food', type: String, description: 'name of food' },
      { name: 'quantity', type: Number, description: 'quantity in kg' }
    ]
  },
  {
    name: 'commit',
    usage: {
      title: 'git commit',
      description: 'Commit some vicious work.'
    },
    definitions: [
      { name: 'message', type: String, description: 'Commit message.' }
    ]
  }
]

const clc = commandLineCommands(commands)
const command = clc.parse()

switch (command.name) {
  case null:
    console.log(command.options)
    console.log(command.getUsage())
    break
  case 'help':
    console.log(command.options)
    console.log(clc.getUsage(command))
    break
  case 'log':
    console.log('THIS IS THE EAT SHIT')
    console.log(command.options)
}
