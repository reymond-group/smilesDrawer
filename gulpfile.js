var fs = require('fs');
var gulp = require('gulp');
var concat = require('gulp-concat');
var babel = require('gulp-babel');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var jsdoc = require('gulp-jsdoc3');
var gulpJsdoc2md = require('gulp-jsdoc-to-markdown');
var gutil = require('gulp-util');
var babili = require("gulp-babili");

gulp.task('default', [ 'build', 'doc', 'md' ]);

gulp.task('build', function() {
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
        .pipe(jsdoc(config, cb))
});

gulp.task('md', function (cb) {
    var config = require('./jsdocConfig.json');
    gulp.src('./src/*.js')
        .pipe(concat('all.md'))
        .pipe(gulpJsdoc2md({ template: fs.readFileSync('./readme.hbs', 'utf8') }))
        .on('error', function(err) {
            gutil.log(gutil.colors.red('jsdoc2md failed'), err.message);
        })
        .pipe(rename(function(path) {
            path.extname = '.md';
        }))
        .pipe(gulp.dest('doc'));
});
