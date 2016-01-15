/* Passport Authentication File for payload */

/* Lib */
var config = require('../config.js');

/* Dependencies */
var passport = require('passport'),
    SteamStrategy = require('passport-steam').Strategy;


/* Define our steam passport strategy */
passport.use(new SteamStrategy({
    returnURL: config.steamAuthReturnURL,
    realm: config.steamAuthRealm,
    apiKey: config.steamAPIKey
  },
  function(identifier, profile, done) {
    // asynchronous verification, for effect...
    process.nextTick(function () {

      // Do all that database shit here.
      profile.identifier = identifier;
      console.log(identifier);
      return done(null, profile);
    });
  }
));

/* Serialization and deserialization */
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

/* Authentication function for authing on Steam through our site
    Export this to auth.js */
var passportAuth = passport.authenticate('steam', { failureRedirect: '/' });




module.exports = {
    passportAuth: passportAuth
};