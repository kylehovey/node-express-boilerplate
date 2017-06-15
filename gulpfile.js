const gulp = require('gulp');
const babel = require('gulp-babel');

// Transpile client-side JS
gulp.task("default", function() {
  return gulp.src("./src/js/**/*.js")
    .pipe(babel({
      presets : "latest"
    }))
    .pipe(gulp.dest("./public/js/"));
});
