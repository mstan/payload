/* Routers & Configs */
var configFile = require('../config.js');

var knex = require('knex')(configFile.knex),
    bookshelf = require('bookshelf')(knex);

var usersTable = function(callback) {

    knex.schema.createTableIfNotExists('users', function (table) {

      table.increments('id');
      table.string('steamID');
      table.string('displayName');
      table.string('role');
      table.string('avatarFull');
      table.string('createdAt');
      table.string('lastLoginAt');
    }) /* end createaTableIfNot Exists. Begin then */
    /* Begin .then */
    .then(function () {
        callback(null);
    })
    /* Begin .catch */
    .catch(function (err) {
        callback(err);
    });
};

var makeDB = function (callback) {
    usersTable(callback);
};

module.exports = {
    makeDB: makeDB
};



