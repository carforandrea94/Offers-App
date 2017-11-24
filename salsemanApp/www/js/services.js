'use strict';

angular.module('salseManApp.services', ['ngResource'])
 .constant("baseURL", "http://192.168.1.16:3000")

 .factory('$localStorage', ['$window', function($window) {
  return {
    store: function(key, value) {
      $window.localStorage[key] = value;
    },
    get: function(key, defaultValue) {
      return $window.localStorage[key] || defaultValue;
    },
    remove: function (key) {
      $window.localStorage.removeItem(key);
    },
    storeObject: function(key, value) {
      $window.localStorage[key] = JSON.stringify(value);
    },
    getObject: function(key,defaultValue) {
      return JSON.parse($window.localStorage[key] || defaultValue);
    }
  }
}])

  .factory('AuthFactory', ['salseman', '$q', '$rootScope', '$ionicPopup', 
    function(salseman, $q, $rootScope, $ionicPopup) {
    function login(loginData) {
      return salseman
        .login(loginData)
        .$promise
        .then(function(response) {
          $rootScope.currentUser = {
            id: response.user.id,
            tokenId: response.id,
            username: loginData.username
          };
          $rootScope.$broadcast('login:Successful');
        },
        function(response){

              var message = '<div><p>' +  response.data.error.message + 
                  '</p><p>' + response.data.error.name + '</p></div>';
            
               var alertPopup = $ionicPopup.alert({
                    title: '<h4>Login Failed!</h4>',
                    template: message
                });

                alertPopup.then(function(res) {
                    console.log('Login Failed!');
                });
        });
    }
      
    function isAuthenticated() {
        if ($rootScope.currentUser) {
            return true;
        }
        else{
            return false;
        }
    }
      
    function getUsername() {
        return $rootScope.currentUser.username;
    }

    function logout() {
      return salseman
       .logout()
       .$promise
       .then(function() {
         $rootScope.currentUser = null;
       });
    }

    function register(registerData) {
      return salseman
        .create({
         username: registerData.username,
         email: registerData.email,
         password: registerData.password
       })
       .$promise
      .then (function(response) {
          
        },
        function(response){
            
              var message = '<div><p>' +  response.data.err.message + 
                  '</p><p>' + response.data.err.name + '</p></div>';
            
               var alertPopup = $ionicPopup.alert({
                    title: '<h4>Registration Failed!</h4>',
                    template: message
                });

                alertPopup.then(function(res) {
                    console.log('Registration Failed!');
                });

        });
    }

    return {
      login: login,
      logout: logout,
      register: register,
      isAuthenticated: isAuthenticated,
      getUsername: getUsername
    };
  }])
;