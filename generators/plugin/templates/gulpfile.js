"use strict";

const gulp = require("gulp");
const watch = require("gulp-watch");
const sass = require("gulp-sass");
const zip = require("gulp-zip");
const del = require("del");

const config = require("./wp");
const outputDir = config.outputDir[process.argv[2]];

gulp.task("clean", () => {
  return del([outputDir], { force: true });
});

gulp.task("src", () => {
  return gulp
    .src(
      [
        "./src/*.php",
        "./src/common/**/*",
        "./src/modules/**/*",
        "./src/fonts/**/*",
        "./src/vendor/**/*",
        "./src/images/**/*",
        "./src/includes/**/*",
        "./src/languages/**/*"
      ],
      { base: "./src" }
    )
    .pipe(gulp.dest(outputDir));
});

gulp.task("css", () => {
  return gulp
    .src(["./src/style.scss"])
    .pipe(sass().on("error", sass.logError))
    .pipe(gulp.dest(outputDir));
});

gulp.task("zip", () => {
  return gulp
    .src([`${outputDir}/**/*`])
    .pipe(zip("dist.zip"))
    .pipe(gulp.dest("."));
});

const installTasks = gulp.series("clean", gulp.parallel("src", "css"));
const packageTasks = gulp.series(installTasks, "zip");

gulp.task("start", () => {
  installTasks();
  watch("./src/**/*", () => {
    installTasks();
  });
});

gulp.task("build", done => {
  packageTasks();
  done();
});
