(function() {
	'use strict';
}());
angular
		.module('home')
		.directive(
				"slaTestDir",
				[ function() {
					return {
						restrict : 'E',
						templateUrl : 'home/directive/slaTestDir/slaTestDir.html',
						link : function(scope, element, attrs) {
							
						}

					};
				} ]);