'use strict'
const TestRunner = require('test-runner')
const fsThen = require('../../')
const fs = require('fs')
const runner = new TestRunner()
const rimraf = require('rimraf')
const a = require('core-assert')

rimraf.sync('tmp')
fsThen.mkdirSync('tmp')

runner.test('.writeFile(): good', function () {
  return fsThen.writeFile('tmp/one', 'one')
    .then(() => {
      return fs.existsSync('tmp/one')
    })
})

runner.test('.writeFile(): bad', function () {
  return fsThen.writeFile('asfsaffsa/one', 'one')
    .then(() => {
      throw new Error("shouldn't reach here")
    })
    .catch(err => {
      if (err.code === 'ENOENT') {
        return
      } else {
        throw err
      }
    })
})

runner.test('.readFile(): good', function () {
  return fsThen.readFile('src/test/fixture/file.txt', 'utf-8')
    .then(content => {
      a.strictEqual(content, 'test\n')
    })
})

runner.test('.readFile(): bad', function () {
  return fsThen.readFile('lidnfklgeroasosn')
    .then(content => {
      throw new Error("shouldn't reach here")
    })
    .catch(err => {
      if (err.code === 'ENOENT') {
        return
      } else {
        throw err
      }
    })
})

runner.test('.readdir(): good', function () {
  return fsThen.readdir('src/test/fixture')
    .then(files => {
      a.deepStrictEqual(files, [ 'file.txt' ])
    })
})

runner.test('.readdir(): bad', function () {
  return fsThen.readdir('lidnfklgeroasosn')
    .then(files => {
      throw new Error("shouldn't reach here")
    })
    .catch(err => {
      if (err.code === 'ENOENT') {
        return
      } else {
        throw err
      }
    })
})

runner.test('.mkdir() and .rmdir(): good', function () {
  return fsThen.mkdir('tmp/deleteMe')
    .then(() => {
      a.strictEqual(fs.existsSync('tmp/deleteMe'), true)
    })
    .then(() => {
      return fsThen.rmdir('tmp/deleteMe')
        .then(() => {
          a.strictEqual(fs.existsSync('tmp/deleteMe'), false)
        })
    })
})

runner.test('.mkdir(): bad', function () {
  return fsThen.mkdir()
    .then(files => {
      throw new Error("shouldn't reach here")
    })
    .catch(err => {
      if ((err instanceof TypeError)) {
        return
      } else {
        throw err
      }
    })
})

runner.test('.rmdir(): bad', function () {
  return fsThen.rmdir()
    .then(files => {
      throw new Error("shouldn't reach here")
    })
    .catch(err => {
      if ((err instanceof TypeError)) {
        return
      } else {
        throw err
      }
    })
})

runner.test('everything else exists', function () {
  a.ok(fsThen.chown && fsThen.lstat && fsThen.symlink && fs.watch)
})

runner.test('.unlink(): good', function () {
  const filename = 'tmp/deleteThisFile'
  return fsThen.writeFile(filename, '')
    .then(() => {
      a.strictEqual(fs.existsSync(filename), true)
      return fsThen.unlink(filename)
        .then(() => {
          a.strictEqual(fs.existsSync(filename), false)
        })
    })
})

runner.test('.unlink(): bad', function () {
  return fsThen.unlink('lidnfklgeroasosn')
    .then(content => {
      throw new Error("shouldn't reach here")
    })
    .catch(err => {
      if (err.code === 'ENOENT') {
        return
      } else {
        throw err
      }
    })
})
