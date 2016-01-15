/* 	auth.js                        *
*   all routes prefixed with /auth */
var routes = require('./routes.js');

/* Dependencies */
var express = require('express');

/* Initialization */
var auth = express();

/* Routing */
auth.get('/', routes.authTest);

module.exports = auth;