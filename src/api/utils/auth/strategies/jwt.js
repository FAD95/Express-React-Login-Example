const passport = require('passport')
const { Strategy, ExtractJwt } = require('passport-jwt')
const boom = require('boom')
const User = require('../../../models/user')

passport.use(
  new Strategy(
    {
      secretOrKey: process.env.AUTH_JWT_SECRET,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    },
    async function ({payload}, cb) {
      try {
        const user = await User.findOne({ username: payload.sub })
        if (!user) cb(boom.unauthorized(), false)
        return cb(null, user)
      } catch (error) {
        cb(error)
      }
    }
  )
)
