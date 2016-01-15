/* Routers & Configs */
var configFile = require('../config.js');

var knex = require('knex')(configFile.knex),
    bookshelf = require('bookshelf')(knex);

var usersTable = function(req,res,next) {

    knex.schema.createTableIfNotExists('users', function (table) {

      table.increments('id');
      table.string('steamID');
      table.string('role');
      table.integer('createdAt');
      table.integer('lastLoginAt');
    }) /* end createaTableIfNot Exists */
       /* Extend knex.schema */
       .catch(function (err) {
            console.error(err)
       });

    next();
};

var makeDB = function (req,res,next) {
    usersTable(req,res,next);

    next();
};

module.exports = {
    makeDB: makeDB
};



