import chai from 'chai';
import * as support from './support';
import UrlUtils from '../lib/api_guardian/utils/url';
import TokenUtils from '../lib/api_guardian/utils/token';

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
});
