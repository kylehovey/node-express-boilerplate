const gulp = require('gulp');
const babel = require('gulp-babel');
const sourcemaps = require('gulp-sourcemaps');

// Transpile client-side JS
gulp.task("default", function() {
  return gulp.src("./src/js/**/*.js")
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest("./public/js/app/"));
});
