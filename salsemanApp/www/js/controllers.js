angular.module('salseManApp.controllers', [])

	.controller('AppCtrl',['$scope', function($state, $scope, $ionicModal, $timeout, $ionicPlatform, $localStorage, $cordovaCamera, $cordovaImagePicker, $ionicPopup) {

		// With the new view caching in Ionic, Controllers are only called
		// when they are recreated or on app start, instead of every page change.
		// To listen for when this page is active (for example, to refresh data),
		// listen for the $ionicView.enter event:
		//$scope.$on('$ionicView.enter', function(e) {
		//});
		// Form data for the login modal

		$scope.loginData = $localStorage.getObject('userinfo', '{}');
		$scope.registrationData = {};


		var customTemplateLogin = '<div class="bar bar-header ">Login</div>' +
			'<div class="list">' +
			'<form ng-submit="doLogin()" >' +
			'<label class="item item-input">' +
			'<input type="text" placeholder="username" id="username" ng-model="loginData.username">' +
			'</label>' +
			'<label class="item item-input">' +
			'<input type="password" placeholder="password"   id="password" ng-model="loginData.password">' +
			'</label>' +
			'<div class="grid">' +
			'<div class="row">' +
			'<div class="col">' +
			'<button class="button button-block button-small button-assertive" ng-click="closeLoginPopup()" >Cancel</button>' +
			'</div>' +
			'<div class="col">' +
			'<button class="button button-block button-small button-positive " ng-click="doLogin()" >Log in</button>' +
			'</div>	' +
			'</div>' +
			'	</div>' +
			'</form>' +
			'</div>';


		$scope.showLoginPopup = function() {
			var myPopUp = $ionicPopup.show({
				template: customTemplateLogin,
				scope: $scope,
			});

			$scope.closeLoginPopup = function() {
				myPopUp.close();
			}

			$scope.doLogin = function() {

				$state.go('app.clients');
				myPopUp.close();
				console.log('Doing login', $scope.loginData);
			}

		};

		// image picker for logged user
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
												        $scope.loginData.imgSrc = "data:image/jpeg;base64," + imageData;
				            }, function(err) {
				                console.log(err);
				            });
				        };

								var galleryOpt = {
										maximumImagesCount: 1,
										width: 100,
										height: 100,
										quality: 80
									};

									$scope.picGallery = function () {
										$cordovaImagePicker.getPictures(galleryOpt)
											.then(function (results) {
													$scope.loginData.imgSrc = results[0];
													console.log('Image URI: ' + results[0]);
											}, function (error) {
												console.log(error);
											});
									};
				    });



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
		$scope.doRegistration = function() {

			$state.go('app.clients');

			$timeout(function() {
				$scope.closeRegister();
			}, 1000);
		};

