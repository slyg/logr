module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        datetime: Date.now(),
        concat: {
            'ngapp' : {
                src : [
                    './assets/uiserver/static/components/angular/angular.min.js',
                    './assets/uiserver/static/components/ngInfiniteScroll/ng-infinite-scroll.js',
                    './assets/uiserver/static/main.js'
                ], 
                dest : './assets/uiserver/public/ngapp.js'
            },
            'socket.io' : {
                src : [
                    './assets/uiserver/static/components/socket.io/socket.io.js',
                ], 
                dest : './assets/uiserver/public/socket.io.js'
            },
            'styles' : {
                src : [
                    './assets/uiserver/static/components/bootstrap/css/bootstrap.min.css',
                    './assets/uiserver/static/main.css'
                ],
                dest : './assets/uiserver/public/ngapp.css'
            }
        }
    });
    
    grunt.loadNpmTasks('grunt-contrib-concat');
    
    // Default task(s).
    grunt.registerTask('default', ['concat:ngapp', 'concat:socket.io', 'concat:styles']);

};
