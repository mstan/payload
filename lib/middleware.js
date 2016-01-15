var dbSchema = require('./dbSchema.js');

var dbSetupCheck = 0;

var dbSetup = function (req,res,next) {

	if (dbSetupCheck == 0 ) {
		dbSchema.makeDB(req,res,next)
        /* then function */
        .then( function () {
          dbSetupCheck = 1;
          res.send('DB setup! Please refresh');
          return;
        }) /* end .then. Begin .catch */
        .catch( function () {
            res.send('Database setup error.');
        }); //end catch
	}

	next();
};


module.exports = {
	dbSetup: dbSetup
}


