const changed = require('gulp-changed');
const sourcemaps = require('gulp-sourcemaps');
const gulp = require('gulp');
const babel = require('gulp-babel');

const source = "./src/js/**/*.js"; 
const destination = "./public/js/app";

// Transpile client-side JS
gulp.task("default", function() {
  return gulp.src(source)
    .pipe(changed(destination))
    .pipe(sourcemaps.init())
    /* Babel config is in .babelrc */
    .pipe(babel())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(destination));
});
