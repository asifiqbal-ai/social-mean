angular.module('app').controller('HomeCtrl', HomeCtrl);

function HomeCtrl($scope, $http, $sce) {
	var keyword = "cats";
	$scope.youtubeUrl = "";

	$http.get('http://gdata.youtube.com/feeds/api/videos?q='+keyword+'&format=5&max-results=1&v=2&alt=jsonc')
		.success(function(res) {
			$scope.youtubeUrl = $sce.trustAsResourceUrl('http://www.youtube.com/embed/'+res.data.items[0].id);
		})
		.error(function(err) {
			console.log(err);
		});
}

angular.module('app').controller('ListCtrl', ListCtrl);

function ListCtrl($rootScope, $scope) {
	$scope.id = $rootScope.$state;
}

angular.module('app').controller('NavCtrl', NavCtrl);

function NavCtrl($rootScope, $scope) {
	$scope.logout = function () {
		$rootScope.currentUser = null;
	}
}

angular.module('app').controller('AuthCtrl', AuthCtrl);

function AuthCtrl($rootScope, $scope, $state, $http) {
	$scope.login = function () {
		$http.post('/auth/login', $scope.credentials)
			.success(function(user) {
				console.log(user);
				$rootScope.currentUser = user;
				$state.go($rootScope.authRedirect, $rootScope.authRedirectParams);
			})
			.error(function(err) {
				console.log(err);
			});
	}
	$scope.signup = function () {
		$http.post('/auth/signup', $scope.user)
			.success(function(data) {
				console.log(data);
				$state.go($rootScope.authRedirect, $rootScope.authRedirectParams);
			})
			.error(function(err) {
				console.log('Error: '+ err);
			});
	}
}