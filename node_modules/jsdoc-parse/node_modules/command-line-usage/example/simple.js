const getUsage = require('../')

const optionDefinitions = [
  {
    name: 'help', description: 'Display this usage guide.',
    alias: 'h', type: Boolean
  },
  {
    name: 'src', description: 'The input files to process',
    type: String, multiple: true, defaultOption: true
  },
  {
    name: 'timeout', description: 'Timeout value in ms',
    alias: 't', type: Number
  }
]

const options = {
  title: 'a typical app',
  description: 'Generates something very important. This is a rather long, but ultimately inconsequential description intended solely to demonstrate description appearance. ',
  footer: 'Project home: [underline]{https://github.com/me/example}'
}

console.log(getUsage(optionDefinitions, options))
