'use strict'
const t = require('typical')

class Command {
  optionDefinitions () {
    return [
      { name: 'help', type: Boolean, alias: 'h' },
      { name: 'debug', type: Boolean, description: 'Use debug service' },
      { name: 'tid', type: String, description: 'Tracking ID' },
      { name: 'an', type: String, description: 'App name' },
      { name: 'av', type: String, description: 'App version' },
      { name: 'cd1', type: String, description: 'Custom Dimension 1' },
      { name: 'cd2', type: String, description: 'Custom Dimension 1' },
      { name: 'cd3', type: String, description: 'Custom Dimension 1' },
      { name: 'cd4', type: String, description: 'Custom Dimension 1' },
      { name: 'cd5', type: String, description: 'Custom Dimension 1' },
      { name: 'cd6', type: String, description: 'Custom Dimension 1' },
      { name: 'cd7', type: String, description: 'Custom Dimension 1' },
      { name: 'cd8', type: String, description: 'Custom Dimension 1' },
      { name: 'cd9', type: String, description: 'Custom Dimension 1' },
      { name: 'cd10', type: String, description: 'Custom Dimension 1' },
      { name: 'cd11', type: String, description: 'Custom Dimension 1' },
      { name: 'cd12', type: String, description: 'Custom Dimension 1' },
      { name: 'cd13', type: String, description: 'Custom Dimension 1' },
      { name: 'cd14', type: String, description: 'Custom Dimension 1' },
      { name: 'cd15', type: String, description: 'Custom Dimension 1' },
      { name: 'cd16', type: String, description: 'Custom Dimension 1' },
      { name: 'cd17', type: String, description: 'Custom Dimension 1' },
      { name: 'cd18', type: String, description: 'Custom Dimension 1' },
      { name: 'cd19', type: String, description: 'Custom Dimension 1' },
      { name: 'cd20', type: String, description: 'Custom Dimension 1' },
      { name: 'cm1', type: String, description: 'Custom Metric 1' },
      { name: 'cm2', type: String, description: 'Custom Metric 1' },
      { name: 'cm3', type: String, description: 'Custom Metric 1' },
      { name: 'cm4', type: String, description: 'Custom Metric 1' },
      { name: 'cm5', type: String, description: 'Custom Metric 1' },
      { name: 'cm6', type: String, description: 'Custom Metric 1' },
      { name: 'cm7', type: String, description: 'Custom Metric 1' },
      { name: 'cm8', type: String, description: 'Custom Metric 1' },
      { name: 'cm9', type: String, description: 'Custom Metric 1' },
      { name: 'cm10', type: String, description: 'Custom Metric 1' },
      { name: 'cm11', type: String, description: 'Custom Metric 1' },
      { name: 'cm12', type: String, description: 'Custom Metric 1' },
      { name: 'cm13', type: String, description: 'Custom Metric 1' },
      { name: 'cm14', type: String, description: 'Custom Metric 1' },
      { name: 'cm15', type: String, description: 'Custom Metric 1' },
      { name: 'cm16', type: String, description: 'Custom Metric 1' },
      { name: 'cm17', type: String, description: 'Custom Metric 1' },
      { name: 'cm18', type: String, description: 'Custom Metric 1' },
      { name: 'cm19', type: String, description: 'Custom Metric 1' },
      { name: 'cm20', type: String, description: 'Custom Metric 1' }

    ]
  }
  usage () {
    const optionDefinitions = this.optionDefinitions()
      .filter(def => !(def.name.startsWith('cd') || def.name.startsWith('cm')))
    optionDefinitions.push({
      name: 'cd[italic]{n}',
      type: String,
      description: 'Custom Dimension [italic]{n}, where [italic]{n} is an index between 1 and 20.'
    })
    optionDefinitions.push({
      name: 'cm[italic]{n}',
      type: String,
      description: 'Custom Metric [italic]{n}, where [italic]{n} is an index between 1 and 20.'
    })
    return [
      { header: 'Options', optionList: optionDefinitions }
    ]
  }
  execute () {
    throw new Error('not implemented')
  }
  cliView (data) {
    if (t.isString(data) || !t.isDefined(data)) {
      return data
    } else {
      return require('util').inspect(data, { depth: 13, colors: true })
    }
  }
}

Command.create = function () {
  return new this(...arguments)
}

module.exports = Command
