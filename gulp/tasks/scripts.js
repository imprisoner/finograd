import gulp from 'gulp'
import webpack from 'webpack-stream'
import webpackConfig from '../webpack.config.js'
import { GLOBS } from "../config.js"
import uglify from "gulp-uglify";
import rename from "gulp-rename";
import named from 'vinyl-named';
import {Transform} from "stream"
import path from 'path';
const { src, dest } = gulp

const noMapFiles = () => new Transform({
  transform (file, enc, cb) {
    const {base: filename} = path.parse(file.path)
    
    const isSourceMap = /\.map$/.test(filename);
    if (!isSourceMap) this.push(file);
    cb()
  },
  objectMode: true
})

export function scriptsPages(done) {
  src(GLOBS.SCRIPTS_PAGES.SRC)
  .pipe(named())
  .pipe(
    webpack({
      config: webpackConfig,
    })
    )
    .pipe(dest(GLOBS.SCRIPTS_PAGES.DEST))
    .pipe(noMapFiles())
    .pipe(uglify())
    .on("error", function (err) {
      console.log(err.toString());
      this.emit("end");
    })
    .pipe(
      rename({
        extname: ".min.js",
      })
    )
    .pipe(dest(GLOBS.SCRIPTS_PAGES.DEST));

  done();
}

export function scriptsVendor(done) {
  src(GLOBS.SCRIPTS_VENDOR.SRC)
  .pipe(dest(GLOBS.SCRIPTS_VENDOR.DEST))

  done()
}