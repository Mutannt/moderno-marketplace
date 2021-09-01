let gulp = require('gulp'),
    sass = require('gulp-sass')(require('sass')),
    rename = require('gulp-rename'),
    browserSync = require('browser-sync'),
    autoprefixer = require('gulp-autoprefixer'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    cssmin = require('gulp-cssmin');

gulp.task('sass', function(){
    return gulp.src('app/scss/**/*.scss') // return для повторного просмотра файла.Иначе watch сработает только один раз
    .pipe(sass({outputStyle: 'compressed'})) // Compressed, expanded 
    .pipe(rename({suffix: '.min'}))
    .pipe(autoprefixer({ // Для более старых версий браузеров
        overrideBrowserslist: ['last 8 version'],
        cascade: false}))
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.reload({stream: true})) // обновление css
});

// Объединение файлов css
gulp.task('style',function(){
    return gulp.src([
        'node_modules/normalize.css/normalize.css',
        'node_modules/slick-carousel/slick/slick.css',
        'node_modules/magnific-popup/dist/magnific-popup.css',
        'node_modules/rateyo/src/jquery.rateyo.css'
    ])
    .pipe(concat('libs.min.css')) // Объединение файлов выше в один
    .pipe(cssmin()) // Сжатие
    .pipe(gulp.dest('app/css')) // В какую папку отправить по завершению
});

// Объединение файлов js
gulp.task('script',function(){
    return gulp.src([
        'node_modules/slick-carousel/slick/slick.js',
        'node_modules/magnific-popup/dist/jquery.magnific-popup.js',
        'node_modules/mixitup/dist/mixitup.js',
        'node_modules/rateyo/src/jquery.rateyo.js'
    ])
    .pipe(concat('libs.min.js')) // Объединение файлов выше в один
    .pipe(uglify()) // Сжатие
    .pipe(gulp.dest('app/js')) // В какую папку отправить по завершению
});

gulp.task('html', function(){
    return gulp.src('app/*.html') // return для повторного просмотра файла.Иначе сработает только один раз
    .pipe(browserSync.reload({stream: true})) // обновление html
});

gulp.task('js', function(){
    return gulp.src('app/js/*.js')// return для повторного просмотра файла.Иначе сработает только один раз
    .pipe(browserSync.reload({stream: true})) // обновление js
});

// Static server
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "app/"
        }
    });
});

// Наблюдение за файлами
gulp.task('watch', function(){
    gulp.watch('app/scss/**/*.scss', gulp.parallel('sass'))
    gulp.watch('app/*.html', gulp.parallel('html'))
    gulp.watch('app/js/*.js', gulp.parallel('js'))
});

// Обычный gulp запускает сразу всё.
gulp.task('default', gulp.parallel('style', 'script', 'sass', 'watch', 'browser-sync'))
