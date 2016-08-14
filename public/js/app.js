angular.module('linkApp',['ui.router']).controller('linkController', function($scope, $http, $location) {
	
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
		$scope.linkError = false;
		$scope.validUrl = false;
		if(!link) return $scope.noUrl = true;

		$http.post('/api/new',{url: link}).then(function(result) {
			console.log(result);
			return $scope.validUrl = result.data.shortUrl;
		}, function(err) {
			return $scope.linkError = err.data;
		});
	}

}).config( function($stateProvider, $urlRouterProvider,$locationProvider) {
       	$locationProvider.html5Mode(true);
        $urlRouterProvider.otherwise('/');

        $stateProvider.state('/', {
        	url: '/',
        	controller: 'linkController'
        }).state('api', {
            url : '/api',
            templateUrl : 'api.html',
            controller : 'linkController'
        }).state('api/:id/stats', {
        	url: '/:id/stats',
        	templateUrl: 'stats.html',
        	controller: function($scope, $http, $location) {
        		$http.post('/api/stats',{url: $location.path().split('/')[1].split('/stats')[0]}).then(function(result) {
        			$scope.link = result.data.stats;
        		}, function(err) {
        			console.log(err.data);
        		})
        	}
        }).state('api/:id', {
        	url: '/:id',
        	templateUrl: 'redirect.html',
        	controller: function($scope, $location, $http) {
        	if($location.path() != '/') {
        		$http.post('/api/redirect',{url: $location.path().split('/')[1]}).then(function(result) {
        			window.location = result.data;
        			console.log(result);
        		}, function(err) {
        			console.log(err);
        			$scope.link = err.data;
        		})
        	}
        		
        	}
        })

    })