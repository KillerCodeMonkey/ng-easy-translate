var gulp = require('gulp');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var ngAnnotate = require('gulp-ng-annotate');
var jshint = require('gulp-jshint');
var Server = require('karma').Server;

/**
 * Run tests and watch for changes + coverage
 */
gulp.task('test', function (done) {
    return new Server({
            configFile: __dirname + '/karma.conf.js',
            singleRun: false
        }, done).start();
});

gulp.task('buildJS', function () {
    gulp.src([
        // add all app files
        'src/*.js',
        'src/**/*.js',
        // exclude tests
        '!src/**/*.spec.js'
    ])
    .pipe(sourcemaps.init())
    .pipe(concat('ng-easy-translate.min.js'))
    .pipe(ngAnnotate())
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./dist'));

    gulp.src([
        // add all app files
        'src/*.js',
        'src/**/*.js',
        // exclude tests
        '!src/**/*.spec.js'
    ])
    .pipe(concat('ng-easy-translate.js'))
    .pipe(ngAnnotate())
    .pipe(gulp.dest('./dist'));
});

gulp.task('jshint', function() {
  return gulp.src(['./src/*.js', './src/**/!(*.spec).js'])
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('default', ['jshint', 'buildJS'], function () {
    gulp.watch('src/**/*.js', ['jshint', 'buildJS']);
});
