'use strict'
const Command = require('./command')
const UsageStats = require('../../../')

class Exception extends Command {
  optionDefinitions () {
    return super.optionDefinitions().concat([
      { name: 'exd', type: String, description: 'Description' },
      { name: 'exf', type: Boolean, description: 'Is a fatal exception' }
    ])
  }
  usage () {
    const sections = super.usage()
    sections.unshift({ header: 'usage-stats exception', content: 'Track an exception.' })
    return sections
  }
  execute (options) {
    options = options || {}
    const usage = new UsageStats(options.tid, options)
    usage.exception(options)
    if (options.debug) {
      return usage.debug()
    } else {
      return usage.send()
    }
  }
}

module.exports = Exception
