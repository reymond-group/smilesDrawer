'use strict'
const TestRunner = require('test-runner')
const UsageStats = require('../../')
const a = require('core-assert')
const runner = new TestRunner()
const shared = require('./lib/shared')

runner.test('.debug() live screenview: resolves with result', function () {
  const testStats = new UsageStats('UA-70853320-4', {
    name: 'usage-stats',
    version: require('../../package').version,
    dir: shared.getCacheDir(this.index, 'debug'),
    an: 'testsuite'
  })

  testStats.screenView(this.name)
  return testStats.debug()
    .then(responses => {
      const response = responses[0]
      a.strictEqual(response.hits.length, 1)
      a.strictEqual(response.hits[0].get('t'), 'screenview')
      a.strictEqual(response.result.hitParsingResult[0].valid, true)
    })
    .catch(err => {
      if (err.code === 'ENOTFOUND') return Promise.resolve("offline, can't test")
      else throw err
    })
})
