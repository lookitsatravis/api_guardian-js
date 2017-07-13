'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _errors = require('../errors');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var UrlUtils = function () {
  function UrlUtils() {
    _classCallCheck(this, UrlUtils);
  }

  _createClass(UrlUtils, null, [{
    key: 'buildLoginUrl',
    value: function buildLoginUrl(apiUrl, loginUrl) {
      if (apiUrl && loginUrl) {
        return apiUrl + '/' + loginUrl;
      } else {
        throw new _errors.ValidationError('apiUrl and loginUrl are required!');
      }
    }
  }, {
    key: 'buildResetPasswordUrl',
    value: function buildResetPasswordUrl(apiUrl, resetPasswordUrl) {
      if (apiUrl && resetPasswordUrl) {
        return apiUrl + '/' + resetPasswordUrl;
      } else {
        throw new _errors.ValidationError('apiUrl and resetPasswordUrl are required!');
      }
    }
  }, {
    key: 'buildRegisterUrl',
    value: function buildRegisterUrl(apiUrl, registerUrl) {
      if (apiUrl && registerUrl) {
        return apiUrl + '/' + registerUrl;
      } else {
        throw new _errors.ValidationError('apiUrl and registerUrl are required!');
      }
    }
  }, {
    key: 'buildCompleteResetPasswordUrl',
    value: function buildCompleteResetPasswordUrl(apiUrl, completeResetPasswordUrl) {
      if (apiUrl && completeResetPasswordUrl) {
        return apiUrl + '/' + completeResetPasswordUrl;
      } else {
        throw new _errors.ValidationError('apiUrl and completeResetPasswordUrl are required!');
      }
    }
  }, {
    key: 'buildUserUrl',
    value: function buildUserUrl(apiUrl, userUrl, userId) {
      if (apiUrl && userUrl && userId) {
        return apiUrl + '/' + userUrl.replace(/:id/, userId);
      } else {
        throw new _errors.ValidationError('apiUrl, userUrl, and userId are required!');
      }
    }
  }]);

  return UrlUtils;
}();

exports.default = UrlUtils;