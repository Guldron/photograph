'use strict';

var gulp = require('gulp');
var connect = require('gulp-connect');
var bower = require('gulp-bower');
var concat = require('gulp-concat');
var concatCss = require('gulp-concat-css');
var uglify = require('gulp-uglify');
var cleanCSS = require('gulp-clean-css');
var ngAnnotate = require('gulp-ng-annotate');
var gls = require('gulp-live-server');
var livereload = require('gulp-livereload');

var path = {
		js : ['app/app.module.js',
			  'app/app.router.js',
			  'app/app.dataservice.js',
			  'app/app.objectUrlMaker.js',
			  'app/components/**/*.js'
			  ],

		bowerComponents : ['app/bower_components/jquery/dist/jquery.js',
						   'app/bower_components/jquery-bx-slider/src/js/jquery.bxslider.js',
						   'app/bower_components/angular/angular.js',
						   'app/bower_components/angular-ui-router/release/angular-ui-router.js',
						   'app/bower_components/semantic/dist/semantic.js',
						   'app/bower_components/photoswipe/dist/photoswipe-ui-default.js',
						   'app/bower_components/photoswipe/dist/photoswipe.js',
						   'app/bower_components/ng-file-upload/ng-file-upload.js',
						   'app/bower_components/ng-file-upload/ng-file-upload-shim.js'],

		css : ['app/css/*.css',
			   'app/bower_components/semantic/dist/semantic.css',
			   'app/bower_components/jquery-bx-slider/src/css/jquery.bxslider.css',
			   'app/bower_components/photoswipe/dist/photoswipe.css',
			   'app/bower_components/photoswipe/dist/default-skin/default-skin.css'],

		templates : ['app/components/tabs/tabs.directive.html',
					 'app/components/about/about.directive.html',
					 'app/components/slider/slider.directive.html',
					 'app/components/gallery/gallery.directive.html',
					 'app/components/admin/admin.directive.html',
					 'app/components/image-gallery/image-gallery.directive.html',
					 'app/components/gallery-upload/gallery-upload.directive.html'] 
};

livereload({ start: true });

gulp.task('bower', function() {
		return bower();
});

gulp.task('bowerComponents', function() {
		gulp.src(path.bowerComponents)
				.pipe(concat('vendor.js'))
		        .pipe(gulp.dest('public/vendor'))
		        .pipe(livereload());
});


gulp.task('js', function() {
		gulp.src(path.js)
				.pipe(ngAnnotate({
            			add: true
        		}))
				.pipe(concat('app.js'))
		        .pipe(gulp.dest('public/vendor'))
		        .pipe(livereload());
});

gulp.task('css', function() {
		gulp.src(path.css)
				.pipe(concatCss('app.css', {rebaseUrls: false}))
				.pipe(cleanCSS())
		        .pipe(gulp.dest('public/vendor'))
		        .pipe(livereload());
});

gulp.task('templates', function() {
		gulp.src(path.templates)
		        .pipe(gulp.dest('public/vendor/templates'))
		        .pipe(livereload());
});

// gulp.task('server', function () {
//     var options = {
//         cwd: undefined
//     };
//     options.env = process.env;
//     options.env.NODE_ENV = 'development';
//     var server = gls('server.js', options, 35729);
//     server.start();

//     gulp.watch(['public/**/*.html', 'public/**/*.js', 'public/**/*.css'], function(file) {
//         server.start.bind(server)();
//         server.notify.bind(server)(file);
//         console.log('refresh')
//     });
// });

gulp.task('watch', function () {
	livereload.listen();
    gulp.watch(path.bowerComponents, ['bowerComponents']);
    gulp.watch(path.templates, ['templates']);
    gulp.watch(path.css, ['css']);
    gulp.watch(path.js, ['js']);
});

gulp.task('default', ['bower', 'bowerComponents', 'js', 'css', 'templates', 'watch']);

// gulp.task('nodemon', function (cb) {
//   var called = false;
//   return nodemon({

//     script: 'server.js',

//     watch: ['server.js',
//     		'./public/**/*.*']
//   })
//     .on('start', function onStart() {
//       if (!called) { cb(); }
//       called = true;
//     })
//     .on('restart', function onRestart() {
//       setTimeout(function reload() {
//         browserSync.reload({
//           stream: false
//         });
//       }, BROWSER_SYNC_RELOAD_DELAY);
//     });
// });

// gulp.task('browser-sync', ['nodemon'], function () {

//   browserSync({

//     proxy: 'http://localhost:3000',
//     port: 4000,
//     browser: ['google chrome']
//   });
// });

// gulp.task('bs-reload', function () {
//   browserSync.reload();
// });
