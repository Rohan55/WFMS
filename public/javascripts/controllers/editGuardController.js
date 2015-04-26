'use strict';
wfms.controller("EditGuardCtrl", function($scope, $modalInstance,
		 isEdit, $rootScope, DataService) {

	
	
	console.log("isEdit"+isEdit);

	if (isEdit) {
		$scope.fname = isEdit.fname;
		$scope.lname = isEdit.lname;
		$scope.bgstatus = isEdit.bgstatus;
		$scope.weekly_working_set = isEdit.weekly_working_set;
		$scope.start_date = isEdit.start_date;
		$scope.end_date = isEdit.end_date;
		$scope.address = isEdit.address;
		$scope.zipcode = isEdit.zipcode;
		$scope.city = isEdit.city;
		$scope.email = isEdit.email;
		$scope.phonenumber = isEdit.phonenumber;
		
	} else {
		$scope.fname = "";
		$scope.lname = ""
		$scope.bgstatus = "";
		$scope.weekly_working_set = "";
		$scope.start_date = "";
		$scope.end_date = "";
		$scope.address = "";
		$scope.zipcode = "";
		$scope.city = "";
		$scope.email = "";
		$scope.phonenumber = "";
	};
	
	
	$scope.open = function($event) {
	    $event.preventDefault();
	    $event.stopPropagation();

	    $scope.opened = true;
	  };
	

$scope.okay = function() {
	if($scope.start_date && $scope.end_date){
		
		if (isEdit) {
			console.log(isEdit);

			var params = {
				
				
					//idclient : $rootScope.userId,
			idperson : isEdit.idperson,
			fname : isEdit.fname,
			lname : isEdit.lname,
			bgstatus : isEdit.bgstatus,
			weekly_working_set : isEdit.weekly_working_set,
			start_date : isEdit.start_date,
			end_date : isEdit.end_date,
			address : isEdit.address,
			zipcode : isEdit.zipcode,
			city : isEdit.city,
			email : isEdit.fname,
			phonenumber : isEdit.phonenumber
				
			};
			
			var uri='/api/editBuilding/'+isEdit.idperson;
			console.log(uri);
		/*	DataService.putData('/api/editBuilding', params)
			.success(function(response) {
				$modalInstance.close(true);
			}).error(function(err) {
				$modalInstance.close(false);
			});*/

}
		
		else {
			var params = {
					
					//idclient : $rootScope.userId,
					idperson : isEdit.idperson,
					fname : isEdit.fname,
					lname : isEdit.lname,
					bgstatus : isEdit.bgstatus,
					weekly_working_set : isEdit.weekly_working_set,
					start_date : isEdit.start_date,
					end_date : isEdit.end_date,
					address : isEdit.address,
					zipcode : isEdit.zipcode,
					city : isEdit.city,
					email : isEdit.fname,
					phonenumber : isEdit.phonenumber
						
				};
			DataService.postData("/api/createBuilding",params).success(function(response){
				$modalInstance.close(true);
			}).error(function(err){
				$modalInstance.dismiss(false);
			});
		}
	}
	
	else{
		
		$scope.formError = "Form Invalid !!!";
	}

};

$scope.cancel = function() {
	$modalInstance.dismiss(false);
};

});





