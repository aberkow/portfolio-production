const del = require('del');
const gulp = require('gulp');

const cleanCSS = require('gulp-clean-css');
const concat = require('gulp-concat');
const imagemin = require('gulp-imagemin');
const jshint = require('gulp-jshint');
const miniHTML = require('gulp-minify-html');
const sass = require('gulp-sass');
const sequence = require('gulp-sequence');
const uglify = require('gulp-uglify');
const watch = require('gulp-watch');

clean = {
  cleanCSS: function(){
    return del.sync([
      './build/css/**',
      '!./build/css'
    ])
  },
  cleanImages: function(){
    return del.sync([
      './build/images/**',
      '!./build/images'
    ])
  },
  cleanJs: function(){
    return del.sync([
      './build/js/**',
      '!./build/js'
    ])
  },
  cleanRoot: function(){
    return del.sync([
      './build/**',
      '!./build'
    ])
  },
  dryRun: function(){
    return del([
      './build/**',
      '!./build'
    ], {
      dryRun: true
    })
    .then(paths => {
      console.log('files/folders taht would be deleted:\n', paths.join('\n'));
    });
  }
}



copy = {
  copyCSS: function(){
    gulp.src('./css/**/*')
      .pipe(gulp.dest('./build/css'))
  },
  copyImages: function(){
    gulp.src('./images/**/*')
      .pipe(gulp.dest('./build/images'))
  },
  copyJs: function(){
    gulp.src('./js/**/*')
      .pipe(gulp.dest('./build/js'))
  },
  copyRoot: function(){
    gulp.src('./**/*', '!gulpfile.js', '!.gitignore')
      .pipe(gulp.dest('./build'))
  }
}

utils = {
  html: function(){
    return gulp.src('index.html')
      .pipe(miniHTML())
      .pipe(gulp.dest('build/'));
  },
  images: function(){
    return gulp.src('images/*')
      .pipe(imagemin())
      .pipe(gulp.dest('build/images'));
  },
  jshint: function(){
    return gulp.src('js/*.js')
      .pipe(jshint())
      .pipe(jshint.reporter('jshint-stylish'));
  },
  sass: function(){
    return gulp.src('scss/*.scss')
      .pipe(sass())
      .pipe(gulp.dest('css'));
  },
  styles: function(){
    return gulp.src('css/*.css')
      .pipe(concat('stylesheet.css'))
      .pipe(cleanCSS())
      .pipe(gulp.dest('build/css'));
  },
  watch: function(){
    gulp.watch('js/*.js', ['jshint']);
    gulp.watch('scss/*.scss', ['sass']);
  }
}

//cleaning tasks
gulp.task('cleanCSS', clean.cleanCSS);
gulp.task('cleanImages', clean.cleanImages);
gulp.task('cleanJs', clean.cleanJs);
gulp.task('cleanRoot', clean.cleanRoot);
gulp.task('cleanAll', function(cb){
  sequence('cleanCSS', 'cleanImages', 'cleanJs', 'cleanRoot', cb);
});

//copying tasks
gulp.task('copyCSS', copy.copyCSS);
gulp.task('copyImages', copy.copyImages);
gulp.task('copyJs', copy.copyJs);
gulp.task('copyRoot', copy.copyRoot);
gulp.task('copyAll', function(cb){
  sequence('copyCSS', 'copyImages', 'copyJs', 'copyRoot', cb);
});

//utilities
gulp.task('miniHTML', utils.miniHTML);
gulp.task('images', utils.images);
gulp.task('jshint', utils.jshint);
gulp.task('sass', utils.sass);
gulp.task('styles', utils.styles);
gulp.task('watch', utils.watch);
