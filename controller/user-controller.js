/* eslint-disable no-empty */
/* eslint-disable no-unused-vars */
const db = require('../db');
const bcrypt = require('bcrypt');
const generateTokens = require('../jwt-helper/jwt-helper');

class UserController {
  async registration(req, res, next) {
    try {
      const { userName, password, firstName, lastName, age } = req.body;
      const hashPassword = await bcrypt.hash(password, 6);
      const candidate = await db.query(
        'SELECT * FROM users WHERE username = $1',
        [userName]
      );
      if (candidate.rows.length) {
        return res.status(401).json({ message: 'User already registered' });
      }

      await db.query(
        'INSERT INTO users (username, password, firstname, lastname, age) values ($1, $2, $3, $4, $5) RETURNING *',
        [userName, hashPassword, firstName, lastName, age]
      );
      res.status(200).json({ message: 'User registered successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async login(req, res, next) {
    try {
      const { userName, password } = req.body;

      const user = await db.query('SELECT * FROM users WHERE username = $1', [
        userName,
      ]);
      if (!user.rows.length) {
        return res.status(400).json({ message: 'Invalid user name' });
      }
      const validPassword = await bcrypt.compare(
        password,
        user.rows[0].password
      );
      if (!validPassword) {
        return res.status(400).json({ message: 'Invalid password' });
      }

      const tokens = generateTokens(user.rows[0]);
      res.cookie('refresh_token', tokens.refreshToken, {
        httpOnly: true,
        secure: true,
      });
      res.status(200).json(tokens);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new UserController();
