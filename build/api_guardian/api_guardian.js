'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

require('babel-polyfill');

var _constants = require('./constants');

var constants = _interopRequireWildcard(_constants);

var _http = require('./io/http');

var _http2 = _interopRequireDefault(_http);

var _storage = require('./storage');

var _storage2 = _interopRequireDefault(_storage);

var _utils = require('./utils/utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var __config = void 0;
var __defaultConfig = {
  localStorageKey: constants.DEFAULT_LOCAL_STORAGE_KEY,
  apiUrl: 'http://localhost:3000',
  loginUrl: 'auth/access/token',
  registerUrl: 'auth/register',
  resetPasswordUrl: 'auth/reset-password',
  completeResetPasswordUrl: 'auth/complete-reset-password',
  userUrl: 'users/:id'
};
var __currentUser = null;

var ApiGuardian = function () {
  function ApiGuardian() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, ApiGuardian);

    this._inited = false;

    __initialize.call(this, options);
  }

  _createClass(ApiGuardian, [{
    key: 'configure',
    value: function configure(fn) {
      var result = fn(Object.assign({}, __config));
      return __config = Object.assign({}, __config, result);
    }
  }, {
    key: 'loginWithEmail',
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(email, password) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                return _context.abrupt('return', this.login({
                  grant_type: 'password',
                  username: email,
                  password: password
                }));

              case 1:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function loginWithEmail(_x2, _x3) {
        return _ref.apply(this, arguments);
      }

      return loginWithEmail;
    }()
  }, {
    key: 'loginWithFacebook',
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(accessToken) {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                return _context2.abrupt('return', this.login({
                  grant_type: 'assertion',
                  assertion_type: 'facebook',
                  assertion: accessToken
                }));

              case 1:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function loginWithFacebook(_x4) {
        return _ref2.apply(this, arguments);
      }

      return loginWithFacebook;
    }()
  }, {
    key: 'login',
    value: function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(body) {
        var request = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var loginUrl, response;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                loginUrl = _utils.UrlUtils.buildLoginUrl(this.config.apiUrl, this.config.loginUrl);


                request.body = body;

                _context3.prev = 2;
                _context3.next = 5;
                return _http2.default.postJson(loginUrl, request, true);

              case 5:
                response = _context3.sent;

                __processAuthData.call(this, response);
                return _context3.abrupt('return', this.refreshCurrentUser());

              case 10:
                _context3.prev = 10;
                _context3.t0 = _context3['catch'](2);
                return _context3.abrupt('return', Promise.reject(_context3.t0));

              case 13:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this, [[2, 10]]);
      }));

      function login(_x5) {
        return _ref3.apply(this, arguments);
      }

      return login;
    }()
  }, {
    key: 'refreshCurrentUser',
    value: function () {
      var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
        var authData, accessToken, tokenData, userUrl, response;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                authData = this.getAuthData();

                if (!_utils.TokenUtils.isAuthDataValid(authData)) {
                  _context4.next = 20;
                  break;
                }

                accessToken = this.getAccessToken();

                if (accessToken) {
                  _context4.next = 5;
                  break;
                }

                return _context4.abrupt('return', Promise.reject('Auth data invalid.'));

              case 5:
                tokenData = _utils.TokenUtils.decodeAccessToken(accessToken);
                userUrl = _utils.UrlUtils.buildUserUrl(this.config.apiUrl, this.config.userUrl, tokenData.user.id);
                _context4.prev = 7;
                _context4.next = 10;
                return _http2.default.getJson(userUrl);

              case 10:
                response = _context4.sent;

                __buildCurrentUser.call(this, tokenData, response);
                return _context4.abrupt('return', Promise.resolve(this.currentUser));

              case 15:
                _context4.prev = 15;
                _context4.t0 = _context4['catch'](7);
                return _context4.abrupt('return', Promise.reject(_context4.t0));

              case 18:
                _context4.next = 23;
                break;

              case 20:
                this.clearAuthData();
                this.clearCurrentUser();
                return _context4.abrupt('return', Promise.reject('Auth data invalid.'));

              case 23:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this, [[7, 15]]);
      }));

      function refreshCurrentUser() {
        return _ref4.apply(this, arguments);
      }

      return refreshCurrentUser;
    }()
  }, {
    key: 'refreshSession',
    value: function () {
      var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
        var refreshToken;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                refreshToken = this.getRefreshToken();

                if (!refreshToken) {
                  _context5.next = 5;
                  break;
                }

                return _context5.abrupt('return', this.login({
                  grant_type: 'refresh_token',
                  refresh_token: refreshToken
                }));

              case 5:
                this.clearAuthData();
                this.clearCurrentUser();
                return _context5.abrupt('return', Promise.reject('Auth data invalid.'));

              case 8:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function refreshSession() {
        return _ref5.apply(this, arguments);
      }

      return refreshSession;
    }()
  }, {
    key: 'logout',
    value: function logout() {
      this.clearAuthData();
      this.clearCurrentUser();
      return Promise.resolve();
    }
  }, {
    key: 'register',
    value: function () {
      var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(email, password) {
        var registerUrl, response;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                registerUrl = _utils.UrlUtils.buildRegisterUrl(this.config.apiUrl, this.config.registerUrl);


                request.body = {
                  'type': 'email',
                  'email': email,
                  'password': password,
                  'password_confirmation': password
                };

                _context6.prev = 2;
                _context6.next = 5;
                return _http2.default.postJson(registerUrl, request, true);

              case 5:
                response = _context6.sent;
                return _context6.abrupt('return', Promise.resolve(response));

              case 9:
                _context6.prev = 9;
                _context6.t0 = _context6['catch'](2);
                return _context6.abrupt('return', Promise.reject(_context6.t0));

              case 12:
              case 'end':
                return _context6.stop();
            }
          }
        }, _callee6, this, [[2, 9]]);
      }));

      function register(_x7, _x8) {
        return _ref6.apply(this, arguments);
      }

      return register;
    }()
  }, {
    key: 'resetPassword',
    value: function () {
      var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(email) {
        var request = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var resetPasswordUrl, response;
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                resetPasswordUrl = _utils.UrlUtils.buildResetPasswordUrl(this.config.apiUrl, this.config.resetPasswordUrl);


                request.body = {
                  email: email
                };

                _context7.prev = 2;
                _context7.next = 5;
                return _http2.default.postJson(resetPasswordUrl, request, true);

              case 5:
                response = _context7.sent;
                return _context7.abrupt('return', Promise.resolve(response));

              case 9:
                _context7.prev = 9;
                _context7.t0 = _context7['catch'](2);
                return _context7.abrupt('return', Promise.reject(_context7.t0));

              case 12:
              case 'end':
                return _context7.stop();
            }
          }
        }, _callee7, this, [[2, 9]]);
      }));

      function resetPassword(_x9) {
        return _ref7.apply(this, arguments);
      }

      return resetPassword;
    }()
  }, {
    key: 'completeResetPassword',
    value: function () {
      var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(email) {
        var request = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var completeResetPasswordUrl, response;
        return regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                completeResetPasswordUrl = _utils.UrlUtils.buildCompleteResetPasswordUrl(this.config.apiUrl, this.config.completeResetPasswordUrl);


                request.body = {
                  email: email
                };

                _context8.prev = 2;
                _context8.next = 5;
                return _http2.default.postJson(completeResetPasswordUrl, request, true);

              case 5:
                response = _context8.sent;
                return _context8.abrupt('return', Promise.resolve(response));

              case 9:
                _context8.prev = 9;
                _context8.t0 = _context8['catch'](2);
                return _context8.abrupt('return', Promise.reject(_context8.t0));

              case 12:
              case 'end':
                return _context8.stop();
            }
          }
        }, _callee8, this, [[2, 9]]);
      }));

      function completeResetPassword(_x11) {
        return _ref8.apply(this, arguments);
      }

      return completeResetPassword;
    }()
  }, {
    key: 'getAuthData',
    value: function getAuthData() {
      var ls = __getLocalStorage.call(this);

      if (ls && ls.authData) {
        return ls.authData;
      } else {
        return null;
      }
    }
  }, {
    key: 'clearAuthData',
    value: function clearAuthData() {
      __resetLocalStorage.call(this);
      _http2.default.setAccessToken(null);
    }
  }, {
    key: 'getAccessToken',
    value: function getAccessToken() {
      var authData = this.getAuthData();
      return authData && authData.access_token ? authData.access_token : null;
    }
  }, {
    key: 'getRefreshToken',
    value: function getRefreshToken() {
      var authData = this.getAuthData();
      return authData && authData.refresh_token ? authData.refresh_token : null;
    }
  }, {
    key: 'clearCurrentUser',
    value: function clearCurrentUser() {
      __currentUser = null;
    }
  }, {
    key: 'config',
    get: function get() {
      return Object.assign({}, __config);
    }
  }, {
    key: 'currentUser',
    get: function get() {
      return __currentUser ? Object.assign({}, __currentUser) : null;
    }
  }]);

  return ApiGuardian;
}();

