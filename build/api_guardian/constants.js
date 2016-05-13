'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var DEFAULT_LOCAL_STORAGE_KEY = exports.DEFAULT_LOCAL_STORAGE_KEY = 'ag';
var DIGITS_URL_KEY = exports.DIGITS_URL_KEY = 'X-Auth-Service-Provider';
var DIGITS_AUTH_HEADER_KEY = exports.DIGITS_AUTH_HEADER_KEY = 'X-Verify-Credentials-Authorization';

var LOGIN_SUCCESS = exports.LOGIN_SUCCESS = 'ag:login:success';
var LOGIN_FAILED = exports.LOGIN_FAILED = 'ag:login:failed';
var LOGOUT_SUCCESS = exports.LOGOUT_SUCCESS = 'ag:logout:success';
var REGISTER_SUCCESS = exports.REGISTER_SUCCESS = 'ag:register:success';
var REGISTER_FAILED = exports.REGISTER_FAILED = 'ag:register:failed';
var SESSION_EXPIRED = exports.SESSION_EXPIRED = 'ag:session:expired';
var NULL_SESSION = exports.NULL_SESSION = 'ag:session:null';
var USER_UPDATED = exports.USER_UPDATED = 'ag:user:updated';