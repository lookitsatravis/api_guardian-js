let _accessToken = null;

export default class Http {
  static setAccessToken(accessToken) {
    _accessToken = accessToken;
  }

  static getAccessToken() {
    return _accessToken;
  }

    request.method = 'POST';
    return this.fetchJson(url, request);
  }

  static fetchJson(url, request) {
    if(!request.headers) {
      request.headers = {};
    }

    // request.headers = {
    //     'Content-Type': 'application/vnd.api+json',
    //     'Accept': 'application/vnd.api+json',
    //     'Authorization': `Bearer ${access_token}`,
    //     ...request.headers
    //   }

    request.headers['Content-Type'] = 'application/json';

    return this.$fetch(url, request);
  }

  static async $fetch(url, request) {
    try {
      let response = await fetch(url, request);

      try {
        if(response.status === 204) { //success, but response.json errors on no content
          return Promise.resolve();
        } else {
          let json = await response.json();
          return (response.ok) ? Promise.resolve(json.data) : Promise.reject(this.parseError(json));
        }
      } catch(error) {
        return Promise.reject(error);
      }
    } catch(error) {
      return Promise.reject(error);
    }
  }
}
