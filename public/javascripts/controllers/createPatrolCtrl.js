'use strict';
wfms.controller("CreatePatrolCtrl", function($scope, $rootScope, DataService) {
$scope.createPatrol = function() {
	
	console.log("hello from create Patrol");
	var params = {
			
			  idbuilding : "1",
				idreport : "1",
				date : $scope.date,
				idguard : "1",
				description : $scope.desc
		
			
		};
	
	DataService.postData(urlConstants.ADD_PATROL,params).success(function(response){
		
		console.log("Alert Info"+response.data);
	}).error(function(err){
		console.log(err.message);
	});
		
		
}
});
