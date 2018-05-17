const passport = require('passport')
const Auth0Strategy = require('passport-auth0')

const strategy = new Auth0Strategy(
  {
    domain: process.env.AUTH0_DOMAIN,
    clientID: process.env.AUTH0_CLIENT_ID,
    clientSecret: process.env.AUTH0_CLIENT_SECRET,
    callbackURL: `${process.env.CMS_URL}/callback`
  },
  (accessToken, refreshToken, extraParams, profile, done) => {
    return done(null, {
      ...profile,
      idToken: extraParams.id_token
    })
  }
)

passport.use(strategy)

passport.serializeUser(function(user, done) {
  done(null, user)
})

passport.deserializeUser(function(user, done) {
  done(null, user)
})

module.exports = passport
