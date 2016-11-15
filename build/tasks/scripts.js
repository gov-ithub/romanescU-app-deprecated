'use strict';

var gulp = require('gulp');
var angularFilesort = require('gulp-angular-filesort');
var inject = require('gulp-inject');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');

gulp.task('scripts', function(done){
    return gulp.src(['./src/app/**/*.js'])
        .pipe(angularFilesort())
        .pipe(concat('app.js'))
        .pipe(gulp.dest('./www/js/'))
        .pipe(rename({extname: '.min.js'}))
        .pipe(uglify());
    });
