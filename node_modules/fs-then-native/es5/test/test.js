'use strict';

var TestRunner = require('test-runner');
var fsThen = require('../../');
var fs = require('fs');
var runner = new TestRunner();
var rimraf = require('rimraf');
var a = require('core-assert');

rimraf.sync('tmp');
fsThen.mkdirSync('tmp');

runner.test('.writeFile(): good', function () {
  return fsThen.writeFile('tmp/one', 'one').then(function () {
    return fs.existsSync('tmp/one');
  });
});

runner.test('.writeFile(): bad', function () {
  return fsThen.writeFile('asfsaffsa/one', 'one').then(function () {
    throw new Error("shouldn't reach here");
  }).catch(function (err) {
    if (err.code === 'ENOENT') {
      return;
    } else {
      throw err;
    }
  });
});

runner.test('.readFile(): good', function () {
  return fsThen.readFile('src/test/fixture/file.txt', 'utf-8').then(function (content) {
    a.strictEqual(content, 'test\n');
  });
});

runner.test('.readFile(): bad', function () {
  return fsThen.readFile('lidnfklgeroasosn').then(function (content) {
    throw new Error("shouldn't reach here");
  }).catch(function (err) {
    if (err.code === 'ENOENT') {
      return;
    } else {
      throw err;
    }
  });
});

runner.test('.readdir(): good', function () {
  return fsThen.readdir('src/test/fixture').then(function (files) {
    a.deepStrictEqual(files, ['file.txt']);
  });
});

runner.test('.readdir(): bad', function () {
  return fsThen.readdir('lidnfklgeroasosn').then(function (files) {
    throw new Error("shouldn't reach here");
  }).catch(function (err) {
    if (err.code === 'ENOENT') {
      return;
    } else {
      throw err;
    }
  });
});

runner.test('.mkdir() and .rmdir(): good', function () {
  return fsThen.mkdir('tmp/deleteMe').then(function () {
    a.strictEqual(fs.existsSync('tmp/deleteMe'), true);
  }).then(function () {
    return fsThen.rmdir('tmp/deleteMe').then(function () {
      a.strictEqual(fs.existsSync('tmp/deleteMe'), false);
    });
  });
});

runner.test('.mkdir(): bad', function () {
  return fsThen.mkdir().then(function (files) {
    throw new Error("shouldn't reach here");
  }).catch(function (err) {
    if (err instanceof TypeError) {
      return;
    } else {
      throw err;
    }
  });
});

runner.test('.rmdir(): bad', function () {
  return fsThen.rmdir().then(function (files) {
    throw new Error("shouldn't reach here");
  }).catch(function (err) {
    if (err instanceof TypeError) {
      return;
    } else {
      throw err;
    }
  });
});

runner.test('everything else exists', function () {
  a.ok(fsThen.chown && fsThen.lstat && fsThen.symlink && fs.watch);
});

runner.test('.unlink(): good', function () {
  var filename = 'tmp/deleteThisFile';
  return fsThen.writeFile(filename, '').then(function () {
    a.strictEqual(fs.existsSync(filename), true);
    return fsThen.unlink(filename).then(function () {
      a.strictEqual(fs.existsSync(filename), false);
    });
  });
});

runner.test('.unlink(): bad', function () {
  return fsThen.unlink('lidnfklgeroasosn').then(function (content) {
    throw new Error("shouldn't reach here");
  }).catch(function (err) {
    if (err.code === 'ENOENT') {
      return;
    } else {
      throw err;
    }
  });
});