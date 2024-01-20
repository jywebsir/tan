const gulp = require('gulp')
const rename = require('gulp-rename')
const clean = require('gulp-clean')

const groups = new Map([
	[
		'basic',
		['icon', 'button', 'cell', 'flex']
	],
	[
		'navigation',
		['index-bar']
	],
	[
		'feedback',
		['loading']
	]
])

function getGuideGroup(dirname) {
	let result = ''

	for ([group, items] of groups) {
		if (items.includes(dirname)) {
			result = group

			break;
		}
	}

	return result
}

// function cleanGuides() {
// 	return gulp.src('./docs/guide/**/*.md')
//         .pipe(clean());
// }

function copyGuides() {
	return gulp.src('./src/components/**/*.md')
		.pipe(rename(function (path) {
			path.dirname = getGuideGroup(path.dirname)
		}))
		.pipe(gulp.dest('./docs/guide'));
}

function watchGuides(cb) {
	const watcher = gulp.watch(['./src/components/**/*.md'])

	watcher.on(
		'change', 
		copyGuides
	)
}

exports.default = copyGuides;
exports.watchGuides = watchGuides