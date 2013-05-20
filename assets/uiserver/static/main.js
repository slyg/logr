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
    
    app.controller('CommitsController', ['$scope', 'socket', '$http', function ($scope, socket, $http) {
    
        // set viewModel
        $scope.commits = [];
        $scope.orderByRevisionsAsc = function(){
            $scope.commits.sort(function(left, right) { 
                return (left.revision < right.revision) ? 1 : -1; 
            });
        };
        
        var headRevision = 0;
            
        // listen to socket stream
        socket.on('global', updateData);
        
        
        // grabb some data on init
        $http({
            url: '/ws/getlastcommits',
            method: 'GET'
        }).success(updateData).error(console.error);
        
        function updateData(data){
            
            // filter commits that are already in viewModel (depending on head revision)
            var sanitizedData = data.filter(function(element){ return (+element.revision > headRevision); });
            
            // add new items to vieModel
            $scope.commits.push.apply($scope.commits, sanitizedData);
            
            // update head revision
            headRevision = +(data.sort(function(a, b){ return (+b.revision) - (+a.revision) })[0].revision);
            
        }
        
    }]);
    
})()