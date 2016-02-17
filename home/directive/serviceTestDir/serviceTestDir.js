(function() {'use strict';}());

angular.module('home').directive('serviceTestDir',function($timeout) {
	return {
		restrict : 'EA',
		replace : true,
		templateUrl : 'home/directive/serviceTestDir/serviceTestDir.html',
		link : function(scope, element, attrs) {
			scope.render="serviceTest";
			scope.deviceSeleceted=function(){
				scope.render="serviceTest";
				scope.isActivateDisable=false;
			};
		}
	};
});
