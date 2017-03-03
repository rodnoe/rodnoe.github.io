'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var plumber = require('gulp-plumber');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var server = require('browser-sync');
var mqpacker = require('css-mqpacker');
var minify = require('gulp-csso');
var rename = require('gulp-rename');
var imagemin = require('gulp-imagemin');
var svgmin = require('gulp-svgmin');
var copy = require('gulp-contrib-copy');
var clean = require('gulp-contrib-clean');

gulp.task('style', function() {
  gulp.src('sass/style.scss')
    .pipe(plumber())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer({browsers: [
        'last 1 version',
        'last 2 Chrome versions',
        'last 2 Firefox versions',
        'last 2 Opera versions',
        'last 2 Edge versions'
      ]}),
      mqpacker({
        sort: true
      })
    ]))
    .pipe(gulp.dest('build/css'))
    .pipe(minify())
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest('build/css'))
    .pipe(server.reload({stream: true}));
});

gulp.task('images', function() {
  return gulp.src('img/**/*.{png,jpg,gif}')
  .pipe(imagemin({
    optimizationLevel: 5,
    progressive: true
    }))
  .pipe(gulp.dest('build/img'));
});

gulp.task('symbols', function() {
  return gulp.src('img/*.svg')
  .pipe(svgmin())
  .pipe(gulp.dest('build/img'))
});

gulp.task('fonts', function() {
  gulp.src('fonts/**/*.{woff,woff2}')
    .pipe(gulp.dest('build/fonts'));
});

gulp.task('script', function() {
  gulp.src('js/**/*.js')
    .pipe(gulp.dest('build/js'))
    .pipe(server.reload({stream: true}));
});

gulp.task('html', function() {
  gulp.src('*.html')
    .pipe(gulp.dest('build'))
    .pipe(server.reload({stream: true}));
});

gulp.task('copy', function() {
  gulp.src('**/*')
    .pipe(copy())
    .pipe(gulp.dest('build'));
});

gulp.task('clean', function() {
  gulp.src('build, {read: false}')
    .pipe(clean());
});

gulp.task('build', ['clean'], function() {
  gulp.start(
    'style',
    'fonts',
    'html',
    'script',
    'images',
    'symbols'
  );
});

// gulp.task('serve', ['html'], ['style'], function() {
//   server.init({
//     server: './build',
//     notify: false,
//     open: true,
//     ui: false
//   });

gulp.task('serve', ['build'], function() {
  server.init({
    server: './build',
    notify: false,
    open: true,
    ui: false
  });

  gulp.watch('sass/**/*.{scss,sass}', ['style']).on("change", server.reload);
  gulp.watch('build/html/*.html', ['html']).on("change", server.reload);
  gulp.watch('js/**/*.js', ['script']).on("change", server.reload);
  gulp.watch('img/!**!/!*.{png,jpg,gif,svg}', ['images']).on("change", server.reload);
  gulp.watch('fonts/!**/!*.{woff,woff2}', ['fonts']).on("change", server.reload);
});
