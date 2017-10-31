// Dependencies
const changed = require("gulp-changed");
const changedInPlace = require("gulp-changed-in-place");
const sourcemaps = require("gulp-sourcemaps");
const gulp = require("gulp");
const babel = require("gulp-babel");
const sass = require("gulp-sass");
const eslint = require("gulp-eslint");

// Configuration
const compileTasks = require("config.json")("./config/gulp.json").tasks;

// Assign handlers
// (function names are the same name as the handler keys)
const handlers = {
  compileJS,
  compileCSS,
  lintClient,
  lintNode
};

/**
 * Create the JS compile chain for a source and destination
 * @param {String} source Source of files (supports globbing)
 * @param {String} destination Destination of files (supports globbing)
 * @return {Function}
 */
function compileJS(source, destination) {
  // Return the pipeline
  return () => gulp.src(source)
    .pipe(changed(destination))
    .pipe(sourcemaps.init())
    /* Babel config is in .babelrc */
    .pipe(babel())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(destination));
}

/**
 * Create the SASS compile chain for a source and destination
 * @param {String} source Source of files (supports globbing)
 * @param {String} destination Destination of files (supports globbing)
 * @return {Function}
 */
function compileCSS(source, destination) {
  return () => gulp.src(source)
    .pipe(changed(destination))
    .pipe(sass().on("error", sass.logError))
    .pipe(gulp.dest(destination));
}

/**
 * Run ESLint (Client)
 * @param {String} source Source of files (supports globbing)
 * @param {String} destination Destination of files (supports globbing)
 * @return {Function}
 */
function lintClient(source) {
  return () => gulp.src(source)
    .pipe(changedInPlace())
    .pipe(eslint({ config : "./src/.eslintrc.client.json" }))
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
}

/**
 * Run ESLint (Node)
 * @param {String} source Source of files (supports globbing)
 * @param {String} destination Destination of files (supports globbing)
 * @return {Function}
 */
function lintNode(source) {
  return () => gulp.src(source)
    .pipe(changedInPlace())
    .pipe(eslint({ config : "./.eslintrc.client.json" }))
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
}

// Find enabled tasks
const enabledTasks = Object
  .entries(compileTasks)
  .map(([ type, tasks ]) => tasks
    .filter(task => task.enabled)
    .map(task => 
      Object.assign(
        new Object,
        { handler : handlers[type](task.src, task.dest) }, 
        task
      )
    )
  )
  .reduce((acc, arr) => acc.concat(arr), []);


/* ===== GULP TASKS BELOW THIS LINE ===== */

// Compile all tasks into gulp
enabledTasks
  .forEach(task => gulp.task(task.name, task.handler));

// Make the default task run our compiled jobs
gulp.task(
  "default",
  enabledTasks.map(task => task.name)
);
