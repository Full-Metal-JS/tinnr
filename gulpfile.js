var gulp   = require('gulp'),
    jshint = require('gulp-jshint'),
    sass   = require('gulp-sass'),
    concat = require('gulp-concat'),
    gutil = require('gulp-util'),
    eslint = require('gulp-eslint'),
    rimraf   = require('rimraf'),
    sourcemaps = require('gulp-sourcemaps'),
    nodemon   = require('gulp-nodemon'),
    sequence = require('run-sequence'),
    bs        = require('browser-sync'),
    reload    = bs.reload;

var paths = {
  // all our client app js files, not including 3rd party js files
  scripts: ['client/app/**/*.js'],
  html: ['client/app/**/*.html', 'client/index.html'],
  styles: ['client/scss/**/*.scss'],
  test: ['specs/**/*.js']
};

// Cleans the build directory
gulp.task('clean', function(cb) {
  rimraf('./client/build', cb);
});

gulp.task('jshint', function() {
  return gulp.src(paths.scripts)
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
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
      //only uglify if gulp is ran with '--type production'
      .pipe(gutil.env.type === 'production' ? uglify() : gutil.noop()) 
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('client/build/assets/js'));
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
  sequence('clean', ['build-css', 'build-js'], cb);
});

gulp.task('eslint', function() {
  return gulp.src(['**/*.js'])
  .pipe(eslint({
    fix: true
  }))
  .pipe(eslint.format())
  .pipe(eslint.failAfterError());
});

gulp.task('default', ['build'], function() {
  //gulp.watch('client/app/**/*.js', ['jshint']);
  gulp.watch('client/app/**/*.js', ['build-js']);
  gulp.watch('client/scss/**/*.scss', ['build-css']);
});