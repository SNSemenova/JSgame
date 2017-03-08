var gulp = require('gulp');
var nunjucks = require('gulp-nunjucks');
var concat = require('gulp-concat');
var browserSync = require('browser-sync').create();
//var imagemin = require('gulp-imagemin');
//var pngquant = require('imagemin-pngquant');
var reload = browserSync.reload;
var cssmin = require('gulp-cssmin');
const autoprefixer = require('gulp-autoprefixer');

var path = {
    css:  'src/styles/*.css',    
    html: 'src/templates/*.html',
    js: 'src/scripts/*.js',
    dist: {
      css:  'dist/styles/',
      html: 'dist/',     
      js: 'dist/scripts/'
    }
};

gulp.task('default', ['build', 'serve', 'watch']);

gulp.task('css', function () {
  return gulp.src(path.css)
    .pipe(autoprefixer({
      browsers: ['last 4 versions']
    }))
    .pipe(cssmin())
    .pipe(concat('style.css'))  
    .pipe(gulp.dest(path.dist.css));
});

gulp.task('html', function () {
  return gulp.src(path.html)
    .pipe(nunjucks.compile())
    .pipe(gulp.dest(path.dist.html));
});

gulp.task('js', function () {
  return gulp.src(path.js)
    .pipe(concat('scripts.js'))
    .pipe(gulp.dest(path.dist.js));
});

gulp.task('build', ['html', 'css', 'js']);

gulp.task('watch', function () {
  gulp.watch(path.css, ['css']);
  gulp.watch(path.html, ['html']);  
  gulp.watch(path.js, ['js']);
});

gulp.task('serve', ['watch'], function() {
  browserSync.init({
    server: {
      baseDir: path.dist.html
    }
  });
  gulp.watch('dist/**').on('change', browserSync.reload);
});