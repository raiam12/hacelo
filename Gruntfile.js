'use strict';

module.exports = function(grunt){
	grunt.initConfig({
		/*concat:{
			dist:{
				src:["src/sass/*.scss"],
				dest:"src/sass/compile.scss"
			}
		},*/
		config:{
			root:"src",
			rootBuild:"hacelo/www/build",
			rootPartials:"hacelo/www/"
		},

		sass: {
			dist: {
		        options: {
		          style: 'compressed',
		        },
		        files: {
		          '<%= config.rootBuild %>/css/darkroom.min.css':'<%= config.root %>/sass/darkroom.scss'
		        }
		    }
		},

	    clean: {
	    	build:['<%= config.rootBuild %>'],
	    	sass:['<%= config.rootBuild %>/css'],
	    	js:['<%= config.rootBuild %>/js'],
	    	partials:['<%= config.rootPartials %>partials']
	    },

	    watch:{
	    	css:{
	    		files:['<%= config.root %>/sass/*.scss'],
	    		tasks:['clean:sass','sass']
	    	},
	    	js:{
	    		files:['<%= config.root %>/lib/custom/*.js'],
	    		tasks:['clean:js','copy:js','copy:custom_js','uglify:darkroom','uglify:fabric','uglify:js']
	    	},

	    	partials:{
	    		files:['<%= config.root %>/partials/*.html'],
	    		tasks:['clean:partials','copy:partials']
	    	}
	    },

	    connect: {
            server: {
                options: {
                    port: 9001,
                    base: 'resize/www/',
                    keepalive: true
                }
            }
        },

	    uglify:{
	    	options: {
		      mangle: false
		    },

	    	js:{
	    		files:{
	    			"<%= config.rootBuild %>/js/script.js":["<%= config.root %>/lib/custom/*.js"]
	    		}
	    	},
	    	darkroom:{
	    		files:{
	    			"<%= config.rootBuild %>/js/lib/darkroom.min.js":[
	    			"<%= config.root %>/lib/darkroom/darkroom.js",
		            '<%= config.root %>/lib/darkroom/darkroom.history.js',
		            '<%= config.root %>/lib/darkroom/darkroom.rotate.js',
		            '<%= config.root %>/lib/darkroom/darkroom.crop.js',
		            '<%= config.root %>/lib/darkroom/darkroom.save.js'
	    			
	    			]
	    		}
	    	},
	    	fabric:{
	    		files:{
	    			"<%= config.rootBuild %>/js/lib/fabric.js":["<%= config.root %>/lib/fabric/*.js"]
	    		}
	    	},

	    },

	    copy:{
	    	images:{
	    		files:[{
	    			expand: true,
				    cwd: '<%= config.root%>/images/',
				    src: '**',
				    dest: '<%= config.rootBuild %>/images/'
	    		}]
	    	},
	    	js:{
	    		files:[{
	    			expand:true,
	    			cwd:'<%= config.root %>/lib',
	    			src:'*.js',
	    			dest:'<%= config.rootBuild %>/js/lib/'
	    		}]
	    	},

	    	custom_js :{
	    		files:[{
	    			expand:true,
	    			cwd:'<%= config.root %>/lib/custom',
	    			src:'*.js',
	    			dest:'<%= config.rootBuild %>/js/custom/'
	    		}]
	    	},
	    	partials :{
	    		files:[{
	    			expand:true,
	    			cwd:'<%= config.root %>/partials/',
	    			src:'*.html',
	    			dest:'<%= config.rootPartials %>partials/'
	    		}]
	    	}
	    },

	    webfont: {
	      icons: {
	        src: '<%= config.rootBuild %>/images/*.svg',
	        dest: '<%= config.root %>/sass/fonts',
	        destCss: '<%= config.root %>/sass/webfont',
	        options: {
	          font: 'darkroom',
	          //types: 'ttf',
	          embed: 'woff,ttf',
	          stylesheet: 'scss',
	          relativeFontPath: '../fonts',
	          htmlDemo: false,
	          syntax: 'bootstrap',
	          templateOptions: {
	            classPrefix: 'darkroom-icon-'
	          }
	        }
	      }
	    },
	});

	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-connect');
  	grunt.loadNpmTasks('grunt-webfont');
	grunt.registerTask('default',['clean:build','clean:partials',/*,'concat'*/'copy','uglify:darkroom','uglify:fabric','uglify:js','webfont','sass','watch']);
};