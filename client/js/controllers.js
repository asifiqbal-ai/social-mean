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
				alert(err);
			});
	}
	$scope.signup = function () {
		$http.post('/auth/signup', $scope.user)
			.success(function(user) {
				$rootScope.currentUser = user;
				$state.go($rootScope.authRedirect, $rootScope.authRedirectParams);
			})
			.error(function(err) {
				console.log('Error: '+ err);
			});
	}
}