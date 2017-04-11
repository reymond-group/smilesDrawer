'use strict';

var TestRunner = require('test-runner');
var TrackUsage = require('../../');
var a = require('core-assert');
var fs = require('fs');
var rimraf = require('rimraf');
var mkdirp = require('mkdirp');
var path = require('path');

var runner = new TestRunner();
var tid = 'UA-70853320-4';

rimraf.sync('tmp/test');
mkdirp.sync('tmp/test');

function delay(time) {
  return new Promise(function (resolve, reject) {
    setTimeout(resolve, time);
  });
}

function responseCount(count) {
  return function (responses) {
    a.strictEqual(responses.length, count);
    return responses;
  };
}
function unsentCount(usage, count) {
  return function () {
    a.strictEqual(usage.unsent.stats.length, count);
  };
}
function sentCount(usage, count) {
  return function () {
    a.strictEqual(usage.sent.stats.length, count);
  };
}

runner.test('.hit(dimensions, metrics)', function () {
  var usage = new TrackUsage(tid, { an: 'app-usage-stats' });
  usage.hit({ name: 'method1', interface: 'cli' }, { option1: 1, option2: 1 });
  usage.hit({ name: 'method1', interface: 'api' }, { option1: 1, option3: 1 });
  usage.hit({ name: 'method1', interface: 'api' }, { option1: 1 });
  usage.hit({ name: 'method2', interface: 'api' }, { option1: 1, option2: 1 });

  a.deepStrictEqual(usage.unsent.stats, [{
    dimension: {
      name: 'method1',
      interface: 'cli'
    },
    metric: {
      option1: 1,
      option2: 1
    }
  }, {
    dimension: {
      name: 'method1',
      interface: 'api'
    },
    metric: {
      option1: 2,
      option3: 1
    }
  }, {
    dimension: {
      name: 'method2',
      interface: 'api'
    },
    metric: {
      option1: 1,
      option2: 1
    }
  }]);
});

runner.test('._convertToHits()', function () {
  var usage = new TrackUsage(tid, {
    an: 'app-usage-stats',
    dimensionMap: {
      name: 'screenview',
      interface: 1
    },
    metricMap: {
      option1: 1,
      option2: 2,
      option3: 3
    }
  });
  usage.hit({ name: 'method1', interface: 'cli' }, { option1: 1, option2: 1 });
  usage.hit({ name: 'method1', interface: 'cli' }, { option1: 1, option2: 1 });
  usage.hit({ name: 'method1', interface: 'api' }, { option1: 1, option3: 1 });
  usage.hit({ name: 'method2', interface: 'api' }, { option1: 1, option2: 1 });
  usage._convertToHits();

  a.strictEqual(usage._hits[0].get('t'), 'screenview');
  a.strictEqual(usage._hits[0].get('cd'), 'method1');
  a.strictEqual(usage._hits[0].get('cd1'), 'cli');
  a.strictEqual(usage._hits[0].get('cm1'), 2);
  a.strictEqual(usage._hits[0].get('cm2'), 2);

  a.strictEqual(usage._hits[1].get('t'), 'screenview');
  a.strictEqual(usage._hits[1].get('cd'), 'method1');
  a.strictEqual(usage._hits[1].get('cd1'), 'api');
  a.strictEqual(usage._hits[1].get('cm1'), 1);
  a.strictEqual(usage._hits[1].get('cm3'), 1);

  a.strictEqual(usage._hits[2].get('t'), 'screenview');
  a.strictEqual(usage._hits[2].get('cd'), 'method2');
  a.strictEqual(usage._hits[2].get('cd1'), 'api');
  a.strictEqual(usage._hits[2].get('cm1'), 1);
  a.strictEqual(usage._hits[2].get('cm2'), 1);
});

runner.test('.save() and .load(): this.stats correct', function () {
  var _this = this;

  var usage = new TrackUsage(tid, { an: 'app-usage-stats', dir: 'tmp/test' + this.index });
  usage.hit({ name: 'one' }, { metric: 1 });
  usage.hit({ name: 'one' }, { metric: 1 });
  a.deepStrictEqual(usage.unsent.stats, [{ dimension: { name: 'one' }, metric: { metric: 2 } }]);
  return usage.save().then(unsentCount(usage, 0)).then(sentCount(usage, 0)).then(function () {
    fs.readFileSync('tmp/test' + _this.index + '/UA-70853320-4-unsent.json');
    return usage.load().then(function () {
      a.deepStrictEqual(usage.unsent.stats, [{ dimension: { name: 'one' }, metric: { metric: 2 } }]);
    });
  });
});

