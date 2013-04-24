var 
    socketio = require('socket.io'),
    Q = require('q')
;

module.exports = {
    
    create : function(server){

        var 
            io = socketio.listen(server),
            deferred = Q.defer()
        ;
        
        io.set('log level', 1);
        
        deferred.resolve({
            emit : function(data){
                if(Array.isArray(data) && data.length > 0){
                    io.sockets.emit('global', data);
                }
            }
        });
        
        return deferred.promise;
        
    }

    
}


