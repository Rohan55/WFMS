'use strict';
wfms.controller("viewAlertClientController", function($scope, $rootScope,
		$location, $window, DataService) {

	
	// $scope.template = "templates/client/clientHome.html";

	// $scope.setTemplate = function(tabName){
	// 	$scope.template = "templates/client/"+tabName + ".html";
	// }

	// $scope.getTemplate = function(){
	// 	return $scope.template;
	// };
	

	$scope.getAlert = function(){
		DataService.getData("/api/alertPerClient/1", []).success(
				function(response) {

					console.log("Hi"+response.resultAlert);
					$scope.alert = response.resultAlert;
				}).error(function(err) {
			console.log("Error while fetching data");
		});
	};

	$scope.seen = function(idalertInfo){
		console.log("Id Alert: "+ this.idalertInfo);
		var params = {
				idalertInfo : this.idalertInfo,
				seenByClient : 'T'
				
			};

		DataService.putData("/api/alert/seenByClient",params).success(function(response){
				console.log("Failed");
				console.log("Failed");

			}).error(function(err){
				console.log("Done");
			});
		
	}
	// $scope.signInFormError = "";

	// $scope.signIn = function() {
	// 	if ($scope.loginForm.email.$invalid || $scope.loginForm.pwd.$invalid) {
	// 		$scope.signInFormError = "Invalid Credentials";
	// 	} else {
	// 		var params = {
	// 			email : $scope.email,
	// 			password : $scope.pwd
	// 		};
	// 		DataService.postData(urlConstants.LOGIN, params).success(
	// 				function(response) {
	// 					*
	// 					 * For encrypting password at client side as well
	// 					 * $scope.pwd =
	// 					 * CryptoJS.SHA256($scope.pwd).toString(CryptoJS.enc.hex);
						 
	// 					$window.sessionStorage.userId = response.email;
	// 					$window.sessionStorage.userName = response.name;
	// 					$window.sessionStorage.userLastLogin = response.lastLogin;
	// 					$rootScope.userId = response.email;
	// 					$rootScope.userName = response.name;
	// 					$rootScope.userLastLogin = response.lastLogin;
	// 					$location.path('/home');
	// 				}).error(function(err) {
	// 			$scope.signInFormError = err.message;
	// 		});
	// 	}
	// }
});