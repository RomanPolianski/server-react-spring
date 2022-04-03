const jwt = require('jsonwebtoken');

function generateTokens({ id, username }) {
  const user = { id, username };
  const accessToken = jwt.sign(user, process.env.JWT_ACCESS_SECRET, {
    expiresIn: '10m',
  });
  const refreshToken = jwt.sign(user, process.env.JWT_REFRESH_SECRET, {
    expiresIn: '20m',
  });
  return { accessToken, refreshToken };
}

module.exports = generateTokens;
