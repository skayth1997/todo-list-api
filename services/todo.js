const sql = require('./db');
const db = sql.getDB();
const todoQueries = sql.queries.todos;


async function getTodos() {
  const result = await db.query(todoQueries.get);
  return result.rows;
}

async function createTodo({ name, description, userId }) {
  const result = await db.query(todoQueries.create, [
    name,
    description,
    userId
  ]);

  return result.rows;
}

async function deleteTodo(id) {
  await db.query(todoQueries.delete, [
    id
  ]);
}


module.exports = {
  get: getTodos,
  create: createTodo,
  delete: deleteTodo
};
