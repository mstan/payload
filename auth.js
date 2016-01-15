/* 	auth.js                        *
*   all routes prefixed with /auth */

/* Lib */
var routes = require('./routes.js');
var passportLib = require('./lib/passport.js');
/* Dependencies */
var express = require('express');
/* Initialization */
var auth = express();

/* Steam Auth */
auth.get('/', passportLib.passportAuth, routes.redirToIndex);
auth.get('/return', passportLib.passportAuth, routes.redirToIndex);

module.exports = auth;