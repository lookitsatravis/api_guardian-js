import jwtDecode from 'jwt-decode';

class TokenUtils {
  static isAuthDataValid(authData) {
    if(!authData) {
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

  static decodeAccessToken(accessToken) {
    return jwtDecode(accessToken);
  }
}

export default TokenUtils;
