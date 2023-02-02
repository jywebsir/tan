const gulp = require('gulp')

function copyComponentMds() {
	return gulp.src('./src/components/**/*.md')
		.pipe(gulp.dest('./docs/src/component-mds'));
}

exports.default = gulp.series(copyComponentMds);