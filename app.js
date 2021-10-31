const express = require('express');
const bodyParser = require('body-parser');
const validator = require('./middlewares/validator');
const controllers = require('./controllers');


const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(validator);
app.use('/', controllers());
app.use((req, res) => {
  res.status(404);
  res.json({
    err: true,
    err_msg: 'NOT_FOUND'
  });
});


module.exports = app;
