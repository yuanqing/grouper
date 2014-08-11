var gulp = require('gulp'),
    istanbul = require('gulp-istanbul'),
    jasmine = require('gulp-jasmine'),
    jshint = require('gulp-jshint'),
    plumber = require('gulp-plumber');

var paths = {
  src: ['index.js'],
  test: ['spec/**/*.spec.js'],
  coverage: './coverage'
};

gulp.task('lint', function() {
  return gulp.src([__filename].concat(paths.src).concat(paths.test))
    .pipe(plumber())
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('test', function() {
  return gulp.src(paths.src)
    .pipe(plumber())
    .pipe(istanbul())
    .on('finish', function() {
      gulp.src(paths.test)
        .pipe(jasmine({
          verbose: true,
          includeStackTrace: true
        }))
        .on('error', function(err) { throw err; })
        .pipe(istanbul.writeReports({
          dir: paths.coverage,
          reporters: ['lcov']
        }));
    });
});

gulp.task('default', [
  'lint',
  'test'
]);
