/* Routers & Configs */
var configFile = require('../config.js');

var knex = require('knex')(configFile.knex),
    bookshelf = require('bookshelf')(knex);

/* users */

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

/* boards */

var boardsTable = function(callback) {

  knex.schema.createTableIfNotExists('boards', function (table) {

    table.increments('id');
    table.string('name');
    table.string('createdAt');
    table.string('updatedAt');
    table.string('lastPostID');
    table.boolean('isOpen');

  })
  .then(function () {
    callback(null);
  })
  .catch (function (err) {
    console.err(err);
    callback(err);
  });
};

var topicsTable = function(callback) {

  knex.schema.createTableIfNotExists('topics', function (table) {

    table.increments('id');
    table.integer('boardID');
    table.string('creatorID');
    table.string('subject');
    table.string('body');
    table.string('createdAt');
    table.string('updatedAt');

  })
  .then(function () {
    callback(null);
  })
  .catch(function (err) {
    console.err(err);
    callback(err);
  });
};



var makeDB = function (callback) {
    usersTable(callback);
    boardsTable(callback);
    topicsTable(callback);

};

module.exports = {
    makeDB: makeDB
};



