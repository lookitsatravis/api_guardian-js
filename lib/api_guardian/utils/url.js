import { ValidationError } from '../errors';

class UrlUtils {
  static buildLoginUrl(apiUrl, loginUrl) {
    if(apiUrl && loginUrl) {
      return apiUrl + '/' + loginUrl;
    } else {
      throw new ValidationError('apiUrl and loginUrl are required!');
    }
  }
}

export default UrlUtils;
