var test = require('tape')
var ddata = require('../')

function makeOptions (data) {
  return { data: { root: data }, hash: {} }
}

test('_children', function (t) {
  var parent = { id: 'something' }
  var options = makeOptions([
    { id: '1', memberof: 'something' },
    { id: '2', memberof: 'something' },
    { id: '3', kind: 'external' },
    { id: '4' },
    { id: '5', memberof: 'something', kind: 'external' },
    { id: '6', memberof: 'something', kind: 'external', description: 'clive' },
    { id: '7' }
  ])
  var result = ddata._children.call(parent, options)
  t.deepEqual(result, [
    { id: '1', memberof: 'something' },
    { id: '2', memberof: 'something' },
    { id: '6', memberof: 'something', kind: 'external', description: 'clive' }
  ])
  t.end()
})
