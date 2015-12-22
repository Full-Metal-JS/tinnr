
var gulp = require('gulp');
var sass = require('gulp-sass');
var eslint = require('gulp-eslint');
var nodemon = require('gulp-nodemon');
//var bs = require('browser-sync');
//var reload = bs.reload;

gulp.task('sass', function() {
  return gulp.src('client/app/styles/scss/**/*.scss')
        // Gets all files ending with .scss in app/scss and children dirs
        .pipe(sass())
        .pipe(gulp.dest('client/app/styles/css'));
});

gulp.task('lint', function() {
    // ESLint ignores files with "node_modules" paths.
    // So, it's best to have gulp ignore the directory as well.
    // Also, Be sure to return the stream from the task;
    // Otherwise, the task may end before the stream has finished.
  return gulp.src(['**/*.js', '!node_modules/**', '!server/data.js'])
        // eslint() attaches the lint output to the "eslint" property
        // of the file object so it can be used by other modules.
        .pipe(eslint())
        // eslint.format() outputs the lint results to the console.
        // Alternatively use eslint.formatEach() (see Docs).
        .pipe(eslint.format())
        // To have the process exit with an error code (1) on
        // lint error, return the stream and pipe to failAfterError last.
        .pipe(eslint.failAfterError());
});

gulp.task('watch', function() {
    // Will refresh and change the css whenever the scss is changed.
  gulp.watch('app/scss/**/*.scss', ['sass']);
    // Other watchers
});

gulp.task('serve', function() {
  nodemon({
    script: 'server/server.js',
    ignore: 'node_modules/**/*.js'
  });
});

// gulp.task('start', ['serve'], function() {
//   bs({
//     notify: true,
//        // address for server,
//     //injectChanges: true,
//       //files: paths.scripts.concat(paths.html, paths.styles),
//     proxy: 'localhost:3000'
//   });
// });

gulp.task('default', ['lint', 'serve']);

