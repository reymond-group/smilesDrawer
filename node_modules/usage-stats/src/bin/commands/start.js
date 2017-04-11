'use strict'
const Command = require('./command')
const UsageStats = require('../../../')

class Start extends Command {
  usage () {
    const sections = super.usage()
    sections.unshift({ header: 'usage-stats start', content: 'Explicitly start a session.' })
    return sections
  }
  execute (options) {
    options = options || {}
    const usage = new UsageStats(options.tid, options)
    usage.start(options)
  }
}

module.exports = Start
