[![view on npm](http://img.shields.io/npm/v/object-to-spawn-args.svg)](https://www.npmjs.org/package/object-to-spawn-args)
[![npm module downloads](http://img.shields.io/npm/dt/object-to-spawn-args.svg)](https://www.npmjs.org/package/object-to-spawn-args)
[![Build Status](https://travis-ci.org/75lb/object-to-spawn-args.svg?branch=master)](https://travis-ci.org/75lb/object-to-spawn-args)
[![Dependency Status](https://david-dm.org/75lb/object-to-spawn-args.svg)](https://david-dm.org/75lb/object-to-spawn-args)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](https://github.com/feross/standard)

# object-to-spawn-args
Converts an options object to an array suitable for passing to `child_process.spawn()`.

Single letter object properties (e.g. `c: "red"`) convert to short-option args (e.g. `-c red`). Longer object properties (e.g. `colour: "red"`) convert to long-option args (e.g. `--colour red`). Object property values equalling `true` convert to flags (e.g. `-l`).

This options object:
```js
var options = {
    l: true,
    c: "red",
    man: "pete",
    tramp: true
}
```

converts to
```js
[ "-l", "-c", "red", "--man", "pete", "--tramp" ]
```

## Installation
Move into your project directory then run:
```sh
$ npm install object-to-spawn-args --save
```
*Mac / Linux users may need to run with `sudo`*.


## Usage
```js
var toSpawnArgs = require("object-to-spawn-args");
var spawn = require("child_process").spawn;

var options = {
    l: true,
    a: true
};

spawn("ls", toSpawnArgs(options), { stdio: "inherit" });
```
