#!/usr/bin/env node
'use strict'
var Tool = require('command-line-tool')
var tool = new Tool()
var dmd = require('../')
var fs = require('fs')

var optionDefinitions = dmd.cliOptions.concat([
  { name: 'help', alias: 'h', type: Boolean }
])
var usageSections = [
  {
    header: 'dmd',
    content: 'Generate markdown API documentation'
  },
  {
    header: 'Synopsis',
    content: [
      '$ cat jsdoc-parse-output.json | dmd <options>',
      '$ dmd --help'
    ]
  },
  {
    header: 'Options',
    optionList: optionDefinitions
  },
  {
    content: 'Project home: [underline]{https://github.com/jsdoc2md/dmd}'
  }
]

try {
  var cli = tool.getCli(optionDefinitions, usageSections)
  var options = cli.options
} catch (err) {
  tool.halt(err)
}

if (options.help) {
  tool.stop(cli.usage)
}

if (options.template) {
  options.template = fs.readFileSync(options.template, 'utf8')
}

var dmdStream = dmd(options)
dmdStream.on('error', function (err) {
  tool.halt(err, { stack: true })
})

process.stdin.pipe(dmdStream).pipe(process.stdout)
