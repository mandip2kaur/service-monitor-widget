(function() {
  'use strict';

  describe('Controller: MainCtrl', function () {

    beforeEach(module('home'));

    var scope, ctrl, launchpadAPI;

    beforeEach(inject(function ($rootScope, $controller) {
      launchpadAPI = {
        inLaunchpad: function () {
          return true;
        }
      };

      scope = $rootScope.$new();
      ctrl = $controller('MainCtrl', {$scope: scope});
    }));
  });
}());
