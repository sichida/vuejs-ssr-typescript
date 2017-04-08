var gulp = require('gulp');
var gls = require('gulp-live-server');
var tsc = require("gulp-typescript");
var del = require('del');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var path = require('path');

var tsProject = tsc.createProject("tsconfig.json");

gulp.task('clean', function(cb) {
    return del('dist', cb)
})

gulp.task('frontend', ['clean'], function() {
    return gulp.src(['src/**/*.html', 'src/**/*.css'])
        .pipe(gulp.dest("dist"));
});

gulp.task('backend', ['clean'], function() {
    var tsResult = gulp.src(['reference.d.ts', 'src/**/*.ts'])
        .pipe(sourcemaps.init())
        .pipe(tsProject());
    return tsResult.js
        .pipe(sourcemaps.write('.', {
            sourceRoot: function(file) { return file.cwd + '/src'; }
        }))
        .pipe(gulp.dest("dist"));
});

gulp.task('build', ['frontend', 'backend']);

gulp.task('default', ['build']);

gulp.task('serve', ['build'], function() {
    //1. run your script as a server
    var server = gls.new('dist/server.js', undefined, 12345);
    server.start();

    //use gulp.watch to trigger server actions(notify, start or stop)
    gulp.watch(['src/**/*'], ['build']);
    gulp.watch('dist/server.js', () => server.start.bind(server)()); //restart my server
    gulp.watch('dist/**/*', (file) => server.notify.apply(server, [file])); //live-reloading my server
});
