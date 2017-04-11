var TestRunner = require('test-runner')
var ansi = require('../')
var runner = new TestRunner()
var a = require('core-assert')

runner.test('format', function () {
  a.strictEqual(ansi.format('clive', ['red', 'underline']), '\u001b[31;4mclive\u001b[0m')
})

runner.test('inline format', function () {
  a.strictEqual(ansi.format('before [red underline]{clive} after'), 'before \u001b[31;4mclive\u001b[0m after')
})
