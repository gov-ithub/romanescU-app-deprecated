'use strict';

var gulp = require('gulp');

gulp.task('assets', function(){
    return gulp.src(['src/assets/**'])
        .pipe(gulp.dest('www/assets'));
})