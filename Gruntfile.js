//包装函数
module.exports=function(grunt){
	//任务配置，所有插件的配置信息
	grunt.initConfig({
		//获取package.json信息
		pkg:grunt.file.readJSON('package.json'),
		//uglify插件配置信息
		uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n' //添加banner
            },
            buildall: {
                options: {
                    mangle: true,
                    compress: {
                        drop_console: true
                    },
                    report: "min" //输出压缩率，可选的值有 false(不输出信息)，gzip
                },
                files: [{
                    expand: true,
                    cwd: 'src', //js目录下
                    src: '**/*.js', //所有js文件
                    dest: 'build' //输出到此目录下
                }]
            }
        },
        //jshint插件配置信息
        jshint: {
            files: ['src/**/*.js', 'test/**/*.js'],
            options: {
                //覆盖默认配置
                globals: {
                    jQuery: true,
                    console: true,
                    module: true,
                    document: true
                }
            }
        },
        //watch插件配置信息
        watch: {
            scripts: {
                files: ['src/**/*.js'],
                tasks: ['minall'],
                options: {
                    spawn: true,
                    interrupt: true
                }
            }
        }
	});
	//告诉grunt讲使用以下插件
	 grunt.loadNpmTasks('grunt-contrib-uglify');
	 grunt.loadNpmTasks('grunt-contrib-jshint');
	 grunt.loadNpmTasks('grunt-contrib-watch');
	//终端输出
	grunt.registerTask('default',['jshint','uglify','watch']);
}