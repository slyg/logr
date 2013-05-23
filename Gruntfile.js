module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        datetime: Date.now(),
        watch: {
            scripts: {
                files: [
                    './assets/uiserver/static/*',
                    './assets/uiserver/templates/*'
                ],
                tasks: ['default']
            },
        },
        concat: {
            'ngapp' : {
                src : [
                    './assets/uiserver/static/components/moment/min/moment.min.js',
                    './assets/uiserver/static/components/moment/min/langs.min.js',
                    './assets/uiserver/static/components/angular/angular.min.js',
                    './assets/uiserver/static/components/ngInfiniteScroll/ng-infinite-scroll.js',
                    './assets/uiserver/static/main.js'
                ], 
                dest : './assets/uiserver/public/js/ngapp.js'
            },
            'socket.io' : {
                src : [
                    './assets/uiserver/static/components/socket.io-client/dist/socket.io.min.js',
                ], 
                dest : './assets/uiserver/public/socket.io.js'
            },
            'styles' : {
                src : [
                    './assets/uiserver/static/components/bootstrap/css/bootstrap.min.css',
                    './assets/uiserver/static/main.css'
                ],
                dest : './assets/uiserver/public/css/ngapp.css'
            }
        }
    });
    
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
    
    // Default task(s).
    grunt.registerTask('default', ['concat:ngapp', 'concat:socket.io', 'concat:styles']);

};