runner.test('.saveSync() and .loadSync(): this.stats correct', function () {
  var usage = new TrackUsage(tid, { an: 'app-usage-stats', dir: 'tmp/test' + this.index });
  usage.hit({ name: 'one' }, { metric: 1 });
  usage.hit({ name: 'one' }, { metric: 1 });
  a.deepStrictEqual(usage.unsent.stats, [{ dimension: { name: 'one' }, metric: { metric: 2 } }]);
  usage.saveSync();
  a.deepStrictEqual(usage.unsent.stats, []);
  fs.readFileSync('tmp/test' + this.index + '/UA-70853320-4-unsent.json');
  usage.loadSync();
  a.deepStrictEqual(usage.unsent.stats, [{ dimension: { name: 'one' }, metric: { metric: 2 } }]);
});

runner.test('.loadSync(): handles invalid JSON', function () {
  var usage = new TrackUsage(tid, { an: 'app-usage-stats', dir: 'tmp/test' + this.index });
  fs.writeFileSync('tmp/test' + this.index + '/UA-70853320-4-unsent.json', '');
  a.doesNotThrow(function () {
    usage.loadSync();
  });
  a.deepStrictEqual(JSON.parse(fs.readFileSync('tmp/test' + this.index + '/UA-70853320-4-unsent.json', 'utf8')), []);
  a.deepStrictEqual(usage.unsent.stats, []);
});

runner.test('.hit(): auto-sends after given interval', function () {
  var usage = new TrackUsage(tid, { an: 'app-usage-stats', sendInterval: 200, dir: 'tmp/test' + this.index });
  return Promise.all([usage.hit({ name: 'one' }, { metric: 1 }).then(responseCount(0)), usage.hit({ name: 'one' }, { metric: 1 }).then(responseCount(0)), delay(210).then(unsentCount(usage, 1)).then(function () {
    return usage.hit({ name: 'one' }, { metric: 1 }).then(responseCount(1)).then(sentCount(usage, 1)).then(unsentCount(usage, 0));
  })]);
});

runner.test('.hit({ send: true }): override auto-send interval', function () {
  var usage = new TrackUsage(tid, { an: 'app-usage-stats', sendInterval: 20000, dir: 'tmp/test' + this.index });
  return usage.hit({ name: 'one' }, { metric: 1 }, { send: true }).then(responseCount(1)).then(unsentCount(usage, 0)).then(sentCount(usage, 1)).then(function () {
    return usage.hit({ name: 'two' }, { metric: 1 }, { send: true }).then(responseCount(1)).then(unsentCount(usage, 0)).then(sentCount(usage, 2));
  });
});

runner.test('.send(): this.stats correct after', function () {
  var usage = new TrackUsage(tid, { an: 'app-usage-stats', dir: 'tmp/test' + this.index });
  usage.hit({ name: 'one' }, { metric: 1 });
  usage.hit({ name: 'one' }, { metric: 1 });
  unsentCount(usage, 1)();
  return usage.send().then(responseCount(1)).then(unsentCount(usage, 0)).then(sentCount(usage, 1));
});

runner.test('.send(): this.stats correct after ongoing hits', function () {
  var usage = new TrackUsage(tid, { an: 'app-usage-stats', dir: 'tmp/test' + this.index });
  usage.hit({ name: 'one' }, { metric: 1 });
  usage.hit({ name: 'one' }, { metric: 1 });
  unsentCount(usage, 1)();
  var prom = usage.send().then(responseCount(1)).then(unsentCount(usage, 3)).then(sentCount(usage, 1));
  usage.hit({ name: 'one' }, { metric: 1 });
  usage.hit({ name: 'two' }, { metric: 1 });
  usage.hit({ name: 'three' }, { metric: 1 });
  return prom;
});

runner.test('.send(): multiple invocations', function () {
  var usage = new TrackUsage(tid, { an: 'app-usage-stats', dir: 'tmp/test' + this.index });
  usage.hit({ name: 'one' }, { metric: 1 });
  usage.hit({ name: 'one' }, { metric: 1 });
  unsentCount(usage, 1)();

  var prom = usage.send().then(responseCount(1)).then(unsentCount(usage, 3)).then(sentCount(usage, 1)).then(function () {
    return usage.send().then(responseCount(1)).then(unsentCount(usage, 0)).then(sentCount(usage, 4));
  });

  unsentCount(usage, 0)();
  usage.hit({ name: 'two' }, { metric: 1 });
  usage.hit({ name: 'three' }, { metric: 1 });
  usage.hit({ name: 'four' }, { metric: 1 });
  unsentCount(usage, 3)();

  return prom;
});

runner.test('.hit() validation: all metrics are numeric');