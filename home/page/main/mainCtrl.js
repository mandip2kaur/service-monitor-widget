(function() {
	'use strict';

	angular.module('home').controller('mainCtrl', function ($scope) {
		$scope.inLaunchpad = launchpadAPI.inLaunchpad();
		$scope.throughputResult = [ {

			"frameLength" : "64",
			"successfulThroughput" : "8.544",
			"delayMax" : "4.045",
			"delayMin" : "2.985",
			"avg" : "3.9887",
		},
		{

			"frameLength" : "128",
			"successfulThroughput" : "9.637",
			"delayMax" : "6.115",
			"delayMin" : "3.985",
			"avg" : "4.987",
		},
		{

			"frameLength" : "256",
			"successfulThroughput" : "9.620",
			"delayMax" : "8.045",
			"delayMin" : "5.985",
			"avg" : "7.9887",
		},
		{       
			"frameLength" : "512",
			"successfulThroughput" : "8.544",
			"delayMax" : "4.045",
			"delayMin" : "2.985",
			"avg" : "3.9887",
		},
		{

			"frameLength" : "1024",
			"successfulThroughput" : "11.620",
			"delayMax" : "9.045",
			"delayMin" : "5.985",
			"avg" : "8.9887",
		},
		{       
			"frameLength" : "512",
			"successfulThroughput" : "8.544",
			"delayMax" : "4.045",
			"delayMin" : "2.985",
			"avg" : "3.9887",
		},
		{

			"frameLength" : "256",
			"successfulThroughput" : "9.620",
			"delayMax" : "8.045",
			"delayMin" : "5.985",
			"avg" : "7.9887",
		},
		{       
			"frameLength" : "512",
			"successfulThroughput" : "8.544",
			"delayMax" : "4.045",
			"delayMin" : "2.985",
			"avg" : "3.9887",
		}


		];

	});
}());
