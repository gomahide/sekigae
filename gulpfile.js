const gulp = require('gulp');
const browserify = require('browserify');
const source = require('vinyl-source-stream');

gulp.task('build', function() {
    return browserify('./src/source.ts')
        .plugin('tsify')
        .bundle()
        .pipe(source('script.js'))
        .pipe(gulp.dest('./docs/'))
});