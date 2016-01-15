/* Index */

var index = function (req,res) {
    res.render('profile/test.ejs');
};
var databaseSetup = function (req,res) {
    res.redirect('/');
}


/* Auth */
var authTest = function (req,res) {
    res.send('Login page');
};


module.exports = {
    index: index,
    databaseSetup: databaseSetup,

    authTest: authTest

}