import { ValidationError } from '../errors';

class UrlUtils {
  static buildLoginUrl(apiUrl, loginUrl) {
    if(apiUrl && loginUrl) {
      return `${apiUrl}/${loginUrl}`;
    } else {
      throw new ValidationError('apiUrl and loginUrl are required!');
    }
  }

  static buildResetPasswordUrl(apiUrl, resetPasswordUrl) {
    if(apiUrl && resetPasswordUrl) {
      return `${apiUrl}/${resetPasswordUrl}`;
    } else {
      throw new ValidationError('apiUrl and resetPasswordUrl are required!');
    }
  }

  static buildRegisterUrl(apiUrl, registerUrl) {
    if(apiUrl && registerUrl) {
      return `${apiUrl}/${registerUrl}`;
    } else {
      throw new ValidationError('apiUrl and registerUrl are required!');
    }
  }

  static buildCompleteResetPasswordUrl(apiUrl, completeResetPasswordUrl) {
    if(apiUrl && completeResetPasswordUrl) {
      return `${apiUrl}/${completeResetPasswordUrl}`;
    } else {
      throw new ValidationError('apiUrl and completeResetPasswordUrl are required!');
    }
  }

  static buildUserUrl(apiUrl, userUrl, userId) {
    if(apiUrl && userUrl && userId) {
      return `${apiUrl}/${userUrl.replace(/:id/, userId)}`;
    } else {
      throw new ValidationError('apiUrl, userUrl, and userId are required!');
    }
  }
}

export default UrlUtils;
