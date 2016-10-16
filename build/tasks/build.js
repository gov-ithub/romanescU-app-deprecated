'use strict';

var gulp = require('gulp');

gulp.task('build', [
    'scripts', 
    'styles', 
    'html', 
    'assets', 
    'data', 
    'images',
    'manifest'
]);