const express = require('express');
const todoService = require('../services/todo');


const router = express.Router();


/**
 * URL: /todos
 * METHOD: GET
 * Description: GET todos
 */

router.get('/', async (req, res) => {
  try {
    const result = await todoService.get();
    res.json({ success: true, list: result });
  } catch (e) {
    res.json({ success: false, error: e.message });
  }
});


/**
 * URL: /todos
 * METHOD: POST
 * Description: Create todo_
 */

router.post('/', async (req, res) => {
  req.checkBody({
    name: {
      notEmpty: true,
      isString: true
    },
    description: {
      notEmpty: true,
      isString: true
    }
  });
  const errors = req.validationErrors(true);
  if (errors) {
    return res.json({ success: false, error: errors });
  }

  const name = req.body.name;
  const description = req.body.description;
  const userId = req.user.id;

  try {
    await todoService.create({
      name,
      description,
      userId
    });
    const result = await todoService.get();
    res.json({ success: true, list: result });
  } catch (e) {
    res.json({ success: false, error: e.message });
  }
});


/**
 * URL: /todos/:id
 * METHOD: DELETE
 * Description: Delete todo_
 */

router.delete('/:id', async (req, res) => {
  req.checkParams({
    id: {
      notEmpty: true,
      isNumber: true
    }
  });
  const errors = req.validationErrors(true);
  if (errors) {
    return res.json({ success: false, error: errors });
  }

  const id = req.params.id;

  try {
    await todoService.delete(id);
    return res.json({ success: true });
  } catch (e) {
    return res.json({ success: false, error: e.message });
  }
});


module.exports = router;
