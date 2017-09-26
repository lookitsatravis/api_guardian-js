let memoryStore = {};

export default class Storage {
  static getItem(key) {
    try {
      let value = localStorage.getItem(key);
      return value;
    } catch(e) {
      return memoryStore[key];
    }
  }

  static setItem(key, value) {
    try {
      localStorage.setItem(key, value);
    } catch(e) {
      memoryStore[key] = value;
    }
  }

  static clear() {
    try {
      localStorage.clear();
    } catch(e) {
      memoryStore = {};
    }
  }
}
