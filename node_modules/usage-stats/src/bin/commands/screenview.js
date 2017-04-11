'use strict'
const Command = require('./command')
const UsageStats = require('../../../')

class ScreenView extends Command {
  optionDefinitions () {
    return super.optionDefinitions().concat([
      { name: 'cd', type: String, description: 'Screen name' }
    ])
  }
  usage () {
    const sections = super.usage()
    sections.unshift({ header: 'usage-stats screenview', content: 'Track a screen view.' })
    return sections
  }
  execute (options) {
    options = options || {}
    if (!options.cd) throw new Error('cd required')
    const usage = new UsageStats(options.tid, options)
    usage.screenView(options.cd, options)
    if (options.debug) {
      return usage.debug()
    } else {
      return usage.send()
    }
  }
}

module.exports = ScreenView
