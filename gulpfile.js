let project_folder = require("path").basename(__dirname); //место куда собираеться проект. Его передаем закажчику.
let source_folder = "#src"; //иммя папки с исходниками(Обработаными файлами).

let fs = require('fs');

let path = { //Содержит обьекты, которые в свою очередь будут пути к файлам и папкам
  build: { //Пути вывода, куда gulp будет выгружать обработаные файлы
    html: project_folder + "/",
    css: project_folder + "/css/",
    js: project_folder + "/js/",
    addons: project_folder + "/js/",
    img: project_folder + "/img/",
    fonts: project_folder + "/fonts/",
  },
  src: { //Для папки с исходниками(Обработаными файлами)
    html: [source_folder + "/*.html", "!" + source_folder + "/_*.html"], //Начиная со знака "!", это отрицание
    css: source_folder + "/scss/style.scss",
    js: source_folder + "/js/script.js",
    addons: source_folder + "/js/addons/*.js",
    img: source_folder + "/img/**/*.{jpg,png,gif,ico,webp,svg}", //**/-все папки и подпапки внутри img
    fonts: source_folder + "/fonts/*.ttf",
  },
  watch: { //содержит пути к файлам которые нужно слушать, отлавливать их изменения
    html: source_folder + "/**/*.html",
    css: source_folder + "/scss/**/*.scss",
    js: source_folder + "/js/**/*.js",
    img: source_folder + "/img/**/*.{jpg,png,gif,ico,webp,svg}", //**/-все папки и подпапки внутри img
    fonts: source_folder + "/fonts/*.{ttf,otf}" //**/-все папки и подпапки внутри img
  },
  clean: "./" + project_folder + "/", //путь к папке проекта. Обьект отвечает за удаление этой папки при каждом запуске gulp
}


let { src, dest } = require('gulp'),
  gulp = require('gulp'),
  //Значение в скобках точное название установленного плагина!!!
  browsersync = require("browser-sync").create(),
  fileinclude = require("gulp-file-include"),
  del = require("del"),
  scss = require("gulp-sass"),
  autoprefixer = require("gulp-autoprefixer"),
  groupmedia = require("gulp-group-css-media-queries"),
  cleancss = require("gulp-clean-css"),
  rename = require("gulp-rename"),
  uglify = require("gulp-uglify-es").default,
  imagemin = require('gulp-imagemin'),
  webp = require('gulp-webp'),
  gulpWebpHtml2 = require('gulp-webp-in-html'),
  webpCss = require('gulp-webp-css'),
  ttf2woff = require('gulp-ttf2woff'),
  ttf2woff2 = require('gulp-ttf2woff2'),
  fonter = require('gulp-fonter'),
  iconfont = require('gulp-iconfont');
// sourcemaps = require('gulp-sourcemaps');


//Функция обновления страницы
function browserSync() {
  browsersync.init({
    //Сюда пишет настройки плагина
    server: { //Например настройки сервера
      baseDir: "./" + project_folder + "/"
    },
    port: 3000, //Порт по которому будет открываться браузер
    notify: false,
    // browser: ["firefox"]
  })
}

function html() {
  return src(path.src.html)
    //.pipe(), функция в которой ми пишет для Gulp те или иные команды
    // .pipe(gulpWebpHtml2())
    .pipe(fileinclude(
      {
        indent: true
      }
    ))
    .pipe(dest(path.build.html)) //создалась папка дест, а вней файл html
    .pipe(browsersync.stream()) //перезагрузка браузера
}

function css() {
  return src(path.src.css)
    //.pipe(), функция в которой ми пишет для Gulp те или иные команды
    .pipe(
      scss({
        outputStyle: "expanded",
      })
    )
    .pipe(
      groupmedia()
    )
    .pipe(
      autoprefixer({
        overrideBrowserslist: ["last 5 versions"],
        cascade: true
      })
    )
    .pipe(
      webpCss(['.jpg', '.jpeg', 'png'])
    )
    .pipe(dest(path.build.css))//Записывает в папку dest css файл
    .pipe(cleancss())
    .pipe(
      rename({
        extname: ".min.css"
      })
    )
    .pipe(dest(path.build.css)) //в папку dest создает сжатый файл css
    .pipe(browsersync.stream()) //перезагрузка браузера
}

