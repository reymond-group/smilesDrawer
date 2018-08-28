var fs = require('fs');
var gulp = require('gulp');
var exit = require('gulp-exit');

var browserify = require('browserify');
var watchify = require('watchify');
var babelify = require('babelify');

var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');

var sourcemaps = require('gulp-sourcemaps');

var concat = require('gulp-concat');
var rename = require('gulp-rename');
var minify = require('gulp-babel-minify');
var jsdoc = require('gulp-jsdoc3');
var gulpJsdoc2md = require('gulp-jsdoc-to-markdown');
var gutil = require('gulp-util');
var webpack = require('webpack-stream');

gulp.task('default', ['build', 'doc', 'md']);


function compile(watch) {
  var bundler = watchify(browserify('./app.js', {
    debug: true
  }).transform(babelify, {
    // Use all of the ES2015 spec
    presets: ['es2015'],
    sourceMaps: true
  }));

  function rebundle() {
    return bundler
      .bundle()
      .on('error', function (err) {
        console.error(err);
        this.emit('end');
      })
      .pipe(source('build.js'))
      .pipe(buffer())
      .pipe(rename('smiles-drawer.js'))
      .pipe(sourcemaps.init({
        loadMaps: true
      }))
      .pipe(gulp.dest('./dist/'))
      .pipe(minify())
      .pipe(rename('smiles-drawer.min.js'))
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest('./dist'));
  }

  if (watch) {
    bundler.on('update', function () {
      console.log('-> bundling...');
      rebundle();
    });

    rebundle();
  } else {
    rebundle().pipe(exit());
  }
}

function watch() {
  return compile(true);
}

gulp.task('build', function () {
  return compile();
});

gulp.task('watch', function () {
  return watch();
});

gulp.task('doc', function (cb) {
  var config = require('./jsdocConfig.json');
  gulp.src(['README.md', './src/*.js'], {
      read: false
    })
    .pipe(jsdoc(config, cb))
});

gulp.task('md', function (cb) {
  var config = require('./jsdocConfig.json');
  gulp.src('./src/*.js')
    .pipe(concat('all.md'))
    .pipe(gulpJsdoc2md({
      template: fs.readFileSync('./readme.hbs', 'utf8')
    }))
    .on('error', function (err) {
      gutil.log(gutil.colors.red('jsdoc2md failed'), err.message);
    })
    .pipe(rename(function (path) {
      path.extname = '.md';
    }))
    .pipe(gulp.dest('doc'));
});