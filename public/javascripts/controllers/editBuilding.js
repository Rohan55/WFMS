'use strict';
wfms.controller("EditBuildingCtrl", function($scope, $modalInstance,$rootScope,DataService,$window) {
	
	
	console.log("M I in this!");
//	console.log(isEdit);
	
//	console.log(isEdit.building);
	
//	$scope.summary = isEdit;
	
	
	$scope.open = function($event) {
	    $event.preventDefault();
	    $event.stopPropagation();

	    $scope.opened = true;
	  };
	

$scope.okay = function() {
	if($scope.buildingname === "" || $scope.address=== "" || $scope.address=== "" ||  $scope.releaseDate === "--"){
		$scope.formError = "Form Invalid !!!";
	}else{
		
		//var newDate = new Date($scope.dob);
		//var formattedDOB = newDate.getDate()+"-"+dataConstants.MONTH_NAMES[newDate.getMonth()]+"-"+newDate.getFullYear();
		
		//$window.sessionStorage.userName = $scope.firstName + " " + $scope.lastName;
		//$rootScope.userName = $scope.firstName + " " + $scope.lastName;
		
		var params = {
				
				//idclient : $rootScope.userId,
				idclient : 1,
				release_date : $scope.release_date,
				buildingname:  $scope.buildingname,
				address : $scope.address,
				service_fees : $scope.service_fees,
				checkpoint : $scope.checkpoint
					
			};
		DataService.postData("/api/createBuilding",params).success(function(response){
			$modalInstance.close(true);
		}).error(function(err){
			$modalInstance.dismiss(false);
		});
	}
};

$scope.cancel = function() {
	$modalInstance.dismiss(false);
};
});

