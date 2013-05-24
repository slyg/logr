/*
 *  Look for branches or trunk pattern in 1st file path found
 *  Returns a Promise
 */

var Q = require('q');

module.exports = function(revisions){

    var deferred = Q.defer();
    
    revisions.map(function(revision){
    
        var 
            testString = revision.paths[0].path,
            branchIndex = testString.search("/branches/"),
            trunkIndex = testString.search("/trunk/")
        ;
    
        revision.branch = 
            (trunkIndex > -1) && 'trunk' 
            || (branchIndex > -1) && testString
                .substr(branchIndex + "/branches/".length, testString.length)
                .split("/")[0]
            || ''
        ;
        
        return revision;
    });
    
    deferred.resolve(revisions);
    
    return deferred.promise;
    
}


