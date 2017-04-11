'use strict';

var TestRunner = require('test-runner');
var UsageStats = require('../../');
var a = require('core-assert');
var os = require('os');
var runner = new TestRunner();
var shared = require('./lib/shared');

runner.test('load test: send a batch of 100 hits');