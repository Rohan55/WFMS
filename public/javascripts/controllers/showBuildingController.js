'use strict';
wfms.controller("ShowBuildingController", function($scope, $rootScope, $modal,
		$location, DataService) {

	$scope.getData = function() {
		
		
		getBuilding();
		//getData
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
//		DataService.getData("/api/listBuilding/1", []).success(
//				function(response) {
//					$scope.building = response.data;
//					console.log(response.data);
//				}).error(function(err) {
//			console.log("Error while fetching data");
//		});
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
				getBuilding();
			}
		}, function() {
		});
	};

	$scope.deleteBuilding = function(building) {
			
			//console.log("to delete"+building.building.idbuilding);
		angular.toJson(building);
		console.log("Building to be deleted"+ building.data.idbuilding);
		var uri = urlConstants.DELETE_BUILDING+building.data.idbuilding;
		
		DataService.deleteData(uri,[]).success(function(response){
			alert("Building Deleted Successfully");
			//this.getBuilding();
		}).error(function(err){
			
		});
		getBuilding();
	};
	
	
	
	function getBuilding(){
		
		//var uri = urlConstants.GET_USER_DETAILS+$rootScope.userId;
		DataService.getData("/api/listBuilding/1",[]).success(function(response){
			$scope.building = response.data;
		}).error(function(err){
			console.log(err.message);
		});
	}
	
	
});
	


	