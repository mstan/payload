/* Configurations */


/* knex connection settings */
var knex = {
	client: 'mysql',
	connection: {
		host	: 'localhost',
		user	: 'payloadAdmin',
		password : 'pl_',
		database : 'payload'
	}

};

module.exports = {
	knex: knex
};