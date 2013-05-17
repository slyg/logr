(function(){

    var app = angular.module('myApp', []);
    
    app.factory('socket', function($rootScope){
        var socket = io.connect(window.location.origin);
        return {
            on: function (eventName, callback) {
                socket.on(eventName, function () {  
                    var args = arguments;
                    $rootScope.$apply(function () {
                        callback.apply(socket, args);
                    });
                });
            }
        }
    });
    
    app.controller('RevisionsController', ['$scope', 'socket', '$http', function ($scope, socket, $http) {
    
        // set viewModel
        $scope.revisions = [];
        $scope.predicate = '-dateUTC';
            
        // listen to socket stream
        socket.on('global', updateData);
        
        
        // grabb some data on init
        $http({
            url: '/ws/getlastrevisions',
            method: 'GET'
        }).success(updateData).error(console.error);
        
        function updateData(data){
            $scope.revisions.push.apply($scope.revisions, data);
        }
        
    }]);
    
})()