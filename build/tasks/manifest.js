'use strict';

var gulp = require('gulp');

gulp.task('manifest', function(){
    return gulp.src('./src/manifest.json')
        .pipe(gulp.dest('./www/'));
})