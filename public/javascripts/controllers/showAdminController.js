'use strict';
wfms.controller("ShowAdminController", function($scope, $rootScope, $modal,
		$location, DataService,$window) {
	
	$scope.loginGuard = function() {

		console.log("Inside login admin Funct");
		if($scope.email=== "" ||  $scope.password === ""){
			$scope.formError = "Form Invalid !!!";
		}else{
			
			var params = {
					
					email : $scope.email,
					password:  $scope.password
						
				};
			DataService.postData("/api/login",params).success(
				function(response) {
					console.log("Login Successful");
					
					$location.path('/admin');
				}).error(function(err) {
			console.log("Error while fetching data");
			$location.path('/');
		});
		}
	};
	
	
	
});
	
	