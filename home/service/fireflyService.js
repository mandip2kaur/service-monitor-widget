(function() {
  'use strict';

  angular.module('home')
    .factory('fireflyService', function ($http, $q) {
      var service = {};
      var defaultHost = 'localhost:61617';

      // Callbacks
      var onSuccess = function (response) { return response.data; };
      var onError = function (err) { return $q.reject(err.data || {message: 'Error in request'});};

      // Service Methods
      service.getDefaultHost = function() { return defaultHost;};
      service.setDefaultHost = function(host) { defaultHost = host;};
      service.sendGET = function (request) {
        var host = request.host || defaultHost;
        return $http.get('http://' + host + '/' + request.uri).then(onSuccess, onError);
      };
      service.sendPOST = function (request) {
        var host = request.host || defaultHost;
        return $http.post('http://' + host + '/' + request.uri, request.content).then(onSuccess, onError);
      };
      service.sendPUT = function (request) {
        var host = request.host || defaultHost;
        return $http.put('http://' + host + '/' + request.uri, request.content).then(onSuccess, onError);
      };
      service.sendPATCH = function (request) {
        var host = request.host || defaultHost;
        return $http.patch('http://' + host + '/' + request.uri, request.content).then(onSuccess, onError);
      };
      service.sendDELETE = function (request) {
        var host = request.host || defaultHost;
        return $http.delete('http://' + host + '/' + request.uri).then(onSuccess, onError);
      };

      return service;
    });
}());
