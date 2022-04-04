const jwt = require('jsonwebtoken');

function checkToken(req, res, next) {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token === null) return res.status(401).json({ error: 'Null token' });
    jwt.verify(token, process.env.JWT_ACCESS_SECRET, (error, user) => {
      if (error) return res.status(403).json({ error: error.message });
      req.user = user;
      next();
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = checkToken;