'use strict'
const Command = require('./command')
const UsageStats = require('../../../')

class Event extends Command {
  optionDefinitions () {
    return super.optionDefinitions().concat([
      { name: 'ec', type: String, description: 'Event category' },
      { name: 'ea', type: String, description: 'Event action' },
      { name: 'el', type: String, description: 'Event label' },
      { name: 'ev', type: String, description: 'Event value' }
    ])
  }
  usage () {
    const sections = super.usage()
    sections.unshift({ header: 'usage-stats event', content: 'Track an event.' })
    return sections
  }
  execute (options) {
    options = options || {}
    const usage = new UsageStats(options.tid, options)
    usage.event(options.ec, options.ea, options)
    if (options.debug) {
      return usage.debug()
    } else {
      return usage.send()
    }
  }
}

module.exports = Event
