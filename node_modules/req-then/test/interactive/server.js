'use strict'
var http = require('http')

/* simple echo server.. useful for testing POST requests.. */
/* why do only the first 2 requests fire 'end'?? */
http.createServer(function (req, res) {
  var buf = Buffer(0)
  req.on('data', function (chunk) {
    console.log('chunk', chunk.toString())
    buf = Buffer.concat([ buf, Buffer(chunk) ])
  })
  req.on('close', function () {
    console.log('CLOSE')
  })
  req.on('end', function () {
    console.log('END')
    console.log(buf.toString())
  })
  req.resume()
  res.end('done')
})
  .on('close', function () {
    console.log('SERVER CLOSED')
  })
  .on('clientError', function (err) {
    console.log('CLIENT ERROR', err)
  })
  .listen(8500)
console.log('listening on port 8500')
