const gulp = require('gulp'),
  browserSync = require('browser-sync'),
  sourcemaps = require('gulp-sourcemaps'),
  sass = require('gulp-sass'),
  images = require('gulp-imagemin'),
  named = require('vinyl-named'),
  concat = require('gulp-concat'),
  webpack = require('webpack-stream');



gulp.task('serve', () => {
  browserSync.init({
    proxy: 'growmedia.test',
    notify: false
  })

  gulp.watch('./src/sass/**/*.scss', ['sass'])
  gulp.watch('./src/img/**/*', ['images'])
  gulp.watch('./src/js/lib/**/*.js', ['dependencies'])
  gulp.watch('./src/js/main.js', ['scripts'])
  gulp.watch('./**/*.php').on('change', browserSync.reload);
})


gulp.task('sass', () => {
  return gulp.src('./src/sass/style.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./'))
    .pipe(browserSync.stream())
})


gulp.task('images', () => {
  return gulp.src('./src/img/**/*.{jpg,png,gif,svg}')
    .pipe(images())
    .pipe(gulp.dest('./img/'))
    .pipe(browserSync.reload({stream:true}))
})


gulp.task('scripts', () => {
  gulp.src('./src/js/main.js')
    .pipe(named())
    .pipe(webpack({
      mode: 'development',
      devtool: 'source-map'
    }))
    .pipe(gulp.dest('./js'))
    .pipe(browserSync.reload({stream:true}))
})

gulp.task('dependencies', () => {
  gulp.src('./src/js/lib/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(concat('dependencies.js'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./js'))
    .pipe(browserSync.reload({stream:true}))
})


gulp.task('default', ['serve'])

