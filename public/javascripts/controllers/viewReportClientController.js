'use strict';
wfms.controller("viewReportClientController", function($scope, $rootScope,
		$location, $window, DataService) {

	
	$scope.getdata = function(req,res) {
		var idperson = 1;
		DataService.getData("/api/getBuilding/"+idperson, []).success(
				function(response) {
					$scope.buildingName = response.data;

				}).error(function(err) {
			console.log("Error while fetching data");
		});
	}

	$scope.getBuilding = function(req,res){

		//var idperson = $rootScope.idperson;

		
	}



	});