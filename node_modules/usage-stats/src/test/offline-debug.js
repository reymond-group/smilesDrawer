'use strict'
const TestRunner = require('test-runner')
const UsageStats = require('../../')
const a = require('core-assert')
const shared = require('./lib/shared')

const runner = new TestRunner()

runner.test('.debug() live screenview: resolves with result, hit queued', function () {
  const testStats = new UsageStats('UA-70853320-4', {
    name: 'usage-stats',
    version: require('../../package').version,
    dir: shared.getCacheDir(this.index, 'debug')
  })

  testStats.screenView(this.name)
  return testStats.debug()
    .then(responses => {
      const response = responses[0]
      a.strictEqual(response.hits.length, 1)
      a.strictEqual(response.hits[0].get('t'), 'screenview')
      a.strictEqual(response.result.hitParsingResult[0].valid, true)
      const queued = testStats._dequeue()
      a.strictEqual(queued.length, 0)
    })
    .catch(err => {
      if (err.code === 'ENOTFOUND') return Promise.resolve("offline, can't test")
      else throw err
    })
})

runner.test('.debug() live screenview with something queued: resolves, queue correct', function () {
  const testStats = new UsageStats('UA-70853320-4', {
    name: 'usage-stats',
    version: require('../../package').version,
    dir: shared.getCacheDir(this.index, 'debug')
  })
  const hit = testStats._createHit(new Map([[ 'one', 'test' ]]))
  testStats._enqueue(hit)
  testStats.screenView(this.name)
  return testStats.debug()
    .then(responses => {
      const response = responses[0]
      a.strictEqual(response.hits.length, 2)
      a.strictEqual(response.hits[0].get('one'), 'test')
      a.strictEqual(response.hits[1].get('t'), 'screenview')
      a.strictEqual(response.result.hitParsingResult[1].valid, true)
      const queued = testStats._dequeue()
      a.strictEqual(queued.length, 0)
    })
    .catch(err => {
      if (err.code === 'ENOTFOUND') return Promise.resolve("offline, can't test")
      else throw err
    })
})
