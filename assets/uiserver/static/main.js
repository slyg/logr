(function(){

    var app = angular.module('myApp', []);
    
    app.factory('io', function() {
        return io.connect(window.location.origin);
    });
    
    app.controller('RevisionsController', ['$scope', 'io', '$http', function ($scope, io, $http) {
        
        $scope.revisions = [];
        $scope.predicate = '-revision';
        
        // initial data call
        $http({
            url: '/ws/getlastrevisions',
            method: 'GET'
        }).success(function(data, status){
            console.log(data);
            $scope.revisions = data;
        }).error(function(data, status){
            console.log('woops');
        });
    
        io.on('global', function(data) {
            // bindings to update (from outside of angular)
            $scope.$apply(function(){
                // apply push in the good this context
                $scope.revisions.push.apply($scope.revisions, data);
            });
            
        });
        
    }]);
    
})()