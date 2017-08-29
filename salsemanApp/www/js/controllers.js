angular.module('salseManApp.controllers', [])

	.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

		// With the new view caching in Ionic, Controllers are only called
		// when they are recreated or on app start, instead of every page change.
		// To listen for when this page is active (for example, to refresh data),
		// listen for the $ionicView.enter event:
		//$scope.$on('$ionicView.enter', function(e) {
		//});

		// Form data for the login modal
		$scope.loginData = {};
		$scope.registeration = {};

		// Create the login modal that we will use later
		$ionicModal.fromTemplateUrl('templates/login.html', {
			scope: $scope
		}).then(function(modal) {
			$scope.modal = modal;
		});

		// Triggered in the login modal to close it
		$scope.closeLogin = function() {
			$scope.modal.hide();
		};

		// Open the login modal
		$scope.login = function() {
			$scope.modal.show();
		};

		// Perform the login action when the user submits the login form
		$scope.doLogin = function() {
			console.log('Doing login', $scope.loginData);
			// Simulate a login delay. Remove this and replace with your login
			// code if using a login system
			$timeout(function() {
				$scope.closeLogin();
			}, 1000);
		};



		$ionicModal.fromTemplateUrl('templates/registration.html', {
			scope: $scope
		}).then(function(modal) {
			$scope.registerform = modal;
		});

		// Triggered in the registration modal to close it
		$scope.closeRegister = function() {
			$scope.registerform.hide();
		};

		// Open the registration modal
		$scope.register = function() {
			$scope.registerform.show();
		};

		// Perform the registration action when the user submits the registration form
		$scope.doRegister = function() {
			// Simulate a registration delay. Remove this and replace with your registration
			// code if using a registration system
			$timeout(function() {
				$scope.closeRegister();
			}, 1000);
		};
	})

	.controller('PublicationsCtrl', function($scope) {
		$scope.publications = [{
				title: 'Reggae',
				id: 1
			},
			{
				title: 'Chill',
				id: 2
			},
			{
				title: 'Dubstep',
				id: 3
			},
			{
				title: 'Indie',
				id: 4
			},
			{
				title: 'Rap',
				id: 5
			},
			{
				title: 'Cowbell',
				id: 6
			}
		];
	})

	.controller('PublicationDitailsCtrl', function($scope, $stateParams) {})

	.controller('ClientsCtrl', function($scope, $stateParams) {})

	.controller('ClientDitailsCtrl', function($scope, $stateParams) {})

	.controller('AccountCtrl', function($scope, $stateParams) {})

	.controller('MessagesCtrl', function($scope, $stateParams) {})

;
