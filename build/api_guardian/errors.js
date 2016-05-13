'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _extendableBuiltin(cls) {
  function ExtendableBuiltin() {
    cls.apply(this, arguments);
  }

  ExtendableBuiltin.prototype = Object.create(cls.prototype, {
    constructor: {
      value: cls,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });

  if (Object.setPrototypeOf) {
    Object.setPrototypeOf(ExtendableBuiltin, cls);
  } else {
    ExtendableBuiltin.__proto__ = cls;
  }

  return ExtendableBuiltin;
}

// http://stackoverflow.com/a/32749533/1096391

var ApiGuardianError = exports.ApiGuardianError = function (_extendableBuiltin2) {
  _inherits(ApiGuardianError, _extendableBuiltin2);

  function ApiGuardianError(message) {
    _classCallCheck(this, ApiGuardianError);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ApiGuardianError).call(this, message));

    _this.name = _this.constructor.name;
    _this.message = message;
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(_this, _this.constructor);
    } else {
      _this.stack = new Error(message).stack;
    }
    return _this;
  }

  return ApiGuardianError;
}(_extendableBuiltin(Error));

var ValidationError = exports.ValidationError = function (_ApiGuardianError) {
  _inherits(ValidationError, _ApiGuardianError);

  function ValidationError(m) {
    _classCallCheck(this, ValidationError);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(ValidationError).call(this, m));
  }

  return ValidationError;
}(ApiGuardianError);