//image picker for registration user
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
		         $scope.takePictureReg = function() {
		            $cordovaCamera.getPicture(options).then(function(imageData) {
										        $scope.registrationData.imgSrc = "data:image/jpeg;base64," + imageData;
		            }, function(err) {
		                console.log(err);
		            });
		        };

						var galleryOpt = {
								maximumImagesCount: 1,
								width: 100,
								height: 100,
								quality: 80
							};

							$scope.picGalleryReg = function () {
								$cordovaImagePicker.getPictures(galleryOpt)
									.then(function (results) {
											$scope.registrationData.imgSrc = results[0];
											console.log('Image URI: ' + results[0]);
									}, function (error) {
										console.log(error);
									});
							};
		    });
	}]) //end Appcontroller


		.controller('IndexCtrl', ['$scope', 'client','publication','message','clientsFactory','publicationsFactory','messagesFactory',function($scope,client,publication,message,clientsFactory,publicationsFactory,messagesFactory $stateParams) {

			$scope.clients = client;
			$scope.messages =message;
			$scope.publications = publication;
/*
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

					$scope.publications = [{
							id: 1,
							imgSrc:'',
							title: 'Reggae',
							description:'',
							type: 'Normals'
						},
						{
							imgSrc:'',
							title: 'Chill',
							id: 2,
								description:'',
							type: 'Normals'
						},
						{
							imgSrc:'',
							title: 'Dubstep',
							id: 3,
						description:'',
							type: 'Normals'
						},
						{
							imgSrc:'',
							title: 'Indie',
							id: 4,
								description:'',
							type: 'Normals'
						},
						{
							imgSrc:'',
							title: 'Rap',
							id: 5,
						description:'',
							type: 'Specials'
						},
						{
							imgSrc:'',
							title: 'Cowbell',
							id: 6,
							description:'',
							type: 'Specials'
						}
					];
*/

}]) //end controller



	.controller('PublicationsCtrl', ['$scope','publicationsFactory', function($scope, publicationsFactory, $ionicModal, $ionicPlatform,  $cordovaCamera, $cordovaImagePicker, $cordovaToast) {
		var state = false;
		$scope.newPublication={title: "",description:"",type: "",imgSrc:""};

		$ionicModal.fromTemplateUrl('templates/newPublications.html', {
			scope: $scope
		}).then(function(modal) {
			$scope.modalNewPublication = modal;
		});


		$scope.closeNewPublication = function() {
			$scope.modalNewPublication.hide();
		};


		$scope.openNewPublication = function() {
			$scope.modalNewPublication.show();

		};

		$scope.changeState = function() {
			state = !state;
			$scope.newPublication.type ="Normals";
			if(state){
						$scope.newPublication.type ="Specials";
		}else {
						$scope.newPublication.type ="Normals";
			}

			$cordovaToast
									 .show('Type '+	$scope.newPublication.type+' selected!', 'short', 'bottom')
									 .then(function (success) {
										 // success
									 }, function (error) {
										 // error
									 });
		};

		$scope.expandText = function() {
			var element = document.getElementById("descriptionArea");
			element.style.height = element.scrollHeight + "px";

			$scope.clearAll = function() {
				var descriptionArea = document.getElementById("descriptionArea").value = "";
			}
		}


		$scope.addNewPublication = function(){

				//method to add the new publication in the list of publication

				$cordovaToast
										 .show('Added new Publication!', 'short', 'bottom')
										 .then(function (success) {
											 // success
										 }, function (error) {
											 // error
										 });
		}

		$scope.select = function(setTab) {
			$scope.tab = setTab;
			if (setTab === 1) {
				$scope.filtText = "";
			} else if (setTab === 2) {
				$scope.filtText = "Normals";
			} else {
				$scope.filtText =  "Specials";
			}
		};

		$scope.isSelected = function(checkTab) {
			return ($scope.tab === checkTab);
		};

					//image picker for pubblication
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
											 $scope.takePicturePub = function() {
													$cordovaCamera.getPicture(options).then(function(imageData) {
																			$scope.newPublication.imgSrc = "data:image/jpeg;base64," + imageData;
													}, function(err) {
															console.log(err);
													});
											};

											var galleryOpt = {
													maximumImagesCount: 1,
													width: 100,
													height: 100,
													quality: 80
												};

												$scope.picGalleryPub = function () {
													$cordovaImagePicker.getPictures(galleryOpt)
														.then(function (results) {
																$scope.newPublication.imgSrc = results[0];
																console.log('Image URI: ' + results[0]);
														}, function (error) {
															console.log(error);
														});
												};
									});


										$ionicModal.fromTemplateUrl('templates/publicationDetails.html', {
											scope: $scope
										}).then(function(modal) {
											$scope.publicationDetails = modal;
										});


										$scope.closePublicationDetails = function() {
											$scope.publicationDetails.hide();
										};


										$scope.openPublicationDetails = function(index) {
											$scope.publicationDetails.show();
											$scope.publication = publicationsFactory.geti(index);
										};




	}]) //end controller







	.controller('ClientsCtrl', ['$scope','clientsFactory', function($scope, $ionicFilterBar, $ionicActionSheet, $ionicModal) {

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
						};

							$ionicModal.fromTemplateUrl('templates/clientDetails.html', {
																scope: $scope
																}).then(function(modal) {
																	$scope.clientDetails = modal;
																});


							$scope.closeClientDetails = function() {
																	$scope.clientDetails.hide();
																};


							$scope.openClientDetails = function(index) {
																	$scope.clientDetails.show();
																	$scope.client = $scope.clients[index];
																};


	}])






	.controller('AccountCtrl',['$scope', function($scope, $stateParams, $ionicPopup, $ionicPlatform, $cordovaImagePicker) {

		$scope.modify = false;

		$scope.toggleDitails = function() {
			$scope.modify = !$scope.modify;
			document.getElementById("name").readOnly = !$scope.modify;
			document.getElementById("surname").readOnly = !$scope.modify;
			document.getElementById("username").readOnly = !$scope.modify;
			document.getElementById("password").readOnly = !$scope.modify;
			document.getElementById("phoneNumber").readOnly = !$scope.modify;
			document.getElementById("company").readOnly = !$scope.modify;
			document.getElementById("email").readOnly = !$scope.modify;
		};

		$scope.getState = function() {
			return $scope.modify;
		};


		$ionicPlatform.ready(function() {

						var galleryOpt = {
								maximumImagesCount: 1,
								width: 100,
								height: 100,
								quality: 80
							};

							$scope.changeImage = function () {
								$cordovaImagePicker.getPictures(galleryOpt)
									.then(function (results) {
											$scope.loginData.imgSrc = results[0];
											console.log('Image URI: ' + results[0]);
									}, function (error) {
										console.log(error);
									});
							};
		    });


		$scope.saveChanges = function() {

			var confirmPopup = $ionicPopup.confirm({
				title: 'Confirm to Save th Changes',
				template: 'Are you sure you want to save the changes?'
			});

			confirmPopup.then(function(res) {
				if (res) {
					console.log('Ok to delete');
					$scope.toggleDitails();

				} else {
					console.log('Canceled delete');

				}
			});
		}; //end function saveChanges


	}])

	.controller('MessagesCtrl', ['$scope','messagesFactory',function($scope, messagesFactory, $stateParams, $ionicModal, $ionicFilterBar) {


		$ionicModal.fromTemplateUrl('templates/newMessages.html', {
			scope: $scope
		}).then(function(modal) {
			$scope.modalNewMessage = modal;
		});

		// Triggered in the login modal to close it
		$scope.closeNewMessage = function() {
			$scope.modal.hide();
		};

		// Open the login modal
		$scope.openNewMessage = function() {
			$scope.modalNewMessage.show();
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

	}]);
