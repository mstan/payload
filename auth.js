/* 	auth.js                        *
*   all routes prefixed with /auth */

/* Lib */
var routes = require('./routes.js');

var passportLib = require('./lib/passport.js'),
    midWare = require('./lib/middleware.js');
/* Dependencies */
var express = require('express');
/* Initialization */
var auth = express();

/* Steam Auth */
auth.get('/', passportLib.passportAuth, routes.redirToIndex);
auth.get('/return', passportLib.passportAuth, routes.redirToIndex);

auth.get('/myProfile', midWare.isUserAuthenticated, routes.myProfile);

/* Permission */

module.exports = auth;