// This file contains misc deployment tasks

var gulp = require("gulp"),
    awspublish = require('gulp-awspublish'),
    jf = require('jsonfile'),
    rev = require('gulp-rev'),
    revReplace = require("gulp-rev-replace"),
    fs = require('fs'),
    rev = require("gulp-rev"),
    headers = { 'Cache-Control': 'max-age=315360000, no-transform, public' };



gulp.task("revision", function(){
  return gulp.src(["dist/**/*.css", "dist/**/*.js"])
    .pipe(rev())
    .pipe(gulp.dest("dist"))
    .pipe(rev.manifest())
    .pipe(gulp.dest("dist"))
})

gulp.task("revreplace", ["revision"], function(){
  var manifest = gulp.src("./dist/rev-manifest.json");

  return gulp.src("dist/index.html")
    .pipe(revReplace({manifest: manifest}))
    .pipe(gulp.dest("dist"));
});


gulp.task("cachebust", function(){
  var tmpl = `
    const cachebust = {
      sha: "${Date.now()}"
    }

    console.log("sha is ", cachebust.sha)

    export default cachebust
  `
  fs.writeFile("src/scripts/config/cachebust.js", tmpl, function(){
    console.log("wow");
  })
})
