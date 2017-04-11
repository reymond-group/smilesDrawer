'use strict'
const Cache = require('../../')
const cache = new Cache({ dir: 'tmp/example' })

// The first invocation will take 3s, the rest instantaneous.
// outputs: 'result'
getData('some input')
  .then(console.log)

// cache.read() will resolve on hit, reject on miss.
function getData (input) {
  return cache
    .read(input)
    .catch(() => expensiveOperation(input))
}

// The expensive operation we're aiming to avoid,
// (3 second cost per invocation)
function expensiveOperation (input) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const output = 'result'
      cache.write(input, output)
      resolve(output)
    }, 3000)
  })
}
