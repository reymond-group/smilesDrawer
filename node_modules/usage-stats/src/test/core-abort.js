'use strict'
const TestRunner = require('test-runner')
const UsageStats = require('../../')
const a = require('core-assert')
const runner = new TestRunner()
const shared = require('./lib/shared')

function getServer (port, delay) {
  const http = require('http')
  const server = http.createServer((req, res) => {
    setTimeout(() => {
      res.statusCode = 200
      res.end('yeah?')
    }, delay)
  })
  server.listen(port)
  return server
}

runner.test('.abort(): aborting throws', function () {
  const server = getServer(9000, 1000)

  const testStats = new UsageStats('UA-00000000-0', {
    dir: shared.getCacheDir(this.index, 'abort'),
    url: 'http://localhost:9000',
    an: 'testsuite'
  })
  testStats.screenView('test')

  return new Promise((resolve, reject) => {
    testStats.send()
      .then(responses => {
        reject(new Error('should not reach here'))
      })
      .catch(() => {
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
  const testStats = new UsageStats('UA-00000000-0', { an: 'testsuite' })
  testStats.screenView('test')
  testStats.abort()
})

runner.test('.abort(): abort after a completed send is a no-op', function () {
  const server = getServer(9020, 20)

  const testStats = new UsageStats('UA-00000000-0', {
    dir: shared.getCacheDir(this.index, 'abort'),
    url: 'http://localhost:9020',
    an: 'testsuite'
  })
  testStats.screenView('test')

  return new Promise((resolve, reject) => {
    testStats.send()
      .then(responses => {
        testStats.abort()
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

runner.test('.abort(): multiple requests - throws', function () {
  const server = getServer(9010, 1000)

  const testStats = new UsageStats('UA-00000000-0', {
    dir: shared.getCacheDir(this.index, 'abort'),
    url: 'http://localhost:9010',
    an: 'testsuite'
  })

  for (let i = 0; i < 100; i++) {
    testStats.screenView('test')
  }

  setTimeout(testStats.abort.bind(testStats), 50)

  a.strictEqual(testStats._hits.length, 100)

  return new Promise((resolve, reject) => {
    testStats.send()
      .then(responses => {
        server.close()
        reject(new Error('should not reach here'))
      })
      .catch(() => {
        a.strictEqual(testStats._hits.length, 100)
        server.close()
        resolve()
      })
      .catch(err => {
        server.close()
        reject(err)
      })
  })
})

runner.test('.send({ timeout }): should abort after timeout period', function () {
  const server = getServer(9030, 1000)
  const testStats = new UsageStats('UA-00000000-0', {
    dir: shared.getCacheDir(this.index, 'abort'),
    url: 'http://localhost:9010',
    an: 'testsuite'
  })

  testStats.exception('test error', 1)
  return new Promise((resolve, reject) => {
    testStats.send({ timeout: 100 })
      .then(() => {
        server.close()
        reject()
      })
      .catch(() => {
        server.close()
        resolve()
      })
  })
})
