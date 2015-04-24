'use strict';
wfms.controller("GuardController", function($scope, $rootScope,
		$location, $window, DataService) {

	//$scope.template = "templates/guardframe.html";
	$scope.template = "templates/guardframe.html";

	$scope.setTemplate = function(tabName){
		$scope.template = "templates/"+tabName + ".html";
	}

	$scope.getTemplate = function(){
		return $scope.template;
	};
	
$scope.getAllData = function() {
		
		getGuardDetails();
		
		/**
		 * Getting List of Companies for adding experience 
		 */
		
		
		function getGuardDetails(){
			
			var uri = urlConstants.GET_GUARD_DETAILS+"1"+"1"+"10";
			DataService.getData(uri,[]).success(function(response){
				console.log("Guard Info"+response.data);
				$scope.myProperties = response.data;
			}).error(function(err){
				console.log(err.message);
			});
		}
}
});
