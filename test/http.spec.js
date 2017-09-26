import chai from 'chai';
import * as support from './support';
import http from '../src/api_guardian/io/http';

let should = chai.should();

describe('Io/Http', () => {
  describe('.setAccessToken/.getAccessToken', () => {
    it('should set/get the internal access token', () => {
      let result = http.getAccessToken();
      should.equal(result, null);

      result = http.setAccessToken('test');

      http.getAccessToken().should.equal('test');
    });
  });

  describe('.postJson', () => {
  });

  describe('.fetchJson', () => {
  });

  describe('.$fetch', () => {
  });
});
