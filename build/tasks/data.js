'use strict';

var gulp = require('gulp');

gulp.task('data', function(){
    return gulp.src(['./src/data/**'])
        .pipe(gulp.dest('./www/data/'));
});