const express = require('express');
const accessService = require('../middlewares/user');


const router = express.Router();

module.exports = () => {
  router.get('/', (req, res) => res.json({ reply: 'pong' }));

  // HTTP API
  router.use('/auth', require('./auth'));
  router.use('/todos', accessService, require('./todos'));

  return router;
};
