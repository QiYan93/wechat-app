var gulp = require('gulp');
var sass = require('gulp-sass');
var rename = require("gulp-rename");
 
gulp.task('sass', function () {
  return gulp.src('./page/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(rename(function(path){
      path.extname = ".wxss"
    }))
    .pipe(gulp.dest('./page/'))
});
 
gulp.task('sass:watch', function () {
  gulp.watch('./page/**/*.scss', ['sass']);
});

gulp.task('default', ['sass','sass:watch']);