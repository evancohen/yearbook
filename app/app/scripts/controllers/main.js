'use strict';

angular.module('yearbookApp')
  .controller('mainController', ["$scope", "apiService", function ($scope, apiService) {
  	$scope.showForm = false;
  	$scope.posted = false;

  	apiService.getNotes().then(function (notes){
  		$scope.notes = notes;
  	})

    $scope.submit = function(){
    	var data = {
    		name      : $scope.iname,
    		body      : $scope.ibody,
    		isPrivate : ($scope.iprivate)? true : false,
    		major     : $scope.imajor
    	}

    	apiService.postNote(data).then(function (note){
    		addNote(note);
    		$scope.posted = true;
    	});
    }

    function addNote(note){
    	console.log(note);
    	if (!note.isPrivate) {
    		console.log('adding note', note);
    		$scope.notes.unshift(note);
    	};
    }
  }]);
