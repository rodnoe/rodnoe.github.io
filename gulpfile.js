'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var plumber = require('gulp-plumber');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var server = require('browser-sync');
var minify = require('gulp-csso');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');

// gulp.task('style', function() {
//   gulp.src('assets/css/style.scss')
//     .pipe(plumber())
//     .pipe(sass())
//     .pipe(postcss([
//       autoprefixer({browsers: [
//         'last 1 version',
//         'last 2 Chrome versions',
//         'last 2 Firefox versions',
//         'last 2 Opera versions',
//         'last 2 Edge versions'
//       ]})
//     ]))
//     .pipe(gulp.dest('.'))
//     .pipe(minify())
//     .pipe(rename('style.min.css'))
//     .pipe(gulp.dest('css'))
//     .pipe(server.reload({stream: true}));
// });

// gulp.task('script', function() {
//   gulp.src('js/script.js')
//     .pipe(uglify())
//     .pipe(rename('script.min.js'))
//     .pipe(gulp.dest('js'));
// });

gulp.task('serve', function() {
  server.init({
    server: '.',
    notify: false,
    open: true,
    ui: false
  });

  gulp.watch('style.css', ['serve']);
  // gulp.watch('js/**/*.js', ['script']);
  gulp.watch('*.html').on('change', server.reload);
});
