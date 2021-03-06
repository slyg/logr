var 
    Q = require('q'),
    moment = require('moment'),
    svnOutput = require('./svnoutput.json')[0],
    countLimit = 5,
    revStart = 145427 //Date.now()
;

module.exports = function(){
    
    return {
        getRevisions : generateCommits,
        getLastRevisions : generateCommits
    };
    
}

function generateCommits(){
    
    var 
        deferred = Q.defer(),
        i = 0,
        result = [],
        count = Math.floor(Math.random() * countLimit)
    ;
    
    for(; i<count; i++){
        (function(){
        
            commit = (function(){return JSON.parse(JSON.stringify(svnOutput));}())
            commit.revision = revStart++;
            commit.date = moment(Date.now()).format("dddd, MMMM Do YYYY h:mm A");
            
            result.push(commit);
        }())
    }
    
    // lets mix for testing
    result.sort(function(xx,yy){ return Math.floor(Math.random() * 3) - 1; });
    
    setTimeout(function(){ deferred.resolve(result); }, 200);
    
    return deferred.promise;
}

