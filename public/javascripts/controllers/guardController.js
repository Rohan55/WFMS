'use strict';
wfms.controller("GuardController", function($scope,$modal, $rootScope,
		$location, $window, DataService) {

	//$scope.template = "templates/guardframe.html";
	$scope.template = "templates/guard/guardframe.html";

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
			console.log("I am called.gc");
			var uri = urlConstants.GET_GUARD_DETAILS+"10";
			DataService.getData(uri,[]).success(function(response){
				angular.toJson(response);
				console.log(response.data[0]);
			//	console.log("Guard Info"+response);
				$scope.myProperties = response.data[0];			
			}).error(function(err){
				console.log(err.message);
			});
		
			
		}
		$scope.edit = function() {
			console.log("edit guard");

			var modalInstance = $modal.open({
				templateUrl : 'templates/guard/editGuard.html',
				controller : 'EditGuardController',
				size : 'lg',
				/*resolve : {
					companies : function() {
									return $scope.building;
								},
					isEdit : function(){
						return data;
					}
				}*/
			});

			modalInstance.result.then(function(isValid) {
				if (isValid) {
					getData();
				}
			}, function() {
			});
		};
		
}
		
	});
		

