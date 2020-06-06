"use strict";

const gulp = require("gulp");
const watch = require("gulp-watch");
const sass = require("gulp-sass");
const del = require("del");

gulp.task("clean", () => {
  return del(["./dist"], { force: true });
});

gulp.task("src", () => {
  return gulp
    .src(
      [
        "./src/*.php",
        "./src/fonts/**/*",
        "./src/images/**/*",
        "./src/languages/**/*",
        "./src/screenshot.*"
      ],
      { base: "./src" }
    )
    .pipe(gulp.dest("./dist"));
});

gulp.task("css", () => {
  return gulp
    .src(["./src/style.scss", "./src/responsive.scss"])
    .pipe(sass().on("error", sass.logError))
    .pipe(gulp.dest("./dist"));
});

const installTasks = gulp.series("clean", "src", "css");

gulp.task("default", done => {
  installTasks();
  done();
});

gulp.task("watch", () => {
  installTasks();
  watch("./src/**/*", () => {
    installTasks();
  });
});
