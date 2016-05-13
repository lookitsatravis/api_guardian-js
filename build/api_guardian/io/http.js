'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _accessToken = null;

var Http = function () {
  function Http() {
    _classCallCheck(this, Http);
  }

  _createClass(Http, null, [{
    key: 'setAccessToken',
    value: function setAccessToken(accessToken) {
      _accessToken = accessToken;
    }
  }, {
    key: 'getAccessToken',
    value: function getAccessToken() {
      return _accessToken;
    }
  }, {
    key: 'getJson',
    value: function getJson(url) {
      var skipAuthorization = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

      var request = {
        method: 'GET'
      };
      return this.fetchJson(url, request, skipAuthorization);
    }
  }, {
    key: 'postJson',
    value: function postJson(url, request) {
      var skipAuthorization = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];

      request.method = 'POST';
      return this.fetchJson(url, request, skipAuthorization);
    }
  }, {
    key: 'fetchJson',
    value: function fetchJson(url, request) {
      var skipAuthorization = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];

      if (!request.headers) {
        request.headers = {};
      }

      request.headers['Content-Type'] = 'application/json';

      if (request.body && _typeof(request.body) !== String) {
        request.body = JSON.stringify(request.body);
      }

      return this.$fetch(url, request, skipAuthorization);
    }
  }, {
    key: '$fetch',
    value: function () {
      var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(url, request) {
        var skipAuthorization = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];
        var response, json;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!skipAuthorization) {
                  if (!request.headers) {
                    request.headers = {};
                  }

                  // 'Content-Type': 'application/vnd.api+json',
                  // 'Accept': 'application/vnd.api+json',

                  request.headers = _extends({
                    'Authorization': 'Bearer ' + this.getAccessToken()
                  }, request.headers);
                }

                _context.prev = 1;
                _context.next = 4;
                return fetch(url, request);

              case 4:
                response = _context.sent;
                _context.prev = 5;

                if (!(response.status === 204)) {
                  _context.next = 10;
                  break;
                }

                return _context.abrupt('return', Promise.resolve());

              case 10:
                _context.next = 12;
                return response.json();

              case 12:
                json = _context.sent;
                return _context.abrupt('return', response.ok ? Promise.resolve(json) : Promise.reject(json));

              case 14:
                _context.next = 19;
                break;

              case 16:
                _context.prev = 16;
                _context.t0 = _context['catch'](5);
                return _context.abrupt('return', Promise.reject(_context.t0));

              case 19:
                _context.next = 24;
                break;

              case 21:
                _context.prev = 21;
                _context.t1 = _context['catch'](1);
                return _context.abrupt('return', Promise.reject(_context.t1));

              case 24:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[1, 21], [5, 16]]);
      }));

      function $fetch(_x4, _x5, _x6) {
        return ref.apply(this, arguments);
      }

      return $fetch;
    }()
  }]);

  return Http;
}();

exports.default = Http;