var 
    Q = require('q'),
    svnOutput = require('./svnoutput.json'),
    countLimit = 5,
    revStart = Date.now()
;

module.exports = function(){
    
    var 
        deferred = Q.defer(),
        result = generateCommit()
    ;
    
    setTimeout(function(){ deferred.resolve(result); }, 200);
    
    return deferred.promise;
    
}

function generateCommit(){
    
    var 
        i = 0,
        result = [],
        count = Math.floor(Math.random() * countLimit)
    ;
    
    for(; i<count; i++){
        (function(){
        
            commit = (function(){return JSON.parse(JSON.stringify(svnOutput));}())
            commit.revision = revStart++;
            
            result.push(commit);
        }())
    }
    
    // lets mix for testing
    result.sort(function(xx,yy){ return Math.floor(Math.random() * 3) - 1; });
    
    return result;
}

