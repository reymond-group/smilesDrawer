'use strict';

var http = require('http');
var https = require('https');
var urlUtils = require('url');
var defer = require('defer-promise');
var t = require('typical');
var pick = require('lodash.pick');

module.exports = request;

function request(reqOptions, data) {
  if (!reqOptions) return Promise.reject(Error('need a URL or request options object'));
  if (t.isString(reqOptions)) {
    reqOptions = urlUtils.parse(reqOptions);
  } else {
    reqOptions = Object.assign({ headers: {} }, reqOptions);
  }

  var deferred = defer();

  var transport = void 0;
  var protocol = reqOptions.protocol || 'http:';
  if (protocol === 'http:') {
    transport = http;
  } else if (protocol === 'https:') {
    transport = https;
  } else {
    return Promise.reject(Error('Protocol missing from request: ' + JSON.stringify(reqOptions, null, '  ')));
  }

  var req = transport.request(reqOptions, function (res) {
    var data = new Buffer(0);
    res.on('data', function resOnData(chunk) {
      data = Buffer.concat([data, new Buffer(chunk)]);
    });
    res.on('end', function resOnEnd() {
      if (res.statusCode !== 0) {
        var result = {
          data: data,
          res: pick(res, ['headers', 'method', 'statusCode', 'statusMessage', 'url']),
          req: reqOptions
        };
        deferred.resolve(result);
      }
    });
  });

  req.on('error', function reqOnError(err) {
    err.name = 'request-fail';
    err.request = req;
    deferred.reject(err);
  });

  req.end(data);

  if (reqOptions.controller) {
    reqOptions.controller.abort = function () {
      req.abort();
      var err = new Error('Aborted');
      err.name = 'aborted';
      deferred.reject(err);
    };
  }

  return deferred.promise;
}