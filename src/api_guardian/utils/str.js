import camelCase from 'lodash.camelcase';

class StrUtils {
  static camelCaseKeys(obj) {
    let newObj = {};

    Object.keys(obj).forEach((key) => {
      newObj[camelCase(key)] = obj[key];
    });

    return newObj;
  }
}

export default StrUtils;
