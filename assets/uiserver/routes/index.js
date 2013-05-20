var 
    svnlog  = require('svnlog'),
    svnConf = require('./../../../conf/svn.json'),
    svn     = svnlog(svnConf.repo)
; 

module.exports = function(app){

    app.get('/', function(req, res){
        res.redirect('/logr');
    });
    
    app.get('/ws/getlastcommits', function(req, res){
    
        //res.json(require('./../../mock/svnoutput.json'));
        
        svn.getLastRevisions(50).then(function(commits){
        
            commits.sort(function(left, right) { 
                return (left.revision < right.revision) ? 1 : -1; 
            });
        
            res.json(commits);
        });
        
    });

}