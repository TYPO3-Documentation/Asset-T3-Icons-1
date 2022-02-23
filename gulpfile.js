var basePaths = {
    src: 'build/assets/',
    dest: 'build/assets/',
};
var paths = {
    images: {
        src: basePaths.src + 'img/',
        dest: basePaths.dest + 'sprite/'
    },
    sprite: {
        src: basePaths.src + 'img/*',
        svg: 'sprite/sprite.svg',
        css: '../../' + basePaths.src + 'sass/src/_sprite.scss'
    },
    templates: {
        src: basePaths.src + 'tpl/'
    }
};

/*
	Let the magic begin
*/
var gulp = require('gulp');

var $ = {
    gutil: require('gulp-util'),
    svgSprite: require('gulp-svg-sprite'),
    size: require('gulp-size'),
};

var changeEvent = function(evt) {
    $.gutil.log('File', $.gutil.colors.cyan(evt.path.replace(new RegExp('/.*(?=/' + basePaths.src + ')/'), '')), 'was', $.gutil.colors.magenta(evt.type));
};

gulp.task('sprite', function () {
    return gulp.src(paths.sprite.src)
        .pipe($.svgSprite({
            shape: {
                spacing: {
                    padding: 5
                }
            },
            mode: {
                css: {
                    dest: "./",
                    layout: "diagonal",
                    sprite: paths.sprite.svg,
                    bust: false,
                    render: {
                        scss: {
                            dest: "sass/src/_sprite.scss",
                            template: "build/assets/sass/tpl/sprite-template.scss"
                        }
                    }
                }
            },
            variables: {
                mapname: "icons"
            }
        }))
        .pipe(gulp.dest(basePaths.dest));
});

gulp.task('watch', function(){
    gulp.watch(paths.sprite.src, gulp.series('sprite')).on('change', function(evt) {
        changeEvent(evt);
    });
});

gulp.task('default', gulp.series('sprite'));