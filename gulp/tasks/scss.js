import gulp from "gulp"
import dartSass from "sass"
import gulpSass from "gulp-sass"
import sourcemaps from "gulp-sourcemaps"
import autoprefixer from "gulp-autoprefixer"
import { GLOBS } from "../config.js"
import rename from "gulp-rename"
import cleanCss from "gulp-clean-css"
import groupMediaQueries from "gulp-group-css-media-queries"

const { src, dest } = gulp
const sass = gulpSass(dartSass)

export default function scss(done) {
  src(GLOBS.SCSS.SRC)
    .pipe(sourcemaps.init())
    .pipe(sass({
      includePaths: ["./node_modules"],
      outputStyle: "expanded"
    }).on("error", sass.logError))
    .pipe(groupMediaQueries())
    .pipe(autoprefixer({
      cascade: true
    }))
    .pipe(sourcemaps.write())
    .pipe(dest(GLOBS.SCSS.DEST))
    .pipe(cleanCss())
    .pipe(rename({
      extname: ".min.css"
    }))
    .pipe(dest(GLOBS.SCSS.DEST))

  done()
}