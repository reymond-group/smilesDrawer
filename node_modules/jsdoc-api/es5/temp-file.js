'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var fs = require('fs');
var getTempPath = require('temp-path');

var TempFile = function () {
  function TempFile(source) {
    _classCallCheck(this, TempFile);

    this.path = getTempPath() + '.js';
    fs.writeFileSync(this.path, source);
  }

  _createClass(TempFile, [{
    key: 'delete',
    value: function _delete() {
      fs.unlinkSync(this.path);
    }
  }]);

  return TempFile;
}();

module.exports = TempFile;