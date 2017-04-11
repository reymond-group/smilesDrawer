'use strict'
const TestRunner = require('test-runner')
const TrackUsage = require('../../')
const a = require('core-assert')
const rimraf = require('rimraf')
const mkdirp = require('mkdirp')

const runner = new TestRunner()
const tid = 'UA-70853320-4'

rimraf.sync('tmp/test-exception')
mkdirp.sync('tmp/test-exception')

runner.test('.hit(dimensions, metrics)', function () {
  const usage = new TrackUsage(tid, { an: 'app-usage-stats' })
  usage.hit({ name: 'method1', interface: 'cli' }, { option1: 1, option2: 1 })
  usage.hit({ name: 'method1', interface: 'api' }, { option1: 1, option3: 1 })
  usage.hit({ name: 'method1', interface: 'api' }, { option1: 1 })
  usage.hit({ name: 'method2', interface: 'api' }, { option1: 1, option2: 1 })

  a.deepStrictEqual(usage.unsent.stats, [
    {
      dimension: {
        name: 'method1',
        interface: 'cli'
      },
      metric: {
        option1: 1,
        option2: 1
      }
    },
    {
      dimension: {
        name: 'method1',
        interface: 'api'
      },
      metric: {
        option1: 2,
        option3: 1
      }
    },
    {
      dimension: {
        name: 'method2',
        interface: 'api'
      },
      metric: {
        option1: 1,
        option2: 1
      }
    }
  ])
})
