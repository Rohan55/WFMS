'use strict';
wfms.controller("ClientController", function($scope, $rootScope,
		$location, $window, DataService) {

	// $scope.template = "templates/wfms.html";
	// $scope.getTemplate = function(a){

	// 	return $scope.template;
	// };
	$scope.template = "templates/client/clientHome.html";


	$scope.setTemplate = function(tabName){
		$scope.template = "templates/client/"+tabName + ".html";
	}

	$scope.setTemplateLogout = function(tabName) {
		$scope.template = "templates/index/"+tabName + ".html";

	}

	$scope.getTemplate = function(){
		return $scope.template;
	};

	$scope.logout = function(req,res){

		DataService.getData('/api/logout').success(function(response){
			if(response.data){
				$rootScope.idperson == "undefined";
				$rootScope.idclient == "undefined";
				$rootScope.idgaurd == "undefined";
				console.log("I am getting logged out");
			}else{
				
			}
		}).error(function(err){
			console.log(err.message);
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