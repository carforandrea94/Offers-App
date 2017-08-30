angular.module('salseManApp', ['ionic', 'ngCordova', 'salseManApp.controllers', 'salseManApp.services'])

	.run(function($ionicPlatform) {
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
						templateUrl: 'templates/account.html',
						controller: 'AccountCtrl'
					}
				}
			})


			.state('app.publications', {
				url: '/publications',
				views: {
					'mainContent': {
						templateUrl: 'templates/publications.html',
						controller: 'PublicationsCtrl'
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

			.state('app.messages', {
				url: '/messages',
				views: {
					'mainContent': {
						templateUrl: 'templates/messages.html',
						controller: 'MessagesCtrl'
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
