(function () {'use strict';} ());

angular.module('home').directive('oamTestDir', function ($timeout) {
  return {
    restrict: 'E',
    replace: true,
    scope: {active: '='},
    templateUrl: 'home/directive/oamTestDir/oamTestDir.html',
    link: function ($scope,scope, element, attrs) {
    }
  };
});

