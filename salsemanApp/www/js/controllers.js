angular.module('salseManApp.controllers', [])

	.controller('AppCtrl', function($scope, $ionicModal, $timeout, $ionicPlatform, $localStorage, $cordovaCamera, $cordovaImagePicker) {

		// With the new view caching in Ionic, Controllers are only called
		// when they are recreated or on app start, instead of every page change.
		// To listen for when this page is active (for example, to refresh data),
		// listen for the $ionicView.enter event:
		//$scope.$on('$ionicView.enter', function(e) {
		//});

		// Form data for the login modal
		$scope.loginData = {};
		$scope.registrationData = {};

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

		$ionicPlatform.ready(function() {
			var options = {
				quality: 50,
				destinationType: Camera.DestinationType.DATA_URL,
				sourceType: Camera.PictureSourceType.CAMERA,
				allowEdit: true,
				encodingType: Camera.EncodingType.JPEG,
				targetWidth: 50,
				targetHeight: 50,
				popoverOptions: CameraPopoverOptions,
				saveToPhotoAlbum: false
			};


			$scope.takePicture = function() {
				$cordovaCamera.getPicture(options).then(function(imageData) {
					$scope.registrationData.imgSrc = "data:image/jpeg;base64," + imageData;
					console.log($scope.registrationData);
				}, function(err) {
					console.log(err);
				});
				$scope.registerform.show();
			};
		});

		$scope.picGallery = function() {

			var galleryOpt = {
				maximumImagesCount: 1,
				width: 100,
				height: 100,
				quality: 80
			};

<<<<<<< HEAD
=======
		$ionicPlatform.ready(function() {


		//method to set a photo from gallery
		var galleryOpt = {
			maximumImagesCount: 10,
			width: 100,
			height: 100,
			quality: 80
		};
>>>>>>> origin/master

			$cordovaImagePicker.getPictures(galleryOpt)
				.then(function(results) {
					for(var i = 0; i < results.lenght; i++){
						console.log('Image URI: ' + results[i]);
						$scope.registrationData.imgSrc = results[i];
					}
				}, function(error) {
					console.log(error);
				});


		};
<<<<<<< HEAD


=======
	});
>>>>>>> origin/master
	})

	.controller('PublicationsCtrl', function($scope) {
		$scope.publications = [{
				title: 'Reggae',
				id: 1,
				category: "Normals"
			},
			{
				title: 'Chill',
				id: 2,
				category: "Normals"
			},
			{
				title: 'Dubstep',
				id: 3,
				category: 'Normals'
			},
			{
				title: 'Indie',
				id: 4,
				category: 'Specials'
			},
			{
				title: 'Rap',
				id: 5,
				category: 'Specials'
			},
			{
				title: 'Cowbell',
				id: 6,
				category: 'Normals'
			}
		];

		$scope.select = function(setTab) {
							 $scope.tab = setTab;

							 if (setTab === 2) {
									 $scope.filtText = "Normals";
							 }
							 else if (setTab === 3) {
									 $scope.filtText = "Specials";
							 }
							 else {
									 $scope.filtText = "";
							 }
					 };

					 $scope.isSelected = function (checkTab) {
							 return ($scope.tab === checkTab);
					 };
	})

	.controller('PublicationDitailsCtrl', function($scope, $stateParams) {})

	.controller('ClientsCtrl', function($scope, $stateParams) {})

	.controller('ClientDitailsCtrl', function($scope, $stateParams) {})

	.controller('AccountCtrl', function($scope, $stateParams) {})

	.controller('MessagesCtrl', function($scope, $stateParams) {
		$scope.expandText = function(){
			var element = document.getElementById("messageArea");
			element.style.height =  element.scrollHeight + "px";

			$scope.clearMessage = function() {
				var element = document.getElementById("messageArea").value = "";
			}
		}
	});
