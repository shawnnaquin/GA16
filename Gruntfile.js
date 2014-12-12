module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		jshint: {
			src: [
				'Gruntfile.js',
				'<%= pkg.buildPath %>js/app/**/*.js'
			],
			options: {
				smarttabs: true,
				supernew: true,
			}
		},
		autoprefixer: {
			options: {
				browsers: ['last 2 version', 'ie 8', 'ie 9']
			},
			dist: {
				src: '<%= pkg.assetsPath %>css/*.css'
			}
		},
		modernizr: {

			dist: {
				// [REQUIRED] Path to the build you're using for development.
				"devFile" : "<%= pkg.buildPath %>js/vendor/modernizr-dev.js",

				// [REQUIRED] Path to save out the built file.
				"outputFile" : "<%= pkg.buildPath %>js/head/modernizr-custom.js",

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
				//"src": []
			},

			// When parseFiles = true, matchCommunityTests = true will attempt to
			// match user-contributed tests.
			//"matchCommunityTests" : false,

			// Have custom Modernizr tests? Add paths to their location here.
			//"customTests" : []
		},
		assemble: {
			options: {
				flatten: true,
				postprocess: require('pretty'),
				assets: '<%= pkg.assetsPath %>',
				data: '<%= pkg.buildPath %>assembly/_data/*.{json,yml}',

				// Templates
				partials:  '<%= pkg.buildPath %>assembly/_includes/**/*.hbs',
				layoutdir: '<%= pkg.buildPath %>assembly/_layouts',
				layout: 'default.hbs',
			},
			site: {
				src: ['<%= pkg.buildPath %>assembly/_pages/*.hbs'],
				dest: '<%= pkg.destination %>'
			}
		},
		watch: {
			options: {
				livereload: true,
			},
			files: [
				'<%= pkg.buildPath %>js/**/*.js',
				'<%= pkg.buildPath %>assembly/**/*.hbs',
				'**/*.scss'
			],
			tasks: [
				'modernizr',
				'jshint',
				'concat',
				'compass:def',
				'autoprefixer',
				'assemble'
			]
		},
		concat: {
			options: {
				separator : ';',
				stripBanners : true,
				banner : ''
			},
			def: {
				files: {
					'<%= pkg.assetsPath %>js/head.js'            : '<%= pkg.buildPath %>js/head/*.js',
					'<%= pkg.assetsPath %>js/<%= pkg.name %>.js' : [
						'<%= pkg.buildPath %>js/vendor/jquery-1.11.1.js',
						'<%= pkg.buildPath %>foundation/js/foundation/foundation.js',
						'<%= pkg.buildPath %>js/lib/*.js',
						'<%= pkg.buildPath %>js/app/app.js',
						'<%= pkg.buildPath %>js/app/modules/*.js',
						'<%= pkg.buildPath %>js/app/interface.js'
					],
					'<%= pkg.assetsPath %>js/compat.js'          : [
						'<%= pkg.buildPath %>js/compat/css3-multi-column.js',
						'<%= pkg.buildPath %>js/compat/respond.js'
					],
					'<%= pkg.assetsPath %>js/ie8.js'          : [
						'<%= pkg.buildPath %>js/compat/ie8.js'
					]
				}
			}
		},
		uglify: {
			options: {
				banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
			},
			def: {
				files: {
					'<%= pkg.assetsPath %>js/head.min.js'    : ['<%= pkg.assetsPath %>js/head.js' ],
					'<%= pkg.assetsPath %>js/compat.min.js'    : ['<%= pkg.assetsPath %>js/compat.js' ],
					'<%= pkg.assetsPath %>js/<%= pkg.name %>.min.js' : ['<%= pkg.assetsPath %>js/<%= pkg.name %>.js']
				}
			},
			deps: {
				files: [
					{
						expand: true,     // Enable dynamic expansion.
						cwd:  '<%= pkg.buildPath %>js/plugins/',      // Src matches are relative to this path.
						src: ['**/*.js'], // Actual pattern(s) to match.
						dest: '<%= pkg.assetsPath %>js/plugins/',   // Destination path prefix.
						ext:  '.min.js',   // Dest filepaths will have this extension.
					},
				],
			}
		},
		compass: {
			def: {
				options: {
					sassDir:   '<%= pkg.buildPath %>scss',
					cssDir:    '<%= pkg.assetsPath %>css',
					imagesDir: '<%= pkg.assetsPath %>img',
					relativeAssets: true,
				}
			},
			prod: {
				options: {
					sassDir:   '<%= pkg.buildPath %>scss',
					cssDir:    '<%= pkg.assetsPath %>css',
					imagesDir: '<%= pkg.assetsPath %>img',
					relativeAssets: true,
					outputStyle: 'compressed',
					environment: 'production',
				}
			}
		},
		imagemin: {
			dynamic: {                         // Another target
				files: [{
					expand: true,                  // Enable dynamic expansion
					cwd: '<%= pkg.buildPath %>img/',                   // Src matches are relative to this path
					src: ['**/*.{png,jpg,gif}'],   // Actual patterns to match
					dest: '<%= pkg.assetsPath %>img/'                  // Destination path prefix
				}]
			}
		}

	});

	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-compass');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.loadNpmTasks('assemble');
	grunt.loadNpmTasks('grunt-modernizr');
	grunt.loadNpmTasks('grunt-autoprefixer');

	// Default task(s).
	grunt.registerTask('default',    ['modernizr', 'jshint', 'concat', 'compass:def', 'autoprefixer', 'assemble']);
	grunt.registerTask('production', ['modernizr', 'jshint', 'concat', 'uglify', 'compass:prod', 'autoprefixer', 'assemble']);
};
