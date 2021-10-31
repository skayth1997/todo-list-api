const queries = {
  users: {
    register: `INSERT INTO users (email, password) VALUES ($1, crypt($2, gen_salt('bf', 8)));`,
    login: `SELECT id, email, password FROM users WHERE email = $1 AND password = crypt($2, password)`
  },
  todos: {
    get: `SELECT id, name, description, created_at AS createdAt FROM todo_list;`,
    create: `INSERT INTO todo_list (name, description, user_id) VALUES ($1, $2, $3)`,
    delete: `DELETE FROM todo_list WHERE id = $1;`
  }
};


module.exports = queries;
