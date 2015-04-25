'use strict';
wfms.controller("ViewAllAlertsCtrl", function($scope, $rootScope, $modal, DataService) {

	$scope.getAllAlerts = function(){
		console.log("function called");
		var uri = urlConstants.GET_ACTIVE_ADMIN_ALERTS;
		
		DataService.getData(uri,[]).success(function(response){
			if(response.data){
				console.log(JSON.stringify(response.data));
				$scope.activeAdminAlerts = response.data;
			}
		}).error(function(err){
			console.log(err.message);
		});
	}
	
	$scope.publishAlert = function(data) {
		console.log(data.description);
	
		var modalInstance = $modal.open({
			templateUrl : 'templates/admin/publishAlert.html',
			controller : 'PublishAlertCtrl',
			size : 'lg',
			resolve : {
				isEdit : function(){
					return data;
				}
		
			}
		});
		
		modalInstance.result.then(function(isValid) {
			if (isValid) {
				getAllAlerts();
			}
		}, function() {
		});
	}
/*	$scope.deleteCall = function(guard){
		
		console.log("to delete"+guard.guard.fname);
		
		var uri = urlConstants.DELETE_GUARD+"/"+guard.guard.idguard;
		
		DataService.deleteData(uri,[]).success(function(response){
			alert("Guard Deleted Successfully");
			
		}).error(function(err){
			
		});
		this.getAllGaurds();
	}*/
	

});
