/* Passport Authentication File for payload */

/* Lib */
var config = require('../config.js');

/* Dependencies */
var passport = require('passport'),
    SteamStrategy = require('passport-steam').Strategy,
    knex = require('knex')(config.knex);

/* Passport Strategy Functions */
var createNewUser = function(profile,callback) {
      var timestampValue = Math.floor( Date.now() / 1000);
      var timestamp = timestampValue.toString();  

      var user = {
         steamID: profile.id, 
         displayName: profile.displayName, 
         role: 'member', 
         avatarFull: profile._json.avatarfull,
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

var updateUser = function(profile,cb) {

      var userid = profile.id;
      var timestampValue = Math.floor( Date.now() / 1000);
      var timestamp = timestampValue.toString(); 

      var userUpdateToken = {
        displayName: profile.displayName,
        avatarFull: profile._json.avatarfull,
        lastLoginAt: timestamp

      }

      knex('users') /* table */
      .where('steamID', '=', userid) /* where steamID is our user's ID */
      .update(userUpdateToken)
      .then (callback (false,null))
      .catch( function (err) {
        cb(err, {});
      });

};


/* Define our steam passport strategy */
passport.use(new SteamStrategy({
    returnURL: config.steamAuthReturnURL,
    realm: config.steamAuthRealm,
    apiKey: config.steamAPIKey
  },
  function(identifier, profile, done) {
    process.nextTick(function () {

      checkIfUserExists(profile, function (err,userRecord) {
        var userOut = userRecord[0],
            exists = !!(userOut);

            if(exists) {
              return done(null, userOut);
            } else {

              createNewUser(profile, function (err,newUser) {
                //We make our new user. We have the token from creating them. Give that to a profile.ID binding.
                var newProfile = {};
                newProfile.id = newUser.steamID;

                //Now give that ID to checkIfUserExists. We know they will, so go ahead and make them.
                checkIfUserExists(newProfile, function (err,userRecord) {

                  var userOut= userRecord[0];
                  //Give back our user from the database
                  return done(null,userOut);
                });

              }) // end createNewUser
            } // end if-else
      }); // end checkIfUserExists
    }); // end process.nextTick
  } // end function(identifier,profile,done)
)); // end passport use

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