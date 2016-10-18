'use strict';

var gulp = require('gulp');

gulp.task('default', ['build', 'watch']);

gulp.task('serve:before', ['build', 'watch']);