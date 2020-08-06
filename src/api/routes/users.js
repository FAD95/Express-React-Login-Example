const express = require('express')
const router = express.Router()
const passport = require('passport')

// JWT Strategy
require('../utils/auth/strategies/jwt')

const { signup, login, profile } = require('../controllers/users')

router.post('/signup', signup)

router.post('/login', login)

router.get(
  '/profile',
  passport.authenticate('jwt', { session: false }),
  profile
)

module.exports = router
