'use strict'
const commandLineUsage = require('command-line-usage')

const sections = [
  {
    header: 'Example App',
    content: 'Generates something [italic]{very} important.'
  },
  {
    header: 'Synopsis',
    content: '$ app <options> <command>'
  },
  {
    header: 'Command List',
    content: [
      { name: 'help', summary: 'Display help information about Git.' },
      { name: 'commit', summary: 'Record changes to the repository.' },
      { name: 'Version', summary: 'Print the version.' },
      { name: 'etc', summary: 'Etc.' }
    ]
  }
]

const usage = commandLineUsage(sections)
console.log(usage)
