angular.module('app').controller('HomeCtrl', HomeCtrl);

function HomeCtrl($rootScope, $scope) {
	$scope.hello = "Hello world";
}

angular.module('app').controller('ListCtrl', ListCtrl);

function ListCtrl($rootScope, $scope) {
	$scope.id = $rootScope.$state;
}

angular.module('app').controller('NavCtrl', NavCtrl);

function NavCtrl($rootScope, $scope, $state) {
	$scope.logout = function () {
		$rootScope.currentUser = null;
		$state.go('home');
	}
}

angular.module('app').controller('AuthCtrl', AuthCtrl);

function AuthCtrl($rootScope, $scope, $state, $http) {
	$scope.login = function () {
		$http.post('/auth/login', $scope.credentials)
			.success(function(data) {
				console.log(data);
				$rootScope.currentUser = data.user;
				$state.go($rootScope.authRedirect, $rootScope.authRedirectParams);
			})
			.error(function(err) {
				$scope.loginError = err.message;
			});
	}

	$scope.signup = function () {
		$http.post('/auth/signup', $scope.user)
			.success(function(data) {
				$rootScope.currentUser = data.user;
				$state.go($rootScope.authRedirect, $rootScope.authRedirectParams);
			})
			.error(function(err) {
				$scope.signupError = err.message;
			});
	}
}