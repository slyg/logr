var
    express = require('express'),
    http = require('http'),
    Q = require('q'),
    conf = require('../../conf/webserver'),
    port = conf.port
;

module.exports = {

    create : function(){
    
        var   
            app = express(),
            server = http.createServer(app),
            deferred = Q.defer()
        ;
        
        server.listen(port);
        app.use('/logr', express.static(__dirname + '/templates'));
        app.use('/static', express.static(__dirname + '/static'));
        app.use('/socket.io', express.static(__dirname + '/static/socket.io')); // socket.io special case
        
        console.log('server running on port ' + port);
        
        deferred.resolve(server);
        
        return deferred.promise;
    
    }
};