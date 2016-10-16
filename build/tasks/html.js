'use strict';

var gulp = require('gulp');
var minifyHtml = require('gulp-minify-html');
var angularTemplateCache = require('gulp-angular-templatecache');

gulp.task('html', ['templatesCache']);

gulp.task('templatesCache', function(done){
    return gulp.src(['./src/templates/**/*.html'])
        .pipe(minifyHtml({
            empty: true,
            spare: true,
            quotes: true,
            conditionals: true
        }))
        .pipe(gulp.dest('./www/templates/'))
        .pipe(angularTemplateCache('templates.js', {
            module: 'romanescU',
            standAlone: false
        }))
        .pipe(gulp.dest('./www/js/'));
});