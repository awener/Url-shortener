angular.module('linkApp',['ngRoute']).controller('linkController', function($scope, $http, $location) {
	
	$scope.getStats = function() {
		
		var url = $location.absUrl().split('3000/')[1].split('/stats')[0];
		
		
		$http.post('/api/'+url+'/stats',{
			url: url
		}).then(function(result) {
			
			$scope.link = result.data.stats;
		}, function(err) {
			$scope.noLink = err.data
			console.log(err);
		})
		
	}

	

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
