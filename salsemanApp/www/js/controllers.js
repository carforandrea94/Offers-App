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
			$scope.loginModal = modal;
		});

		// Triggered in the login modal to close it
		$scope.closeLogin = function() {
			$scope.loginModal.hide();
		};

		// Open the login modal
		$scope.login = function() {
			$scope.loginModal.show();
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
				targetWidth: 100,
				targetHeight: 100,
				popoverOptions: CameraPopoverOptions,
				saveToPhotoAlbum: false
			};

			$scope.takePicture = function() {
				$cordovaCamera.getPicture(options).then(function(imageData) {
					$scope.registration.imgSrc = "data:image/jpeg;base64," + imageData;
				}, function(err) {
					console.log(err);
					$scope.registerform.show();
				});
				$scope.registerform.show();
			};
		}); //end ionicPlatform of tacke picture

		$ionicPlatform.ready(function() {

			var galleryOpt = {
				quality: 50,
				targetWidth: 100,
				targetHeight: 100,
				saveToPhotoAlbum: false
			};

			$scope.picGallery = function() {
				$cordovaImagePicker.getPictures(galleryOpt)
					.then(function(results) {
						for (var i = 0; i < results.length; i++) {
							console.log('Image URI: ' + results[i]);
							$scope.registration.imgSrc = results[0];
						}
					}, function(error) {
						console.log(error);
						$scope.registerform.show();
						// error getting photos
					});

				$scope.registerform.show();
			};
		}); //end ionicPlatform of gallery


	}) //end controller

	.controller('PublicationsCtrl', function($scope, $ionicModal, $ionicPlatform, $cordovaImagePicker) {
		var state = false;

		$ionicModal.fromTemplateUrl('templates/newPublications.html', {
			scope: $scope
		}).then(function(modal) {
			$scope.modal = modal;
		});

		// Triggered in the login modal to close it
		$scope.closeNewPublication = function() {
			$scope.modal.hide();
		};

		// Open the login modal
		$scope.openNewPublication = function() {
			$scope.modal.show();
		};

		$scope.changeState = function() {
			state = !state;
		};


		$ionicPlatform.ready(function() {

			var galleryOpt = {
				quality: 50,
				targetWidth: 100,
				targetHeight: 100,
				saveToPhotoAlbum: false
			};

			$scope.picGalleryfoPublication = function() {
				$cordovaImagePicker.getPictures(galleryOpt)
					.then(function(results) {
						for (var i = 0; i < results.length; i++) {
							console.log('Image URI: ' + results[i]);
							$scope.registration.imgSrc = results[0];
						}
					}, function(error) {
						console.log(error);
						$scope.modal.show();
						// error getting photos
					});

				$scope.modal.show();
			};
		}); //end ionicPlatform of gallery



		$scope.expandText = function() {
			var element = document.getElementById("descriptionArea");
			element.style.height = element.scrollHeight + "px";

			$scope.clearMessage = function() {
				var element = document.getElementById("descriptionArea").value = "";
			}
		}

		$scope.publications = [{
				title: 'Reggae',
				id: 1,
				type: 'Normals'
			},
			{
				title: 'Chill',
				id: 2,
				type: 'Normals'
			},
			{
				title: 'Dubstep',
				id: 3,
				type: 'Normals'
			},
			{
				title: 'Indie',
				id: 4,
				type: 'Normals'

			},
			{
				title: 'Rap',
				id: 5,
				type: 'Specials'
			},
			{
				title: 'Cowbell',
				id: 6,
				type: 'Specials'
			}
		];

		$scope.select = function(setTab) {
			$scope.tab = setTab;
			if (setTab === 2) {
				$scope.filtText = "Normals";
			} else if (setTab === 3) {
				$scope.filtText = "Specials";
			} else {
				$scope.filtText = "";
			}
		};

		$scope.isSelected = function(checkTab) {
			return ($scope.tab === checkTab);
		};

	}) //end controller

	.controller('PublicationDetailsCtrl', function($scope, $stateParams) {}) //end controller
	.controller('MessagesDetailsCtrl', function($scope, $stateParams) {}) //end controller




	.controller('ClientsCtrl', function($scope, $ionicFilterBar, $ionicActionSheet) {
		$scope.clients = [{
			id: 0,
			firstname: 'Client1',
			lastname: 'User1',
			email: 'clientuser@offersApp.com',
			image: 'https://media.licdn.com/mpr/mpr/shrinknp_200_200/AAEAAQAAAAAAAAjhAAAAJDhlMGVhZjg5LTZmMjYtNDg1ZS05MDQxLWJiODEwY2E4NTgxYw.jpg'
		}, {
			id: 1,
			firstname: 'Client2',
			lastname: 'User2',
			email: 'clientuser@offersApp.com',
			image: 'https://media.licdn.com/mpr/mpr/shrinknp_200_200/AAEAAQAAAAAAAAjhAAAAJDhlMGVhZjg5LTZmMjYtNDg1ZS05MDQxLWJiODEwY2E4NTgxYw.jpg'
		}, {
			id: 2,
			firstname: 'Client3',
			lastname: 'User3',
			email: 'clientuser@offersApp.com',
			image: 'https://media.licdn.com/mpr/mpr/shrinknp_200_200/AAEAAQAAAAAAAAjhAAAAJDhlMGVhZjg5LTZmMjYtNDg1ZS05MDQxLWJiODEwY2E4NTgxYw.jpg'
		}];

		$scope.showFilterBar = function() {
			filterBarInstance = $ionicFilterBar.show({
				items: $scope.clients,
				update: function(filteredItems) {
					$scope.clients = filteredItems;
				},
				filterProperties: 'name'
			});
		};

		//function to add a client
		$scope.addClient = function() {
			//put the function here
		}
	})






	.controller('ClientDetailsCtrl', function($scope, $stateParams) {})

	.controller('AccountCtrl', function($scope, $stateParams, $ionicPopup) {

		$scope.modify = false;

		$scope.toggleDitails = function() {
			$scope.modify = !$scope.modify;
		};

		$scope.getState = function() {
			return $scope.modify;
		};


		$scope.saveChanges = function() {

			var confirmPopup = $ionicPopup.confirm({
				title: 'Confirm to Save th Changes',
				template: 'Are you sure you want to save the changes?'
			});

			confirmPopup.then(function(res) {
				if (res) {
					console.log('Ok to delete');


				} else {
					console.log('Canceled delete');
				}
			});
		}; //end function saveChanges

	})

	.controller('MessagesCtrl', function($scope, $stateParams, $ionicModal, $ionicFilterBar) {

		$scope.messages = [{
			to: 'Client1',
			email: 'clientuser@offersApp.com',
			image: 'https://media.licdn.com/mpr/mpr/shrinknp_200_200/AAEAAQAAAAAAAAjhAAAAJDhlMGVhZjg5LTZmMjYtNDg1ZS05MDQxLWJiODEwY2E4NTgxYw.jpg',
			message: 'This is a "Facebook" styled Card. The header is created from a Thumbnail List item, the content is from a card-body consisting of an image and paragraph text. The footer consists of tabs, icons aligned left, within the card-footer.'
		}, {
			to: 'Client2',
			email: 'clientuser@offersApp.com',
			image: 'https://media.licdn.com/mpr/mpr/shrinknp_200_200/AAEAAQAAAAAAAAjhAAAAJDhlMGVhZjg5LTZmMjYtNDg1ZS05MDQxLWJiODEwY2E4NTgxYw.jpg',
			message: 'This is a "Facebook" styled Card. The header is created from a Thumbnail List item, the content is from a card-body consisting of an image and paragraph text. The footer consists of tabs, icons aligned left, within the card-footer.'
		}, {
			to: 'Client3',
			email: 'clientuser@offersApp.com',
			image: 'https://media.licdn.com/mpr/mpr/shrinknp_200_200/AAEAAQAAAAAAAAjhAAAAJDhlMGVhZjg5LTZmMjYtNDg1ZS05MDQxLWJiODEwY2E4NTgxYw.jpg',
			message: 'This is a "Facebook" styled Card. The header is created from a Thumbnail List item, the content is from a card-body consisting of an image and paragraph text. The footer consists of tabs, icons aligned left, within the card-footer.'
		}];

		$ionicModal.fromTemplateUrl('templates/newMessages.html', {
			scope: $scope
		}).then(function(modal) {
			$scope.modal = modal;
		});

		// Triggered in the login modal to close it
		$scope.closeNewMessage = function() {
			$scope.modal.hide();
		};

		// Open the login modal
		$scope.openNewMessage = function() {
			$scope.modal.show();
		};

		$scope.expandText = function() {
			var element = document.getElementById("messageArea");
			element.style.height = element.scrollHeight + "px";

			$scope.clearMessage = function() {
				var element = document.getElementById("messageArea").value = "";
			}
		}

		$scope.showFilterBar = function() {
			filterBarInstance = $ionicFilterBar.show({
				items: $scope.messages,
				update: function(filteredItems) {
					$scope.messages = filteredItems;
				},
				filterProperties: 'to'
			});
		};


		$ionicModal.fromTemplateUrl('templates/messagesDetails.html', {
			scope: $scope
		}).then(function(modal) {
			$scope.messDetail = modal;
		});


		$scope.closeMessagesDetails = function() {
			$scope.messDetail.hide();
		};


		$scope.openMessagesDetails = function() {
			$scope.messDetail.show();
		};






	});
