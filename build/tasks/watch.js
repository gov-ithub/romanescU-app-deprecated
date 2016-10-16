'use strict';

var gulp = require('gulp');

gulp.task('watch', function() {
    // When HTML files are changed (or more bower components added)
    gulp.watch(['./src/templates/**/*.html', './src/index.html'], function(event){
        gulp.start('html');
    });

    // When stylesheets are changed
    gulp.watch(['./scss/ionic.app.scss', './src/scss/style.scss', './src/**/*.css'], function(event) {
        gulp.start('styles');
    })


    // When javascript files are changed
    gulp.watch(['./src/js/**/*.js'], function(event){
        gulp.start('scripts');
    })
});