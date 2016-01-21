var dbSchema = require('./dbSchema.js'),
    config = require('../config.js'),

    knex = require('knex')(config.knex),
    http = require('http');

const DB_STATE_EMPTY = 0;
const DB_STATE_PENDING = 1;
const DB_STATE_COMPLETE = 2;
const DB_STATE_ERR = 4;

var dbSetupCheck = DB_STATE_EMPTY;

var dbSetup = function (req,res,next) {
    switch (dbSetupCheck) {
        case DB_STATE_COMPLETE:
            return next();

        case DB_STATE_EMPTY:
            dbSchema.makeDB(function (err) {
                if(err) {
                    dbSetupCheck = DB_STATE_ERR;
                    console.err('Something went wrong in setting up the database');
                    return;
                } // end if (err)

                dbSetupCheck = DB_STATE_COMPLETE;
            }); // end dbSchema.makeDB

        case DB_STATE_PENDING:
            console.log('Run database setup on server start');
            return res.redirect('/databaseSetup');

    } // end switch
}; // end dbSetup


/* Permissions */
var passAuthedUser = function(req,res,next) {
    res.locals.user = req.user;
    next();
};

var isUserAuthenticated = function (req,res,next) {
    if(req.user == undefined) {
        res.redirect('auth');
    } else {
        next();
    }
};


var updateUserFromAPI = function (userJSON) {

    var userUpdateToken = {
        steamID: userJSON.steamid,
        displayName: userJSON.personaname,
        avatarFull: userJSON.avatarfull
    };

    console.log(userUpdateToken);

    knex('users') /* table */
    .where('steamID', userJSON.steamid ) /* where user = steamID */
    .update(userUpdateToken) /* make user token to update */
    .catch( function(err) { console.log(err) });


}


/* Routine */
var steamAPIURL = 'http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=' + config.steamAPIKey +  '&steamids=';

var updateUsers = function () {

  knex.select().table('users') //get users from the database
  .then(function (users) {

    //Run a forEach function
    users.forEach( function (user) {

        var userJSONURL = steamAPIURL + user.steamID;

        http.get(userJSONURL, function (res) {
            var body = '';

            res.on('data', function (chunk) {
                body += chunk;
            });

            res.on('end', function () {
                try {
                    var userArray = JSON.parse(body).response.players,
                        user = userArray[0];

                    updateUserFromAPI(user);

                } /* end try */ catch (err) {
                    console.err('no user returned');
                }
            });
        }); // end http.get
    }); // end forEach
   }) // end then
}


module.exports = {
    dbSetup: dbSetup,
    passAuthedUser: passAuthedUser,
    isUserAuthenticated: isUserAuthenticated,
    updateUsers: updateUsers
}