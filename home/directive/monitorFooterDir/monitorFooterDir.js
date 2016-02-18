(function() {'use strict';}());

angular.module('home').directive('monitorFooterDir',function($timeout) {
  return {
    restrict : 'EA',
    replace : true,
    templateUrl : 'home/directive/monitorFooterDir/monitorFooterDir.html',
  };
});