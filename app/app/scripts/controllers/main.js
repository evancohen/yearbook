'use strict';

angular.module('yearbookApp')
  .controller('mainController', ["$scope", "apiService", function ($scope, apiService) {
  	$scope.showForm = false;
  	$scope.posted = false;

  	apiService.getNotes().then(function (notes){
  		//Aort the notes before we apply them to scope
  		//Why sort on the client? Because sails .sort('id') doesn't work...
  		$scope.notes =_.sortBy(notes, function(note) { return 0 - note.id; });
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
