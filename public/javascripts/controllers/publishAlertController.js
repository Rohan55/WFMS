'use strict';
wfms.controller("PublishAlertCtrl", function($scope, $modalInstance,
		 isEdit, $rootScope, DataService) {
	if (isEdit) {
		$scope.description = isEdit.description;
		$scope.severity = isEdit.severity;
		$scope.date = isEdit.date;
		$scope.idalertInfo = isEdit.idalertInfo;
	} else {
		$scope.description ="";
		$scope.severity ="";
		$scope.date ="";
		$scope.idalertInfo ="";
		};
	
	
	$scope.open = function($event) {
	    $event.preventDefault();
	    $event.stopPropagation();

	    $scope.opened = true;
	  };
	

$scope.publish = function() {
	if (isEdit) {
			console.log($scope.idalertInfo);

			/*var params = {
				
				idalertInfo : $scope.idalertInfo
						
			};
			
			
			DataService.putData('/api/editBuilding', params)
			.success(function(response) {
				$modalInstance.close(true);
			}).error(function(err) {
				$modalInstance.close(false);
			});*/

}
		
	/*	else {
			var params = {
					
					//idclient : $rootScope.userId,
					idclient : 1,
					start_date:$scope.start_date,
					release_date : $scope.release_date,
					buildingname:  $scope.buildingname,
					address : $scope.address,
					checkpoint : $scope.checkpoint
						
				};
			DataService.postData("/api/createBuilding",params).success(function(response){
				$modalInstance.close(true);
			}).error(function(err){
				$modalInstance.dismiss(false);
			});
		}*/
	
};

$scope.cancel = function() {
	$modalInstance.dismiss(false);
};

});





