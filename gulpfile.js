'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const sassGlob = require('gulp-sass-glob');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
const gutil = require('gulp-util');
const imagemin = require('gulp-imagemin');

gulp.task('sass', () => {
  return gulp.src('src/style/**/*.scss')
    .pipe(sassGlob())
    .pipe(sass({ style: 'compressed', sourceComments: 'map', errLogToConsole: true }))
    .pipe(autoprefixer('last 2 version', "> 1%", 'ie 8', 'ie 9'))
    .pipe(gulp.dest('dist/css'))
    .on('error', gutil.log)
    .pipe(browserSync.stream());
});

gulp.task('views', function buildHTML() {
  return gulp.src('src/views/**/*.html')
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.stream())
});

gulp.task('js', () => {
  return gulp.src('src/js/**/*.js')
    .pipe(gulp.dest('dist/js'))
    .pipe(browserSync.stream())
});

gulp.task('css', () => {
  return gulp.src('src/css/**/*.css')
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.stream())
});


gulp.task('image', () => {
  return gulp.src('src/assets/**/*')
    .pipe(imagemin([
      imagemin.svgo({ plugins: [{ removeViewBox: true }] })
    ], {
        verbose: true
      }))
    .pipe(gulp.dest('dist/assets'))
    .pipe(browserSync.stream())
})
gulp.task('serve', ['sass', 'views', 'image', 'js', 'css'], () => {

  browserSync.init({
    server: "./dist"
  });

  gulp.watch("src/style/**/*.scss", ['sass']);
  gulp.watch("src/style/**/*.css", ['css']);
  gulp.watch("src/views/**/*.html", ['views']);
  gulp.watch("src/js/**/*.js", ['js']);
  gulp.watch("src/assets/**/*", ['image']);
  gulp.watch("dist/**/*.html").on('change', browserSync.reload);
})

gulp.task('build', ['sass', 'views', 'image', 'js', 'css'], () => console.log("building..."));

gulp.task('default', ['build']);