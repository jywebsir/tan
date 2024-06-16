const gulp = require('gulp')
const sass = require('gulp-sass')(require('sass'))
const postcss = require('gulp-postcss')
const babel = require('gulp-babel')
const ts = require('gulp-typescript')
const del = require('del')
const through = require('through2')
const autoprefixer = require('autoprefixer')
const tsconfig = require('../../tsconfig.json')

const OUT_DIR = './dist'

function clean() {
  return del(`${OUT_DIR}/**`)
}

function buildStyle() {
  return gulp
    .src(['./src/**/*.scss'], {
      base: './src/'
    })
    .pipe(
      sass()
    )
    .pipe(
      postcss([
        autoprefixer({
          overrideBrowserslist: 'iOS >= 10, Chrome >= 49',
        }),
      ])
    )
    .pipe(gulp.dest(`${OUT_DIR}/es`))
    .pipe(gulp.dest(`${OUT_DIR}/cjs`))
}

function buildES() {
  const tsProject = ts({
    ...tsconfig.compilerOptions
  })

  return gulp
    .src(['src/**/*.{ts,tsx}'])
    .pipe(tsProject)
    .pipe(
      babel({
        'plugins': ['./babel-transform-scss-to-css'],
      })
    )
    .pipe(gulp.dest(`${OUT_DIR}/es/`))
}

function buildCJS() {
  return gulp
    .src([`${OUT_DIR}/es/**/*.js`])
    .pipe(
      babel({
        'plugins': ['@babel/plugin-transform-modules-commonjs'],
      })
    )
    .pipe(gulp.dest(`${OUT_DIR}/cjs/`))
}

function buildDeclaration() {
  const tsProject = ts({
    ...tsconfig.compilerOptions,
    declaration: true,
    emitDeclarationOnly: true
  })

  return gulp
    .src(['src/**/*.{ts,tsx}'])
    .pipe(tsProject)
    .pipe(gulp.dest(`${OUT_DIR}/es/`))
    .pipe(gulp.dest(`${OUT_DIR}/cjs/`))
}

function generatePackageJSON() {
  return gulp
    .src('./package.json')
    .pipe(
      through.obj((file, enc, cb) => {
        const rawJSON = file.contents.toString()
        const parsed = JSON.parse(rawJSON)

        parsed.main = './cjs/index.js' 
        parsed.module = './es/index.js' 
        parsed.types = './es/index.d.js' 
        parsed.typings = './es/index.d.js' 

        const stringified = JSON.stringify(parsed, null, 2)
        file.contents = Buffer.from(stringified)

        cb(null, file)
      })
    )
    .pipe(gulp.dest(OUT_DIR))
}

function copyMetaFiles() {
  return gulp.src(['../../README.md', '../../LICENSE']).pipe(gulp.dest(OUT_DIR))
}

exports.default = gulp.series(
  clean,
  buildES,
  buildCJS,
  gulp.parallel(buildDeclaration, buildStyle),
  generatePackageJSON,
  copyMetaFiles
)
