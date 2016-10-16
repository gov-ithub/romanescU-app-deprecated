'use strict';

var gulp = require('gulp');

gulp.task('service-worker', function(){
    return gulp.src('./src/service-worker.js')
        .pipe(gulp.dest('./www/'));
})