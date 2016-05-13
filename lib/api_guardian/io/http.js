let _accessToken = null;

export default class Http {
  static setAccessToken(accessToken) {
    _accessToken = accessToken;
  }

  static getAccessToken() {
    return _accessToken;
  }

  static getJson(url, skipAuthorization = false) {
    let request = {
      method: 'GET'
    };
    return this.fetchJson(url, request, skipAuthorization);
  }

  static postJson(url, request, skipAuthorization = false) {
    request.method = 'POST';
    return this.fetchJson(url, request, skipAuthorization);
  }

  static fetchJson(url, request, skipAuthorization = false) {
    if(!request.headers) {
      request.headers = {};
    }

    request.headers['Content-Type'] = 'application/json';

    return this.$fetch(url, request, skipAuthorization);
  }

  static async $fetch(url, request, skipAuthorization = false) {
    if(!skipAuthorization) {
      if(!request.headers) {
        request.headers = {};
      }

      // 'Content-Type': 'application/vnd.api+json',
      // 'Accept': 'application/vnd.api+json',

      request.headers = {
        'Authorization': `Bearer ${this.getAccessToken()}`,
        ...request.headers
      }
    }

    try {
      let response = await fetch(url, request);

      try {
        if(response.status === 204) { //success, but response.json errors on no content
          return Promise.resolve();
        } else {
          let json = await response.json();
          return (response.ok) ? Promise.resolve(json) : Promise.reject(json);
        }
      } catch(error) {
        return Promise.reject(error);
      }
    } catch(error) {
      return Promise.reject(error);
    }
  }
}
