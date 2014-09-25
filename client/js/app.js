angular.module('app', [
	'ui.router'
])

.run(function ($rootScope, $state) {

	$rootScope.$state = $state;

	$rootScope.authRedirect = "home";
	$rootScope.authRedirectParams = {};
	$rootScope.currentUser = null;

	$rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {

		if(toState.name === "login" || toState.name === "signup") {
			if(fromState.name === "" || fromState.name === "login" || fromState.name === "signup") 
			{
				$rootScope.authRedirect = "home";
			} 
			else {
				$rootScope.authRedirect = fromState.name;
				$rootScope.authRedirectParams = fromParams;
			}
		}
	});
})

.config(function ($stateProvider, $urlRouterProvider, $locationProvider) {

	$stateProvider

		.state('home', {
			url: '/',
			templateUrl: 'views/home.html'
		})

		.state('community', {
			url: '/community',
			templateUrl: 'views/community.html'
		})

		.state('list', {
			url: '/list/:id',
			templateUrl: 'views/list.html',
			controller: 'ListCtrl'
		})

		.state('signup', {
			url: '/signup',
			templateUrl: 'views/signup.html',
			controller: 'AuthCtrl'
		})

		.state('login', {
			url: '/login',
			templateUrl: 'views/login.html',
			controller: 'AuthCtrl'
		});

		// enable hashbang mode
		$locationProvider.hashPrefix('!');

        // set fallback route
        $urlRouterProvider.otherwise('/');

});