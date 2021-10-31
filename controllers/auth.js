const express = require('express');
const userService = require('../services/user');


const router = express.Router();


/**
 * URL: /auth/register
 * METHOD: POST
 * Description: Register user
 */

router.post('/register', async (req, res) => {
  req.assert('email', 'Email is not valid').isEmail();
  req.assert('password', 'Password must be at least 4 characters long.').len(4);

  const errors = req.validationErrors();
  if (errors) {
    return res.json({ success: false, error: errors });
  }

  const email = req.body.email;
  const password = req.body.password;

  try {
    await userService.register({
      email,
      password
    });

    res.json({ success: true });
  } catch (e) {
    res.json({ success: false, error: e.message });
  }
});


/**
 * URL: /auth/login
 * METHOD: POST
 * Description: Sign in administrator using email and password
 */

router.post('/login', async (req, res) => {
  req.checkBody({
    email: {
      notEmpty: true,
      isEmail: true
    },
    password: {
      notEmpty: true
    }
  });
  const errors = req.validationErrors(true);
  if (errors) {
    return res.json({ success: false, error: errors });
  }

  const email = req.body.email;
  const password = req.body.password;

  try {
    const token = await userService.login({
      email,
      password
    });

    return res.json({ success: true, token });
  } catch (e) {
    return res.json({ success: false, error: e.message });
  }
});


module.exports = router;
