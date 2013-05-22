var
    express = require('express'),
    http = require('http'),
    Q = require('q'),
    conf = require('../../conf/webserver'),
    port = conf.port,
    addRoutes = require('./routes')
;

module.exports = {

    create : function(){
    
        var   
            app = express(),
            server = http.createServer(app),
            deferred = Q.defer()
        ;
        
        app.use(app.router);
        app.use('/logr', express.static(__dirname + '/templates'));
        app.use('/public', express.static(__dirname + '/public'));
        app.use('/socket.io', express.static(__dirname + '/public/socket.io')); // socket.io special case
        
        addRoutes(app);
        
        server.listen(port);
        
        console.log('server running on port ' + port);
        
        deferred.resolve(server);
        
        return deferred.promise;
    
    }
};