(function() {
  'use strict';

  angular.module('home', ['ui.bootstrap', 'ui.utils', 'ui.router', 'ngAria', 'ngAnimate', 'ngMaterial']);

  angular.module('home').config(function ($stateProvider) {
    $stateProvider.state('main', {
      url: '/home',
      templateUrl: 'home/page/main/main.html',
      controller: 'mainCtrl',
      controllerAs: 'mainCtrl'
    });
    /* Add New States Above */
  });
}());


