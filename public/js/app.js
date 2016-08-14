angular.module('linkApp',[]).controller('linkController', function($scope, $http) {

	

	$scope.generate = function(link) {
		$scope.noUrl = false; // reset each time.
		if(!link) return $scope.noUrl = true;

		$http.post('/',{url: link}).then(function(result) {
			console.log(result);
			return $scope.validUrl = result.data.shortUrl;
		}, function(err) {
			return $scope.linkError = err.data;
		});
	}

});


