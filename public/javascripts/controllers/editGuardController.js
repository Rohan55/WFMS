'use strict';
wfms.controller("EditGuardController", function($scope, $modalInstance,$rootScope,DataService,$window) {
	
	
	console.log("In edit guard");

	
	
	$scope.open = function($event) {
	    $event.preventDefault();
	    $event.stopPropagation();

	    $scope.opened = true;
	  };
	

$scope.okay = function() {
	
		
		
		
		var params = {
				
				
				idperson : 10,
				fname : $scope.fname,
				lname:  $scope.lname,
				address : $scope.address,
				city : $scope.city,
				email :$scope.email,
				phone : $scope.phone
					
			};
		DataService.postData("/api/editGuard",params).success(function(response){
			$modalInstance.close(true);
		}).error(function(err){
			$modalInstance.dismiss(false);
		});
	
};

$scope.cancel = function() {
	$modalInstance.dismiss(false);
};
});

