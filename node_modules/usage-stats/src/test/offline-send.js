'use strict'
const TestRunner = require('test-runner')
const UsageStats = require('../../')
const a = require('core-assert')
const os = require('os')
const runner = new TestRunner()
const shared = require('./lib/shared')

runner.test('.send(): successful with nothing queued - still nothing queued', function () {
  class UsageTest extends UsageStats {
    _request (reqOptions, data) {
      return Promise.resolve({ res: { statusCode: 200 }, data: 'test' })
    }
  }

  const testStats = new UsageTest('UA-00000000-0', { dir: shared.getCacheDir(this.index), an: 'test' })
  testStats.screenView('test')
  return testStats.send()
    .then(responses => {
      if (responses[0].err && responses[0].err.code === 'ENOTFOUND') return Promise.resolve("offline, can't test")
      a.strictEqual(responses.length, 1)
      a.strictEqual(responses[0].data, 'test')
      const queued = testStats._dequeue()
      a.strictEqual(queued.length, 0)
    })
})

runner.test('.send(): successful with something queued - all hits sent and queue emptied', function () {
  class UsageTest extends UsageStats {
    _request (reqOptions, data) {
      const lines = data.trim().split(os.EOL)
      a.ok(/hit=1/.test(lines[0]))
      a.ok(/cd=test/.test(lines[1]))
      return Promise.resolve({ res: { statusCode: 200 }, data: 'test' })
    }
  }

  const testStats = new UsageTest('UA-00000000-0', {
    an: 'usage-stats',
    av: require('../../package').version,
    dir: shared.getCacheDir(this.index)
  })
  const hit = new Map([[ 'hit', 1 ]])
  testStats._enqueue(hit)
  testStats.screenView('test')
  return testStats.send()
    .then(responses => {
      if (responses[0].err && responses[0].err.code === 'ENOTFOUND') return Promise.resolve("offline, can't test")
      const queued = testStats._dequeue()
      a.strictEqual(queued.length, 0)
    })
})
