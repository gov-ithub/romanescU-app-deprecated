'use strict';

var gulp = require('gulp');
var inject = require('gulp-inject');
var concat = require('gulp-concat');
var wiredep = require('wiredep');

gulp.task('inject', function() {
    var js = gulp.src(wiredep().js);
    var css = gulp.src(wiredep().css);

    return gulp.src('src/index.html')
        .pipe(inject(js.pipe(concat('vendor.js')).pipe(gulp.dest('www/lib')), {ignorePath: '/www/'}))
        .pipe(inject(css.pipe(concat('vendor.css')).pipe(gulp.dest('www/lib')), {ignorePath: '/www/'}))
        .pipe(gulp.dest('www'));
});
