const gulp = require('gulp');
const browserify = require('browserify');
const source = require('vinyl-source-stream');

gulp.task('build-script', function() {
    return browserify('./src/source.ts')
        .plugin('tsify')
        .bundle()
        .pipe(source('script.js'))
        .pipe(gulp.dest('./docs/'))
});

gulp.task('build-hyogo', function() {
    return browserify('./src/hyogo.ts')
        .plugin('tsify')
        .bundle()
        .pipe(source('hyogo.js'))
        .pipe(gulp.dest('./docs/'))
});

gulp.task('build', gulp.series('build-script', 'build-hyogo'));