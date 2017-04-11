'use strict'
const TestRunner = require('test-runner')
const UsageStats = require('../../')
const a = require('core-assert')
const runner = new TestRunner()
const shared = require('./lib/shared')

runner.test('.abort(): aborting throws, hit queued', function () {
  const http = require('http')
  const server = http.createServer((req, res) => {
    setTimeout(() => {
      res.statusCode = 200
      res.end('yeah?')
    }, 1000)
  })
  server.listen(9000)

  const testStats = new UsageStats('UA-00000000-0', {
    dir: shared.getCacheDir(this.index, 'abort'),
    url: 'http://localhost:9000'
  })
  testStats.screenView('test')

  return new Promise((resolve, reject) => {
    testStats.send()
      .then(responses => {
        reject(new Error('should not reach here'))
      })
      .catch(() => {
        const queued = testStats._dequeue()
        a.strictEqual(queued.length, 1)
        a.strictEqual(testStats._aborted, false)
        server.close()
        resolve()
      })
      .catch(err => {
        server.close()
        reject(err)
      })

    setTimeout(testStats.abort.bind(testStats), 50)
  })
})

runner.test('.abort(): called before .send() is a no-op', function () {
  const testStats = new UsageStats('UA-00000000-0')
  testStats.screenView('test')
  testStats.abort()
  a.ok(!this._aborted)
})

runner.test('.abort(): abort after a completed send is a no-op', function () {
  const http = require('http')
  const server = http.createServer((req, res) => {
    setTimeout(() => {
      res.statusCode = 200
      res.end('yeah?')
    }, 20)
  })
  server.listen(9020)

  const testStats = new UsageStats('UA-00000000-0', {
    dir: shared.getCacheDir(this.index, 'abort'),
    url: 'http://localhost:9020'
  })
  testStats.screenView('test')

  return new Promise((resolve, reject) => {
    testStats.send()
      .then(responses => {
        a.strictEqual(testStats.queueLength, 0)
        a.strictEqual(testStats._aborted, false)
        testStats.abort()
        a.strictEqual(testStats._aborted, false)
        server.close()
        resolve()
      })
      .catch(err => {
        console.error(err.stack)
        server.close()
        reject(err)
      })
  })
})

runner.test('.abort(): multiple requests - throws, all requests queued', function () {
  const http = require('http')
  const server = http.createServer((req, res) => {
    setTimeout(() => {
      res.statusCode = 200
      res.end('yeah?')
    }, 1000)
  })
  server.listen(9010)

  const testStats = new UsageStats('UA-00000000-0', {
    dir: shared.getCacheDir(this.index, 'abort'),
    url: 'http://localhost:9010'
  })

  for (let i = 0; i < 100; i++) {
    testStats._enqueue(new Map([[ 'hit', i ]]))
  }

  setTimeout(testStats.abort.bind(testStats), 50)

  return new Promise((resolve, reject) => {
    testStats.send()
      .then(responses => {
        server.close()
        reject(new Error('should not reach here'))
      })
      .catch(() => {
        a.strictEqual(testStats.queueLength, 100)
        a.strictEqual(testStats._aborted, false)
        server.close()
        resolve()
      })
      .catch(err => {
        server.close()
        reject(err)
      })
  })
})
