var
    svnlog     = require('./../mock/svnlog'), //require('svnlog'),
    svnConf    = require('./../../conf/svn.json'),
    Q          = require('q')
;

module.exports = {

    create : function(broadcaster){
    
        var 
            deferred = Q.defer(),
            lastHeadRevision = svnConf.startRev
        ;
        
        deferred.resolve(function(){
            svnlog(lastHeadRevision, 'HEAD', svnConf.repo)
                .then(function(revisions){
                
                    // ordering data depending on revision number
                    revisions.sort(function(left, right) { 
                        return (left.revision < right.revision) ? 1 : -1; 
                    });
                
                    var currentLastRevision = revisions[revisions.length-1].revision;
                    
                    if(lastHeadRevision == currentLastRevision) {
                        return null;
                    } else {
                      lastHeadRevision = currentLastRevision;
                      return revisions;
                    }
                    
                })
                .then(broadcaster.emit)
            ;
        });
        
        return deferred.promise;
        
    }
    
}