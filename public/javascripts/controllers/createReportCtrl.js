'use strict';
wfms.controller("CreateReportCtrl", function($scope, $rootScope, DataService) {
	
	console.log("Inside create Alert");
	//to fetch guard building schedule
	$scope.getGuardBuilding=function(){
	
		console.log("guard Building");
		var uri = urlConstants.GET_GUARD_BUILDING+"1";
		DataService.getData(uri,[]).success(function(response){
			angular.toJson(response);
			console.log(response.data);
		//	console.log("Guard Info"+response);
			$scope.guardSchedule = response.data;
			$scope.val="Hello";
		}).error(function(err){
			console.log(err.message);
		});
	};
$scope.publish = function() {
	
	$scope.template = "templates/guardframe.html";

	$scope.setTemplate = function(tabName){
		$scope.template = "templates/"+tabName + ".html";
	};

	$scope.getTemplate = function(){
		return $scope.template;
	};
	
	console.log("hello from create report"+ $scope.buildingselect );
	var params = {
			
			idbuilding : $scope.buildingselect,
			description : $scope.desc,
			idguard : 2,
			status : 'F',
			seenByClient : 'F',
			datemy : $scope.date,
			severity : $scope.severity,
			timemy : $scope.time
		
			
		};
	
	DataService.postData(urlConstants.CREATE_ALERT,params).success(function(response){
		
		console.log("Alert Info"+response.data);
	}).error(function(err){
		console.log(err.message);
	});
		
		
};


});
