var gulp = require("gulp");
var ts = require("gulp-typescript");
var tsProject = ts.createProject("tsconfig.json");

gulp.task("compile-typescript",function(){
	return tsProject.src('src/**/*.ts')
		.pipe(tsProject())
		.js.pipe(gulp.dest("dist/client/scripts"));
});

gulp.task("transfer-js",function(){
	// Angular2
	gulp.src(['node_modules/@angular/core/bundles/core.umd.js',
		'node_modules/@angular/common/bundles/common.umd.js',
		'node_modules/@angular/compiler/bundles/compiler.umd.js',
		'node_modules/@angular/platform-browser/bundles/platform-browser.umd.js',
		'node_modules/@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
		'node_modules/@angular/http/bundles/http.umd.js',
		'node_modules/@angular/router/bundles/router.umd.js',
		'node_modules/@angular/forms/bundles/forms.umd.js'
		])
	.pipe(gulp.dest('dist/client/scripts/libs/angular2'));

 	gulp.src("node_modules/core-js/client/shim.min.js")
	.pipe(gulp.dest("dist/client/scripts/libs/core-js"));

	gulp.src("node_modules/zone.js/dist/zone.js")
	.pipe(gulp.dest("dist/client/scripts/libs/zonejs"));

	gulp.src("node_modules/reflect-metadata/Reflect.js")
	.pipe(gulp.dest("dist/client/scripts/libs/reflect-metadata"));

 	gulp.src("node_modules/systemjs/dist/system.src.js")
	.pipe(gulp.dest("dist/client/scripts/libs/systemjs"));

	// jquery.js
	gulp.src("node_modules/jquery/dist/jquery.js")
	.pipe(gulp.dest("dist/client/scripts/libs/jquery"));

	// tether.js *bootstrap tooltip dependence*
	gulp.src("node_modules/tether/dist/js/tether.js")
	.pipe(gulp.dest("dist/client/scripts/libs/tether"));

	// bootstrap.js
	gulp.src("node_modules/bootstrap/dist/js/bootstrap.js")
	.pipe(gulp.dest("dist/client/scripts/libs/bootstrap"));

	// echarts
	gulp.src("node_modules/echarts/dist/echarts.js")
	.pipe(gulp.dest("dist/client/scripts/libs/echarts"));

	// APP SERVER JS
	gulp.src("src/server/app.server.js")
	.pipe(gulp.dest("dist/server"));

});

gulp.task("transfer-css",function() {
	// bootstrap.css
	gulp.src("node_modules/bootstrap/dist/css/bootstrap.css")
	.pipe(gulp.dest('dist/client/css/libs/bootstrap'));

	// font-awesome
	gulp.src("node_modules/font-awesome/css/font-awesome.css")
	.pipe(gulp.dest('dist/client/css/libs/font-awesome/css'));
	gulp.src("node_modules/font-awesome/fonts/*")
	.pipe(gulp.dest('dist/client/css/libs/font-awesome/fonts'));

	// APP CSS
	gulp.src(['src/client/css/*.css'])
		.pipe(gulp.dest('dist/client/css'));
});

gulp.task("transfer-html",function(){
	// APP HTML
	gulp.src("src/client/views/*.html")
	.pipe(gulp.dest("dist/client/views"))

});

gulp.task("default",
	['compile-typescript','transfer-js','transfer-css','transfer-html'], 
	function(){
		console.log('Default task running');
		var ts_watcher = gulp.watch('src/**/*.ts',['compile-typescript']);
		ts_watcher.on('change',function(event){
			console.log('File '+ event.path+' was ' + event.type);
		});

		var html_css_watcher=gulp.watch(
			['src/**/*.html','src/**/*.css','src/**/*.js'],
			['transfer-js','transfer-css','transfer-html'],
			function() {
			// body...
			console.log('html_css_watcher running');
			});
});
