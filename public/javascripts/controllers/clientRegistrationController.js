'use strict';
wfms.controller("ClientRegistrationController", function($scope, $rootScope, $modal,
		$location, DataService) {
	
	$scope.registerClient = function() {
		console.log("did i get called");

		var modalInstance = $modal.open({
			templateUrl : 'templates/index/register.html',
			controller : 'ClientRegistrationController',
			size : 'lg',
		});

		modalInstance.result.then(function(isValid) {
			if (isValid) {
				getData();
			}
		}, function() {
		});
	};
	
	
	
});
	
	