const bcrypt = require('bcrypt')
const dotenv = require('dotenv')
const jwt = require('jsonwebtoken')
const passport = require('passport')

dotenv.config()

// Basic strategy
require('../../utils/auth/strategies/basic')

module.exports = async (req, res, next) => {
  passport.authenticate('basic', (error, user) => {
    try {
      if (error || !user) {
        next({
          status: 401,
          message: 'Invalid user or password',
        })
        return res.status(401)
      }
      req.login(user, { session: false }, async function (error) {
        if (error) next(error)
        const payload = { sub: user.username, email: user.email }
        const token = await jwt.sign({ payload }, process.env.AUTH_JWT_SECRET, {
          expiresIn: process.env.TOKEN_EXPIRES_IN,
        })
        return res.status(200).json({
          status: 200,
          access_token: token,
        })
      })
    } catch (error) {
      next(error)
    }
  })(req, res, next)
}
