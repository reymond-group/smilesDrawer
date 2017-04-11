'use strict'
var TestRunner = require('test-runner')
var FileSet = require('../')
var a = require('core-assert')
var runner = new TestRunner()

runner.test('fileSet.notExisting', function () {
  var fileSet = new FileSet([ 'test/fixture/*', 'clive', 'test/fixture/folder2/**', 'test/fixture/[#f1ipping4nn0y1ing].dir.NAME--3[$2$$!]' ])

  a.deepEqual(fileSet.notExisting, [ 'clive' ])
})

runner.test('fileSet.files', function () {
  var fileSet = new FileSet([ 'test/fixture/*', 'clive', 'test/fixture/folder2/**' ])

  a.deepEqual(fileSet.files, [
    'test/fixture/[#f1ipping4nn0y1ing].file.NAME--3[$2$$!].mkv',
    'test/fixture/file1',
    'test/fixture/folder2/file3',
    'test/fixture/folder2/folder3/file4'
  ])
})

runner.test('fileSet.dirs', function () {
  var fileSet = new FileSet([ 'test/fixture/*', 'clive', 'test/fixture/folder2/**' ])
  a.deepEqual(fileSet.dirs, [
    'test/fixture/[#f1ipping4nn0y1ing].dir.NAME--3[$2$$!]/',
    'test/fixture/folder1/',
    'test/fixture/folder2/',
    'test/fixture/folder2/folder3/'
  ])
})

runner.test('special chars in filename', function () {
  var fileSet = new FileSet([ 'test/fixture/[#f1ipping4nn0y1ing].file.NAME--3[$2$$!].mkv' ])
  a.deepEqual(fileSet.files, [
    'test/fixture/[#f1ipping4nn0y1ing].file.NAME--3[$2$$!].mkv'
  ])
})
