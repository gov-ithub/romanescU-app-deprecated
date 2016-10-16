'use strict';

var gulp = require('gulp');
var wiredep = require('wiredep').stream;
var inject = require('gulp-inject');


gulp.task('wiredep', function() {
    return gulp.src('./src/index.html')
        .pipe(wiredep({
            bowerJson: require('./../../bower.json'),
            directory: 'www/bower_components/',
            ignorePath: '../www/'
        }))
        .pipe(gulp.dest('./www/'));
})