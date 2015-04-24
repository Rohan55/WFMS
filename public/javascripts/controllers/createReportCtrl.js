'use strict';
wfms.controller("CreateReportCtrl", function($scope, $rootScope, DataService) {
$scope.createReport = function() {
		
		createReport();
		
		/**
		 * Getting List of Companies for adding experience 
		 */
		
		
		function createAlert(){
			
			var uri = urlConstants.CREATE_ALERT+"1"+"1"+"10";
			DataService.getData(uri,[]).success(function(response){
				console.log("Guard Info"+response.data);
				$scope.myProperties = response.data;
			}).error(function(err){
				console.log(err.message);
			});
		}
}
});
