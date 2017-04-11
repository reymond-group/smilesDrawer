'use strict'
const TestRunner = require('test-runner')
const UsageStats = require('../../')
const a = require('core-assert')
const runner = new TestRunner()
const shared = require('./lib/shared')

runner.test('.send(): screenview (live)', function () {
  const testStats = new UsageStats('UA-70853320-4', {
    name: 'usage-stats',
    version: require('../../package').version,
    dir: shared.getCacheDir(this.index),
    an: 'testsuite'
  })

  testStats.screenView(this.name)
  return testStats.send()
    .then(responses => {
      return responses.map(response => response.res.statusCode)
    })
    .catch(err => {
      if (err.code === 'ENOTFOUND') return Promise.resolve("offline, can't test")
    })
})

runner.test('.send(): offline throws', function () {
  class OfflineUsageStats extends UsageStats {
    _request () {
      return Promise.reject(new Error('offline'))
    }
  }

  const testStats = new OfflineUsageStats('UA-70853320-4', {
    name: 'usage-stats',
    version: require('../../package').version,
    dir: shared.getCacheDir(this.index),
    an: 'testsuite'
  })

  testStats.screenView(this.name)
  return testStats.send()
    .catch(err => {
      a.strictEqual(err.message, 'offline')
    })
})
