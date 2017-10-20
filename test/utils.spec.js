import chai from 'chai';
import * as support from './support';
import UrlUtils from '../src/api_guardian/utils/url';
import TokenUtils from '../src/api_guardian/utils/token';
import StrUtils from '../src/api_guardian/utils/str';

chai.should();

describe('Utils', () => {
  describe('UrlUtils', () => {
    describe('.buildLoginUrl', () => {
      it('should fail if arguments cannot be validated', () => {
        let validationError = /apiUrl and loginUrl are required!/;
        (() => UrlUtils.buildLoginUrl('', '')).should.throw(validationError);
        (() => UrlUtils.buildLoginUrl()).should.throw(validationError);
        (() => UrlUtils.buildLoginUrl(null, false)).should.throw(validationError);
      });

      it('should return build URL if arguments validate', () => {
        let result = UrlUtils.buildLoginUrl('https://localhost:3000', 'login');
        result.should.equal('https://localhost:3000/login');
      });
    });

    describe('.buildRegisterUrl', () => {
      it('should fail if arguments cannot be validated', () => {
        let validationError = /apiUrl and registerUrl are required!/;
        (() => UrlUtils.buildRegisterUrl('', '')).should.throw(validationError);
        (() => UrlUtils.buildRegisterUrl()).should.throw(validationError);
        (() => UrlUtils.buildRegisterUrl(null, false)).should.throw(validationError);
      });

      it('should return build URL if arguments validate', () => {
        let result = UrlUtils.buildRegisterUrl('https://localhost:3000', 'register');
        result.should.equal('https://localhost:3000/register');
      });
    });

    describe('.buildResetPasswordUrl', () => {
      it('should fail if arguments cannot be validated', () => {
        let validationError = /apiUrl and resetPasswordUrl are required!/;
        (() => UrlUtils.buildResetPasswordUrl('', '')).should.throw(validationError);
        (() => UrlUtils.buildResetPasswordUrl()).should.throw(validationError);
        (() => UrlUtils.buildResetPasswordUrl(null, false)).should.throw(validationError);
      });

      it('should return build URL if arguments validate', () => {
        let result = UrlUtils.buildResetPasswordUrl('https://localhost:3000', 'reset');
        result.should.equal('https://localhost:3000/reset');
      });
    });

    describe('.buildCompleteResetPasswordUrl', () => {
      it('should fail if arguments cannot be validated', () => {
        let validationError = /apiUrl and completeResetPasswordUrl are required!/;
        (() => UrlUtils.buildCompleteResetPasswordUrl('', '')).should.throw(validationError);
        (() => UrlUtils.buildCompleteResetPasswordUrl()).should.throw(validationError);
        (() => UrlUtils.buildCompleteResetPasswordUrl(null, false)).should.throw(validationError);
      });

      it('should return build URL if arguments validate', () => {
        let result = UrlUtils.buildCompleteResetPasswordUrl('https://localhost:3000', 'complete-reset');
        result.should.equal('https://localhost:3000/complete-reset');
      });
    });

    describe('.buildUserUrl', () => {
      it('should fail if arguments cannot be validated', () => {
        let validationError = /apiUrl, userUrl, and userId are required!/;
        (() => UrlUtils.buildUserUrl('', '', '')).should.throw(validationError);
        (() => UrlUtils.buildUserUrl()).should.throw(validationError);
        (() => UrlUtils.buildUserUrl(null, false, null)).should.throw(validationError);
      });

      it('should return build URL if arguments validate', () => {
        let result = UrlUtils.buildUserUrl('https://localhost:3000', 'users/:id', 1);
        result.should.equal('https://localhost:3000/users/1');
      });
    });

    describe('.buildChangePasswordUrl', () => {
      it('should fail if arguments cannot be validated', () => {
        let validationError = /apiUrl, changePasswordUrl, and userId are required!/;
        (() => UrlUtils.buildChangePasswordUrl('', '', '')).should.throw(validationError);
        (() => UrlUtils.buildChangePasswordUrl()).should.throw(validationError);
        (() => UrlUtils.buildChangePasswordUrl(null, false, null)).should.throw(validationError);
      });

      it('should return build URL if arguments validate', () => {
        let result = UrlUtils.buildChangePasswordUrl('https://localhost:3000', 'users/:id/change_password', 1);
        result.should.equal('https://localhost:3000/users/1/change_password');
      });
    });
  });

  describe('TokenUtils', () => {
    describe('.isAuthDataValid', () => {
      it('should return true if auth data is valid', () => {
        let authData = {
          access_token: support.VALID_ACCESS_TOKEN
        }

        let result = TokenUtils.isAuthDataValid(authData);
        result.should.equal(true);
      });

      it('should return false if auth data is invalid', () => {
        let authData = {
          access_token: 'nope'
        }

        let result = TokenUtils.isAuthDataValid(authData);
        result.should.equal(false);
      });
    });
  });

  describe('StrUtils', () => {
    describe('.camelCaseKeys', () => {
      it('should convert an objects keys to camelCase', () => {
        let obj = {
          'first-name': 'foo',
          last_name: 'bar',
          emailAddress: 'baz'
        };

        let result = StrUtils.camelCaseKeys(obj);
        result.should.eql({
          firstName: 'foo',
          lastName: 'bar',
          emailAddress: 'baz'
        });
      });
    });
  });
});
