module.exports = function(grunt) {

	require('load-grunt-tasks')(grunt);

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		env : {
			options : {
				/* Shared Options Hash */
				//globalOption : 'foo'
			},
			dev: {
				NODE_ENV : 'DEVELOPMENT'
			},
			prod : {
				NODE_ENV : 'PRODUCTION'
			}
		},

		assemble: {
			options: {
				flatten: true,
				assets: '<%= pkg.assetsPath %>',
				data: '<%= pkg.buildPath %>assembly/_data/*.{json,yml}'
			},

			site: {
				options: {
					// Templates
					partials:  '<%= pkg.buildPath %>assembly/_includes/**/*.hbs',
					layoutdir: '<%= pkg.buildPath %>assembly/_layouts',
					layout: 'default.hbs'
				},
				src: ['<%= pkg.buildPath %>assembly/_pages/*.hbs'],
				dest: '<%= pkg.destination %>'
			},

			nojs: {
				options: {
					// Templates
					partials:  '<%= pkg.buildPath %>nojs/_includes/**/*.hbs',
					layoutdir: '<%= pkg.buildPath %>nojs/_layouts',
					layout: 'nojs.hbs'
				},
				src: ['<%= pkg.buildPath %>nojs/_pages/*.hbs'],
				dest: '<%= pkg.destination %>'
			},
		
		},

		preprocess: {
			def: {
				expand: true,
				cwd: '<%= pkg.destination %>',
				ext: '.html',
				src: ['*.html'],
				dest: '<%= pkg.destination %>'
			}
		},

		replace: {
			def : {
				files: [{
					expand: true,
					cwd: '<%= pkg.destination %>',
					src: ['*.html'],
					dest: '<%= pkg.destination %>'
				}],
				options: {
					patterns: [{
						match: /\{%/g,
						replacement: '{{'
					},{
						match: /%\}/g,
						replacement: '}}'
					},{
						match: /\{%%/g,
						replacement: '{{{'
					},{
						match: /%%\}/g,
						replacement: '}}}'
					}]
				}
			}
		},

		prettify: {
			options: {
				indent: 4,
				indent_char: ' ',
				condense: false,
				indent_inner_html: true,
			},
			def: {
				expand: true,
				wd: '<%= pkg.destination %>',
				ext: '.html',
				src: ['*.html'],
				dest: '<%= pkg.destination %>'
			}
		},

		modernizr: {

			dist: {
				// [REQUIRED] Path to the build you're using for development.
				"devFile" : "<%= pkg.buildPath %>js/vendor/modernizr-dev.js",

				// [REQUIRED] Path to save out the built file.
				"outputFile" : "<%= pkg.buildPath %>js/head/11-modernizr-custom.js",

				// Based on default settings on http://modernizr.com/download/
				"extra" : {
					"shiv" : true,
					"printshiv" : false,
					"load" : true,
					"mq" : false,
					"cssclasses" : true
				},

				// Based on default settings on http://modernizr.com/download/
				"extensibility" : {
					"addtest" : false,
					"prefixed" : false,
					"teststyles" : false,
					"testprops" : false,
					"testallprops" : false,
					"hasevents" : false,
					"prefixes" : false,
					"domprefixes" : false
				},

				// By default, source is uglified before saving
				"uglify" : false,

				// Define any tests you want to implicitly include.
				"tests" : ['flexbox'],

				// By default, this task will crawl your project for references to Modernizr tests.
				// Set to false to disable.
				"parseFiles" : true,

				// When parseFiles = true, this task will crawl all *.js, *.css, *.scss files, except files that are in node_modules/.
				// You can override this by defining a "files" array below.
				"files" : {
					"src" : [
						'<%= pkg.buildPath %>scss/**/*.scss',
						'<%= pkg.buildPath %>js/**/*.js'
					]
				},
			},

			// When parseFiles = true, matchCommunityTests = true will attempt to
			// match user-contributed tests.
			//"matchCommunityTests" : false,

			// Have custom Modernizr tests? Add paths to their location here.
			//"customTests" : []
		},

		jshint: {
			src: ['Gruntfile.js', '<%= pkg.buildPath %>js/app/**/*.js'],
			options: {
				smarttabs: true,
				supernew: true,
				reporter: require('jshint-stylish'),
			}
		},

		concat: {
			options: {
				separator : ';',
				stripBanners : true,
			},
			def: {
				files: {
					'<%= pkg.assetsPath %>js/head.js' : '<%= pkg.buildPath %>js/head/*.js',
					'<%= pkg.assetsPath %>js/compat.js' : '<%= pkg.buildPath %>js/compat/*.js',

					'<%= pkg.assetsPath %>js/<%= pkg.name %>.js': [
						'<%= pkg.buildPath %>js/vendor/jquery-1.11.1.js',

						'<%= pkg.buildPath %>foundation/js/foundation/foundation.js',
						'<%= pkg.buildPath %>foundation/js/foundation/foundation.reveal.js',


						'<%= pkg.buildPath %>js/lib/*.js',

						'<%= pkg.buildPath %>js/app/setup.js',
						'<%= pkg.buildPath %>js/app/app.js',
						'<%= pkg.buildPath %>js/app/modules/*.js',
						'<%= pkg.buildPath %>js/app/interface.js'
					],
				}
			}
		},

		uglify: {
			options: {
				screwIE8: true,
				preserveComments: false,
				banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
			},
			def: {
				files: {
					'<%= pkg.assetsPath %>js/head.min.js' : ['<%= pkg.assetsPath %>js/head.js' ],
					'<%= pkg.assetsPath %>js/compat.min.js' : ['<%= pkg.assetsPath %>js/compat.js' ],
					'<%= pkg.assetsPath %>js/<%= pkg.name %>.min.js' : ['<%= pkg.assetsPath %>js/<%= pkg.name %>.js']
				}
			}
		},

		css_purge: {
			production: {
				options: {
					"verbose": false,
					"no_duplicate_property": true,
				},
				files: {
					'<%= pkg.assetsPath %>css/main.css': ['<%= pkg.assetsPath %>css/main.css']
				}
			}
		},

		compass: {
			options: {
				sassDir: '<%= pkg.buildPath %>scss',
				cssDir: '<%= pkg.assetsPath %>css',
				imagesDir: '<%= pkg.assetsPath %>img',
				relativeAssets: true,
				importPath: [
					'<%= pkg.buildPath %>foundation/scss',
				]
			},

			development: {
				options: {
					environment: 'development',
				}
			},

			production: {
				options: {
					environment: 'production',
					outputStyle: 'compressed'
				}
			}
		},

		postcss: {
			development: {
				src: '<%= pkg.assetsPath %>css/*.css',
				options: {
					processors: [
						require('autoprefixer-core')({browsers: 'last 2 versions'})
					]
				}
			},

			production: {
				src: '<%= pkg.assetsPath %>css/*.css',
				options: {
					processors: [
						require('autoprefixer-core')({browsers: 'last 2 versions'}),
						require('csswring')({removeAllComments: true})
					]
				}
			}
		},

		watch: {
			scripts: {
				files: [ '<%= pkg.buildPath %>js/app/**/*.js', ],
				tasks: [ 'jshint', 'concat' ]
			},

			scss: {
				files: [ '**/*.scss' ],
				tasks: [ 'compass:development', 'css_purge', 'postcss:development' ]
			},

			assemble: {
				files: [ '<%= pkg.buildPath %>assembly/**/*.hbs', ],
				tasks: [ 'env:dev', 'modernizr', 'assemble', 'preprocess', 'replace' ]
			}
		},

		browserSync: {
			bsFiles: {
				src : [
					'assets/css/*.css',
					'assets/js/*.js',
					'*.html'
				]

			},
			options: {
				watchTask: true,
				server: {
					baseDir: "./"
				}
			}
		}

	});





	// Default task(s).
	grunt.registerTask('default',    ['env:dev', 'modernizr', 'jshint', 'concat', 'compass:development', 'css_purge', 'postcss:development', 'assemble', 'preprocess', 'replace']);
	grunt.registerTask('browser',    ['default', 'browserSync', 'watch']);
	grunt.registerTask('production', ['env:prod', 'modernizr', 'jshint', 'concat', 'uglify', 'compass:production', 'postcss:production', 'assemble', 'preprocess', 'replace', 'css_purge']);

};