function js() {
  src(path.src.addons)
    .pipe(dest(path.build.addons))
  return src(path.src.js)
    //.pipe(), функция в которой ми пишет для Gulp те или иные команды
    .pipe(fileinclude()) //настройки не обязательны !!!
    .pipe(dest(path.build.js))//Записывает в папку dest js файл
    .pipe(browsersync.stream()) //перезагрузка браузера
    .pipe(
      uglify()
    )
    .pipe(
      rename({
        extname: ".min.js"
      })
    )
    .pipe(dest(path.build.js)) //в папку dest создает сжатый файл js

    .pipe(browsersync.stream()) //перезагрузка браузера
}

function images() {
  del(require("path").basename(__dirname) + '/img/*')
  return src(path.src.img)
    .pipe(
      webp({ //Преобразовывает картинку в формат .webp
        // quality: 70
        quality: 100
      })
    )
    .pipe(dest(path.build.img)) //Выгружает в dest .webp
    .pipe(src(path.src.img))
    .pipe(
      imagemin({
        progressive: true,
        svgoPlugins: [{ removeViewBox: false }],
        interlaced: true,
        optimizationLevel: 0 // 0 to 7
      })
    )
    .pipe(dest(path.build.img)) //создалась папка дест, а вней картинки
    .pipe(browsersync.stream()) //перезагрузка браузера
}

function fonts() {
  src([source_folder + '/fonts/*.otf'])
    .pipe(fonter({
      formats: ['ttf'] //Из otf в ttf
    }))
    .pipe(dest(source_folder + '/fonts/'))
  src(path.src.fonts)
    .pipe(ttf2woff())
    .pipe(dest(path.build.fonts))
    .pipe(browsersync.stream())
  return src(path.src.fonts)
    .pipe(ttf2woff2())
    .pipe(dest(path.build.fonts))
    .pipe(browsersync.stream())
}

function iconfonts() {
  return src([source_folder + '/img/iconfont/*.svg'])
    .pipe(iconfont({
      fontName: 'icons', // required
      formats: ['woff', 'woff2'], // default, 'woff2' and 'svg' are available
    }))
    .pipe(dest(path.build.fonts))
}

function watchFiles() {
  //Слежка за файлами
  gulp.watch([path.watch.html], html); //gulp.watch([Путь], функция которая обрабатывает html)
  gulp.watch([path.watch.css], css); //gulp.watch([Путь], функция которая обрабатывает css)
  gulp.watch([path.watch.js], js); //gulp.watch([Путь], функция которая обрабатывает js)
  gulp.watch([path.watch.img], images); //gulp.watch([Путь], функция которая обрабатывает картинки)
  gulp.watch([path.watch.fonts], fonts);
}

function clean() {
  return del(path.clean);
}

function fontsStyle(cb) {
  let file_content = fs.readFileSync(source_folder + '/scss/fonts.scss');
  if (file_content == '') {
    fs.writeFile(source_folder + '/scss/fonts.scss', '', cb);
    return fs.readdir(path.build.fonts, function (err, items) {
      if (items) {
        let c_fontname;
        for (var i = 0; i < items.length; i++) {
          let fontname = items[i].split('.');
          fontname = fontname[0];
          if (c_fontname != fontname) {
            fs.appendFile(source_folder + '/scss/fonts.scss', '@include font("' + fontname + '", "' + fontname + '", "400", "normal");\r\n', cb);
          }
          c_fontname = fontname;
        }
      }
    })
  }
  cb()
}

let build = gulp.series(clean, gulp.parallel(js, css, html, images, fonts), fontsStyle);//в gulp.series вписываем различные функции, которые должны выполняться поочерёдно
let watch = gulp.parallel(build, watchFiles, browserSync); //.parallel(), осуществляет любые операций, асинхронно.

//Gulp нужно подружить с нашими переменными для этого используеться exports.
exports.fontsStyle = fontsStyle;
// exports.iconfonts = iconfonts;
exports.fonts = fonts;
exports.images = images;
exports.js = js;
exports.css = css;
exports.html = html;
exports.build = build;
exports.watch = watch;
exports.default = watch;
