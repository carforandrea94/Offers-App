'use strict';

angular.module('salseManApp.services', ['ngResource'])
	.constant("baseURL", "http://localhost:3000")

	.factory('clientsFactory', ['$resource', 'baseURL', function ($resource, baseURL) {

								 return $resource(baseURL + "clients/:id", null, {
										 'update': {
												 method: 'PUT'
										 }
								 });

		 }])



.factory('publicationsFactory', ['$resource', 'baseURL', function ($resource, baseURL) {
				 return $resource(baseURL + "publications/:id",null,{
									 'update': {
											 method: 'PUT'
									 }
				 });

	}])


.factory('messagesFactory', ['$resource', 'baseURL', function($resource,baseURL) {

					 return $resource(baseURL + "messages/:id", null, {
															 'update': {
																	 method: 'PUT'
															 }
													 });

		 }])





	.factory('$localStorage', ['$window', function($window) {
      return {
        store: function(key, value) {
          $window.localStorage[key] = value;
        },
        get: function(key, defaultValue) {
          return $window.localStorage[key] || defaultValue;
        },
        storeObject: function(key, value) {
          $window.localStorage[key] = JSON.stringify(value);
        },
        getObject: function(key,defaultValue) {
          return JSON.parse($window.localStorage[key] || defaultValue);
        }
      }
    }])


;
