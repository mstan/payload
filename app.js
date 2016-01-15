/* Routers & Configs */
var auth = require('./auth.js'), //Routing to auth
	configFile = require('./config.js'); //Base configs
    routes = require('./routes.js');

/* Dependencies */
var express = require('express'),
    ejs = require('ejs'),
    /* Database */
    mysql = require('mysql'), // double check. Do I need MySQL here even?
	knex = require('knex')(configFile.knex),
	bookshelf = require('bookshelf')(knex);

/* Library */
var midWare = require('./lib/middleware.js');

/* Initialization */
var app = express();

/* Middleware */
app.use(midWare.dbSetup); //Middleware for Database setup.
app.set('view engine', 'ejs'); //View Engine
app.use(express.static('views')); //Mapping public views dir

/* External Routing */
app.use('/auth', auth); //Reroute all /auth routes to /auth handler

/* Internal Routing */
app.get('/', routes.index);
app.get('/databaseSetup', routes.databaseSetup);

/* Finalize and binding */
app.listen(3000);
console.log('Listening on port 3000');