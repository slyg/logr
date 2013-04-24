(function(){

    var app = angular.module('myApp', []);
    
    app.factory('io', function() {
        return io.connect(window.location.origin);
    });
    
    app.controller('RevisionsController', ['$scope', 'io', function ($scope, io) {
        
        $scope.revisions = [];
        $scope.predicate = '-revision';
    
        io.on('global', function(data) {
            $scope.$apply(function(){
                $scope.revisions.push.apply($scope.revisions, data);
            });
        });
        
    }]);
    
})()