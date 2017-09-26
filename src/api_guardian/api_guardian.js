import * as constants from './constants';
import http from './io/http';
import storage from './storage';
import { StrUtils, UrlUtils, TokenUtils } from './utils/utils';

let __config;
let __defaultConfig = {
  localStorageKey: constants.DEFAULT_LOCAL_STORAGE_KEY,
  apiUrl: 'http://localhost:3000',
  loginUrl: 'auth/access/token',
  registerUrl: 'auth/register',
  resetPasswordUrl: 'auth/reset-password',
  completeResetPasswordUrl: 'auth/complete-reset-password',
  userUrl: 'auth/users/:id'
};
let __currentUser = null;

class ApiGuardian {
  constructor(options = {}) {
    this._inited = false;
    this._refreshRequest = null;

    this::__initialize(options);
  }

  get config() {
    return Object.assign({}, __config);
  }

  get currentUser() {
    return __currentUser ? Object.assign({}, __currentUser) : null;
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

  async login(body, request = {}) {
    let loginUrl = UrlUtils.buildLoginUrl(this.config.apiUrl, this.config.loginUrl);

    request.body = body;

    try {
      let response = await http.postJson(loginUrl, request, true);
      this::__processAuthData(response);
      return this.refreshCurrentUser();
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async refreshCurrentUser() {
    let authData = this.getAuthData();

    if (TokenUtils.isAuthDataValid(authData)) {
      let accessToken = this.getAccessToken();

      if (!accessToken) {
        return Promise.reject('Auth data invalid.');
      }

      let tokenData = TokenUtils.decodeAccessToken(accessToken);
      let userUrl = UrlUtils.buildUserUrl(this.config.apiUrl, this.config.userUrl, tokenData.user.id);

      try {
        let response = await http.getJson(userUrl);
        this::__buildCurrentUser(tokenData, response);
        return Promise.resolve(this.currentUser);
      } catch (error) {
        return Promise.reject(error);
      }
    } else {
      this.clearAuthData();
      this.clearCurrentUser();
      return Promise.reject('Auth data invalid.');
    }
  }

  async refreshSession() {
    if (this._refreshRequest) {
      return this._refreshRequest;
    }

    let refreshToken = this.getRefreshToken();

    if (refreshToken) {
      this._refreshRequest = this.login({
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
      })
        .finally(() => {
          this._refreshRequest = null;
        });

      return this._refreshRequest;
    } else {
      this.clearAuthData();
      this.clearCurrentUser();
      return Promise.reject('Auth data invalid.');
    }
  }

  logout() {
    this.clearAuthData();
    this.clearCurrentUser();
    return Promise.resolve();
  }

  async register(email, password) {
    let registerUrl = UrlUtils.buildRegisterUrl(this.config.apiUrl, this.config.registerUrl);

    request.body = {
      'type': 'email',
      'email': email,
      'password': password,
      'password_confirmation': password,
    };

    try {
      let response = await http.postJson(registerUrl, request, true);
      return Promise.resolve(response);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async resetPassword(email, request = {}) {
    let resetPasswordUrl = UrlUtils.buildResetPasswordUrl(this.config.apiUrl, this.config.resetPasswordUrl);

    request.body = {
      email: email
    };

    try {
      let response = await http.postJson(resetPasswordUrl, request, true);
      return Promise.resolve(response);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async completeResetPassword(email, request = {}) {
    let completeResetPasswordUrl = UrlUtils.buildCompleteResetPasswordUrl(this.config.apiUrl, this.config.completeResetPasswordUrl);

    request.body = {
      email: email
    };

    try {
      let response = await http.postJson(completeResetPasswordUrl, request, true);
      return Promise.resolve(response);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  getAuthData() {
    let ls = this::__getLocalStorage();

    if (ls && ls.authData) {
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
    let authData = this.getAuthData();
    return authData && authData.access_token ? authData.access_token : null;
  }

  getRefreshToken() {
    let authData = this.getAuthData();
    return authData && authData.refresh_token ? authData.refresh_token : null;
  }

  clearCurrentUser() {
    __currentUser = null;
  }
}

function __initialize(options) {
  if (this._inited) {
    return;
  }

  this::__buildConfig(options);
  this::__initLocalStorage();

  let accessToken = this.getAccessToken();
  http.setAccessToken(accessToken);

  this._inited = true;
}

function __buildConfig(options) {
  __config = Object.assign({}, __defaultConfig, options);
}


function __initLocalStorage() {
  if (!this::__getLocalStorage()) {
    this::__resetLocalStorage();
  }
}

function __getLocalStorage() {
  let authData = storage.getItem(this.config.localStorageKey);
  return authData ? JSON.parse(authData) : null;
}

function __resetLocalStorage() {
  storage.setItem(this.config.localStorageKey, JSON.stringify({
    authData: null
  }));
}

function __updateLocalStorage(key, value) {
  this::__initLocalStorage();
  let authData = this::__getLocalStorage();

  authData[key] = value;

  storage.setItem(this.config.localStorageKey, JSON.stringify(authData));
}

function __processAuthData(authData) {
  this::__updateLocalStorage('authData', authData);
  http.setAccessToken(this.getAccessToken());
}

function __buildCurrentUser(tokenData, userData) {
  let attributes = StrUtils.camelCaseKeys(userData.data.attributes);

  __currentUser = {
    id: tokenData.user.id,
    permissions: tokenData.permissions,
    attributes: attributes,
    isGuest: function () {
      // TODO: This needs to be built from API data
      return false;
    }
  };
}

export default ApiGuardian;
