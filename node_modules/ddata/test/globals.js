var test = require('tape')
var ddata = require('../')

function makeOptions (data) {
  return { data: { root: data }, hash: {} }
}

test('_globals', function (t) {
  var options = makeOptions([
    { id: '1', scope: 'global' },
    { id: '2', scope: 'global', kind: 'function' },
    { id: '3', scope: 'global', kind: 'external', description: 'clive' },
    { id: '4' },
    { id: '5', scope: 'global', kind: 'member' },
    { id: '6' },
    { id: '7', scope: 'global', kind: 'function' }
  ])
  var result = ddata._globals(options)
  t.deepEqual(result, [
    { id: '1', scope: 'global' },
    { id: '2', scope: 'global', kind: 'function' },
    { id: '3', scope: 'global', kind: 'external', description: 'clive' },
    { id: '5', scope: 'global', kind: 'member' },
    { id: '7', scope: 'global', kind: 'function' }
  ])
  t.end()
})
