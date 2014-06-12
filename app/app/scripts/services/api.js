angular.module("yearbookApp").service("apiService", ["Restangular", "$q",
function (Restangular, $q) {
	var API = {};

	//with a default size of 80
	API.postNote = function(data) {
    var _self = this;
		var deferred = $q.defer();

    Restangular.all("note/post").post(data).then(
      function(res){
      if(!(typeof res === "undefined")){
        //something went wrong
      }
      deferred.resolve(res);
    }, function(err){
      console.log(err);
      deferred.reject(err);
    });
    return deferred.promise;
  };

  API.getNotes = function() {
    var _self = this;
  	var deferred = $q.defer();

      Restangular.one("note").get().then(function(res){
        //$cookieStore.put("API.name", res.name);
        if(!(typeof res === "undefined")){
          deferred.resolve(res);
        }
        deferred.reject('Could not get notes...');
      });
      return deferred.promise;
  };
	return API;
}]);
