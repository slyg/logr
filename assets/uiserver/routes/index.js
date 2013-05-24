var 
    svnlog  = require('svnlog'),
    svnConf = require('./../../../conf/svn.json'),
    svn     = svnlog(svnConf.repo),
    uiConf  = require('./../../../conf/webserver.json'),
    format  = require('./../../format')
; 

module.exports = function(app){

    app.get('/', function(req, res){
        res.redirect('/logr');
    });
    
    app.get('/ws/getlastcommits', function(req, res){
    
        //res.json(require('./../../mock/svnoutput.json'));
        
        svn.getLastRevisions(uiConf.itemsNum)
            .then(format)
            .then(function(commits){
        
            commits.sort(function(left, right) { 
                return (+left.revision) - (+right.revision);  
            });
        
            res.json(commits);
        });
        
    });

}