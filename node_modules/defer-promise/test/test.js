const TestRunner = require('test-runner')
const defer = require('../')

const runner = new TestRunner()

runner.test('resolve', function () {
  const deferred = defer()
  process.nextTick(() => {
    deferred.resolve('ok')
  })
  return deferred.promise
})

runner.test('reject', function () {
  const deferred = defer()
  process.nextTick(() => {
    deferred.reject(new Error('test'))
  })
  return deferred.promise
    .then(() => {
      throw new Error('failed')
    })
    .catch(err => {
      if (err.message === 'test') {
        return 'ok'
      } else {
        throw err
      }
    })
})
