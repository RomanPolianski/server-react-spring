const express = require('express');
const router = express.Router();

router.post((req, res) => {
  const user = {
    username: 'admin',
    password: '1234',
  };

  try {
    if (
      user.username === req.body.username &&
      user.password === req.body.password
    ) {
      res.status(200).send({ status: 'Success' });
    } else {
      res.status(401).send({ status: 'Invalid username or password' });
    }
  } catch {
    res.status(500).send();
  }
});

module.exports = router;
