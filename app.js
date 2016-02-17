(function() {
  'use strict';

  angular.module("monitorWidget", [
    'ui.utils',
    'ui.router',
    'ngAria',
    'ngAnimate',
    'ngMaterial',
    'home']);


  angular.module("monitorWidget").config(function ($stateProvider, $urlRouterProvider, $mdThemingProvider) {

    // Routes
    $urlRouterProvider.otherwise('/home');
    // Routes end

    // Angular Material UI Theme configurations
    var backgroundPalette = $mdThemingProvider.extendPalette('grey', {
      'default': '200',
      'A100': 'efefef'
    });
    var apBlueGreyPalette = $mdThemingProvider.extendPalette('blue-grey', {
      'default': '37474F',
      '800': '455B66',
      '900': '37474F',
      '50': 'EFEFEF',
      '100': 'D6D6D5'
    });
    var apGreenPalette = $mdThemingProvider.extendPalette('green', {
      '600': '4eb383'
    });
    $mdThemingProvider.definePalette('ap-green', apGreenPalette);
    $mdThemingProvider.definePalette('background', backgroundPalette);
    $mdThemingProvider.definePalette('ap-blue-grey', apBlueGreyPalette);
    $mdThemingProvider.theme('default')
      .primaryPalette('ap-blue-grey', {'default': '900', 'hue-1': '800'})
      .accentPalette('ap-green', {'default': '600'})
      .backgroundPalette('background');
    // Angular Material Theme End
  });
}());
