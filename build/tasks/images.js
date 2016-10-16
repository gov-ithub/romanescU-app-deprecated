'use strict';

var gulp = require('gulp');
var imagemin = require('gulp-imagemin');

gulp.task('images', function(){
    return gulp.src(['./src/img/**/*.*'])
        .pipe(imagemin({
            optimizationLevel: 4
        }))
        .pipe(gulp.dest('./www/img/'));
});