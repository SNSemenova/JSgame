const { src, dest, watch, series, parallel } = require("gulp");
const nunjucks = require("gulp-nunjucks");
const concat = require("gulp-concat");
const browserSync = require("browser-sync").create();
const cleanCSS = require("gulp-clean-css");
const autoprefixer = require("gulp-autoprefixer");

const path = {
  css: "src/styles/*.css",
  html: "src/templates/*.html",
  js: "src/scripts/*.js",
  dist: {
    css: "dist/styles/",
    html: "dist/",
    js: "dist/scripts/",
  },
};

// CSS task
function cssTask() {
  return src(path.css)
    .pipe(
      autoprefixer({
        overrideBrowserslist: ["last 4 versions"],
        cascade: false,
      })
    )
    .pipe(cleanCSS())
    .pipe(concat("style.css"))
    .pipe(dest(path.dist.css));
}

// HTML task
function htmlTask() {
  return src(path.html).pipe(nunjucks.compile()).pipe(dest(path.dist.html));
}

// JS task
function jsTask() {
  return src(path.js).pipe(concat("scripts.js")).pipe(dest(path.dist.js));
}

// Watch task
function watchTask() {
  watch(path.css, cssTask);
  watch(path.html, htmlTask);
  watch(path.js, jsTask);
}

// Serve task with live reload
function serveTask(done) {
  browserSync.init({
    server: {
      baseDir: path.dist.html,
    },
  });

  watch("dist/**").on("change", browserSync.reload);
  done();
}

// Build task
const build = parallel(htmlTask, cssTask, jsTask);

// Экспорт задач
exports.css = cssTask;
exports.html = htmlTask;
exports.js = jsTask;
exports.watch = watchTask;
exports.serve = series(watchTask, serveTask);
exports.build = build;
exports.default = series(build, parallel(watchTask, serveTask));
