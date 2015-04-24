'use strict';
wfms.controller("ViewAllGaurdsCtrl", function($scope, $rootScope, DataService) {

	$scope.getAllGaurds = function(){
		console.log("function called");
		var uri = urlConstants.GET_ALL_GUARDS;
		
		DataService.getData(uri,[]).success(function(response){
			if(response.data){
				console.log(JSON.stringify(response.data));
				$scope.guardListResults = response.data;
			}
		}).error(function(err){
			console.log(err.message);
		});
	}
	
	$scope.deleteCall = function(guard){
		
		console.log("to delete"+guard.guard.fname);
		
		var uri = urlConstants.DELETE_GUARD+"/"+guard.guard.idguard;
		
		DataService.deleteData(uri,[]).success(function(response){
			alert("Guard Deleted Successfully");
			
		}).error(function(err){
			
		});
		this.getAllGaurds();
	}
	

});
