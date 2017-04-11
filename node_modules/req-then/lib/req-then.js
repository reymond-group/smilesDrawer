'use strict'
const http = require('http')
const https = require('https')
const urlUtils = require('url')
const defer = require('defer-promise')
const t = require('typical')
const pick = require('lodash.pick')

/**
 * Wraps node's built-in http(s) `request` function with a few extras:
 *
 * - Returns a promise, resolving to an object containing the data, node response and original request.
 * - Automatically selects `http` or `https` transport depending on the input URL.
 * - Cancellable (which `fetch` is not).
 *
 * @module req-then
 * @example
 * const request = require('req-then')
 *
 * request('http://www.bbc.co.uk')
 *   .then(response => {
 *     console.log('Response data received', response.data)
 *     console.log('The original request options', response.req)
 *     console.log('The nodejs response instance', response.res)
 *   })
 *   .catch(console.error)
 * @example
 * const request = require('req-then')
 * const url = require('url')
 * const reqOptions = url.parse('http://www.bbc.co.uk')
 * const controller = {}
 * reqOptions.controller = controller
 * request(reqOptions)
 *   .then(response => {
 *     console.log('Response data received', response.data)
 *   })
 *
 * // kill the request and close the socket
 * controller.abort()
 */
module.exports = request

/**
 * Returns a promise for the response.
 * @param {string|object} - Target url string or a standard node.js http request options object.
 * @param [reqOptions.controller] {object} - If supplied, an `.abort()` method will be created on it which, if invoked, will cancel the request. Cancelling will cause the returned promise to reject with an `'aborted'` error.
 * @param [data] {*} - Data to send with the request.
 * @returns {external:Promise}
 * @resolve {object} - `res` will be the node response object, `data` will be the data, `req` the original request.
 * @reject {Error} - If aborted, the `name` property of the error will be `aborted`.
 * @alias module:req-then
 */
function request (reqOptions, data) {
  if (!reqOptions) return Promise.reject(Error('need a URL or request options object'))
  if (t.isString(reqOptions)) {
    reqOptions = urlUtils.parse(reqOptions)
  } else {
    reqOptions = Object.assign({ headers: {} }, reqOptions)
  }

  const deferred = defer()

  let transport
  const protocol = reqOptions.protocol || 'http:'
  if (protocol === 'http:') {
    transport = http
  } else if (protocol === 'https:') {
    transport = https
  } else {
    return Promise.reject(Error('Protocol missing from request: ' + JSON.stringify(reqOptions, null, '  ')))
  }

  const req = transport.request(reqOptions, function (res) {
    let data = new Buffer(0)
    res.on('data', function resOnData (chunk) {
      data = Buffer.concat([ data, new Buffer(chunk) ])
    })
    res.on('end', function resOnEnd () {
      /* statusCode will be zero if the request was disconnected, so don't resolve */
      if (res.statusCode !== 0) {
        const result = {
          data: data,
          res: pick(res, [ 'headers', 'method', 'statusCode', 'statusMessage', 'url' ]),
          req: reqOptions
        }
        deferred.resolve(result)
      }
    })
  })

  req.on('error', function reqOnError (err) {
    /* failed to connect */
    err.name = 'request-fail'
    err.request = req
    deferred.reject(err)
  })

  req.end(data)

  if (reqOptions.controller) {
    reqOptions.controller.abort = function () {
      req.abort()
      const err = new Error('Aborted')
      err.name = 'aborted'
      deferred.reject(err)
    }
  }

  return deferred.promise
}
