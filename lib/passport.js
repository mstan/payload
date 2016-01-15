/* Passport Authentication File for payload */

/* Lib */
var config = require('../config.js');

/* Dependencies */
var passport = require('passport'),
    SteamStrategy = require('passport-steam').Strategy,
    knex = require('knex')(config.knex);

/* Passport Strategy Functions */
// This needs to return our user as well
var createNewUser = function(profile,callback) {
      var timestampValue = Math.floor( Date.now() / 1000);
      var timestamp = timestampValue.toString();  

      var user = {
         steamID: profile.id, 
         displayName: profile.displayName, 
         role: 'member', 
         createdAt: timestamp, 
         lastLoginAt: timestamp         

      }

      //Insert into users table
      knex.insert(user) /* into table */
      .into('users') /* catch errors */
      .then( function() { callback(false,user) })
      .catch(function(err) { console.log(err) });
};

var checkIfUserExists = function(profile,callback) {

      var userid = profile.id;

      knex('users') /* table */
      .where('steamID', userid ) /* Where steamID is our user's ID */
      .then( function(user) {
        callback (false,user);
      }) /* Catch error */
      .catch(function (err) {
        callback(err, {});
      });
};


/* Define our steam passport strategy */
passport.use(new SteamStrategy({
    returnURL: config.steamAuthReturnURL,
    realm: config.steamAuthRealm,
    apiKey: config.steamAPIKey
  },
  function(identifier, profile, done) {
    // asynchronous verification, for effect...
    process.nextTick(function () {

      checkIfUserExists(profile, function (err,userRecord) {
        var userOut = userRecord[0],
            exists = !!(userOut);

            if(exists) {
              return done(null, userOut);
            } else {
              createNewUser(profile, function (err,user) {
              return done(null,user);
              });
            } // end if0else
      }); // end checkIfUserExists
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