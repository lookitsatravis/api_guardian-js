import chai from 'chai';
import chainAsPromised from 'chai-as-promised'
import path from 'path';
import * as constants from '../lib/api_guardian/constants';
import ApiGuardian from '../lib/api_guardian/api_guardian';

chai.should();
chai.use(chainAsPromised);

describe('ApiGuardian', () => {
  let defaultConfig = {
    apiUrl: 'http://localhost:3000',
    localStorageKey: 'ag',
    loginUrl: 'auth/access/token',
    userUrl: 'users/:id'
  };

  let api_guardian;

  beforeEach(() => {
    api_guardian = new ApiGuardian();
  });

  describe('constructor', () => {
    it('should be self-initialize', () => {
      api_guardian._inited.should.equal(true);
    });

    it('should initialize local storage', () => {
      localStorage.getItem('ag').should.equal(JSON.stringify({
        authData: null
      }));
    });

    it('should not initialize local storage if it exists', () => {
      localStorage.setItem('ag', JSON.stringify({foo: 'bar'}));

      api_guardian = new ApiGuardian();

      localStorage.getItem('ag').should.not.equal(JSON.stringify({
        authData: null
      }));
    });

    it('accepts configuration options as an argument', () => {
      // default config
      api_guardian.config.should.eql(defaultConfig);

      api_guardian = new ApiGuardian({
        apiUrl: '/test'
      });

      // overridden config
      api_guardian.config.apiUrl.should.eql('/test');
    })
  });

  describe('#config', () => {
    it('should return default configuration', () => {
      api_guardian.config.should.eql(defaultConfig);
    });

    it('returns an immutable value', () => {
      api_guardian.config.should.eql(defaultConfig);

      api_guardian.config.apiUrl = '/test';

      api_guardian.config.should.eql(defaultConfig);
    });
  });

  describe("#configure", () => {
    it('accepts a function to update the config', () => {
      api_guardian.config.should.eql(defaultConfig);

      api_guardian.configure((config) => {
        return Object.assign({}, config, {
          foo: 'bar'
        });
      });

      api_guardian.config.should.eql(Object.assign({}, defaultConfig, { foo: 'bar' }));
    });
  });

  describe("#login", () => {
    it('returns a Promise', () => {
      let result = api_guardian.login();
      result.should.be.an.instanceof(Promise);
    });
  });
});
