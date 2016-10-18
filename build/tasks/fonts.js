'use strict';

var gulp = require('gulp');

gulp.task('fonts', function() {
    return gulp.src('bower_components/ionicons/fonts/**/*.*')
        .pipe(gulp.dest('www/fonts/'));;
})