import gulp from 'gulp'
import pugCompiler from 'gulp-pug'
import {stream as critical} from "critical";
import { GLOBS } from "../config.js"

const { src, dest } = gulp

export default function pug(done) {
  src(GLOBS.PUG.SRC)
    .pipe(pugCompiler({
      verbose: true,
      pretty: true,
      basedir: "src"
    }))
    .pipe(
      critical({
        base: 'dist/',
        inline: true,
        css: ['dist/css/main.css'],
      })
    )
    .pipe(dest(GLOBS.PUG.DEST))
  done()
}