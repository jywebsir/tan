const path = require('path')
const del = require('del')
const gulp = require('gulp')
const sass = require('gulp-sass')(require('sass'))
const babel = require('gulp-babel')
const ts = require('gulp-typescript')
const tsconfig = require('./tsconfig.json')

function clean() {
  return del('./lib/**')
}

function buildStyle() {
  return gulp
    .src(['./src/**/*.scss'], {
      base: './src/'
    })
    .pipe(
      sass()
    )
    .pipe(gulp.dest('./lib'))
}

function buildES() {
	const tsProject = ts({
    ...tsconfig.compilerOptions,
    module: 'ES6',
  })

  return gulp
    .src(['src/**/*.{ts,tsx}'])
		.pipe(tsProject)
		.pipe(
      babel({
				'plugins': ['./babel-transform-scss-to-css'],
			})
    )
    .pipe(gulp.dest('./lib'))
}

function buildDeclaration() {
  const tsProject = ts({
    ...tsconfig.compilerOptions,
    module: 'ES6',
    declaration: true,
    emitDeclarationOnly: true,
  })

  return gulp
    .src(['src/**/*.{ts,tsx}'])
    .pipe(tsProject)
    .pipe(gulp.dest('./lib'))
}

function copyUtils() {
  return gulp.src(['src/utils/**/*.js']).pipe(gulp.dest('./lib/utils'))
}

exports.default = gulp.series(
  clean,
	gulp.parallel(copyUtils, buildES),
  gulp.parallel(buildDeclaration, buildStyle)
)