'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _jwtDecode = require('jwt-decode');

var _jwtDecode2 = _interopRequireDefault(_jwtDecode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TokenUtils = function () {
  function TokenUtils() {
    _classCallCheck(this, TokenUtils);
  }

  _createClass(TokenUtils, null, [{
    key: 'isAuthDataValid',
    value: function isAuthDataValid(authData) {
      if (!authData) {
        return false;
      }

      try {
        var jwt = this.decodeAccessToken(authData.access_token);
        var now = Math.round(new Date().getTime() / 1000);
        return jwt.exp > now;
      } catch (error) {
        return false;
      }
    }
  }, {
    key: 'decodeAccessToken',
    value: function decodeAccessToken(accessToken) {
      return (0, _jwtDecode2.default)(accessToken);
    }
  }]);

  return TokenUtils;
}();

exports.default = TokenUtils;