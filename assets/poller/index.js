var
    svnlog     = require('svnlog'), // require('./../mock/svnlog'),
    svnConf    = require('./../../conf/svn.json'),
    Q          = require('q'),
    format     = require('./../format')
;

module.exports = {

    create : function(broadcaster){
    
        var 
            deferred = Q.defer(),
            lastHeadRevision = svnConf.startRev,
            svn = svnlog(svnConf.repo)
        ;
        
        deferred.resolve(function(){
            
            broadcaster.heartbeat(); // keep socket connection opened after a few hours
        
            svn.getRevisions(lastHeadRevision, 'HEAD')
                .then(function(revisions){
                
                    // ordering data depending on revision number
                    revisions.sort(function(left, right) { 
                        return (+left.revision) - (+right.revision); 
                    });
                
                    var currentLastRevision = revisions.slice(-1)[0].revision;
                    
                    if(lastHeadRevision == currentLastRevision) {
                        return null;
                    } else {
                      lastHeadRevision = currentLastRevision;
                      return revisions;
                    }
                    
                })
                .then(format)
                .then(broadcaster.emit)
            ;
        });
        
        return deferred.promise;
        
    }
    
}