angular.module('salseManApp', ['ionic', 'jett.ionic.filter.bar', 'ion-floating-menu', 'ngCordova', 'salseManApp.controllers', 'salseManApp.services'])

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
				controller: 'IndexCtrl'
				resolve: {
						 client:      ['clientsFactory', function(clientsFactory)           {
												return clientsFactory.get({id:0});
						 }],
						 publication: ['publicationsFactory', function(publicationsFactory) {
												return publicationsFactory.get({id:0});
						 }],
						 message:    ['messagesFactory', function(messagesFactory){
												return messagesFactory.get({id:0});
						}]
				 }
			})

			.state('app.start', {
				url: '/start',
				views: {
					'mainContent': {
						templateUrl: 'templates/start.html',
						controller: 'AppCtrl'
					}
				}
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
						resolve:{
							publications: ['publicationsFactory', function(publicationsFactory) {
												 return publicationsFactory.query();
							}]
						}
					}
				}
			})

			.state('app.clients', {
				url: '/clients',
				views: {
					'mainContent': {
						templateUrl: 'templates/clients.html',
						controller: 'ClientsCtrl'
						resolve: {
								 client:      ['clientsFactory', function(clientsFactory)           {
														return clientsFactory.query();
								 }]
							 }
					}
				}
			})

			.state('app.messages', {
				url: '/messages',
				views: {
					'mainContent': {
						templateUrl: 'templates/messages.html',
						controller: 'MessagesCtrl'
						resolve:{
						messages:    ['messagesFactory', function(messagesFactory){
											 return messagesFactory.query();
					 }]
				 }
					}
				}
			})

			.state('app.publicationDetails', {
				url: '/publications/:id',
				views: {
					'mainContent': {
						templateUrl: 'templates/publicationDetails.html',
						controller: 'PublicationDetailsCtrl',
						resolve: {
										 publication: ['$stateParams','publicationsFactory', function($stateParams, publicationsFactory){
												 return publicationsFactory.get({id:parseInt($stateParams.id, 10)});
										 }]
			 			}
					}
				}
			})


			.state('app.messagesDetails', {
				url: '/messages/:id',
				views: {
					'mainContent': {
						templateUrl: 'templates/messagesDetails.html',
						controller: 'MessagesDetailsCtrl',
						resolve: {
										 message: ['$stateParams','messagesFactory', function($stateParams, messagesFactory){
												 return messagesFactory.get({id:parseInt($stateParams.id, 10)});
										 }]
						}
					}
				}
			})

			.state('app.clientDetails', {
				url: '/clients/:id',
				views: {
					'mainContent': {
						templateUrl: 'templates/clientDetails.html',
						controller: 'ClientDetailsCtrl',
						resolve: {
										 message: ['$stateParams','messagesFactory', function($stateParams, clientsFactory){
												 return clientsFactory.get({id:parseInt($stateParams.id, 10)});
										 }]
						}
					}
				}



			});
		// if none of the above states are matched, use this as the fallback
		$urlRouterProvider.otherwise('/app/start');
	});
