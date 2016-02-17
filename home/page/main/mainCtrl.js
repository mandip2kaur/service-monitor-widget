(function() {
  'use strict';

  angular.module('home').controller('mainCtrl', function ($scope) {
    $scope.inLaunchpad = launchpadAPI.inLaunchpad();
  });
}());
