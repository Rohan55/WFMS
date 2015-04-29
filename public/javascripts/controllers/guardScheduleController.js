'use strict';
wfms.controller("GuardScheduleController", function($scope, $rootScope,
		$location, $window, DataService) {

	//$scope.template = "templates/guard.html";
	$scope.template = "templates/guard/guardSchedule.html";

	$scope.setTemplate = function(tabName){
		$scope.template = "templates/"+tabName + ".html";
	}

	$scope.getTemplate = function(){
		return $scope.template;
	};
	
$scope.getGuardSchedule = function() {
		
		
			console.log("inside guard schedule");
			var uri = urlConstants.GET_GUARD_SCHEDULE+"1";
			DataService.getData(uri,[]).success(function(response){
				angular.toJson(response);
				console.log(response.data);
			console.log("Guard Info"+response);
				$scope.schedule = response.data;			
			}).error(function(err){
				console.log(err.message);
			});
		}

});
