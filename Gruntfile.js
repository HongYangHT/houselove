module.exports = function(grunt){
	grunt.initConfig({
		less:{
			compileLogin: {
				option:{ },
				files: {
					'public/css/login.css':'public/less/login.less'
				}
			},
			compileMain: {
				options: { },
				files: {
					
				}
			},
			minify : {
                options : {
                    cleancss : true,
                    report : 'min',
                    compress : true,
                    cleancssOptions : {
                        keepSpecialComments : 0,
                        keepBreaks : false
                    }
                },
                files : {
                	'public/css/login.min.css':'public/css/login.css',
                	'public/css/lib/datepicker.min.css':'public/css/lib/datepicker.css'
                }
            }
		},
		
		watch:{
			scripts: {
			   files:['public/less/*.less','public/less/lib/*.less'],
			   tasks:['less']
			} 
		
		}
	});	
	
	grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('default', [ 'less', 'watch' ]);
    grunt.registerTask('buildAll', [ 'less', 'requirejs', 'uglify' ]);

}