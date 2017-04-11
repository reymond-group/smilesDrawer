'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

exports.explainSync = explainSync;
exports.explain = explain;
exports.createExplainStream = createExplainStream;
exports.renderSync = renderSync;

var path = require('path');
var Cache = require('cache-point');

exports.cache = new Cache({ dir: path.join(require('os').tmpdir(), 'jsdoc-api') });

function explainSync(options) {
  options = new JsdocOptions(options);
  var ExplainSync = require('./explain-sync');
  var command = new ExplainSync(options, exports.cache);
  return command.execute();
}

function explain(options) {
  options = new JsdocOptions(options);
  var Explain = require('./explain');
  var command = new Explain(options, exports.cache);
  return command.execute();
}

function createExplainStream(options) {
  options = new JsdocOptions(options);
  var ExplainStream = require('./explain-stream');
  return new ExplainStream(explain, options);
}

function renderSync(options) {
  options = new JsdocOptions(options);
  var RenderSync = require('./render-sync');
  var command = new RenderSync(options);
  return command.execute();
}

var JsdocOptions = function JsdocOptions(options) {
  _classCallCheck(this, JsdocOptions);

  options = options || {};
  var arrayify = require('array-back');

  this.files = arrayify(options.files);

  this.source = options.source;

  this.cache = options.cache;

  this.access = options.access;

  this.configure = options.configure;

  this.destination = options.destination;

  this.encoding = options.encoding;

  this.private = options.private;

  this.package = options.package;

  this.pedantic = options.pedantic;

  this.query = options.query;

  this.recurse = options.recurse;

  this.readme = options.readme;

  this.template = options.template;

  this.tutorials = options.tutorials;

  this.html = options.html;

  if (this.html) {
    var _path = require('path');
    this.configure = _path.resolve(__dirname, 'html-conf.json');
    delete this.html;
  }
};