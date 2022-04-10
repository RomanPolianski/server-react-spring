/* eslint-disable no-empty */
/* eslint-disable no-unused-vars */
const db = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const generateTokens = require('../jwt-helper/jwt-helper');
const Users = require('../models/Users');

class UserController {
  async registration(req, res, next) {
    try {
      const { userName, password, firstName, lastName, age } = req.body;
      const hashPassword = await bcrypt.hash(password, 6);
      const candidate = await Users.findOne({ where: { username: userName } });
      if (candidate) {
        return res.status(401).json({ message: 'User already registered' });
      }

      await Users.create({
        username: userName,
        password: hashPassword,
        firstname: firstName,
        lastname: lastName,
        age,
      });
      res.status(200).json({ message: 'User registered successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async login(req, res, next) {
    try {
      const { userName, password } = req.body;

      const user = await Users.findOne({ where: { user_name: userName } });
      if (!user) {
        return res.status(400).json({ message: 'Invalid user name' });
      }
      const validPassword = await bcrypt.compare(
        password,
        user.password
      );
      if (!validPassword) {
        return res.status(400).json({ message: 'Invalid password' });
      }

      const tokens = generateTokens(user);
      res.cookie('refresh_token', tokens.refreshToken, {
        httpOnly: true,
        secure: true,
      });
      res.status(200).json({accessToken: tokens.accessToken});
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  refreshToken(req, res) {
    try {

    const cookies = req.cookies;
    let refreshToken = null;

    if (!cookies?.refresh_token) {
        console.log(cookies);
      return res.status(401).json({ error: 'Null refresh token' });
    } else {
      refreshToken = cookies.refresh_token;
    }

      jwt.verify(
        refreshToken,
        process.env.JWT_REFRESH_SECRET,
        (error, user) => {
          if (error) {
            return res.status(401).json({ error: error.message });
          }
          const tokens = generateTokens(user);
          res.cookie('refresh_token', tokens.refreshToken, {
            httpOnly: true,
            secure: true,
          });
          res.status(200).json({accessToken: tokens.accessToken});
        }
      );
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  deleteRefreshToken(req, res) {
    try {
      res.clearCookie('refresh_token');
      return res.status(200).json({ message: 'refresh token deleted.' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new UserController();
