const sql = require('./db');
const authService = require('./auth');

const db = sql.getDB();
const userQueries = sql.queries.users;


async function registerUser({ email, password }) {
  await db.query(userQueries.register, [
    email,
    password
  ]);
}

async function loginUser({ email, password }) {
  const sqlResult = await db.query(userQueries.login, [
    email,
    password
  ]);

  const user = sqlResult.rows[0];
  if (user) {
    const token = await authService.sign(user);

    return token;
  } else {
    throw new Error('FORBIDDEN');
  }
}

module.exports = {
  register: registerUser,
  login: loginUser
};
