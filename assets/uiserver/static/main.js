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
        
            var sanitizedData = deduplicateData($scope.revisions, 'revision');
            $scope.revisions.push.apply($scope.revisions, data);
        }
        
        function deduplicateData(arr, predicate){
        
            arr.sort( function(a, b){ return a[predicate] - b[predicate]; } );

            // delete all duplicates from the array
            for( var i=0; i < arr.length-1; i++ ) {
              if ( arr[i][predicate] == arr[i+1][predicate] ) {
                delete arr[i];
              }
            }
            
            // remove the "undefined entries"
            arr = arr.filter( function( el ){ return (typeof el !== "undefined"); } );
            
            return arr;
        }
        
    }]);
    
})()