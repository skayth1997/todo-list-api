const expressValidator = require('express-validator');
const _ = require('lodash');


module.exports = expressValidator({
  customValidators: {
    isObject(property) {
      return _.isPlainObject(property);
    },
    isString(property) {
      return _.isString(property);
    },
    isArray(property) {
      return _.isArray(property);
    },
    isNumber(property) {
      try {
        const number = parseInt(property, 10);
        if (!isNaN(number)) {
          return _.isNumber(number);
        }
        return false;
      } catch (e) {
        return false;
      }
    },
  }
});
