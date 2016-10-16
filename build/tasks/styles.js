'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');

gulp.task('styles', ['app-sass', 'app-css']);

gulp.task('app-sass', function(done){
    return gulp.src('./src/scss/style.scss')
        .pipe(sass())
        .on('error', sass.logError)
        .pipe(gulp.dest('./www/css/'))
        .pipe(minifyCss({
            keepSpecialComments: 0
        }))
        .pipe(rename({ extname: '.min.css' }))
        .pipe(gulp.dest('./www/css/'));
})


gulp.task('app-css', function(){
    return gulp.src(['./src/**/*.css'], {base: './src/'})
        .pipe(rename({
            dirname: ''
        }))
        .pipe(gulp.dest('./www/css/'));
})