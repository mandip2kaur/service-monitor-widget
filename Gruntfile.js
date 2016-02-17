/*jslint node: true */
(function () {'use strict';}());

var dashToCamel = function (str) {
  return str.replace(/\W+(.)/g, function (x, chr) {
    return chr.toUpperCase();
  });
};

var camelToDash = function (str) {
  return str.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
};

var manifest = require('./manifest.json');
var buildNumber = process.env.BUILD_NUMBER;
var version = manifest.app.version.substring(0, manifest.app.version.lastIndexOf('.') + 1) + (buildNumber ? buildNumber : 'dev');
var appName = dashToCamel(manifest['app']['app-id'].split('.')[2]);

//Using exclusion patterns slows down Grunt significantly
//instead of creating a set of patterns like '**/*.js' and '!**/node_modules/**'
//this method is used to create a set of inclusive patterns for all subdirectories
//skipping node_modules, bower_components, dist, and any .dirs
//This enables users to create any directory structure they desire.
var createFolderGlobs = function (fileTypePatterns, opt) {
    fileTypePatterns = Array.isArray(fileTypePatterns) ? fileTypePatterns : [fileTypePatterns];

    var ignore = ['node_modules', 'bower_components', 'dist', 'reports', 'temp', 'build'];

    if(opt) {
      if(opt.ignoreDir) {
        ignore = Array.isArray(opt.ignoreDir) ? ignore.concat(opt.ignoreDir) : ignore.concat([opt.ignoreDir]);
      }
    }

    var fs = require('fs');
    return fs.readdirSync(process.cwd())
        .map(function (file) {
            if (ignore.indexOf(file) !== -1 ||
                file.indexOf('.') === 0 || !fs.lstatSync(file).isDirectory()) {
                return null;
            } else {
                return fileTypePatterns.map(function (pattern) {
                    return file + '/**/' + pattern;
                });
            }
        })
        .filter(function (patterns) {
            return patterns;
        })
        .concat(fileTypePatterns);
};

