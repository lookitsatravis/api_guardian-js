import 'babel-polyfill';
import * as constants from './constants';
import http from './io/http';
import { UrlUtils, TokenUtils } from './utils/utils';

let __config;
let __defaultConfig = {
  localStorageKey: constants.DEFAULT_LOCAL_STORAGE_KEY,
  apiUrl: 'http://localhost:3000',
  loginUrl: 'auth/access/token'
};
let __currentUser = null;

class ApiGuardian {
  constructor(options = {}) {
    this._inited = false;

    this::__initialize(options);
  }

  get config() {
    return Object.assign({}, __config);
  }

  get currentUser() {
    return Object.assign({}, __currentUser);
  }

  configure(fn) {
    let result = fn(Object.assign({}, __config));
    return __config = Object.assign({}, __config, result);
  }

  async loginWithEmail(email, password) {
    return this.login({
      grant_type: 'password',
      username: email,
      password: password
    });
  }

  async loginWithFacebook(accessToken) {
    return this.login({
      grant_type: 'assertion',
      assertion_type: 'facebook',
      assertion: accessToken
    });
  }

  async login(options) {
    let loginUrl = UrlUtils.buildLoginUrl(this.config.apiUrl, this.config.loginUrl);

    try {
      let response = await http.postJson(loginUrl, options, true);

      try {
        let data = await response.json();
        this::__processAuthData(data);
        return this.refreshCurrentUser();
      } catch (error) {
        return Promise.reject(error);
      }
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async refreshCurrentUser() {
    let authData = this.getAuthData();

    if(TokenUtils.isAuthDataValid(authData)) {
      let accessToken = authData.access_token;
      var tokenData = TokenUtils.decodeAccessToken(accessToken);
      //       $http({
      //         method: 'GET',
      //         url: APP_CONFIG.API_URL + '/auth/users/' + tokenData.user.id,
      //         headers: {
      //           'Authorization': 'Bearer ' + accessToken.access_token
      //         }
      //       })
      //         .then(function(result) {
      //           _this._currentUser = {
      //             id: tokenData.user.id,
      //             permissions: tokenData.permissions,
      //             attributes: result.data.data.attributes,
      //             settings: prepSettings(result.data.data.attributes.settings),
      //             isGuest: function() {
      //               // TODO: This needs to be more legit
      //               return false;
      //             }
      //           };
      //           $rootScope.$emit(USER_UPDATED);
      //           deferred.resolve();
      //         }, function(error) {
      //           deferred.reject(error);
      //         });
    } else {
      this.clearAuthData();
      this.clearCurrentUser();
    }
  }

  getAuthData() {
    let ls = this::__getLocalStorage();

    if(ls && ls.authData) {
      return ls.authData;
    } else {
      return null;
    }
  }

  clearAuthData() {
    this::__resetLocalStorage();
    http.setAccessToken(null);
  }

  getAccessToken() {
    let authData = getAuthData();
    return authData && authData.access_token ? authData.accessToken : null;
  }

  clearCurrentUser() {
    __currentUser = null;
  }
}

function __initialize(options) {
  if(this._inited) {
    return;
  }

  this::__buildConfig(options);
  this::__initLocalStorage();

  this._inited = true;
}

function __buildConfig(options) {
  __config = Object.assign({}, __defaultConfig, options);
}


function __initLocalStorage() {
  if(!this::__getLocalStorage()) {
    this::__resetLocalStorage();
  }
}

function __getLocalStorage() {
  return localStorage.getItem(this.config.localStorageKey);
}

function __resetLocalStorage() {
  localStorage.setItem(this.config.localStorageKey, JSON.stringify({
    accessToken: null
  }));
}

function __updateLocalStorage(key, value) {
  this::__initLocalStorage()();
  let authData = this::__getLocalStorage();

  authData[key] = value;

  localStorage.setItem(this.config.localStorageKey, JSON.stringify(authData));
}

function __processAuthData(authData) {
  this::__updateLocalStorage('authData', data);
  http.setAccessToken(this.getAccessToken());
}
export default ApiGuardian;

  // function AuthService($rootScope, $q, $http, $window, $localStorage, $ionicModal, $ionicLoading, $cordovaDialogs, DigitsService, DeviceService, APP_CONFIG) {
  //   this.registerWithEmail = registerWithEmail;
  //   this.registerWithDigits = registerWithDigits;
  //   this.registerWithFacebook = registerWithFacebook;
  //   this.registerAsGuest = registerAsGuest;
  //   this.register = register;
  //   this.loginWithDigits = loginWithDigits;
  //   this.logOut = logOut;
  //   this.resetPassword = resetPassword;
  //   this.completeResetPassword = completeResetPassword;
  //   this.refreshSession = refreshSession;
  //   this.sessionExpired = sessionExpired;
  //   this.updateUserSetting = updateUserSetting;
  //   this.handleResetPassword = handleResetPassword;
  //
  //   function registerWithEmail(fields) {
  //     return this.register(
  //       Object.assign({}, fields, {
  //         type: 'email'
  //       })
  //     );
  //   }
  //
  //   function registerWithDigits(digitsOptions) {
  //     return DigitsService.authenticate(digitsOptions)
  //       .then(function(session) {
  //         var authData = session.authData;
  //         return _this.register({
  //           type: 'digits',
  //           auth_url: authData[DIGITS_URL_KEY],
  //           auth_header: authData[DIGITS_AUTH_HEADER_KEY]
  //         });
  //       });
  //   }
  //
  //   function registerWithFacebook(fields) {
  //     return this.register(
  //       Object.assign({}, fields, {
  //         type: 'facebook'
  //       })
  //     );
  //   }
  //
  //   function registerAsGuest() {
  //     var deferred = $q.defer();
  //
  //     deferred.reject('Not Yet Implemented');
  //
  //     return deferred.promise;
  //   }
  //
  //   function register(options) {
  //     return $http.post(APP_CONFIG.API_URL + '/auth/register', options)
  //       .then(function(result) {
  //         $rootScope.$emit(REGISTER_SUCCESS);
  //       }, function(errorResult) {
  //         $rootScope.$emit(REGISTER_FAILED, errorResult.statusText);
  //         return $q.reject({errors: errorResult.data.errors, result: errorResult});
  //       })
  //   }
  //
  //   function loginWithDigits(digitsOptions) {
  //     return DigitsService.authenticate(digitsOptions)
  //       .then(function(session) {
  //         var encodedPassword = getEncodedDigitsPassword(session.authData);
  //
  //         return _this.login({
  //           type: 'digits',
  //           username: session.phoneNumber,
  //           password: encodedPassword
  //         });
  //       });
  //   }
  //
  //   function logOut() {
  //     // TODO: Potentially restore digits logout
  //     var deferred = $q.defer();
  //
  //     DeviceService.deregister()
  //       .finally(function() {
  //         if(_this._currentUser) {
  //           _this._currentUser = null;
  //         }
  //
  //         _this.clearAccessToken();
  //
  //         $rootScope.$emit(LOGOUT_SUCCESS);
  //         deferred.resolve();
  //       })
  //
  //     return deferred.promise;
  //   }
  //
  //   function resetPassword(email) {
  //     return $http.post(APP_CONFIG.API_URL + '/auth/reset-password', {email: email});
  //   }
  //
  //   function completeResetPassword(options) {
  //     return $http.post(APP_CONFIG.API_URL + '/auth/complete-reset-password', {
  //       token: options.token,
  //       email: options.email,
  //       password: options.password,
  //       password_confirmation: options.password_confirmation
  //     });
  //   }
  //
  //   function refreshSession() {
  //     var sessionData = this.getAccessToken();
  //
  //     if(sessionData && sessionData.refresh_token) {
  //       var params = {
  //         grant_type: 'refresh_token',
  //         refresh_token: sessionData.refresh_token
  //       };
  //
  //       return $http.post(APP_CONFIG.API_URL + '/auth/access/token', params)
  //         .then(function(result) {
  //           if(result.status == 200 && result.data) {
  //             console.log('AuthService#refreshSession: Session refreshed successfully.');
  //             updateLocalStorage('accessToken', result.data);
  //             return _this.refreshCurrentUser();
  //           } else {
  //             console.log('AuthService#refreshSession: Session could not be refreshed.');
  //             return _this.sessionExpired();
  //           }
  //         }, function(err) {
  //           console.log('AuthService#refreshSession: Session could not be refreshed.');
  //           return _this.sessionExpired();
  //         });
  //     } else {
  //       return $q.reject('No refresh token is available.');
  //     }
  //   }
  //
  //   function sessionExpired() {
  //     $rootScope.$emit(SESSION_EXPIRED);
  //     _this.clearAccessToken();
  //     return $q.reject('Session has expired.');
  //   }
  //
  //   function getEncodedDigitsPassword(authHeaders) {
  //     var apiUrl = authHeaders[DIGITS_URL_KEY];
  //     var authHeader = authHeaders[DIGITS_AUTH_HEADER_KEY];
  //     return $window.btoa([apiUrl, authHeader].join(';'));
  //   }
  //
  //   function prepSettings(settings) {
  //     var prepped = {};
  //     Object.keys(settings).forEach(function(key) {
  //       var setting = settings[key];
  //       if(setting == "true") {
  //         prepped[key] = true;
  //       } else if (setting == "false") {
  //         prepped[key] = false;
  //       } else {
  //         prepped[key] = setting;
  //       }
  //     });
  //     return prepped;
  //   }
  //
  //   function updateUserSetting(key, value) {
  //     var setting = {
  //       key: key,
  //       value: value
  //     };
  //
  //     return $http.put(APP_CONFIG.API_URL + '/users/' + _this._currentUser.id + '/settings', {setting: setting})
  //       .then(function() {
  //         _this._currentUser.settings[key] = value;
  //       });
  //   }
  //