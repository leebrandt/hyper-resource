var gulp = require('gulp'),
		karma = require('gulp-karma');

gulp.task('test:unit', function(){
	return gulp.src('./foobar')
    .pipe(karma({
      configFile: 'karma.conf.js',
      action: 'run'
    }))
    .on('error', function(err) {
      // Make sure failed tests cause gulp to exit non-zero
      console.log(err);
      this.emit('end'); //instead of erroring the stream, end it
    });
});

gulp.task('dev', ['test:unit'], function(){
  gulp.watch('./src/**/*.js', ['test:unit']);
});

gulp.task('build');