import chai from 'chai';
import * as support from './support';
import storage from '../src/api_guardian/storage';

let expect = chai.expect;
let should = chai.should();

describe('Storage', () => {
  beforeEach(() => {
    storage.clear();
  });

  describe('.getItem/.setItem', () => {
    it('sets and returns value by key', () => {
      should.equal(storage.getItem('foo'), null);

      storage.setItem('foo', 'bar');

      storage.getItem('foo').should.equal('bar');
    });

    it('should work when local storage is not available', () => {
      disableLocalStorage();

      (() => storage.setItem('foo', 'bar')).should.not.throw(Error);
      (() => storage.getItem('foo')).should.not.throw(Error);
      storage.getItem('foo').should.equal('bar');

      enableLocalStorage();
    });
  });

  describe('.clear', () => {
    it('should clear stored data', () => {
      testStorageClear();
    });

    it('should work when local storage is not available', () => {
      disableLocalStorage();

      testStorageClear();

      enableLocalStorage();
    });
  });
});

function testStorageClear() {
  storage.setItem('foo', 'bar');
  storage.setItem('baz', 'qux');
  storage.getItem('foo').should.equal('bar');
  storage.getItem('baz').should.equal('qux');

  storage.clear();

  // Could be either value for some reason. Weird.
  expect(storage.getItem('foo')).to.be.oneOf([null, undefined]);
  expect(storage.getItem('baz')).to.be.oneOf([null, undefined]);
}

let origLocalStorage = localStorage;

function disableLocalStorage() {
  let newLocalStorage = Object.assign({}, localStorage);

  Object.defineProperty(newLocalStorage, 'getItem', {
    get: () => {
      throw new Error('Ah, ah, ah. You didn\'t say the magic word!');
    }
  });

  Object.defineProperty(newLocalStorage, 'setItem', {
    get: () => {
      throw new Error('Houston, we have a problem.');
    }
  });

  Object.defineProperty(newLocalStorage, 'clear', {
    get: () => {
      throw new Error('Some great movie quote for problems.');
    }
  });

  localStorage = newLocalStorage;

  (() => localStorage.getItem('foo')).should.throw(Error);
  (() => localStorage.setItem('foo', 'bar')).should.throw(Error);
  (() => localStorage.clear()).should.throw(Error);
}

function enableLocalStorage() {
  localStorage = origLocalStorage;
}
