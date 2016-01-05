var gulp   = require('gulp');
var sass   = require('gulp-sass');
var concat = require('gulp-concat');
var gutil = require('gulp-util');
var eslint = require('gulp-eslint');
var rimraf   = require('rimraf');
var sourcemaps = require('gulp-sourcemaps');
var nodemon   = require('gulp-nodemon');
var uglify = require('gulp-uglify');
var sequence = require('run-sequence');
var mocha = require('gulp-mocha');

var paths = {
  // all our client app js files, not including 3rd party js files
  scripts: ['client/app/**/*.js'],
  html: ['client/app/**/*.html', 'client/index.html'],
  styles: ['client/assets/scss/**/*.scss'],
  assets: ['client/assets/**'],
  test: ['specs/**/*.js']
};

// Cleans the build directory
gulp.task('clean', function(cb) {
  rimraf('./client/build', cb);
});

gulp.task('copy', function() {
  return gulp.src(paths.assets)
    .pipe(gulp.dest('client/build/assets'));
});

gulp.task('build-css', function() {
  return gulp.src(paths.styles)
    .pipe(sass())
    .pipe(gulp.dest('client/build/assets/css'));
});

gulp.task('build-js', function() {
  return gulp.src(paths.scripts)
    .pipe(sourcemaps.init())
      .pipe(concat('app.js'))
      // only uglify if gulp is ran with '--type production'
      .pipe(gutil.env.type === 'production' ? uglify() : gutil.noop())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('client/build/assets/js'));
});

gulp.task('test', function() {
  //nodemon({script: 'server/server.js', ignore: 'node_modules/**/*.js'});
  return gulp.src(['test/*.js'], {read: false})
    .pipe(mocha({
      reporter: 'spec',
      timeout: 5000,
      globals: {
        expect: require('chai').expect
      }
    }));
});

// any changes to client side code will automagically refresh your page
gulp.task('start', ['serve'],function () {
  bs({
    notify: true,
    // address for server,
    injectChanges: true,
    files: paths.scripts.concat(paths.html, paths.styles),
    proxy: 'localhost:3000'
  });
});

// start our node server using nodemon
gulp.task('serve', ['build'], function() {
  nodemon({script: 'server/server.js', ignore: 'node_modules/**/*.js'});
});

gulp.task('build', function(cb) {
  sequence('clean', ['copy', 'build-css', 'build-js'], cb);
});

gulp.task('eslint', function() {
  return gulp.src(['**/*.js', '!server/data.js', '!server/search.js', '!test/*.js', '!node_modules/**/*.js', '!client/lib/**/*.js'])
  .pipe(eslint({
    fix: true
  }))
  .pipe(eslint.format())
  .pipe(eslint.failAfterError());
});

gulp.task('default', ['build'], function() {
  // gulp.watch('client/app/**/*.js', ['jshint']);
  gulp.watch('client/app/**/*.js', ['build-js']);
  gulp.watch('client/assets/scss/**/*.scss', ['build-css']);
});
