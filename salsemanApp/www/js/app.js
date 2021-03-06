angular.module('salseManApp', ['ionic', 'jett.ionic.filter.bar', 'ion-floating-menu', 'ngCordova', 'salseManApp.controllers', 'salseManApp.services'])

.run(function($ionicPlatform, $rootScope, $ionicLoading, $cordovaSplashscreen, $timeout) {
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
      $timeout(function(){
                $cordovaSplashscreen.hide();
      },2000);
  });
    
    $rootScope.$on('loading:show', function () {
        $ionicLoading.show({
            template: '<ion-spinner></ion-spinner> Loading ...'
        })
    });

    $rootScope.$on('loading:hide', function () {
        $ionicLoading.hide();
    });

    $rootScope.$on('$stateChangeStart', function () {
        console.log('Loading ...');
        $rootScope.$broadcast('loading:show');
    });

    $rootScope.$on('$stateChangeSuccess', function () {
        console.log('done');
        $rootScope.$broadcast('loading:hide');
    });
})

	.config(function($stateProvider, $urlRouterProvider) {
		$stateProvider

			.state('app', {
				url: '/app',
				abstract: true,
				templateUrl: 'templates/sidemenu.html',
				controller: 'IndexCtrl'
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



			.state('app.publicationDetails', {
				url: '/publicationDetails',
				views: {
					'mainContent': {
						templateUrl: 'templates/publicationDetails.html',
						controller: 'PublicationDetailsCtrl'
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

			.state('app.messagesDetails', {
				url: '/messagesDetails',
				views: {
					'mainContent': {
						templateUrl: 'templates/messagesDetails.html',
						controller: 'MessagesDetailsCtrl'
					}
				}
			})

			.state('app.clientDetails', {
				url: '/clientDetails',
				views: {
					'mainContent': {
						templateUrl: 'templates/clientDetails.html',
						controller: 'ClientDetailsCtrl'
					}
				}



			});
		// if none of the above states are matched, use this as the fallback
		$urlRouterProvider.otherwise('/app/login');
	});
