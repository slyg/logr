(function(){

    var app = angular.module('myApp', []);
    
    app.factory('io', function() {
        return io.connect(window.location.origin);
    });
    
    app.controller('RevisionsController', ['$scope', 'io', function ($scope, io) {
        
        $scope.revisions = [];
        $scope.predicate = '-revision';
    
        io.on('global', function(data) {
            // bindings to update (from outside of angular)
            $scope.$apply(function(){
                // apply push in the good this context
                $scope.revisions.push.apply($scope.revisions, data);
            });
            
        });
        
    }]);
    
})()