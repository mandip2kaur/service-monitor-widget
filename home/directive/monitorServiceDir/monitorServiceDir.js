angular.module('home').directive('monitorServiceDir', function($timeout) {
  return {
    restrict: 'E',
    replace: true,
    scope: {},
    templateUrl: 'home/directive/monitorServiceDir/monitorServiceDir.html',
    link: function(scope, element, attrs, fn) {
      var syncContext = function() {
        $timeout(function() {scope.context = launchpadAPI.context.all();});
      };

      launchpadAPI.bind('contextChange', syncContext);

      scope.pushContext = function(key, valString) {
        if(typeof key === 'string' && key !== '') {
          try {
            var val = JSON.parse(valString);
            launchpadAPI.context.set(key, val);
          } catch(e) {
            return;
            }
        }
        scope.context = launchpadAPI.context.all();
      };
      syncContext();
        }
	};
});