'use strict'
const TestRunner = require('test-runner')
const UsageStats = require('../../')
const a = require('core-assert')
const runner = new TestRunner()
const shared = require('./lib/shared')
const fs = require('fs')

runner.test('._enqueue(hits): writes hits to cacheDir', function () {
  const testStats = new UsageStats('UA-00000000-0', { dir: shared.getCacheDir(this.index) })
  const hit1 = new Map([[ 'hit', 1 ]])
  const hit2 = new Map([[ 'hit', 2 ]])
  const hit3 = new Map([[ 'hit', 3 ]])
  testStats._enqueue([ hit1, hit2 ])
  testStats._enqueue(hit3)
  const queue = fs.readFileSync(testStats._queuePath, 'utf8')
  a.strictEqual(queue, '[["hit",1]]\n[["hit",2]]\n[["hit",3]]\n')
})

/* REMOVE SESSION CONTROL ON ABORT, BUT NOT ON REGULAR BEHAVIOUR.. MAYBE. */
runner.skip('._enqueue(): remove session control from queued hits', function () {
  const testStats = new UsageStats('UA-00000000-0', { dir: shared.getCacheDir(this.index) })
  const hit1 = new Map([[ 'hit', 1 ], [ 'sc', 'start' ]])
  testStats._enqueue(hit1)
  let queue = fs.readFileSync(testStats._queuePath, 'utf8')
  a.strictEqual(queue, '[["hit",1]]\n')
  const hit2 = new Map([[ 'hit', 2 ], [ 'cd1', 'test' ]])
  testStats._enqueue(hit2)
  queue = fs.readFileSync(testStats._queuePath, 'utf8')
  a.strictEqual(queue, '[["hit",1]]\n[["hit",2],["cd1","test"]]\n')
})

runner.test('._dequeue(count): removes and returns hits', function () {
  const testStats = new UsageStats('UA-00000000-0', { dir: shared.getCacheDir(this.index) })
  const hit1 = new Map([[ 'hit', 1 ]])
  const hit2 = new Map([[ 'hit', 2 ]])
  const hit3 = new Map([[ 'hit', 3 ]])
  const hit4 = new Map([[ 'hit', 4 ]])
  testStats._enqueue([ hit1, hit2, hit3, hit4 ])

  let queue = testStats._dequeue(2)
  a.deepEqual(queue, [ hit1, hit2 ])
  queue = testStats._dequeue(1)
  a.deepEqual(queue, [ hit3 ])
  queue = testStats._dequeue(2)
  a.deepEqual(queue, [ hit4 ])
  queue = testStats._dequeue(2)
  a.deepEqual(queue, [])
})

runner.test('._dequeue(): handles garbage on the queue', function () {
  const testStats = new UsageStats('UA-00000000-0', { dir: shared.getCacheDir(this.index) })
  fs.writeFileSync(testStats._queuePath, 'blah')

  let queue
  a.doesNotThrow(() => (queue = testStats._dequeue()))
  a.deepEqual(queue, [])
})

runner.test('.send(): failed with nothing queued - throws', function () {
  class UsageTest extends UsageStats {
    _request () {
      return Promise.reject(new Error('failed'))
    }
  }

  const testStats = new UsageTest('UA-00000000-0', { dir: shared.getCacheDir(this.index, 'offline') })
  testStats.screenView('test')
  return new Promise((resolve, reject) => {
    testStats.send()
      .then(responses => {
        reject(new Error("shouldn't reach here"))
      })
      .catch(err => {
        if (err.message === 'failed') {
          resolve()
        } else {
          reject(err)
        }
      })
  })
})

runner.test('.send(): failed with nothing queued - hit is queued', function () {
  class UsageTest extends UsageStats {
    _request () {
      return Promise.reject(new Error('failed'))
    }
  }

  const testStats = new UsageTest('UA-00000000-0', { dir: shared.getCacheDir(this.index, 'offline') })
  testStats.screenView('test')
  return new Promise((resolve, reject) => {
    testStats.send()
      .then(() => {
        reject(new Error('should not reach here'))
      })
      .catch(() => {
        const queued = testStats._dequeue()
        a.strictEqual(queued.length, 1)
        a.strictEqual(queued[0].get('cd'), 'test')
        resolve()
      })
      .catch(reject)
  })
})

runner.test('.send(): failed with something queued - all hits queued', function () {
  class UsageTest extends UsageStats {
    _request () {
      return Promise.reject(new Error('failed'))
    }
  }

  const testStats = new UsageTest('UA-00000000-0', { dir: shared.getCacheDir(this.index, 'offline') })
  const hit = testStats._createHit(new Map([[ 'one', 'test' ]]))
  testStats._enqueue(hit)
  testStats.screenView('test')
  return new Promise((resolve, reject) => {
    testStats.send()
      .then(() => {
        reject(new Error('should not reach here'))
      })
      .catch(responses => {
        const queued = testStats._dequeue()
        a.strictEqual(queued.length, 2)
        a.strictEqual(queued[0].get('one'), 'test')
        a.strictEqual(queued[1].get('cd'), 'test')
        resolve()
      })
      .catch(reject)
  })
})
