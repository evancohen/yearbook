'use strict';

var app = angular.module('yearbookApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'restangular',
])
  .config(function ($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'mainController'
      })
      .otherwise({
        redirectTo: '/'
      });
    $locationProvider
      .html5Mode(true)
      .hashPrefix('!');
  });

app.config(function(RestangularProvider) {
  //RestangularProvider.setBaseUrl('http://localhost:1337');
  RestangularProvider.setBaseUrl('http://yearbook.evanc.me/api');
  RestangularProvider.setResponseExtractor(function(response, operation) {
    return response.data;
  });
  RestangularProvider.setDefaultHttpFields({cache: true});

  RestangularProvider.setDefaultHeaders({
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest"
  });
});
