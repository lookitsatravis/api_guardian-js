"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var memoryStore = {};

var Storage = function () {
  function Storage() {
    _classCallCheck(this, Storage);
  }

  _createClass(Storage, null, [{
    key: "getItem",
    value: function getItem(key) {
      try {
        var value = localStorage.getItem(key);
        return value;
      } catch (e) {
        return memoryStore[key];
      }
    }
  }, {
    key: "setItem",
    value: function setItem(key, value) {
      try {
        localStorage.setItem(key, value);
      } catch (e) {
        memoryStore[key] = value;
      }
    }
  }, {
    key: "clear",
    value: function clear() {
      try {
        localStorage.clear();
      } catch (e) {
        memoryStore = {};
      }
    }
  }]);

  return Storage;
}();

exports.default = Storage;