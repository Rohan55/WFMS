'use strict';
wfms.controller("ShowGuardController", function($scope, $rootScope, $modal,
		$location, DataService,$window) {
	
	$scope.loginGuard = function() {

		console.log("Inside login guard Funct");
		if($scope.email=== "" ||  $scope.password === ""){
			$scope.formError = "Form Invalid !!!";
		}else{
			
			var params = {
					
					email : $scope.email,
					password:  $scope.password
						
				};
			DataService.postData("/api/login",params).success(
				function(response) {
					console.log("Login Successful for guard");
					$rootScope.idguard = response.idguard;
					$rootScope.fname = response.fname;
					$rootScope.lname = response.lname;
					console.log("$rootScope.idguard:" +$rootScope.idguard);
					console.log("$rootScope.fname:" + $rootScope.fname);
					console.log("$rootScope.lname:" + $rootScope.lname);
					$location.path('/guard');
				}).error(function(err) {
			console.log("Error while fetching data");
			$location.path('/');
		});
		}
	};
	
	
	
});
	
	