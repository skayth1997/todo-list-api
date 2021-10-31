const config = require('config');
const jwt = require('jsonwebtoken');

const jwtSecret = config.get(`jwtSecret`);


function sign(user) {
  return new Promise((resolve, reject) => {
    jwt.sign(user, jwtSecret, (err, token) => {
      if (err) {
        reject(err);
      }

      resolve(token);
    });
  });
}

function verify(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, jwtSecret, (err, user) => {
      if (err) {
        return reject(new Error('INVALID_TOKEN'));
      }

      if (user) {
        resolve(user);
      }

      reject(new Error('INVALID_USER'));
    });
  });
}


module.exports = {
  sign,
  verify
};
