var path = ".";
var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
//
gulp.task('default', ['sass'], function() {
    browserSync.init({
        server: ".",
        notify: true
    });

    gulp.watch(path + "/assets/scss/**/*.scss", ['sass']);
    gulp.watch(path + "/index.html").on('change', function(){
        console.log("Reloading");
        browserSync.reload();
    });
    gulp.watch(path + "/assets/css/*.css").on('change', function(){
        console.log("Reloading");
        browserSync.reload();
    });
    gulp.watch(path + "/assets/js/vendors/*.js").on('change', function(){
        console.log("Reloading");
        browserSync.reload();
    });
});



//Task compile sass
gulp.task('sass', function() {
    return gulp.src(path + "/assets/scss/*.scss")
        .pipe(sass())
        .pipe(gulp.dest(path + "/assets/css/"))
        .pipe(browserSync.stream());
});