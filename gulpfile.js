var gulp = require('gulp');
var concat = require('gulp-concat');
var babel = require('gulp-babel');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var jsdoc = require('gulp-jsdoc3');

gulp.task('default', function() {
    return gulp.src('./src/*.js')
        .pipe(concat('smiles-drawer.js'))
        .pipe(babel({ presets: ['es2015'] }))
        .pipe(gulp.dest('./dist/'))
        .pipe(uglify())
        .pipe(rename({ extname: '.min.js' }))
        .pipe(gulp.dest('./dist/'));
});


gulp.task('doc', function (cb) {
    var config = require('./jsdocConfig.json');
    gulp.src(['README.md', './src/*.js'], {read: false})
        .pipe(jsdoc(config, cb));
});
