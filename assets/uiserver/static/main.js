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
                return this;
            }
        }
    });
    
    app.controller('CommitsController', ['$scope', 'socket', '$http', '$timeout', function ($scope, socket, $http, $timeout) {
    
        var 
            updateCommitAgeDelay = 30000, // commit age update period - 30s
            updateCommitAge,
            headRevision = 0;
        ;
    
        // set viewModel
        $scope.commits = [];
        $scope.predicate = '-revision';
        $scope.isConnected = true;
            
        // listen to socket stream
        socket
            .on('global', updateData)
            .on('ping', function(){ $scope.isConnected = true; })
            .on('disconnect', function(){ $scope.isConnected = false; })
        ;
        
        // grabb some data on init
        $http({
            url: '/ws/getlastcommits',
            method: 'GET'
        }).success(updateData).error(console.error);
        
        // updates modelView on ajax or socket update
        function updateData(data){
            
            // filter commits that are already in viewModel (depending on head revision)
            var sanitizedData = sanitizeData(data);
            
            // add new items to vieModel
            $scope.commits.push.apply($scope.commits, sanitizedData);
            
            // update head revision
            headRevision = +(data.sort(function(a, b){ return (+b.revision) - (+a.revision) })[0].revision);
            
        }
        
        // formats/clean data before being added to modelView
        function sanitizeData(data){
            return data
                .filter(function(element){ return (+element.revision > headRevision); })
                .map(function(element){ 
                    element.dateFromNow = moment(element.dateUTC).fromNow(); // computes date from now
                    element.revision = +element.revision; // transtype revisions into number
                    return element;
                })
            ;
        }
        
        // compute date-from-now attribute in modelView
        $scope.updateCommitAge = function(){
            if($scope.commits.length > 0) {
                $scope.commits.map(function(element){
                    element.dateFromNow = moment(element.dateUTC).fromNow();
                    return element;
                });
            }
            updateCommitAge = $timeout($scope.updateCommitAge, updateCommitAgeDelay);
        }
        updateCommitAge = $timeout($scope.updateCommitAge, updateCommitAgeDelay);
        
    }]);
    
})()