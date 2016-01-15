/* 	auth.js                        *
*   all routes prefixed with /auth */

/* Dependencies */
var express = require('express');

/* Initialization */
var auth = express();

/* Routing */
auth.get('/', function (req,res) {
	res.send('Login page');
});

module.exports = auth;