// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('salseManApp', ['ionic', 'salseManApp.controllers'])

	.run(function($ionicPlatform, $timeout) {
		$ionicPlatform.ready(function() {
			// Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
			// for form inputs)
			if (window.cordova && window.cordova.plugins.Keyboard) {
				cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
				cordova.plugins.Keyboard.disableScroll(true);

			}
			if (window.StatusBar) {
				// org.apache.cordova.statusbar required
				StatusBar.styleDefault();
			}

			$timeout(function() {
				$cordovaSplashscreen.hide();
			}, 5000);

		});
	})

	.config(function($stateProvider, $urlRouterProvider) {
		$stateProvider

			.state('app', {
				url: '/app',
				abstract: true,
				templateUrl: 'templates/sidemenu.html',
				controller: 'AppCtrl'
			})

			.state('app.account', {
				url: '/account',
				views: {
					'mainContent': {
						templateUrl: 'templates/account.html'
					}
				}
			})


			.state('app.publications', {
				url: '/publications',
				views: {
					'mainContent': {
						templateUrl: 'templates/publications.html',
						controller: 'PubblicationsCtrl'
					}
				}
			})

			.state('app.login', {
				url: '/login',
				views: {
					'mainContent': {
						templateUrl: 'templates/login.html',
						controller: 'AppCtrl'
					}
				}
			})


			.state('app.registration', {
				url: '/registration',
				views: {
					'mainContent': {
						templateUrl: 'templates/registration.html',
						controller: 'AppCtrl'
					}
				}
			})

			.state('app.publicationDitails', {
				url: '/publicationDitails',
				views: {
					'mainContent': {
						templateUrl: 'templates/publicationDitails.html',
						controller: 'PublicationDitailsCtrl'
					}
				}
			})

			.state('app.clients', {
				url: '/clients',
				views: {
					'mainContent': {
						templateUrl: 'templates/clients.html',
						controller: 'ClientsCtrl'
					}
				}
			})

			.state('app.clientDitails', {
				url: '/clientDitails',
				views: {
					'mainContent': {
						templateUrl: 'templates/clientDitails.html',
						controller: 'ClientDitailsCtrl'
					}
				}
			});
		// if none of the above states are matched, use this as the fallback
		$urlRouterProvider.otherwise('/app/clients');
	});
