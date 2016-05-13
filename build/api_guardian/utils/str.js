'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lodash = require('lodash.camelcase');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var StrUtils = function () {
  function StrUtils() {
    _classCallCheck(this, StrUtils);
  }

  _createClass(StrUtils, null, [{
    key: 'camelCaseKeys',
    value: function camelCaseKeys(obj) {
      var newObj = {};

      Object.keys(obj).forEach(function (key) {
        newObj[(0, _lodash2.default)(key)] = obj[key];
      });

      return newObj;
    }
  }]);

  return StrUtils;
}();

exports.default = StrUtils;