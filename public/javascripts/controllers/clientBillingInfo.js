'use strict';
wfms.controller("clientBillingInfo", function($scope, $rootScope,
		$location, $window, DataService) {

	
	// $scope.template = "templates/client/clientHome.html";

	// $scope.setTemplate = function(tabName){
	// 	$scope.template = "templates/client/"+tabName + ".html";
	// }

	// $scope.getTemplate = function(){
	// 	return $scope.template;
	// };
	

	$scope.getTotal = function(){
    var total = 0;
    var billingInfo = $scope.billingInfo;
   
    for(var i = 0; i < $scope.billingInfo.length; i++){
        
        total += (billingInfo.Amount_Due[i]);
    }
    return total;
}

	$scope.getBillingInfo = function(){

		var params = {
			//idclient : $rootScope.idclient;
			idclient : 1
		};

		DataService.postData("/api/updateClientBillingInfo", params).success(
				function(response) {
					$scope.billingInfo = response.result;
				}).error(function(err) {
			console.log("Error while updating client billing information");
		});

	};
}).filter('sumByKey', function () {
    return function (data, key) {
        if (typeof (data) === 'undefined' || typeof (key) === 'undefined') {
            return 0;
        }
        console.log("key:"+key);
        console.log("Data:"+data[0].Amount_Due);

        var sum = 0;
        for (var i = data.length - 1; i >= 0; i--) {
            sum += parseInt(data[i][key]);
        }
        console.log("Sum:"+sum);
        return sum;
    };
});