function __initialize(options) {
  if (this._inited) {
    return;
  }

  __buildConfig.call(this, options);
  __initLocalStorage.call(this);

  var accessToken = this.getAccessToken();
  _http2.default.setAccessToken(accessToken);

  this._inited = true;
}

function __buildConfig(options) {
  __config = Object.assign({}, __defaultConfig, options);
}

function __initLocalStorage() {
  if (!__getLocalStorage.call(this)) {
    __resetLocalStorage.call(this);
  }
}

function __getLocalStorage() {
  var authData = _storage2.default.getItem(this.config.localStorageKey);
  return authData ? JSON.parse(authData) : null;
}

function __resetLocalStorage() {
  _storage2.default.setItem(this.config.localStorageKey, JSON.stringify({
    authData: null
  }));
}

function __updateLocalStorage(key, value) {
  __initLocalStorage.call(this);
  var authData = __getLocalStorage.call(this);

  authData[key] = value;

  _storage2.default.setItem(this.config.localStorageKey, JSON.stringify(authData));
}

function __processAuthData(authData) {
  __updateLocalStorage.call(this, 'authData', authData);
  _http2.default.setAccessToken(this.getAccessToken());
}

function __buildCurrentUser(tokenData, userData) {
  var attributes = _utils.StrUtils.camelCaseKeys(userData.data.attributes);

  __currentUser = {
    id: tokenData.user.id,
    permissions: tokenData.permissions,
    attributes: attributes,
    isGuest: function isGuest() {
      // TODO: This needs to be built from API data
      return false;
    }
  };
}

exports.default = ApiGuardian;