module.exports = function (grunt) {

    // load all grunt tasks
    require('load-grunt-tasks')(grunt);

    // Project configuration.
    grunt.initConfig({
        connect: {
            options: {
                port: 9000
            },
            main: {
              options: {
                open: true
              }
            },
            dist: {
              base: './dist/'
            }
        },
        watch: {
            main: {
                options: {
                    livereload: true,
                    livereloadOnError: false,
                    spawn: false
                },
                files: [createFolderGlobs(['*.js', '*.less', '*.html']), '!_SpecRunner.html', '!.grunt'],
                tasks: [] //all the tasks are run dynamically during the watch event handler
            }
        },
        jshint: {
            main: {
                options: {
                    jshintrc: '.jshintrc'
                },
                src: createFolderGlobs('*.js')
            }
        },
        clean: {
            before: {
                src: ['dist', 'temp']
            },
            after: {
                src: ['temp']
            },
            deploy: {
                src: [createFolderGlobs('*-SNAPSHOT.*'), '!snapshots/**', 'launchpad']
            },
            stage: {
                src: ['build/stage/launchpad/apps/'+camelToDash(appName)]
            }
        },
        copy: {
            main: {
                files: [
                    {src: ['img/**'], dest: 'dist/'},
                    {
                        src: ['bower_components/font-awesome/fonts/**'],
                        dest: 'dist/',
                        filter: 'isFile',
                        expand: true
                    },
                    {
                        src: ['bower_components/bootstrap/fonts/**'],
                        dest: 'dist/',
                        filter: 'isFile',
                        expand: true
                    }
                ]
            },
            deploy: {
                files: [
                  {
                    nonull: true,
                    cwd: 'dist/',
                    src: '**',
                    dest: 'launchpad/apps/'+camelToDash(appName)+'/',
                    expand: true
                  }
                ]
            },
            stage: {
                files: [
                  {
                    nonull: true,
                    cwd: 'dist/',
                    src: '**',
                    dest: 'build/stage/launchpad/apps/'+camelToDash(appName)+'/',
                    expand: true
                  }
                ]
            }
        },
        concat: {
            main: {
                src: ['<%= dom_munger.data.appjs %>', '<%= ngtemplates.main.dest %>'],
                dest: 'temp/app.full.js'
            }
        },
        htmlmin: {
            main: {
                options: {
                    collapseBooleanAttributes: true,
                    collapseWhitespace: true,
                    removeAttributeQuotes: true,
                    removeComments: true,
                    removeEmptyAttributes: true,
                    removeScriptTypeAttributes: true,
                    removeStyleLinkTypeAttributes: true
                },
                files: {
                    'dist/index.html': 'dist/index.html'
                }
            }
        },
        dom_munger: {
            read: {
                options: {
                    read: [
                        {
                            selector: 'script[data-concat!="false"]',
                            attribute: 'src',
                            writeto: 'appjs'
                        },
                        {
                            selector: 'link[rel="stylesheet"][data-concat!="false"]',
                            attribute: 'href',
                            writeto: 'appcss'
                        }
                    ]
                },
                src: 'index.html'
            },
            update: {
                options: {
                    remove: ['script[data-remove!="false"]', 'link[data-remove!="false"]'],
                    append: [
                        {
                            selector: 'body',
                            html: '<script src="app.full.min.js"></script>'
                        },
                        {
                            selector: 'head',
                            html: '<link rel="stylesheet" href="app.full.min.css">'
                        }
                    ]
                },
                src: 'index.html',
                dest: 'dist/index.html'
            }
        },
        less: {
            production: {
                options: {},
                files: {
                    'temp/app.css': 'app.less'
                }
            }
        },
        cssmin: {
            main: {
                src: ['temp/app.css'],
                dest: 'dist/app.full.min.css'
            }
        },
        uglify: {
            main: {
                src: 'temp/app.full.js',
                dest: 'dist/app.full.min.js'
            }
        },
        ngAnnotate: {
            main: {
                src: 'temp/app.full.js',
                dest: 'temp/app.full.js'
            }
        },
        ngtemplates: {
            main: {
                options: {
                    module: appName,
                    htmlmin: '<%= htmlmin.main.options %>'
                },
                src: [createFolderGlobs('*.html'), '!index.html', '!_SpecRunner.html'],
                dest: 'temp/templates.js'
            }
        },
        // Karma - Unit Test Configuration.
        karma: {
            options: {
                frameworks: ['jasmine'],
                preprocessors: {
                    '*.js': ['coverage'],
                    'home/**/*.js': ['coverage'],
                    '**/*.html': ['ng-html2js']
                },
                files: [  //this files data is also updated in the watch handler, if updated change there too
                    '<%= dom_munger.data.appjs %>',
                    'bower_components/angular-mocks/angular-mocks.js',
                    'bower_components/angular-material/angular-material-mocks.js',
                    createFolderGlobs(['*-spec.js', '*.html'], {ignoreDir: 'e2e'}),
                ],
                logLevel: 'ERROR',
                reporters: ['mocha', 'coverage', 'html'],
                coverageReporter: {
                    type: 'html',
                    dir:  'reports/ut/coverage/'
                },
                htmlReporter: {
                  outputFile: 'reports/ut/index.html',
                  pageTitle: 'Unit Tests'
                },
                autoWatch: false, //watching is handled by grunt-contrib-watch
                singleRun: true
            },
            all_tests: {
                browsers: ['PhantomJS']
            },
            during_watch: {
                browsers: ['PhantomJS']
            }
        },
        // Protractor - E2E Test Configuration.
        protractor: {
            options: {
                configFile: 'e2e/conf.js',
                args: {
                    seleniumAddress: 'http://0.0.0.0:4444/wd/hub',
                    specs: ['e2e/**/*-spec.js', 'e2e/**/*-po.js']
                }
            },
            main: {}

        },
        protractor_webdriver: {
          main: {}
        },
        compress: {
          main: {
            cwd: 'build/stage/',
            options: {
              mode: 'tgz',
              archive: 'build/stage/'+camelToDash(appName)+'.tgz'
            },
            expand: true,
            src: ['launchpad/apps/'+camelToDash(appName)+'/**/*']
          }
        },
        maven: {
            // cwd: 'build/stage/', /* Use cwd when grunt-maven-tasks supports it. */
            'deploy-snapshot': {
                options: {
                    goal: 'deploy',
                    groupId: 'com.adtran.launchpad',
                    packaging: 'tgz',
                    url: 'http://package.adtran.com:8081/nexus/content/repositories/adtran-snapshot/',
                    injectDestFolder: false,
                    artifactId: camelToDash(appName),
                    repositoryId: 'adtran-repo',
                    version: version + '-SNAPSHOT',
                    settingsXml: './settings.xml'
                },
              src: ['launchpad/apps/'+camelToDash(appName)+'/**/*']
            },
          'deploy-release': {
            options: {
              goal: 'deploy',
              groupId: 'com.adtran.launchpad',
              packaging: 'tgz',
              url: 'http://package.adtran.com:8081/nexus/content/repositories/adtran-release/',
              injectDestFolder: false,
              artifactId: camelToDash(appName),
              repositoryId: 'adtran-repo',
              version: version,
              settingsXml: './settings.xml'
            },
            src: ['launchpad/apps/'+camelToDash(appName)+'/**/*']
          }
        },
        shell: {
            options: {
                registry: 'cn-docker.adtran.com:5000',
                imageName: camelToDash(appName)
            },
            'docker-build': {
                command: 'docker build -t ' + '<%= shell.options.registry %>' + '/' +
                '<%=shell.options.imageName %>' + ' .'
            },
            'docker-push': {
                command: 'docker push ' + '<%= shell.options.registry %>' + '/' + '<%=shell.options.imageName %>'
            },
            'update_webdriver': {
                command: './node_modules/protractor/bin/webdriver-manager update --standalone'
            },
            'git-version-tag': {
                command: ['echo \"AT_VERSION=v' + version + '\" > jenkins.properties',
                          'echo \"{ version=' + version + ' }\" > dist/version.json',
                          'cp manifest.json dist/'].join('&&')
            }
        }
    });

    // Custom Tasks
    grunt.registerTask('docker-build', ['shell:docker-build']);
    grunt.registerTask('docker-push', ['shell:docker-push']);
    grunt.registerTask('git-version-tag', ['shell:git-version-tag']);

    grunt.registerTask('build', ['jshint', 'clean:before', 'less', 'dom_munger:read', 'karma:all_tests', 'dom_munger:update', 'ngtemplates', 'cssmin', 'concat', 'ngAnnotate', 'uglify', 'copy:main', 'htmlmin', 'clean:after', 'git-version-tag']);
    grunt.registerTask('serve', ['dom_munger:read', 'jshint', 'connect:main', 'watch']);
    grunt.registerTask('test', ['dom_munger:read', 'karma:all_tests']);
    grunt.registerTask('e2e', ['connect:dist', 'shell:update_webdriver', 'protractor_webdriver', 'protractor']);
    grunt.registerTask('tgz', [ 'clean:stage', 'copy:stage', 'compress']);
    grunt.registerTask('deploy', ['copy:deploy', 'maven:deploy-snapshot', 'clean:deploy']);
    grunt.registerTask('default', ['build']);

    grunt.event.on('watch', function (action, filepath) {
        //https://github.com/gruntjs/grunt-contrib-watch/issues/156

        var tasksToRun = [];

        if (filepath.lastIndexOf('.js') !== -1 && filepath.lastIndexOf('.js') === filepath.length - 3) {

            //lint the changed js file
            grunt.config('jshint.main.src', filepath);
            tasksToRun.push('jshint');

            //find the appropriate unit test and html file for the changed file
            var spec, html;
            if (filepath.lastIndexOf('-spec.js') === -1 || filepath.lastIndexOf('-spec.js') !== filepath.length - 8) {
                spec = filepath.substring(0, filepath.length - 3) + '-spec.js';
                html = filepath.substring(0, filepath.length - 3) + '.html';
            } else {
                spec = filepath;
                html = filepath.substring(0, filepath.length - 8) + '.html';
            }

            //if the spec exists then lets run it
            if (grunt.file.exists(spec)) {
                var files = [].concat(grunt.config('dom_munger.data.appjs'));
                files.push('bower_components/angular-mocks/angular-mocks.js');
                files.push(spec);

                //if the html exists then push to files
                if (grunt.file.exists(html)) {
                    files.push(html);
                }
                grunt.config('karma.options.files', files);
                tasksToRun.push('karma:during_watch');
            }
        }

        //if index.html changed, we need to reread the <script> tags so our next run of karma
        //will have the correct environment
        if (filepath === 'index.html') {
            tasksToRun.push('dom_munger:read');
        }

        grunt.config('watch.main.tasks', tasksToRun);

    });
};
