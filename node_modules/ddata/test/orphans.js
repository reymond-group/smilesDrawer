var test = require('tape')
var ddata = require('../')

function makeOptions (data) {
  return { data: { root: data }, hash: {} }
}

test('_orphans', function (t) {
  var options = makeOptions([
    { id: '1', memberof: 'something' },
    { id: '2', memberof: 'something' },
    { id: '3', kind: 'external' },
    { id: '4' },
    { id: '5', memberof: 'something', kind: 'external' },
    { id: '6' },
    { id: '7', kind: 'external', description: 'clive' }
  ])
  var result = ddata._orphans(options)
  t.deepEqual(result, [
    { id: '4' },
    { id: '6' },
    { id: '7', kind: 'external', description: 'clive' }
  ])
  t.end()
})
