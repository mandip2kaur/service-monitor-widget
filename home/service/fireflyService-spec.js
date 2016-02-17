(function() {
  'use strict';
  describe('Service: fireflyService', function () {

    // load the service's module
    beforeEach(module('home'));

    // instantiate service
    var service,
      $httpBackend;

    beforeEach(inject(function (fireflyService, _$httpBackend_) {
      service = fireflyService;
      $httpBackend = _$httpBackend_;
    }));

    describe('getDefaultHost', function() {
      it('should return default hostname', function() {
        expect(service.getDefaultHost()).toEqual('localhost:61617');
      });
    });

    describe('setDefaultHost', function() {
      it('should modify the value of default hostname', function() {
        expect(service.getDefaultHost()).toEqual('localhost:61617');
        service.setDefaultHost('foobar');
        expect(service.getDefaultHost()).toEqual('foobar');
      });
    });

    describe('sendGET', function () {
      it('should send GET requests to default host', function () {
        var message = '';
        $httpBackend.expectGET('http://localhost:61617/foo/bar')
          .respond('hello world');

        service.sendGET({uri: 'foo/bar', type: 'GET'})
          .then(function (response) {
            message = response;
          });
        $httpBackend.flush();

        expect(message).toEqual('hello world');
      });

      it('should send GET requests to passed in host', function () {
        var message = '';
        $httpBackend.expectGET('http://localhost/foo/bar')
          .respond('hello world');

        service.sendGET({host: 'localhost', uri: 'foo/bar', type: 'GET'})
          .then(function (response) {
            message = response;
          });
        $httpBackend.flush();

        expect(message).toEqual('hello world');
      });

      it('should handle errors on GET requests', function () {
        var error = '';
        $httpBackend.expectGET('http://localhost/foo/bar')
          .respond(500, 'error message');

        service.sendGET({host: 'localhost', uri: 'foo/bar', type: 'GET'})
          .then(function () {
          }, function (err) {
            error = err;
          });
        $httpBackend.flush();

        expect(error).toEqual('error message');
      });
    });

    describe('sendPOST', function () {
      it('should send POST requests to default host', function () {
        var message = '';
        $httpBackend.expectPOST('http://localhost:61617/foo/bar', {'baz': 42})
          .respond('hello post');

        service.sendPOST({
          uri: 'foo/bar',
          content: {'baz': 42},
          type: 'POST'
        })
          .then(function (response) {
            message = response;
          });
        $httpBackend.flush();

        expect(message).toEqual('hello post');
      });

      it('should send POST requests to passed in host', function () {
        var message = '';
        $httpBackend.expectPOST('http://localhost/foo/bar', {'baz': 42})
          .respond('hello post');

        service.sendPOST({
          host: 'localhost',
          uri: 'foo/bar',
          content: {'baz': 42},
          type: 'POST'
        })
          .then(function (response) {
            message = response;
          });
        $httpBackend.flush();

        expect(message).toEqual('hello post');
      });

      it('should handle errors on POST requests', function () {
        it('should handle errors on POST requests', function () {
          var error = '';
          $httpBackend.expectPOST('http://localhost/foo/bar', {'baz': 42})
            .respond(500, 'error message');

          service.sendPOST({
            host: 'localhost',
            uri: 'foo/bar',
            content: {'baz': 42},
            type: 'POST'
          })
            .then(function () {
            }, function (err) {
              error = err;
            });
          $httpBackend.flush();

          expect(error).toEqual('error message');
        });
      });
    });

    describe('sendPUT', function () {
      it('should send PUT requests to default host', function () {
        var message = '';
        $httpBackend.expectPUT('http://localhost:61617/foo/bar', {'baz': 42})
          .respond('hello put');

        service.sendPUT({
          uri: 'foo/bar',
          content: {'baz': 42},
          type: 'PUT'
        })
          .then(function (response) {
            message = response;
          });
        $httpBackend.flush();

        expect(message).toEqual('hello put');
      });

      it('should send PUT requests to passed in host', function () {
        var message = '';
        $httpBackend.expectPUT('http://localhost/foo/bar', {'baz': 42})
          .respond('hello put');

        service.sendPUT({
          host: 'localhost',
          uri: 'foo/bar',
          content: {'baz': 42},
          type: 'PUT'
        })
          .then(function (response) {
            message = response;
          });
        $httpBackend.flush();

        expect(message).toEqual('hello put');
      });

      it('should handle errors on PUT requests', function () {
        var error = '';
        $httpBackend.expectPUT('http://localhost/foo/bar', {'baz': 42})
          .respond(500, 'error message');

        service.sendPUT({
          host: 'localhost',
          uri: 'foo/bar',
          content: {'baz': 42},
          type: 'PUT'
        })
          .then(function () {
          }, function (err) {
            error = err;
          });
        $httpBackend.flush();

        expect(error).toEqual('error message');

      });
    });

    describe('sendPATCH', function () {
      it('should send PATCH requests to default host', function () {
        var message = '';
        $httpBackend.expectPATCH('http://localhost:61617/foo/bar', {'baz': 42})
          .respond('hello patch');

        service.sendPATCH({
          uri: 'foo/bar',
          content: {'baz': 42},
          type: 'PATCH'
        })
          .then(function (response) {
            message = response;
          });
        $httpBackend.flush();

        expect(message).toEqual('hello patch');
      });

      it('should send PATCH requests to passed in host', function () {
        var message = '';
        $httpBackend.expectPATCH('http://localhost/foo/bar', {'baz': 42})
          .respond('hello patch');

        service.sendPATCH({
          host: 'localhost',
          uri: 'foo/bar',
          content: {'baz': 42},
          type: 'PATCH'
        })
          .then(function (response) {
            message = response;
          });
        $httpBackend.flush();

        expect(message).toEqual('hello patch');
      });

      it('should handle errors on PATCH requests', function () {
        var error = '';
        $httpBackend.expectPATCH('http://localhost/foo/bar', {'baz': 42})
          .respond(500, 'error message');

        service.sendPATCH({
          host: 'localhost',
          uri: 'foo/bar',
          content: {'baz': 42},
          type: 'PATCH'
        })
          .then(function () {
          }, function (err) {
            error = err;
          });
        $httpBackend.flush();

        expect(error).toEqual('error message');
      });
    });

    describe('sendDELETE', function () {
      it('should send DELETE requests to default host', function () {
        var message = '';
        $httpBackend.expectDELETE('http://localhost:61617/foo/bar')
          .respond('hello delete');

        service.sendDELETE({
          uri: 'foo/bar',
          type: 'DELETE'
        })
          .then(function (response) {
            message = response;
          });
        $httpBackend.flush();

        expect(message).toEqual('hello delete');
      });

      it('should send DELETE requests to passed in host', function () {
        var message = '';
        $httpBackend.expectDELETE('http://localhost/foo/bar')
          .respond('hello delete');

        service.sendDELETE({
          host: 'localhost',
          uri: 'foo/bar',
          type: 'DELETE'
        })
          .then(function (response) {
            message = response;
          });
        $httpBackend.flush();

        expect(message).toEqual('hello delete');
      });

      it('should handle errors on DELETE requests', function () {
        var error = '';
        $httpBackend.expectDELETE('http://localhost/foo/bar')
          .respond(500, 'error message');

        service.sendDELETE({
          host: 'localhost',
          uri: 'foo/bar',
          type: 'DELETE'
        })
          .then(function () {
          }, function (err) {
            error = err;
          });
        $httpBackend.flush();

        expect(error).toEqual('error message');
      });
    });
  });
}());
