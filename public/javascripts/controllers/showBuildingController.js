'use strict';
wfms.controller("ShowBuildingController", function($scope, $rootScope, $modal,
		$location, DataService) {

	$scope.getData = function() {
		
		/*These functions will load the data of users when the page is loaded.
		 * 
		 */
//		getUserDetails();
//		getEmploymentList();
//		getEducationList();
//		getSkillsList();
//		getSummary();
		
		
		/*
		 * This is to get the list of companies as a drop down when user is adding companies.
		 * Though other values can be added
		 */
		DataService.getData("/api/listBuilding/1", []).success(
				function(response) {
					$scope.building = response.data;
					console.log(response.data);
				}).error(function(err) {
			console.log("Error while fetching data");
		});
	}
	
	$scope.modifyBuilding = function() {
		console.log("did i get called");

		var modalInstance = $modal.open({
			templateUrl : 'templates/client/editBuilding.html',
			controller : 'EditBuildingCtrl',
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
	
	
	
});
	
	