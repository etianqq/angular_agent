var gulp = require('gulp'),
    gutil = require('gulp-util'),
    ftp = require('gulp-ftp'),
    minifycss = require('gulp-minify-css'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    del = require('del'),
    rev = require('gulp-rev'),
    revCollector = require('gulp-rev-collector'),
    runSequence = require('run-sequence'),
// Parse scss to css
    sass = require('gulp-sass'),
// Source map support for Gulp.js
    sourcemaps = require('gulp-sourcemaps'),
// Merge CSS
    concat = require('gulp-concat');

var ftpConfig = {ftp_test: {}, ftp_bate: {}, ftp_business: {}};
//自动化部署环境会填充系统环境变量，当有系统环境变量时，使用系统环境变
var config = {};
if (process.env.ftp_host)config.host = process.env.ftp_host;
if (process.env.ftp_user)config.user = process.env.ftp_user;
if (process.env.ftp_pass)config.pass = process.env.ftp_pass;
if (process.env.production) {
    var production = process.env.production;
    console.log('production:' + production);
    if (production == "debug") {
        ftpConfig.ftp_test = config;
    } else if (production == "beta") {
        ftpConfig.ftp_bate = config;
    } else if (production == "release") {
        ftpConfig.ftp_business = config;
    } else {
        console.error('error production environment,use debug beta or release');
    }
}
//配置文件优先级更
try {
    ftpConfig = require('./ftp.json');
} catch (ex) {
    console.log(ex);
}


// Clean
gulp.task('clean', function () {
    return del(['dist/*'])
});

gulp.task('copy', ['sass'], function () {
    return gulp.src(['app/**/*', '!app/images', /*'!bogwer_components/!*',*/ '!app/config/webconfig.js']).pipe(gulp.dest('dist/'));
});

//压缩拷贝js
gulp.task('uglifyjs', function () {
    return gulp.src(['js/**/*.js', '!js/webconfig.js'])
        //.pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});

// js hash
gulp.task('hashjs', function () {
    return gulp.src(['dist/js/*.js'])
        .pipe(rev())
        .pipe(gulp.dest('dist/js'))
        .pipe(rev.manifest())
        .pipe(gulp.dest('dist/js'));
});
gulp.task('hashcss', function () {
    return gulp.src(['dist/css/app.css'])
        // .pipe(gulp.dest('dist/js'))
        .pipe(rev())
        .pipe(gulp.dest('dist/css'))
        .pipe(rev.manifest())
        .pipe(gulp.dest('dist/css'))
});
// 加hash
gulp.task('rev', function () {
    return gulp.src(['dist/**/*.json', 'dist/index.html']) //
        .pipe(revCollector({
            replaceReved: true,
            dirReplacements: {
                'css': 'css/',
                'js': 'js/'
            }
        })) //- 替换后的文件输出
        .pipe(gulp.dest('dist/'));
});

gulp.task('webconfig', function () {
    var argv = require('yargs').argv;
    if (argv.local) {
        console.log('local');
    } else if (argv.test) {
        return gulp.src(['dist/config/webconfig_test.js'])
            .pipe(rename('webconfig.js'))
            .pipe(gulp.dest('dist/js/'));
    } else if (argv.beta) {
        return gulp.src(['dist/config/webconfig_beta.js'])
            .pipe(rename('webconfig.js'))
            .pipe(gulp.dest('dist/js/'));
    } else if (argv.demo) {
        return gulp.src(['dist/config/webconfig_demo.js'])
            .pipe(rename('webconfig.js'))
            .pipe(gulp.dest('dist/js/'));
    } else if (argv.release) {
        return gulp.src(['dist/config/webconfig_business.js'])
            .pipe(rename('webconfig.js'))
            .pipe(gulp.dest('dist/js/'));
    } else {
        console.log('need --test or --beta or --release');
    }
});

gulp.task('ftp', function () {
    var argv = require('yargs').argv;
    if (argv.local) {
        console.log('local');
    } else if (argv.test) {
        console.log('test');
        return gulp.src('dist/**/*')
            .pipe(ftp(ftpConfig.ftp_test))
            .pipe(gutil.noop());
    } else if (argv.beta) {
        return gulp.src('dist/**/*')
            .pipe(ftp(ftpConfig.ftp_bate))
            .pipe(gutil.noop());
    } else if (argv.release) {
        return gulp.src('dist/**/*')
            .pipe(ftp(ftpConfig.ftp_business))
            .pipe(gutil.noop());
    } else {
        console.log('need --test or --beta or --release');
    }

});
gulp.task('publish', function (cb) {
    runSequence('clean', ['copy'], [/*'hashcss', 'hashjs',*/ 'webconfig'], cb);
});

gulp.task("sass", function () {
    gulp.src(["./app/sass/app.scss"]).
        pipe(sourcemaps.init()).
        pipe(sass().on("error", sass.logError)).
        pipe(concat("app.css")).
        pipe(minifycss()).
        pipe(sourcemaps.write("./map")).
        pipe(gulp.dest("./app/css"));
});

/*sass watch: once *.scss file is modified, run [sass] task and update css files*/
gulp.task("sass:watch", function () {
    gulp.watch("./sass/*/*.scss", ["sass"]);
});

gulp.task('jshint', function () {
    return gulp.src('./js/fund/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'));
    //.pipe(jshint.reporter('fail')); when find a problem is found, it stop the task.
});