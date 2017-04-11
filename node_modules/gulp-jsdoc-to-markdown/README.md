[![view on npm](http://img.shields.io/npm/v/gulp-jsdoc-to-markdown.svg)](https://www.npmjs.org/package/gulp-jsdoc-to-markdown)
[![npm module downloads](http://img.shields.io/npm/dt/gulp-jsdoc-to-markdown.svg)](https://www.npmjs.org/package/gulp-jsdoc-to-markdown)
[![Build Status](https://travis-ci.org/jsdoc2md/gulp-jsdoc-to-markdown.svg?branch=master)](https://travis-ci.org/jsdoc2md/gulp-jsdoc-to-markdown)
[![Dependency Status](https://david-dm.org/jsdoc2md/gulp-jsdoc-to-markdown.svg)](https://david-dm.org/jsdoc2md/gulp-jsdoc-to-markdown)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](https://github.com/feross/standard)

# gulp-jsdoc-to-markdown
Plugin for [jsdoc-to-markdown](https://github.com/jsdoc2md/jsdoc-to-markdown). Works in both buffer and streaming modes.

## Caveat
If you intend to use this plugin and your code has modules, **you must always supply a name with the `@module` tag**.

In other words `@module` will fail, `@module my-module` will win.

If the module name is not provided, jsdoc will try to infer it from the filename of the module. However, gulp deals with streams - not files. And that stream could come from anywhere. We do not know the file name so we cannot infer the module name - so always supply it. [More info here](http://usejsdoc.org/tags-module.html).

## `gulpfile.js` examples

### One markdown file out per source file in
```js
'use strict'
var fs = require('fs')
var gulp = require('gulp')
var gutil = require('gulp-util')
var gulpJsdoc2md = require('gulp-jsdoc-to-markdown')
var rename = require('gulp-rename')
var concat = require('gulp-concat')

gulp.task('docs', function () {
  return gulp.src('lib/*.js')
    .pipe(gulpJsdoc2md({ template: fs.readFileSync('./readme.hbs', 'utf8') }))
    .on('error', function (err) {
      gutil.log(gutil.colors.red('jsdoc2md failed'), err.message)
    })
    .pipe(rename(function (path) {
      path.extname = '.md'
    }))
    .pipe(gulp.dest('api'))
})
```

### Multiple source files in, a single markdown file out
```js
'use strict'
var fs = require('fs')
var gulp = require('gulp')
var gutil = require('gulp-util')
var gulpJsdoc2md = require('gulp-jsdoc-to-markdown')
var concat = require('gulp-concat')

gulp.task('docs', function () {
  return gulp.src('lib/*.js')
    .pipe(concat('all.md'))
    .pipe(gulpJsdoc2md({ template: fs.readFileSync('./readme.hbs', 'utf8') }))
    .on('error', function (err) {
      gutil.log('jsdoc2md failed:', err.message)
    })
    .pipe(gulp.dest('api'))
})
```

## Install
Install this plugin:
```
$ npm install gulp-jsdoc-to-markdown --save-dev
```
If using one of the example gulpfiles above you will also need to run:
```
$ npm i gulp gulp-util gulp-concat gulp-rename --save-dev
```

* * *

&copy; 2014-16 Lloyd Brookes \<75pound@gmail.com\>.
