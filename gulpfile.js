const gulp = require('gulp')
const { marked } = require('marked')
const { Transform } = require('node:stream')
const rename = require('gulp-rename')
const clean = require('gulp-clean')

const convertStream = (options = {}, transformer, flusher) => {
	if (typeof options === 'function') {
		flusher = transformer;
		transformer = options;
	}

	return new Transform({
		...options,
		transform(chunk, encoding, callback) {
			(async () => {
				try {
					const value = await transformer(chunk, encoding, this);

					try {
						callback(undefined, value);
					} catch {}
				} catch (error) {
					callback(error);
				}
			})();
		},
		flush(callback) {
			if (typeof flusher !== 'function') {
				callback();
				return;
			}

			(async () => {
				try {
					for await (const chunk of flusher()) {
						this.push(chunk);
					}

					try {
						callback();
					} catch {}
				} catch (error) {
					callback(error);
				}
			})();
		},
	});
}

const convertMdToHtml = (options) => {
	if (options) {
		marked.use(options);
	}

	return convertStream({objectMode: true}, async file => {
		if (file.isNull()) {
			return file;
		}

		if (file.isStream()) {
			throw new PluginError('markdown-to-html', 'Streaming not supported');
		}

		try {
			file.contents = Buffer.from(marked.parse(file.contents.toString()));
		} catch (error) {
			throw new PluginError('markdown-to-html', error, {fileName: file.path});
		}

		file.extname = '.html';

		return file;
	});
}

function cleanDocs() {
	return gulp.src('./docs/src/contents/*')
        .pipe(clean());
}

function buildDocs() {
	return gulp.src('./src/components/**/*.md')
		.pipe(convertMdToHtml())
		.pipe(rename({dirname: ''}))
		.pipe(gulp.dest('./docs/src/contents'));
}

exports.default = gulp.series(cleanDocs, buildDocs);