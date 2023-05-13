const gulp = require('gulp')
const rename = require('gulp-rename')
const clean = require('gulp-clean')

function cleanGuides() {
	return gulp.src('./docs/guide/*')
        .pipe(clean());
}

function copyGuides() {
	return gulp.src('./src/components/**/*.md')
		.pipe(rename({dirname: ''}))
		.pipe(gulp.dest('./docs/guide'));
}

function watchGuides(cb) {
	gulp.watch(['./src/components/**/*.md']).on(
		'change', 
		function(path) {
			return gulp.src(path).pipe(gulp.dest('./docs/guide'))
		}
	)
}

exports.default = gulp.series(cleanGuides, copyGuides);
exports.watchGuides = watchGuides