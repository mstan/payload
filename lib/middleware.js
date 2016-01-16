var dbSchema = require('./dbSchema.js');

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


module.exports = {
    dbSetup: dbSetup,
    passAuthedUser: passAuthedUser,
    isUserAuthenticated: isUserAuthenticated
}