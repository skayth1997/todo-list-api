const authService = require('../services/auth');


module.exports = async (req, res, next) => {
  req.checkHeaders({
    'token': {
      notEmpty: true
    }
  });
  const errors = req.validationErrors(true);
  if (errors) {
    return res.json({ err: true, err_msg: errors });
  }
  const token = req.headers['token'];

  try {
    const user = await authService.verify(token);
    req.user = user;

    next();
  } catch (e) {
    res.json({ error: e.message });
  }
};
